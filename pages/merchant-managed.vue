<template>
  <UContainer>
    <UCard>
      <div class="container mx-auto p-4">
        <button
          @click="startBackendManagedVerification()"
          :disabled="isVerifying"
          :class="[
            'px-6 py-2 rounded-lg font-medium transition-colors border',
            isVerifying || isVerified
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50',
            isVerifying ? 'cursor-not-allowed opacity-80' : '',
          ]"
        >
          {{ isVerified ? "Verified" : (isVerifying ? "Verifying..." : "Verify Your Age > 18") }}
        </button>

        <button v-if="walletConnectUri" @click="formDeepLinkButtonUrl(walletConnectUri)" class="mt-3 px-6 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600">
          Open in IdApp
        </button>
        <p v-if="statusMessage" class="mt-3 text-sm text-gray-600">
          {{ statusMessage }}
        </p>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { ConcordiumVerificationWebUI } from "@concordium/verification-web-ui";
import "@concordium/verification-web-ui/styles";
import { useChallengePresentation } from "~/composables/useChallengePresentation";
import type { VerificationStatus, VerificationStatusResponse } from "~/services/api.service";

const sdk = ref<ConcordiumVerificationWebUI | null>(null);
const isVerifying = ref(false);
const isVerified = ref(false);
const verificationStatus = ref<VerificationStatus | null>(null);
const statusMessage = ref<string | null>(null);
const currentVerificationId = ref<string | null>(null);
const wasModalClosed = ref(false);
const activeModalState = ref<"qr" | "processing" | "success" | "error" | null>(null);
const walletConnectUri = ref<string | null>(null);

const QR_STATUSES = new Set<VerificationStatus>(["WAITING_FOR_PAIRING"]);
const PROCESSING_STATUSES = new Set<VerificationStatus>([
  "PAIRING_APPROVED",
  "SESSION_ESTABLISHED",
  "REQUEST_SENT",
  "PROOF_RECEIVED",
]);
const FAILURE_STATUSES = new Set<VerificationStatus>(["FAILED", "EXPIRED", "CANCELLED"]);

const STATUS_MESSAGES: Record<VerificationStatus, string> = {
  CREATED: "Preparing verification request...",
  WAITING_FOR_PAIRING: "Waiting for IdApp scan...",
  PAIRING_APPROVED: "Pairing approved. Establishing session...",
  SESSION_ESTABLISHED: "Session established. Preparing verification...",
  REQUEST_SENT: "Verification in progress. Please approve in IdApp...",
  PROOF_RECEIVED: "Proof received. Validating...",
  VERIFIED: "Verification successful.",
  FAILED: "Verification failed.",
  EXPIRED: "Verification expired.",
  CANCELLED: "Verification cancelled.",
};

const {
  createVerificationRequestFromBackend,
  pollVerificationStatusFromBackend,
  stopVerificationStatusPolling,
} = useChallengePresentation(sdk);

const trace = (stage: string, payload: Record<string, unknown> = {}) => {
  const now = Date.now();
  console.info(
    "[WC_TRACE]",
    JSON.stringify({
      side: "dapp-ui",
      stage,
      timestampIso: new Date(now).toISOString(),
      timestampMs: now,
      ...payload,
    }),
  );
};

const initSDK = (walletConnectUri: string) => {
  sdk.value?.closeModal();
  sdk.value = new ConcordiumVerificationWebUI({
    network: "testnet",
    walletConnectUri,
  });
  activeModalState.value = null;
};

const formDeepLinkButtonUrl = (walletConnectUri: string) => {
  const encodedUri = encodeURIComponent(walletConnectUri);
  console.log(`concordiumidapp://wc?uri=${encodedUri}`);
  return `concordiumidapp://wc?uri=${encodedUri}`;
};

const handleModalClose = () => {
  if (!isVerified.value) {
    wasModalClosed.value = true;
    stopVerificationStatusPolling();
  }
};

const showQrModal = async () => {
  if (activeModalState.value === "qr") {
    return;
  }

  sdk.value?.closeModal();
  await sdk.value?.renderUIModals(handleModalClose);
  activeModalState.value = "qr";
};

const closeActiveModal = () => {
  sdk.value?.closeModal();
  activeModalState.value = null;
};

