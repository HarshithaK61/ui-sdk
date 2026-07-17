// API Configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://verifypay-api-staging.nanocorp.io';
const API_SECRET = import.meta.env.VITE_API_SECRET || 'concordium_secret';

export interface ApiConfig {
  apiUrl: string;
  apiSecret: string;
  network: 'mainnet' | 'testnet';
}

export interface PresentationVerificationRequest {
  presentation: {
    presentationContext: any;
    proof: any;
    type: any;
    verifiableCredential: any;
  };
  network: string;
}

export interface VerificationResult {
  verified: any;
  valid: boolean;
  result?: any;
  error?: string;
}

export interface ChallengeResponse {
  challengeId: string;
  presentationRequest?: any;
}

export interface ChallengeRequest {
  context: string;
  network: string;
  contextDetails: {
    age: number;
    operator: 'gte' | 'lte' | 'eq';
    proofType: string[];
  };
}

export interface CreateVerificationRequest {
  context: string;
  network: 'mainnet' | 'testnet';
  contextDetails: {
    age: number;
    operator: 'gte' | 'lte' | 'eq';
    proofType: string[];
  };
}

export interface CreateVerificationResponse {
  verificationId: string;
  walletConnectUri: string;
  expiresAt: string;
}

export type VerificationStatus =
  | 'CREATED'
  | 'WAITING_FOR_PAIRING'
  | 'PAIRING_APPROVED'
  | 'SESSION_ESTABLISHED'
  | 'REQUEST_SENT'
  | 'PROOF_RECEIVED'
  | 'VERIFIED'
  | 'FAILED'
  | 'EXPIRED'
  | 'CANCELLED';

export interface VerificationStatusResponse {
  verificationId: string;
  status: VerificationStatus;
  walletAddress?: string;
  error?: string;
  expiresAt: string;
  updatedAt: string;
  verificationResult?: Record<string, unknown>;
}

export class ApiService {
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  /**
   * Get common headers for API requests
   */
  private getHeaders(): Record<string, string> {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-api-secret': this.config.apiSecret,
    };
  }

  /**
   * Make a generic API request
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.config.apiUrl.replace(/\/$/, '')}${endpoint}`;

    const response = await fetch(url, {
      headers: this.getHeaders(),
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  }

  /**
   * Request a challenge from the backend
   */
  async initializeChallenge(
    request: ChallengeRequest
  ): Promise<ChallengeResponse> {
    return this.makeRequest<ChallengeResponse>('/api/v1/challenge', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Create a verification request and receive a WalletConnect URI.
   */
  async createVerificationRequest(
    request: CreateVerificationRequest
  ): Promise<CreateVerificationResponse> {
    return this.makeRequest<CreateVerificationResponse>('/api/v1/verifications', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  /**
   * Retrieve the current status of a verification request.
   */
  async getVerificationStatus(
    verificationId: string
  ): Promise<VerificationStatusResponse> {
    return this.makeRequest<VerificationStatusResponse>(
      `/api/v1/verifications/${encodeURIComponent(verificationId)}`,
      {
        method: 'GET',
      }
    );
  }

  /**
   * Verify the presentation proof with the backend
   */
  async verifyPresentation(
    request: PresentationVerificationRequest
  ): Promise<VerificationResult> {
    return this.makeRequest<VerificationResult>('/api/v1/verify/id-proof', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }
}

// Export a default configured instance
export const createApiService = (network: 'mainnet' | 'testnet' = 'testnet'): ApiService => {
  return new ApiService({
    apiUrl: API_BASE_URL,
    apiSecret: API_SECRET,
    network,
  });
};

export default ApiService;
