const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DarhMoVt.js","./_CSVFNIn.js","./entry.Bv58BlFP.css","./BEP63aU0.js","./w6yw6ddM.js","./CE1G-McA.js","./useChallengePresentation.DlatBVEz.css","./DcQm8KL9.js","./4KloPWgM.js","./TDjsVpMm.js","./1-Zg5deT.js","./_XbgiawH.js","./FVMfpm40.js"])))=>i.map(i=>d[i]);
import{D as d}from"./_CSVFNIn.js";import{a as N}from"./9WNwlQjE.js";import{a as K}from"./BEP63aU0.js";import{i as L,M as m,h as O,S as P,c as F}from"./w6yw6ddM.js";import{s as Q}from"./DcQm8KL9.js";import"./CE1G-McA.js";const z=globalThis.setInterval;let l=null,g=null,p=null,v=null,I;const S={CONCORDIUM_WALLET:"concordium-wallet",BROWSER_WALLET:"browser-wallet",CONCORDIUM_ID:"concordium-id"};I=S.CONCORDIUM_ID;const w={HIDDEN:"hidden",FLEX:"flex",FLEX_COL:"flex-col"},E={APP:"#app",SCAN_MODAL:"#scan-modal",BACK_BTN:"#back-btn",QR_CONTAINER:"#qr-container"},q=[400,900,1600];function U(t){return new Promise(e=>setTimeout(e,t))}async function J(t,e,o=6e3,a=200){const r=Date.now()+o;for(;Date.now()<r;){if((t?.getActiveSessions()||[]).some(i=>i.topic===e))return;await U(a)}throw new Error(`Session topic ${e} was not active before timeout`)}async function X({wcService:t,topic:e,chainId:o,presentationRequest:a,metadata:r}){const c=q.length+1;let i;for(let n=1;n<=c;n++)try{await J(t,e);try{return{response:await t.request({topic:e,chainId:o,request:{method:"request_verifiable_presentation_v1",params:{...a,metadata:r}}}),methodUsed:"v1"}}catch{return{response:await t.request({topic:e,chainId:o,request:{method:"request_verifiable_presentation",params:{...a,metadata:r}}}),methodUsed:"v0"}}}catch(s){if(i=s,n===c)break;const u=q[n-1];console.warn(`Auto-send attempt ${n} failed, retrying in ${u}ms...`,s),await U(u)}throw i instanceof Error?i:new Error("Failed to auto-send presentation request")}function Y(){return`
    <div class="desktop--modal-overlay">
      <div class="desktop--modal-container">
        <div class="desktop--modal-body">
          <div class="flex items-center justify-between p-2">
            <button class="desktop--navigation-button" id="back-btn">
              <img src="${N}" alt="arrow-left-icon" />
              <span>Back</span>
            </button>
            <div>
              <img src="${F}" alt="concordium-modal-logo" />
            </div>
          </div>

          <div id="qr-container" class="${w.FLEX} items-center justify-center" style="min-height: 380px;">
            <div class="animate-pulse text-center" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <div class="w-48 h-48 bg-gray-200 rounded mb-2"></div>
              <p class="text-sm" style="color: #0D0F11;">Generating QR code...</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `}function Z(){return`
    <div class="mobile--modal-overlay position-relative">
      <div class="mobile--modal-container">
        <div class="mobile--modal-body">
          <div class="flex items-center justify-between p-2">
            <button class="mobile--navigation-button" id="back-btn">
              <img src="${N}" alt="arrow-left-icon" />
              <span>Back</span>
            </button>
            <div>
              <img src="${F}" alt="concordium-modal-logo" />
            </div>
          </div>

          <div id="mobile-loading" class="${w.FLEX} items-center justify-center min-h-[300px]">
            <div class="animate-pulse text-center">
              <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
              <p class="text-sm" style="color: #0D0F11;">Preparing wallet connection...</p>
            </div>
          </div>

          <div id="mobile-content" class="${w.HIDDEN}">
            <div id="btn-wrapper" class="flex flex-col w-full items-center gap-2 mt-4">
            <button class="mobile--primary-button w-full" id="open-in-wallet-btn">
              <span id="wallet-btn-text">Verify with ConcordiumID</span>
              <img src="${K}" alt="arrow-right-icon" />
            </button>
            <button class="mobile--primary-outline-button w-full" id="open-other-device-btn">
              <span>Verify on Another Device</span>
            </button>
          </div>

          <div id="qr-container" class="${w.HIDDEN}" style="display: none;">
            <!-- QR code will be generated here when user clicks "Verify on Another Device" -->
          </div>
          </div>
        </div>
      </div>
    </div>
  `}const ee=()=>{const t=L(),e=t?Z():Y(),o=document.createElement("div");o.innerHTML=e,o.id="scan-modal";const a={backBtn:o.querySelector(E.BACK_BTN),openInWalletBtn:o.querySelector("#open-in-wallet-btn"),openOtherDeviceBtn:o.querySelector("#open-other-device-btn"),qrContainer:o.querySelector(E.QR_CONTAINER)},r=async()=>{const{showLandingModal:n}=await d(async()=>{const{showLandingModal:s}=await import("./DarhMoVt.js");return{showLandingModal:s}},__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url);W(),await n()},c=async()=>{try{if(!v){const u=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.WALLET_CONNECT_URI);if(u)v=u;else if(await T(),!v){alert("Connection URI not available. Please refresh and try again.");return}}const n=I===S.CONCORDIUM_ID?"concordium-id":"concordium-wallet",s=se(I,v);if(s)window.location.href=s;else{const{openAppStore:u}=await d(async()=>{const{openAppStore:f}=await import("./4KloPWgM.js");return{openAppStore:f}},[],import.meta.url);u(n)}}catch(n){console.error("[Mobile] handleOpenInWallet failed:",n),alert("Failed to open wallet app. Please try again.")}},i=async()=>{const n=o.querySelector("#btn-wrapper");n&&n.classList.add(w.HIDDEN),v&&a.qrContainer&&await ce(v,a.qrContainer)};return a.backBtn?.addEventListener("click",r),t&&(a.openInWalletBtn?.addEventListener("click",c),a.openOtherDeviceBtn?.addEventListener("click",i)),o},fe=async()=>{const{getGlobalContainer:t}=await d(async()=>{const{getGlobalContainer:c}=await import("./w6yw6ddM.js").then(i=>i.p);return{getGlobalContainer:c}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),e=t();if(!e){console.error("Container not found for modal");return}const a=L()?".mobile--modal-container":".desktop--modal-container";l=ee(),l.id="scan-modal";const r=l.querySelector(a);l.style.opacity="0",r&&(r.style.transform="translateY(-20px) scale(0.95)",r.style.transition="transform 0.3s ease-out"),e.appendChild(l),l.offsetHeight,l.style.transition="opacity 0.3s ease-out",setTimeout(()=>{l&&(l.style.opacity="1",r&&(r.style.transform="translateY(0) scale(1)"))},10),re(),await T()},W=()=>{l&&(l.dropdownInstance?.destroy&&l.dropdownInstance.destroy(),l.classList.add("modal-exiting"),setTimeout(()=>{const t=l?.parentNode;t&&l&&t.removeChild(l),l=null,!document.querySelector(".desktop--modal-overlay")&&!document.querySelector(".mobile--modal-overlay")&&(document.body.style.overflowX="")},300)),g&&(clearTimeout(g),g=null),p&&(clearInterval(p),p=null),window.scanEventCleanup&&(window.scanEventCleanup(),window.scanEventCleanup=null),window.scanEventListeners&&(window.scanEventListeners.forEach(t=>t()),window.scanEventListeners=null)};async function T(){try{const t=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.CONNECTION_MODE);if(t==="sdk-managed"){const e=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_PROJECT_ID),o=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_NETWORK),a=localStorage.getItem("sdkWalletConnectMetadata"),r=a?JSON.parse(a):null;if(e&&o&&(window.__CONCORDIUM_WC_CONFIG__={projectId:e,network:o,metadata:r},await ie())){document.querySelectorAll(".desktop--modal-overlay, .mobile--modal-overlay").forEach(s=>{s.parentNode&&s.parentNode.removeChild(s)}),l=null,await new Promise(s=>setTimeout(s,100));const{showReturningUserModal:n}=await d(async()=>{const{showReturningUserModal:s}=await import("./TDjsVpMm.js");return{showReturningUserModal:s}},__vite__mapDeps([9,1,2,3,4,5,6,10]),import.meta.url);await n();return}}t==="sdk-managed"?await $():await te()}catch(t){console.error("Wallet connection failed:",t),b("Failed to generate QR code. Please try again.")}}async function $(){const t=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_PROJECT_ID),e=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_NETWORK);if(!t||!e)throw new Error("SDK project ID or network not found. Please call initWalletConnect() first.");const o=P.createWalletConnectService();await o.initialize(),await o.clearAllSessionsForNewPairing();const{WalletConnectConstants:a}=await d(async()=>{const{WalletConnectConstants:n}=await import("./w6yw6ddM.js").then(s=>s.w);return{WalletConnectConstants:n}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),r=a.CHAIN_IDS[e],{uri:c,approval:i}=await o.connect({ccd:{methods:[...a.ALL_METHODS],chains:r,events:[...a.EVENTS]}});if(!c)throw new Error("Failed to generate WalletConnect URI from SDK");if(v=c,i().then(async n=>{await ne(n)}).catch(n=>{console.error("Session approval failed:",n)}),L()){const n=document.querySelector("#mobile-loading"),s=document.querySelector("#mobile-content");n&&s&&(n.classList.add(w.HIDDEN),s.classList.remove(w.HIDDEN))}else await M(c)}async function te(){const t=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.WALLET_CONNECT_URI);if(!t){b("WalletConnect not configured. Please set up WalletConnect first by calling setWalletConnectUri() or initWalletConnect().");return}if(v=t,L()){const e=document.querySelector("#mobile-loading"),o=document.querySelector("#mobile-content");e&&o&&(e.classList.add(w.HIDDEN),o.classList.remove(w.HIDDEN))}else await M(t)}async function oe(t){try{const e=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_PRESENTATION_REQUEST);if(!e){console.log("No presentation request configured, waiting for merchant to send request");return}const o=JSON.parse(e);console.log("Auto-sending presentation request:",o);const a=P.getWalletConnectService();if(!a){console.error("WalletConnect service not available for auto-send");return}const c=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_NETWORK)==="mainnet"?"ccd:9dd9ca4d19e9393877d2c44b70f89acb":"ccd:4221332d34e1694168c2a0c0b3fd0f27",i=localStorage.getItem("sdkWalletConnectMetadata"),n=i?JSON.parse(i):{},s={description:n?.description||"Requesting verification",appName:n?.name||"Concordium Verification WebUI",url:n?.url||window.location.origin,icons:n?.icons||[]},{response:u,methodUsed:f}=await X({wcService:a,topic:t,chainId:c,presentationRequest:o,metadata:s});console.log(`Presentation response received (method ${f}):`,u),window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"presentation_received",data:u},bubbles:!0,composed:!0}));const{showSuccessState:C}=await d(async()=>{const{showSuccessState:_}=await import("./_XbgiawH.js");return{showSuccessState:_}},__vite__mapDeps([11,1,2,4,5,6,10]),import.meta.url);await C()}catch(e){console.error("Failed to auto-send presentation request:",e),window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"error",data:{message:"Failed to send verification request",error:e}},bubbles:!0,composed:!0}));const{showErrorState:o}=await d(async()=>{const{showErrorState:a}=await import("./_XbgiawH.js");return{showErrorState:a}},__vite__mapDeps([11,1,2,4,5,6,10]),import.meta.url);await o()}}async function ne(t){try{const{topic:e,namespaces:o}=t,a=o?.ccd?.accounts||[],r=t.peer?.metadata?.name||"Wallet";localStorage.setItem(m.LOCAL_STORAGE_FLAGS.CONNECTED_WALLET_NAME,r);const c={topic:e,accounts:a,namespaces:o,walletName:r};window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"session_approved",data:c},bubbles:!0,composed:!0}));const{showProcessingModal:i}=await d(async()=>{const{showProcessingModal:n}=await import("./_XbgiawH.js");return{showProcessingModal:n}},__vite__mapDeps([11,1,2,4,5,6,10]),import.meta.url);await i(),await oe(e)}catch(e){console.error("Error handling session approval:",e),window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"error",data:{message:"Failed to handle session approval",error:e}},bubbles:!0,composed:!0})),b("Failed to process wallet connection. Please try again.")}}async function M(t){try{const{default:e}=await d(async()=>{const{default:i}=await import("./FVMfpm40.js").then(n=>n.b);return{default:i}},__vite__mapDeps([12,5]),import.meta.url),{getConfig:o}=await d(async()=>{const{getConfig:i}=await import("./w6yw6ddM.js").then(n=>n.n);return{getConfig:i}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),{buildQrRedirectUrl:a}=await d(async()=>{const{buildQrRedirectUrl:i}=await import("./w6yw6ddM.js").then(n=>n.o);return{buildQrRedirectUrl:i}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),r=o(),c=document.querySelector(E.QR_CONTAINER);if(c){const i=a(t);console.log("Generated QR code value:",i);const n=await e.toDataURL(i,{width:200,margin:2,color:{dark:"#000000",light:"#ffffff"}}),s=window.location.hostname,f=s==="localhost"||s==="127.0.0.1"||s==="::1"?'<p class="text-xs text-center mt-2" style="color: #B45309; max-width: 280px; margin-left: auto; margin-right: auto;">This page is running on localhost. Phone camera scans cannot open localhost on another device. Use a LAN/public URL.</p>':"",C=r.qrCode?.showCountdown!==!1,_=r.qrCode?.expiryDuration||300*1e3,R=Math.floor(_/6e4),x=Math.floor(_%6e4/1e3),D=`${R}:${x.toString().padStart(2,"0")}`,y=C?`<p id="qr-countdown" class="desktop--qr-countdown">Expires in: <span class="font-semibold">${D}</span></p>`:"",{getIdAppStoreUrl:h}=await d(async()=>{const{getIdAppStoreUrl:B}=await import("./w6yw6ddM.js").then(j=>j.o);return{getIdAppStoreUrl:B}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),A=h();c.innerHTML=`
        <div class="text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center;">
          <img src="${n}" alt="QR Code for wallet connection" class="w-48 h-48 mx-auto mb-2" style="border-radius: 12.414px; border: 1px solid rgba(0, 0, 0, 0.10); background: #FFF;" />
          <p class="desktop--scan-text mt-2">Scan the QR code with your<br>Concordium ID compatible device</p>
          ${f}
          ${y}
          <img src="${Q}" alt="" class="mx-auto mt-4" />
          <div class="flex items-center justify-center mt-4">
            <p class="desktop--download-text">Download & Install the <a href="${A}" target="_blank" rel="noopener noreferrer">Concordium ID App</a> and come back here to verify.</p>
          </div>
        </div>
      `,G()}}catch(e){console.error("Failed to generate QR code:",e),b("Failed to generate QR code. Please try again.")}}async function G(){g&&(clearTimeout(g),g=null),p&&(clearInterval(p),p=null);const{getConfig:t}=await d(async()=>{const{getConfig:i}=await import("./w6yw6ddM.js").then(n=>n.n);return{getConfig:i}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),e=t(),o=e.qrCode?.expiryDuration||300*1e3,a=e.qrCode?.showCountdown!==!1,r=e.qrCode?.autoRefresh!==!1,c=Date.now()+o;if(a){const i=document.querySelector("#qr-countdown span");i&&(p=z(()=>{const n=Math.max(0,c-Date.now()),s=Math.floor(n/6e4),u=Math.floor(n%6e4/1e3);i.textContent=`${s}:${u.toString().padStart(2,"0")}`,n<=0&&p&&(clearInterval(p),p=null)},1e3))}g=setTimeout(async()=>{await ae(r)},o)}async function ae(t){const e=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.CONNECTION_MODE),o=e!=="sdk-managed";O({type:"qr-code-expired",source:"desktop",modalType:"scan",data:{connectionMode:e,isMerchantProvided:o,autoRefresh:o?!1:t}}),o?k(!1):t?(V(),await H()):k(!0)}async function H(){try{await $(),O({type:"qr-code-refreshed",source:"desktop",modalType:"scan",data:{timestamp:Date.now()}})}catch(t){console.error("Failed to refresh QR code:",t),b("Failed to refresh QR code. Please try again.")}}function k(t){const e=document.querySelector(E.QR_CONTAINER);if(e){const o=t?`<button id="refresh-qr" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
           Refresh QR Code
         </button>`:'<p class="text-sm text-inverse-tertiary mt-2">Waiting for new QR code from merchant...</p>';if(e.innerHTML=`
      <div class="text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div class="w-48 h-48 bg-yellow-50 border-2 border-yellow-200 rounded flex items-center justify-center mx-auto mb-2">
          <svg class="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-sm text-yellow-600 font-semibold">QR Code Expired</p>
        ${o}
      </div>
    `,t){const a=e.querySelector("#refresh-qr");a&&a.addEventListener("click",async()=>{V(),await H()})}}}function V(){const t=document.querySelector(E.QR_CONTAINER);t&&(t.innerHTML=`
      <div class="animate-pulse text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
        <p class="text-sm text-inverse-tertiary">Refreshing QR code...</p>
      </div>
    `)}async function ve(t){await M(t),O({type:"qr-code-refreshed",source:"desktop",modalType:"scan",data:{timestamp:Date.now(),source:"merchant"}})}function b(t){const e=document.querySelector(E.QR_CONTAINER);if(e){e.innerHTML=`
      <div class="text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div class="w-48 h-48 bg-red-50 border-2 border-red-200 rounded flex items-center justify-center mx-auto mb-2">
          <svg class="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <p class="text-sm text-red-600">${t}</p>
        <button id="retry-qr" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          Retry
        </button>
      </div>
    `;const o=e.querySelector("#retry-qr");o&&o.addEventListener("click",async()=>{e.innerHTML=`
          <div class="animate-pulse text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
            <p class="text-sm text-inverse-tertiary">Generating QR code...</p>
          </div>
        `,await T()})}}function re(){const t=[],e=async a=>{W(),await new Promise(c=>setTimeout(c,350));const{showProcessingModal:r}=await d(async()=>{const{showProcessingModal:c}=await import("./_XbgiawH.js");return{showProcessingModal:c}},__vite__mapDeps([11,1,2,4,5,6,10]),import.meta.url);await r()};window.addEventListener("concordium-event",a=>{a.detail?.type==="session-approved"&&e()});const o=()=>{window.removeEventListener("concordium-event",e)};t.push(o),window.scanEventListeners=t}async function ie(){try{const{ServiceFactory:t}=await d(async()=>{const{ServiceFactory:a}=await import("./BEP63aU0.js").then(r=>r.i);return{ServiceFactory:a}},__vite__mapDeps([3,4,1,2,5,6]),import.meta.url),e=t.createWalletConnectService();await e.initialize();const o=e.getActiveSessions();return o.length>0?o[0]:null}catch(t){return console.error("Failed to check for active sessions:",t),null}}function se(t,e){const o=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_NETWORK)||"testnet",a=navigator.userAgent;let r=null;return t===S.CONCORDIUM_WALLET?/iPad|iPhone|iPod/.test(a)&&!window.MSStream?r=`cryptox${o}://wc?uri=${encodeURIComponent(e)}&redirect=googlechrome://`:/android/i.test(a)&&(r=`cryptox-wc-${o}://wc?uri=${encodeURIComponent(e)}&go_back=true`):t===S.CONCORDIUM_ID&&(r=`concordiumidapp://wc?uri=${encodeURIComponent(e)}`),r}async function ce(t,e){try{const{default:o}=await d(async()=>{const{default:y}=await import("./FVMfpm40.js").then(h=>h.b);return{default:y}},__vite__mapDeps([12,5]),import.meta.url),{getConfig:a}=await d(async()=>{const{getConfig:y}=await import("./w6yw6ddM.js").then(h=>h.n);return{getConfig:y}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),{buildQrRedirectUrl:r,getIdAppStoreUrl:c}=await d(async()=>{const{buildQrRedirectUrl:y,getIdAppStoreUrl:h}=await import("./w6yw6ddM.js").then(A=>A.o);return{buildQrRedirectUrl:y,getIdAppStoreUrl:h}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),i=a(),n=r(t),s=await o.toDataURL(n,{width:200,margin:2,color:{dark:"#000000",light:"#ffffff"}}),u=i.qrCode?.showCountdown!==!1,f=i.qrCode?.expiryDuration||300*1e3,C=Math.floor(f/6e4),_=Math.floor(f%6e4/1e3),R=`${C}:${_.toString().padStart(2,"0")}`,x=u?`<p id="qr-countdown" class="desktop--qr-countdown">Expires in: <span class="font-semibold">${R}</span></p>`:"",D=c();e.innerHTML=`
      <div class="text-center py-4">
        <img src="${s}" alt="QR Code for wallet connection" class="w-48 h-48 mx-auto mb-2" style="border-radius: 12.414px; border: 1px solid rgba(0, 0, 0, 0.10); background: #FFF;" />
        <p class="desktop--scan-text">Scan the QR code with your<br>Concordium ID compatible device</p>
                ${x}
        <img src="${Q}" alt="" class="mx-auto mt-4" />
        <div class="flex items-center justify-center mt-4">
                    <p class="desktop--download-text">Download & Install the <a href="${D}" target="_blank" rel="noopener noreferrer">Concordium ID App</a> and come back here to verify.</p>
        </div>
      </div>
    `,e.classList.remove(w.HIDDEN),e.style.display="flex",await G()}catch(o){console.error("[Mobile] Failed to generate QR code:",o)}}export{oe as autoSendPresentationRequestIfConfigured,ee as createScanModal,ne as handleSessionApproval,W as hideScanModal,fe as showScanModal,ve as updateQRCodeFromMerchant};
