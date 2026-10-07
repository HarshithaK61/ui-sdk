import type { Network } from '@concordium/web-sdk';

export const network: unknown = 'Testnet' as Network;

// Local storage keys
export const seedPhraseKey = 'seed-phrase';
export const selectedIdentityProviderKey = 'selected-identity-provider';
export const identityObjectKey = 'identity-object';

// The indices of the identity and the credential deployed on the account.
// These are static in this example as we only create a single identity and
// a single credential.
export const identityIndex = 0;
export const credNumber = 0;

/**
 * Apple default App Clip link (iOS 16.4+, after Concordium ID + clip are on the Store).
 * sid/wc are appended at redirect time. Demo URL cannot carry WalletConnect params — do not use it here.
 */
export const APP_CLIP_INVOCATION_URL = 'https://appclip.apple.com/id?p=com.idwallet.app.Clip';
export const APP_CLIP_DEMO_URL =
  'https://apps.apple.com/demo/id6746754485?app-clip-bundle-id=com.idwallet.app.Clip';
export const APP_CLIP_PARENT_OPEN_URL = 'concordiumidapp://open';
export const APP_ABSENT_REDIRECT_STORAGE_KEY = 'concordiumAppAbsentRedirectUrl';
export const APP_CLIP_SID_STORAGE_KEY = 'concordiumAppClipSid';
export const PRESENT_APP_OPEN_STORAGE_KEY = 'concordiumPresentAppOpenUrl';




 const mainnet = {
  genesisHash: '9dd9ca4d19e9393877d2c44b70f89acbfc0883c2243e5eeaecc0d1cd0503f478',
  name: 'Concordium Mainnet',
  walletProxyBaseUrl: 'https://wallet-proxy.mainnet.concordium.software',
  grpcPort: 20000,
  grpcUrl: 'https://grpc.mainnet.concordium.software',
  ccdScanUrl: 'https://ccdscan.io/',
}

 const testnet  = {
  genesisHash: '4221332d34e1694168c2a0c0b3fd0f273809612cb13d000d5c2e00e85f50f796',
  name: 'Concordium Testnet',
  walletProxyBaseUrl: 'https://wallet-proxy.testnet.concordium.com',
  grpcPort: 20000,
  grpcUrl: 'https://grpc.testnet.concordium.com',
  ccdScanUrl: 'https://testnet.ccdscan.io/',
}



// const worker = new Worker(new URL('workers/identity.worker.js', 'http://localhost:3000'));
export const nodeAddress = network == "Mainnet" ? mainnet.grpcUrl : testnet.grpcUrl // 'https://grpc.testnet.concordium.com';
export const nodePort = network == 'Mainnet'? mainnet.grpcPort : testnet.grpcPort;
// // Base URL for the wallet proxy.
export const walletProxyBaseUrl = network == 'Mainnet'? mainnet.walletProxyBaseUrl : testnet.walletProxyBaseUrl;  //'https://wallet-proxy.testnet.concordium.com';
// // Base URL for CCDscan. This is used to link to a submitted transaction.
// const ccdscanBaseUrl = network == 'Mainnet'? mainnet.ccdScanUrl : testnet.ccdScanUrl //'https://testnet.ccdscan.io';
// const client = new ConcordiumGRPCWebClient(nodeAddress, nodePort);


