<template>
  <UContainer>
    <UCard>
      <div class="container mx-auto p-4">
        <button
          @click="connectWalletSDKManaged()"
          :class="[
            'px-6 py-2 rounded-lg font-medium transition-colors border',
            isToggled
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ connected ? "Connected" : (isToggled ? "Connecting..." : "Connect SDK Wallet") }}
        </button>
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ConcordiumVerificationWebUI } from '@concordium/verification-web-ui';
import '@concordium/verification-web-ui/styles';
import { useChallengePresentation } from "~/composables/useChallengePresentation";

const route = useRoute();
const router = useRouter();

const isToggled = ref(false);
const connected = ref(false);
const sdk = ref<ConcordiumVerificationWebUI | null>(null);
const isRequestInFlight = ref(false);

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
    })
  );
};

const createTraceId = () => `wc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// Initialize challenge presentation composable
const { requestChallengeFromBackend, verifyPresentationProof } = useChallengePresentation(sdk);

const connectWalletSDKManaged = async () => {
  isToggled.value = !isToggled.value;

  if (!isToggled.value) {
    return;
  }

  if (!sdk.value) {
    initSDK();
  }

  try {
    // NEW API: renderUIModals() automatically initializes WalletConnect
    // SDK handles WalletConnect initialization, QR generation, and session management
    await sdk.value!.renderUIModals();
  } catch (error) {
    console.error("SDK-managed mode error:", error);
    isToggled.value = false;
  }
};

const initSDK = () => {
  sdk.value = new ConcordiumVerificationWebUI({
    network: "testnet",
    // New API: projectId and metadata at top level
    projectId: "60b3730563f0be9f7ed3776d813f6498",
    metadata: {
      name: "Concordium Merchant SDK",
      description: "Merchant dApp using Concordium ID verification",
      url: window.location.origin,
      icons: [`${window.location.origin}/Concordium.png`],
    },
  });
};

const sendPresentationWithReadinessRetry = async (sessionData: any) => {
  if (isRequestInFlight.value) {
    trace("presentation_retry_skipped_inflight");
    return;
  }

  isRequestInFlight.value = true;
  try {
    trace("presentation_retry_start", { topic: sessionData?.topic });
    const maxAttempts = 4;
    let lastError: unknown;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        trace("presentation_attempt_start", { attempt, maxAttempts, topic: sessionData?.topic });
        // Give mobile wallet a small window to finish cold-start setup after approval.
        await new Promise((resolve) => setTimeout(resolve, 700 * attempt));
        await handleChallengeAndPresentationRequest(sessionData);
        trace("presentation_attempt_success", { attempt, topic: sessionData?.topic });
        return;
      } catch (error) {
        lastError = error;
        trace("presentation_attempt_error", {
          attempt,
          topic: sessionData?.topic,
          error: String(error),
        });
        console.warn(`Presentation attempt ${attempt} failed`, error);
      }
    }

    throw lastError || new Error("Failed to send presentation request");
  } finally {
    isRequestInFlight.value = false;
    trace("presentation_retry_end");
  }
};

// Step 2: Send presentation request to SDK
const sendPresentationRequest = async (challengeData: any, sessionData: any, traceId: string) => {
  if (!challengeData) {
    throw new Error("No challenge data available");
  }

  trace("presentation_request_send", {
    traceId,
    challengeContext: challengeData?.context || null,
    topic: sessionData?.topic || null,
  });

  const presentationRequest = {
    ...challengeData?.presentationRequest,
    __traceId: traceId,
    metadata: {
      traceId,
      appName: "Concordium Merchant SDK",
      description: "Merchant dApp using Concordium ID verification",
      url: window.location.origin,
      icons: [`${window.location.origin}/Concordium.png`],
      ...(challengeData?.presentationRequest?.metadata || {}),
    },
  };
  
  // In SDK-managed mode, don't pass sessionTopic - let SDK use its internal session
  await sdk.value?.sendPresentationRequest(
    presentationRequest,
    sessionData?.topic,
  );

  trace("presentation_request_sent", { traceId });
};

// Orchestrate the challenge and presentation request flow
const handleChallengeAndPresentationRequest = async (sessionData: any) => {
  const traceId = createTraceId();
  try {
    trace("challenge_request_start", { traceId, topic: sessionData?.topic });
    console.log(
      "handleChallengeAndPresentationRequest called with sessionData:",
      sessionData,
    );

    const challengeData = await requestChallengeFromBackend();
    trace("challenge_request_done", { traceId, hasChallenge: Boolean(challengeData) });
    await sendPresentationRequest(challengeData, sessionData, traceId);
  } catch (error) {
    trace("challenge_or_presentation_error", { traceId, error: String(error) });
    console.error("Error in challenge/presentation flow:", error);
    // sdk.value?.closeModal();
  }
};

// Handle SDK events using window event listener
const handleSDKEvent = async (event: any) => {
  const { type, data } = event.detail;

  console.log("SDK Event:", type, data);

  switch (type) {
    case "active_session":
      connected.value = true;
      console.log("Active session detected:", data);
      // Session already exists, request challenge and presentation
      await sendPresentationWithReadinessRetry(data);
      break;

    case "session_approved":
      connected.value = true;
      console.log("Session approved!", data);
      await sendPresentationWithReadinessRetry(data);
      break;

    case "presentation_received":
      console.log("Presentation received:", data);
      // Step 3: Verify the ZKP proof
      await verifyPresentationProof(data);
      break;

    case "session_disconnected":
      connected.value = false;
      isToggled.value = false;
      console.log("Session disconnected:", data);
      break;

    case "error":
      console.error("SDK Error:", data);
      isToggled.value = false;
      break;
  }
};

onMounted(() => {
  if (!route.query.cb) {
    router.replace({
      path: route.path,
      query: {
        ...route.query,
        cb: Date.now().toString(),
      },
    });
  }

  // Listen to SDK events
  window.addEventListener("verification-web-ui-event", handleSDKEvent);
});

onBeforeUnmount(() => {
  // Clean up event listener
  window.removeEventListener("verification-web-ui-event", handleSDKEvent);
});
</script>