const showProcessingModal = async () => {
  if (activeModalState.value === "processing") {
    return;
  }

  sdk.value?.closeModal();
  await sdk.value?.showModal?.("processing");
  activeModalState.value = "processing";
};

const showSuccessModal = async () => {
  if (activeModalState.value === "success") {
    return;
  }

  if (activeModalState.value !== "processing") {
    await showProcessingModal();
  }

  await sdk.value?.showSuccessState?.();
  activeModalState.value = "success";
};

const showErrorModal = async () => {
  if (activeModalState.value === "error") {
    return;
  }

  if (activeModalState.value !== "processing") {
    await showProcessingModal();
  }

  if (typeof sdk.value?.showErrorState === "function") {
    await sdk.value.showErrorState();
  } else {
    sdk.value?.closeModal();
  }

  activeModalState.value = "error";
};

const handleVerificationStatus = async (statusResponse: VerificationStatusResponse) => {
  verificationStatus.value = statusResponse.status;
  statusMessage.value =
    statusResponse.error || STATUS_MESSAGES[statusResponse.status] || `Verification status: ${statusResponse.status}`;

  trace("verification_status", {
    verificationId: statusResponse.verificationId,
    status: statusResponse.status,
  });

  if (statusResponse.status === "CREATED") {
    closeActiveModal();
    return;
  }

  if (QR_STATUSES.has(statusResponse.status)) {
    await showQrModal();
    return;
  }

  if (PROCESSING_STATUSES.has(statusResponse.status)) {
    await showProcessingModal();
    return;
  }

  if (statusResponse.status === "VERIFIED") {
    isVerified.value = true;
    await showSuccessModal();
    return;
  }

  if (FAILURE_STATUSES.has(statusResponse.status)) {
    isVerified.value = false;
    await showErrorModal();
  }
};

const startBackendManagedVerification = async () => {
  if (isVerifying.value) {
    return;
  }

  isVerifying.value = true;
  isVerified.value = false;
  verificationStatus.value = null;
  statusMessage.value = "Creating verification request...";
  currentVerificationId.value = null;
  wasModalClosed.value = false;
  activeModalState.value = null;

  try {
    trace("verification_create_start");
    const verificationRequest = await createVerificationRequestFromBackend();
    currentVerificationId.value = verificationRequest.verificationId;
    trace("verification_create_done", {
      verificationId: verificationRequest.verificationId,
      expiresAt: verificationRequest.expiresAt,
      hasWalletConnectUri: Boolean(verificationRequest.walletConnectUri),
    });

    walletConnectUri.value = verificationRequest.walletConnectUri;

    statusMessage.value = "Waiting for IdApp scan...";
    
    // initSDK(verificationRequest.walletConnectUri);

    // await showQrModal();

    statusMessage.value = "Checking verification status...";
    const finalStatus = await pollVerificationStatusFromBackend(
      verificationRequest.verificationId,
      {
        expiresAt: verificationRequest.expiresAt,
        intervalMs: 2000,
        onStatus: handleVerificationStatus,
      },
    );

    verificationStatus.value = finalStatus.status;

    if (finalStatus.status === "VERIFIED") {
      isVerified.value = true;
      statusMessage.value = "Verification successful.";
      trace("verification_success", {
        verificationId: finalStatus.verificationId,
      });
      return;
    }

    isVerified.value = false;
    statusMessage.value = finalStatus.error || `Verification ${finalStatus.status.toLowerCase()}.`;
    trace("verification_terminal_non_success", {
      verificationId: finalStatus.verificationId,
      status: finalStatus.status,
      error: finalStatus.error,
    });
  } catch (error) {
    isVerified.value = false;
    const errorMessage = error instanceof Error ? error.message : "Verification failed";
    statusMessage.value = errorMessage;
    trace("verification_error", { error: errorMessage });
    console.error("Backend-managed verification error:", error);

    if (wasModalClosed.value && errorMessage === "Verification status polling stopped") {
      statusMessage.value = "Verification cancelled.";
      return;
    }

    await showErrorModal();
  } finally {
    isVerifying.value = false;
  }
};

onBeforeUnmount(() => {
  stopVerificationStatusPolling();
  sdk.value?.closeModal();
});
</script>
