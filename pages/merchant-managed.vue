<template>
  <UContainer>
    <UCard>
      <div class="container mx-auto p-4">
        <button
          @click="connectWalletMerchantProvided()"
          :class="[
            'px-6 py-2 rounded-lg font-medium transition-colors border',
            isToggled
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50',
          ]"
        >
          {{ connected ? "Connected" : (isToggled ? "Connecting..." : "Connect Merchant Wallet") }}
        </button>
      </div>
    </UCard>
  </UContainer>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ConcordiumVerificationWebUI } from '@concordium/verification-web-ui';
import '@concordium/verification-web-ui/styles';
import { AccountWalletWC } from "~/account-wallet";
import { useChallengePresentation } from "~/composables/useChallengePresentation";

const isToggled = ref(false);
const connected = ref(false);
const sdk = ref<ConcordiumVerificationWebUI | null>(null);
const accountWalletConnect = ref<AccountWalletWC>();
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

// Initialize SDK once
const initSDK = (walletConnectURI?: string) => {
  if (!sdk.value) {
    sdk.value = new ConcordiumVerificationWebUI({
      network: "testnet",
      walletConnectUri: walletConnectURI,
    });
  }
};

const connectWalletMerchantProvided = async () => {
  isToggled.value = !isToggled.value;

  if (!isToggled.value) {
    return;
  }

  try {
    // Initialize merchant-managed WalletConnect client
    accountWalletConnect.value = new AccountWalletWC();

    // Set up callback for when session is approved
    accountWalletConnect.value.onSessionApproved = async (session: any) => {
      console.log("Session approved callback triggered:", session);
      connected.value = true;
      await sdk.value?.showModal("processing");
      await sendPresentationWithReadinessRetry(session);
    };

    await accountWalletConnect.value.initClient();

    // Check if there's already an active session
    const existingSession = accountWalletConnect.value.getMostNewSession();

    if (existingSession) {
      console.log("Found existing session:  ", existingSession);
      connected.value = true;
      // Initialize SDK first before showing modal
      initSDK();
      await sdk.value?.showModal("returning-user");
    } else {
      // No existing session, need to connect
      const wcUri = await accountWalletConnect.value.connect("ccd:testnet");
      console.log("WalletConnect URI:", wcUri);
      if (wcUri) {
        // Initialize SDK with the WC URI and render modals
        initSDK(wcUri);
        await sdk.value?.renderUIModals();
        // Wait for session to be established (will be handled by presentation_received event)
      }
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
    isToggled.value = false;
  }
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
        await handleChallengeAndPresentation(sessionData);
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

// Step 2: Send presentation request
const sendPresentationRequest = async (challengeData: any, traceId: string) => {
  if (!accountWalletConnect.value) {
    throw new Error("WalletConnect client not initialized");
  }

  const session = accountWalletConnect.value.getMostNewSession();
  if (!session) {
    throw new Error("No active session found");
  }

  console.log("Sending presentation request via merchant WC client");
  trace("presentation_request_send", {
    traceId,
    challengeContext: challengeData?.context || null,
  });

  const chainId = "ccd:4221332d34e1694168c2a0c0b3fd0f27"; // testnet chainId
  const proof = await accountWalletConnect.value.request(
    "request_verifiable_presentation_v1",
    chainId,
    {
      ...challengeData.presentationRequest,
      __traceId: traceId,
      metadata: {
        traceId,
        appName: "3P Account Wallet",
        description: "Merchant dApp using Concordium ID verification",
        url: window.location.origin,
        icons: [`${window.location.origin}/Concordium.png`],
      },
    },
    traceId,
  );

  console.log("Presentation response received:", proof);
  trace("presentation_response_received", { traceId, resultType: typeof proof });
  return proof;
};

// Orchestrate the three-step process
const handleChallengeAndPresentation = async (sessionData: any) => {
  const traceId = createTraceId();
  try {
    trace("challenge_request_start", { traceId, topic: sessionData?.topic });
    const challengeData = await requestChallengeFromBackend();
    trace("challenge_request_done", { traceId, hasChallenge: Boolean(challengeData) });
    
    if (challengeData && accountWalletConnect.value) {
      const proof = await sendPresentationRequest(challengeData, traceId);
      await verifyPresentationProof(proof);
      trace("presentation_verify_done", { traceId });
    }
  } catch (error) {
    trace("challenge_or_presentation_error", { traceId, error: String(error) });
    console.error("Error in challenge/presentation flow:", error);
    sdk.value?.closeModal();
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
    case "session_disconnected":
      connected.value = false;
      isToggled.value = false;
      console.log("Session disconnected:", data);
      break;

    case "session_approved":
      connected.value = true;
      console.log("Session approved!", data);
      await sendPresentationWithReadinessRetry(data);
      break;

    case "error":
      console.error("SDK Error:", data);
      isToggled.value = false;
      break;
  }
};

onMounted(() => {
  // Listen to SDK events
  window.addEventListener("verification-web-ui-event", handleSDKEvent);
});

onBeforeUnmount(() => {
  // Clean up event listener
  window.removeEventListener("verification-web-ui-event", handleSDKEvent);
});
</script>
