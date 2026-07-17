import { useVerification } from "~/composables/useVerification";
import type { CreateVerificationResponse, VerificationStatusResponse } from "~/services/api.service";
import type { Ref } from "vue";

interface VerificationStatusPollingOptions {
  intervalMs?: number;
  timeoutMs?: number;
  expiresAt?: string;
  onStatus?: (statusResponse: VerificationStatusResponse) => void | Promise<void>;
}

const SUCCESS_STATUSES = new Set(["VERIFIED"]);
const FAILURE_STATUSES = new Set(["FAILED", "EXPIRED", "CANCELLED"]);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useChallengePresentation = (sdk: Ref<any>) => {
  const {
    createVerificationRequest,
    getVerificationStatus,
    requestChallenge,
    verifyProof,
  } = useVerification();

  let shouldStopPolling = false;

  const createVerificationRequestFromBackend = async (): Promise<CreateVerificationResponse> => {
    const verificationRequest = await createVerificationRequest(
      "IDProofVerificationByIdapp",
      "testnet",
      18,
      "gte",
      ["AgeProof"],
    );

    console.log("Verification request created:", verificationRequest);
    return verificationRequest;
  };

  const stopVerificationStatusPolling = () => {
    shouldStopPolling = true;
  };

  const showVerificationFailure = async () => {
    if (typeof sdk.value?.showErrorState === "function") {
      await sdk.value.showErrorState();
      return;
    }

    sdk.value?.closeModal();
  };

  const pollVerificationStatusFromBackend = async (
    verificationId: string,
    options: VerificationStatusPollingOptions = {},
  ): Promise<VerificationStatusResponse> => {
    const intervalMs = options.intervalMs ?? 2000;
    const expiresAtMs = options.expiresAt ? new Date(options.expiresAt).getTime() : Number.NaN;
    const deadlineMs = Number.isFinite(expiresAtMs)
      ? expiresAtMs
      : Date.now() + (options.timeoutMs ?? 10 * 60 * 1000);

    shouldStopPolling = false;

    while (!shouldStopPolling) {
      const statusResponse = await getVerificationStatus(verificationId);
      console.log("Verification status:", statusResponse.status, statusResponse);
      await options.onStatus?.(statusResponse);

      if (SUCCESS_STATUSES.has(statusResponse.status)) {
        if (!options.onStatus) {
          await sdk.value?.showSuccessState();
        }
        return statusResponse;
      }

      if (FAILURE_STATUSES.has(statusResponse.status)) {
        if (!options.onStatus) {
          await showVerificationFailure();
        }
        return statusResponse;
      }

      if (Date.now() >= deadlineMs) {
        if (!options.onStatus) {
          await showVerificationFailure();
        }
        throw new Error("Verification timed out");
      }

      await sleep(intervalMs);
    }

    throw new Error("Verification status polling stopped");
  };

  // Step 1: Request challenge from backend
  const requestChallengeFromBackend = async () => {
    const challengeData = await requestChallenge(
      "IDProofVerificationByIdapp",
      "testnet",
      18,
      "gte",
    );
    console.log("Challenge data received:", challengeData);
    return challengeData;
  };

  // Step 3: Verify presentation proof
  const verifyPresentationProof = async (data: any) => {
    const isValid = await verifyProof(data, "testnet");
    console.log("Proof validity:", isValid);

    // If valid, show success state
    if (isValid.verified) {
      console.log("Proof is valid!");
      await sdk.value?.showSuccessState();
      // Auto-close modal after 2 seconds
      // setTimeout(() => sdk.value?.closeModal(), 2000);
    } else {
      console.error("Verification failed:", isValid);
      sdk.value?.closeModal();
    }

    return isValid;
  };

  return {
    createVerificationRequestFromBackend,
    pollVerificationStatusFromBackend,
    stopVerificationStatusPolling,
    requestChallengeFromBackend,
    verifyPresentationProof,
  };
};
