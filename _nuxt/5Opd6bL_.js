const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./N-ZagY80.js","./jCdCUdyA.js","./entry.C8kur5Mj.css","./DvAMZ9nQ.js","./BjPGGWaR.js","./CE1G-McA.js","./useChallengePresentation.CHQLFlL2.css","./DcQm8KL9.js","./Dcj8Qmh9.js","./B6u5UIzQ.js","./1-Zg5deT.js","./DJVxXlMH.js","./FVMfpm40.js"])))=>i.map(i=>d[i]);
import{x as l}from"./jCdCUdyA.js";import{a as N}from"./9WNwlQjE.js";import{a as K}from"./DvAMZ9nQ.js";import{M as m,h as A,i as O,S as P,c as F}from"./BjPGGWaR.js";import{s as U}from"./DcQm8KL9.js";import"./CE1G-McA.js";const z=globalThis.setInterval;let d=null,_=null,p=null,f=null,b;const L={CONCORDIUM_WALLET:"concordium-wallet",BROWSER_WALLET:"browser-wallet",CONCORDIUM_ID:"concordium-id"};b=L.CONCORDIUM_ID;const w={HIDDEN:"hidden",FLEX:"flex",FLEX_COL:"flex-col"},g={APP:"#app",SCAN_MODAL:"#scan-modal",BACK_BTN:"#back-btn",QR_CONTAINER:"#qr-container"},k=[400,900,1600];function Q(t){return new Promise(e=>setTimeout(e,t))}async function J(t,e,n=6e3,o=200){const r=Date.now()+n;for(;Date.now()<r;){if((t?.getActiveSessions()||[]).some(s=>s.topic===e))return;await Q(o)}throw new Error(`Session topic ${e} was not active before timeout`)}async function X({wcService:t,topic:e,chainId:n,presentationRequest:o,metadata:r}){const c=k.length+1;let s;for(let a=1;a<=c;a++)try{await J(t,e);try{return{response:await t.request({topic:e,chainId:n,request:{method:"request_verifiable_presentation_v1",params:{...o,metadata:r}}}),methodUsed:"v1"}}catch{return{response:await t.request({topic:e,chainId:n,request:{method:"request_verifiable_presentation",params:{...o,metadata:r}}}),methodUsed:"v0"}}}catch(i){if(s=i,a===c)break;const u=k[a-1];await Q(u)}throw s instanceof Error?s:new Error("Failed to auto-send presentation request")}function Y(){return`
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
  `}const ee=()=>{const t=O(),e=t?Z():Y(),n=document.createElement("div");n.innerHTML=e,n.id="scan-modal";const o={backBtn:n.querySelector(g.BACK_BTN),openInWalletBtn:n.querySelector("#open-in-wallet-btn"),openOtherDeviceBtn:n.querySelector("#open-other-device-btn"),qrContainer:n.querySelector(g.QR_CONTAINER)},r=async()=>{const{showLandingModal:a}=await l(async()=>{const{showLandingModal:i}=await import("./N-ZagY80.js");return{showLandingModal:i}},__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url);W(),await a()},c=async()=>{try{if(!f){const u=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.WALLET_CONNECT_URI);if(u)f=u;else if(await T(),!f){alert("Connection URI not available. Please refresh and try again.");return}}const a=b===L.CONCORDIUM_ID?"concordium-id":"concordium-wallet",i=se(b,f);if(console.info("[verification-web-ui] scan Open in wallet deep link",{wallet:b,walletConnectUri:f,deepLink:i}),i)window.location.href=i;else{const{openAppStore:u}=await l(async()=>{const{openAppStore:v}=await import("./Dcj8Qmh9.js");return{openAppStore:v}},[],import.meta.url);u(a)}}catch{alert("Failed to open wallet app. Please try again.")}},s=async()=>{const a=n.querySelector("#btn-wrapper");a&&a.classList.add(w.HIDDEN),f&&o.qrContainer&&await ce(f,o.qrContainer)};return o.backBtn?.addEventListener("click",r),t&&(o.openInWalletBtn?.addEventListener("click",c),o.openOtherDeviceBtn?.addEventListener("click",s)),n},fe=async()=>{const{getGlobalContainer:t}=await l(async()=>{const{getGlobalContainer:n}=await import("./BjPGGWaR.js").then(o=>o.o);return{getGlobalContainer:n}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),e=t();e&&(d=ee(),d.id="scan-modal",d.classList.add("modal-wrapper"),e.appendChild(d),d.offsetHeight,setTimeout(()=>{d&&d.classList.add("is-visible")},10),ie(),await T())},W=()=>{d&&(d.dropdownInstance?.destroy&&d.dropdownInstance.destroy(),d.classList.add("modal-exiting"),setTimeout(()=>{const t=d?.parentNode;t&&d&&t.removeChild(d),d=null,!document.querySelector(".desktop--modal-overlay")&&!document.querySelector(".mobile--modal-overlay")&&(document.body.style.overflowX="")},300)),_&&(clearTimeout(_),_=null),p&&(clearInterval(p),p=null),window.scanEventCleanup&&(window.scanEventCleanup(),window.scanEventCleanup=null),window.scanEventListeners&&(window.scanEventListeners.forEach(t=>t()),window.scanEventListeners=null)};async function T(){try{const t=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.CONNECTION_MODE);if(t==="sdk-managed"){const e=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_PROJECT_ID),n=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_NETWORK),o=localStorage.getItem("sdkWalletConnectMetadata"),r=o?JSON.parse(o):null;if(e&&n&&(window.__CONCORDIUM_WC_CONFIG__={projectId:e,network:n,metadata:r},await re())){document.querySelectorAll(".desktop--modal-overlay, .mobile--modal-overlay").forEach(i=>{i.parentNode&&i.parentNode.removeChild(i)}),d=null,await new Promise(i=>setTimeout(i,100));const{showReturningUserModal:a}=await l(async()=>{const{showReturningUserModal:i}=await import("./B6u5UIzQ.js");return{showReturningUserModal:i}},__vite__mapDeps([9,1,2,3,4,5,6,10]),import.meta.url);await a();return}}t==="sdk-managed"?await $():await te()}catch{C("Failed to generate QR code. Please try again.")}}async function $(){const t=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_PROJECT_ID),e=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_NETWORK);if(!t||!e)throw new Error("SDK project ID or network not found. Please call initWalletConnect() first.");const n=P.createWalletConnectService();await n.initialize(),await n.clearAllSessionsForNewPairing();const{WalletConnectConstants:o}=await l(async()=>{const{WalletConnectConstants:a}=await import("./BjPGGWaR.js").then(i=>i.w);return{WalletConnectConstants:a}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),r=o.CHAIN_IDS[e],{uri:c,approval:s}=await n.connect({ccd:{methods:[...o.ALL_METHODS],chains:r,events:[...o.EVENTS]}});if(!c)throw new Error("Failed to generate WalletConnect URI from SDK");if(f=c,s().then(async a=>{await oe(a)}).catch(()=>{}),O()){const a=document.querySelector("#mobile-loading"),i=document.querySelector("#mobile-content");a&&i&&(a.classList.add(w.HIDDEN),i.classList.remove(w.HIDDEN))}else await M(c)}async function te(){const t=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.WALLET_CONNECT_URI);if(!t){C("WalletConnect not configured. Please set up WalletConnect first by calling setWalletConnectUri() or initWalletConnect().");return}if(f=t,O()){const e=document.querySelector("#mobile-loading"),n=document.querySelector("#mobile-content");e&&n&&(e.classList.add(w.HIDDEN),n.classList.remove(w.HIDDEN))}else await M(t)}async function ne(t){try{const e=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_PRESENTATION_REQUEST);if(!e)return;const n=JSON.parse(e),o=P.getWalletConnectService();if(!o)return;const c=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_NETWORK)==="mainnet"?"ccd:9dd9ca4d19e9393877d2c44b70f89acb":"ccd:4221332d34e1694168c2a0c0b3fd0f27",s=localStorage.getItem("sdkWalletConnectMetadata"),a=s?JSON.parse(s):{},i={description:a?.description||"Requesting verification",appName:a?.name||"Concordium Verification WebUI",url:a?.url||window.location.origin,icons:a?.icons||[]},{response:u}=await X({wcService:o,topic:t,chainId:c,presentationRequest:n,metadata:i});window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"presentation_received",data:u},bubbles:!0,composed:!0}));const{showSuccessState:v}=await l(async()=>{const{showSuccessState:E}=await import("./DJVxXlMH.js");return{showSuccessState:E}},__vite__mapDeps([11,1,2,4,5,6,10]),import.meta.url);await v()}catch(e){window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"error",data:{message:"Failed to send verification request",error:e}},bubbles:!0,composed:!0}));const{showErrorState:n}=await l(async()=>{const{showErrorState:o}=await import("./DJVxXlMH.js");return{showErrorState:o}},__vite__mapDeps([11,1,2,4,5,6,10]),import.meta.url);await n()}}async function oe(t){try{const{topic:e,namespaces:n}=t,o=n?.ccd?.accounts||[],r=t.peer?.metadata?.name||"Wallet";localStorage.setItem(m.LOCAL_STORAGE_FLAGS.CONNECTED_WALLET_NAME,r);const c={topic:e,accounts:o,namespaces:n,walletName:r};window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"session_approved",data:c},bubbles:!0,composed:!0}));const{showProcessingModal:s}=await l(async()=>{const{showProcessingModal:a}=await import("./DJVxXlMH.js");return{showProcessingModal:a}},__vite__mapDeps([11,1,2,4,5,6,10]),import.meta.url);await s(),await ne(e)}catch(e){window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"error",data:{message:"Failed to handle session approval",error:e}},bubbles:!0,composed:!0})),C("Failed to process wallet connection. Please try again.")}}async function M(t){try{const{default:e}=await l(async()=>{const{default:s}=await import("./FVMfpm40.js").then(a=>a.b);return{default:s}},__vite__mapDeps([12,5]),import.meta.url),{getConfig:n}=await l(async()=>{const{getConfig:s}=await import("./BjPGGWaR.js").then(a=>a.l);return{getConfig:s}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),{buildQrRedirectUrl:o}=await l(async()=>{const{buildQrRedirectUrl:s}=await import("./BjPGGWaR.js").then(a=>a.n);return{buildQrRedirectUrl:s}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),r=n(),c=document.querySelector(g.QR_CONTAINER);if(c){const s=o(t),a=await e.toDataURL(s,{width:200,margin:2,color:{dark:"#000000",light:"#ffffff"}}),i=window.location.hostname,v=i==="localhost"||i==="127.0.0.1"||i==="::1"?'<p class="text-xs text-center mt-2" style="color: #B45309; max-width: 280px; margin-left: auto; margin-right: auto;">This page is running on localhost. Phone camera scans cannot open localhost on another device. Use a LAN/public URL.</p>':"",E=r.qrCode?.showCountdown!==!1,S=r.qrCode?.expiryDuration||300*1e3,R=Math.floor(S/6e4),x=Math.floor(S%6e4/1e3),D=`${R}:${x.toString().padStart(2,"0")}`,y=E?`<p id="qr-countdown" class="desktop--qr-countdown">Expires in: <span class="font-semibold">${D}</span></p>`:"",{getIdAppStoreUrl:h}=await l(async()=>{const{getIdAppStoreUrl:B}=await import("./BjPGGWaR.js").then(j=>j.n);return{getIdAppStoreUrl:B}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),I=h();c.innerHTML=`
        <div class="text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center;">
          <img src="${a}" alt="QR Code for wallet connection" class="w-48 h-48 mx-auto mb-2" style="border-radius: 12.414px; border: 1px solid rgba(0, 0, 0, 0.10); background: #FFF;" />
          <p class="desktop--scan-text mt-2">Scan the QR code with your<br>Concordium ID compatible device</p>
          ${v}
          ${y}
          <img src="${U}" alt="" class="mx-auto mt-4" />
          <div class="flex items-center justify-center mt-4">
            <p class="desktop--download-text">Download & Install the <a href="${I}" target="_blank" rel="noopener noreferrer">Concordium ID App</a> and come back here to verify.</p>
          </div>
        </div>
      `,G()}}catch{C("Failed to generate QR code. Please try again.")}}async function G(){_&&(clearTimeout(_),_=null),p&&(clearInterval(p),p=null);const{getConfig:t}=await l(async()=>{const{getConfig:s}=await import("./BjPGGWaR.js").then(a=>a.l);return{getConfig:s}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),e=t(),n=e.qrCode?.expiryDuration||300*1e3,o=e.qrCode?.showCountdown!==!1,r=e.qrCode?.autoRefresh!==!1,c=Date.now()+n;if(o){const s=document.querySelector("#qr-countdown span");s&&(p=z(()=>{const a=Math.max(0,c-Date.now()),i=Math.floor(a/6e4),u=Math.floor(a%6e4/1e3);s.textContent=`${i}:${u.toString().padStart(2,"0")}`,a<=0&&p&&(clearInterval(p),p=null)},1e3))}_=setTimeout(async()=>{await ae(r)},n)}async function ae(t){const e=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.CONNECTION_MODE),n=e!=="sdk-managed";A({type:"qr-code-expired",source:"desktop",modalType:"scan",data:{connectionMode:e,isMerchantProvided:n,autoRefresh:n?!1:t}}),n?q(!1):t?(V(),await H()):q(!0)}async function H(){try{await $(),A({type:"qr-code-refreshed",source:"desktop",modalType:"scan",data:{timestamp:Date.now()}})}catch{C("Failed to refresh QR code. Please try again.")}}function q(t){const e=document.querySelector(g.QR_CONTAINER);if(e){const n=t?`<button id="refresh-qr" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
           Refresh QR Code
         </button>`:'<p class="text-sm text-inverse-tertiary mt-2">Waiting for new QR code from merchant...</p>';if(e.innerHTML=`
      <div class="text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div class="w-48 h-48 bg-yellow-50 border-2 border-yellow-200 rounded flex items-center justify-center mx-auto mb-2">
          <svg class="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-sm text-yellow-600 font-semibold">QR Code Expired</p>
        ${n}
      </div>
    `,t){const o=e.querySelector("#refresh-qr");o&&o.addEventListener("click",async()=>{V(),await H()})}}}function V(){const t=document.querySelector(g.QR_CONTAINER);t&&(t.innerHTML=`
      <div class="animate-pulse text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
        <p class="text-sm text-inverse-tertiary">Refreshing QR code...</p>
      </div>
    `)}async function ve(t){await M(t),A({type:"qr-code-refreshed",source:"desktop",modalType:"scan",data:{timestamp:Date.now(),source:"merchant"}})}function C(t){const e=document.querySelector(g.QR_CONTAINER);if(e){e.innerHTML=`
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
    `;const n=e.querySelector("#retry-qr");n&&n.addEventListener("click",async()=>{e.innerHTML=`
          <div class="animate-pulse text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
            <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
            <p class="text-sm text-inverse-tertiary">Generating QR code...</p>
          </div>
        `,await T()})}}function ie(){const t=[],e=async o=>{W(),await new Promise(c=>setTimeout(c,350));const{showProcessingModal:r}=await l(async()=>{const{showProcessingModal:c}=await import("./DJVxXlMH.js");return{showProcessingModal:c}},__vite__mapDeps([11,1,2,4,5,6,10]),import.meta.url);await r()};window.addEventListener("concordium-event",o=>{o.detail?.type==="session-approved"&&e()});const n=()=>{window.removeEventListener("concordium-event",e)};t.push(n),window.scanEventListeners=t}async function re(){try{const{ServiceFactory:t}=await l(async()=>{const{ServiceFactory:o}=await import("./DvAMZ9nQ.js").then(r=>r.i);return{ServiceFactory:o}},__vite__mapDeps([3,4,1,2,5,6]),import.meta.url),e=t.createWalletConnectService();await e.initialize();const n=e.getActiveSessions();return n.length>0?n[0]:null}catch{return null}}function se(t,e){const n=localStorage.getItem(m.LOCAL_STORAGE_FLAGS.SDK_NETWORK)||"testnet",o=navigator.userAgent;let r=null;return t===L.CONCORDIUM_WALLET?/iPad|iPhone|iPod/.test(o)&&!window.MSStream?r=`cryptox${n}://wc?uri=${encodeURIComponent(e)}&redirect=googlechrome://`:/android/i.test(o)&&(r=`cryptox-wc-${n}://wc?uri=${encodeURIComponent(e)}&go_back=true`):t===L.CONCORDIUM_ID&&(r=`concordiumidapp://wc?uri=${encodeURIComponent(e)}`),r}async function ce(t,e){try{const{default:n}=await l(async()=>{const{default:y}=await import("./FVMfpm40.js").then(h=>h.b);return{default:y}},__vite__mapDeps([12,5]),import.meta.url),{getConfig:o}=await l(async()=>{const{getConfig:y}=await import("./BjPGGWaR.js").then(h=>h.l);return{getConfig:y}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),{buildQrRedirectUrl:r,getIdAppStoreUrl:c}=await l(async()=>{const{buildQrRedirectUrl:y,getIdAppStoreUrl:h}=await import("./BjPGGWaR.js").then(I=>I.n);return{buildQrRedirectUrl:y,getIdAppStoreUrl:h}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),s=o(),a=r(t),i=await n.toDataURL(a,{width:200,margin:2,color:{dark:"#000000",light:"#ffffff"}}),u=s.qrCode?.showCountdown!==!1,v=s.qrCode?.expiryDuration||300*1e3,E=Math.floor(v/6e4),S=Math.floor(v%6e4/1e3),R=`${E}:${S.toString().padStart(2,"0")}`,x=u?`<p id="qr-countdown" class="desktop--qr-countdown">Expires in: <span class="font-semibold">${R}</span></p>`:"",D=c();e.innerHTML=`
      <div class="text-center py-4">
        <img src="${i}" alt="QR Code for wallet connection" class="w-48 h-48 mx-auto mb-2" style="border-radius: 12.414px; border: 1px solid rgba(0, 0, 0, 0.10); background: #FFF;" />
        <p class="desktop--scan-text">Scan the QR code with your<br>Concordium ID compatible device</p>
                ${x}
        <img src="${U}" alt="" class="mx-auto mt-4" />
        <div class="flex items-center justify-center mt-4">
                    <p class="desktop--download-text">Download & Install the <a href="${D}" target="_blank" rel="noopener noreferrer">Concordium ID App</a> and come back here to verify.</p>
        </div>
      </div>
    `,e.classList.remove(w.HIDDEN),e.style.display="flex",await G()}catch{}}export{ne as autoSendPresentationRequestIfConfigured,ee as createScanModal,oe as handleSessionApproval,W as hideScanModal,fe as showScanModal,ve as updateQRCodeFromMerchant};
