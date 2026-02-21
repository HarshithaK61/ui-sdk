const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CaZJUk3F.js","./CIKIahH0.js","./entry.Bv58BlFP.css","./DQ1KZ1g8.js","./f7xkK54W.js","./Byf87tck.js","./8NJXV5Ny.js","./index.CDgRTSUm.css","./DcQm8KL9.js","./F59h6q9d.js","./1-Zg5deT.js","./UmyAeyn-.js","./BsvZvVML.js"])))=>i.map(i=>d[i]);
import{D as u}from"./CIKIahH0.js";import{a as I}from"./DQ1KZ1g8.js";import{i as g,d as E,M as p,c as D,S as q}from"./f7xkK54W.js";import{s as x}from"./DcQm8KL9.js";import"./Byf87tck.js";import"./8NJXV5Ny.js";const O="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M7.13807%2014.4715C6.87772%2014.7318%206.45561%2014.7318%206.19526%2014.4715L0.195262%208.47148C-0.0650877%208.21114%20-0.0650877%207.78903%200.195262%207.52868L6.19526%201.52868C6.45561%201.26833%206.87772%201.26833%207.13807%201.52868C7.39842%201.78903%207.39842%202.21114%207.13807%202.47149L2.27614%207.33341L15.3333%207.33341C15.7015%207.33342%2016%207.63189%2016%208.00008C16%208.36827%2015.7015%208.66675%2015.3333%208.66675L2.27614%208.66675L7.13807%2013.5287C7.39842%2013.789%207.39842%2014.2111%207.13807%2014.4715Z'%20fill='%231B2735'%20fill-opacity='0.7'/%3e%3c/svg%3e";let l=null,v=null,m=null,w=null,_;const b={CONCORDIUM_WALLET:"concordium-wallet",BROWSER_WALLET:"browser-wallet",CONCORDIUM_ID:"concordium-id"};_=b.CONCORDIUM_ID;const d={HIDDEN:"hidden",FLEX:"flex",FLEX_COL:"flex-col"},f={APP:"#app",SCAN_MODAL:"#scan-modal",BACK_BTN:"#back-btn",QR_CONTAINER:"#qr-container",BROWSER_BTN:"#browser-btn",BROWSER_WALLET_BTN:"#browser-wallet-btn"};function F(){return`
    <div class="desktop--modal-overlay">
      <div class="desktop--modal-container">
        <div class="desktop--modal-body">
          <div class="flex items-center justify-between p-2">
            <button class="desktop--navigation-button" id="back-btn">
              <img src="${O}" alt="arrow-left-icon" />
              <span>Back</span>
            </button>
            <div>
              <img src="${D}" alt="concordium-modal-logo" />
            </div>
          </div>

          <div id="qr-container" class="${d.FLEX} items-center justify-center min-h-[200px]">
            <div class="animate-pulse text-center">
              <div class="w-48 h-48 bg-gray-200 rounded mb-2"></div>
              <p class="text-sm" style="color: #0D0F11;">Generating QR code...</p>
            </div>
          </div>

          <div id="browser-btn" class="${d.HIDDEN} ${d.FLEX_COL} items-center gap-4">
            <button class="desktop--primary-button" id="browser-wallet-btn">
              <span>Verify with Browser Wallet</span>
              <img src="${I}" alt="arrow-right-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  `}function W(){return`
    <div class="mobile--modal-overlay position-relative">
      <div class="mobile--modal-container">
        <div class="mobile--modal-body">
          <div class="flex items-center justify-between p-2">
            <button class="mobile--navigation-button" id="back-btn">
              <img src="${O}" alt="arrow-left-icon" />
              <span>Back</span>
            </button>
            <div>
              <img src="${D}" alt="concordium-modal-logo" />
            </div>
          </div>

          <div id="mobile-loading" class="${d.FLEX} items-center justify-center min-h-[300px]">
            <div class="animate-pulse text-center">
              <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
              <p class="text-sm" style="color: #0D0F11;">Preparing wallet connection...</p>
            </div>
          </div>

          <div id="mobile-content" class="${d.HIDDEN}">
            <div id="btn-wrapper" class="flex flex-col w-full items-center gap-2 mt-4">
            <button class="mobile--primary-button w-full" id="open-in-wallet-btn">
              <span id="wallet-btn-text">Verify with ConcordiumID</span>
              <img src="${I}" alt="arrow-right-icon" />
            </button>
            <button class="mobile--primary-outline-button w-full" id="open-other-device-btn">
              <span>Verify on Another Device</span>
            </button>
          </div>

          <div id="qr-container" class="${d.HIDDEN}" style="display: none;">
            <!-- QR code will be generated here when user clicks "Verify on Another Device" -->
          </div>
          </div>
        </div>
      </div>
    </div>
  `}const P=()=>{const e=g(),t=e?W():F(),o=document.createElement("div");o.innerHTML=t,o.id="scan-modal";const n={backBtn:o.querySelector(f.BACK_BTN),browserWalletBtn:o.querySelector(f.BROWSER_WALLET_BTN),openInWalletBtn:o.querySelector("#open-in-wallet-btn"),openOtherDeviceBtn:o.querySelector("#open-other-device-btn"),qrContainer:o.querySelector(f.QR_CONTAINER)},a=async()=>{const{showLandingModal:i}=await u(async()=>{const{showLandingModal:y}=await import("./CaZJUk3F.js");return{showLandingModal:y}},__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url);T(),await i()},r=async()=>{},c=async()=>{try{if(!w){const C=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.WALLET_CONNECT_URI);if(C)w=C;else if(await L(),!w){alert("Connection URI not available. Please refresh and try again.");return}}const i=_===b.CONCORDIUM_ID?"concordium-id":"concordium-wallet",y=V(_,w);if(y)window.location.href=y;else{const{openAppStore:C}=await u(async()=>{const{openAppStore:N}=await import("./C3Y8oyMG.js");return{openAppStore:N}},[],import.meta.url);C(i)}}catch(i){console.error("[Mobile] handleOpenInWallet failed:",i),alert("Failed to open wallet app. Please try again.")}},s=async()=>{const i=o.querySelector("#btn-wrapper");i&&i.classList.add(d.HIDDEN),w&&n.qrContainer&&await j(w,n.qrContainer)};return n.backBtn?.addEventListener("click",a),n.browserWalletBtn?.addEventListener("click",r),e&&(n.openInWalletBtn?.addEventListener("click",c),n.openOtherDeviceBtn?.addEventListener("click",s)),o},ee=async()=>{const{getGlobalContainer:e}=await u(async()=>{const{getGlobalContainer:r}=await import("./f7xkK54W.js").then(c=>c.e);return{getGlobalContainer:r}},__vite__mapDeps([4,1,2,5,6,7]),import.meta.url),t=e();if(!t){console.error("Container not found for modal");return}const n=g()?".mobile--modal-container":".desktop--modal-container";l=P(),l.id="scan-modal";const a=l.querySelector(n);l.style.opacity="0",a&&(a.style.transform="translateY(-20px) scale(0.95)",a.style.transition="transform 0.3s ease-out"),t.appendChild(l),l.offsetHeight,l.style.transition="opacity 0.3s ease-out",setTimeout(()=>{l&&(l.style.opacity="1",a&&(a.style.transform="translateY(0) scale(1)"))},10),H(),await L()},T=()=>{l&&(l.dropdownInstance?.destroy&&l.dropdownInstance.destroy(),l.classList.add("modal-exiting"),setTimeout(()=>{const e=l?.parentNode;e&&l&&e.removeChild(l),l=null,!document.querySelector(".desktop--modal-overlay")&&!document.querySelector(".mobile--modal-overlay")&&(document.body.style.overflowX="")},300)),v&&(clearTimeout(v),v=null),m&&(clearInterval(m),m=null),window.scanEventCleanup&&(window.scanEventCleanup(),window.scanEventCleanup=null),window.scanEventListeners&&(window.scanEventListeners.forEach(e=>e()),window.scanEventListeners=null)};async function L(){try{const e=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.CONNECTION_MODE);if(e==="sdk-managed"){const t=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_PROJECT_ID),o=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_NETWORK),n=localStorage.getItem("sdkWalletConnectMetadata"),a=n?JSON.parse(n):null;if(t&&o&&(window.__CONCORDIUM_WC_CONFIG__={projectId:t,network:o,metadata:a},await G())){document.querySelectorAll(".desktop--modal-overlay, .mobile--modal-overlay").forEach(i=>{i.parentNode&&i.parentNode.removeChild(i)}),l=null,await new Promise(i=>setTimeout(i,100));const{showReturningUserModal:s}=await u(async()=>{const{showReturningUserModal:i}=await import("./F59h6q9d.js");return{showReturningUserModal:i}},__vite__mapDeps([9,1,2,3,4,5,6,7,10]),import.meta.url);await s();return}}e==="sdk-managed"?await A():await Q()}catch(e){console.error("Wallet connection failed:",e),h("Failed to generate QR code. Please try again.")}}async function A(){const e=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_PROJECT_ID),t=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_NETWORK);if(!e||!t)throw new Error("SDK project ID or network not found. Please call initWalletConnect() first.");const o=q.createWalletConnectService();await o.initialize();const{WalletConnectConstants:n}=await u(async()=>{const{WalletConnectConstants:s}=await import("./f7xkK54W.js").then(i=>i.w);return{WalletConnectConstants:s}},__vite__mapDeps([4,1,2,5,6,7]),import.meta.url),a=n.CHAIN_IDS[t],{uri:r,approval:c}=await o.connect({ccd:{methods:[n.METHODS.REQUEST_VERIFIABLE_PRESENTATION_V1],chains:a,events:[...n.EVENTS]}});if(!r)throw new Error("Failed to generate WalletConnect URI from SDK");if(w=r,c().then(async s=>{await B(s)}).catch(s=>{console.error("Session approval failed:",s)}),g()){const s=document.querySelector("#mobile-loading"),i=document.querySelector("#mobile-content");s&&i&&(s.classList.add(d.HIDDEN),i.classList.remove(d.HIDDEN))}else await S(r)}async function Q(){const e=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.WALLET_CONNECT_URI);if(!e){h("WalletConnect not configured. Please set up WalletConnect first by calling setWalletConnectUri() or initWalletConnect().");return}if(w=e,g()){const t=document.querySelector("#mobile-loading"),o=document.querySelector("#mobile-content");t&&o&&(t.classList.add(d.HIDDEN),o.classList.remove(d.HIDDEN))}else await S(e)}async function B(e){try{const{topic:t,namespaces:o}=e,n=o?.ccd?.accounts||[],a={topic:t,accounts:n,namespaces:o};window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"session_approved",data:a},bubbles:!0,composed:!0}));const{showProcessingModal:r}=await u(async()=>{const{showProcessingModal:c}=await import("./UmyAeyn-.js");return{showProcessingModal:c}},__vite__mapDeps([11,1,2,4,5,6,7,10]),import.meta.url);await r()}catch(t){console.error("Error handling session approval:",t),window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"error",data:{message:"Failed to handle session approval",error:t}},bubbles:!0,composed:!0})),h("Failed to process wallet connection. Please try again.")}}async function S(e){try{const{default:t}=await u(async()=>{const{default:r}=await import("./BsvZvVML.js").then(c=>c.b);return{default:r}},__vite__mapDeps([12,6]),import.meta.url),{getConfig:o}=await u(async()=>{const{getConfig:r}=await import("./f7xkK54W.js").then(c=>c.b);return{getConfig:r}},__vite__mapDeps([4,1,2,5,6,7]),import.meta.url),n=o(),a=document.querySelector(f.QR_CONTAINER);if(a){const r=await t.toDataURL(e,{width:200,margin:2,color:{dark:"#000000",light:"#ffffff"}}),s=n.qrCode?.showCountdown!==!1?'<p id="qr-countdown" class="text-sm text-inverse-tertiary mt-2">Expires in: <span class="font-semibold">5:00</span></p>':"";a.innerHTML=`
        <div class="text-center">
          <img src="${r}" alt="QR Code for wallet connection" class="w-48 h-48 mx-auto mb-2" style="border-radius: 12.414px; border: 1px solid rgba(0, 0, 0, 0.10); background: #FFF;" />
          <p class="desktop--scan-text mt-2">Scan the QR code with your<br>Concordium ID compatible device</p>
          ${s}
          <img src="${x}" alt="" class="mx-auto mt-4" />
          <div class="flex items-center justify-center mt-4">
            <p class="desktop--download-text">Download & Install the <a href="#">Concordium ID App</a> and come back here to verify.</p>
          </div>
        </div>
      `,U()}}catch(t){console.error("Failed to generate QR code:",t),h("Failed to generate QR code. Please try again.")}}async function U(){v&&(clearTimeout(v),v=null),m&&(clearInterval(m),m=null);const{getConfig:e}=await u(async()=>{const{getConfig:c}=await import("./f7xkK54W.js").then(s=>s.b);return{getConfig:c}},__vite__mapDeps([4,1,2,5,6,7]),import.meta.url),t=e(),o=t.qrCode?.expiryDuration||300*1e3,n=t.qrCode?.showCountdown!==!1,a=t.qrCode?.autoRefresh!==!1,r=Date.now()+o;if(n){const c=document.querySelector("#qr-countdown span");c&&(m=setInterval(()=>{const s=Math.max(0,r-Date.now()),i=Math.floor(s/6e4),y=Math.floor(s%6e4/1e3);c.textContent=`${i}:${y.toString().padStart(2,"0")}`,s<=0&&m&&(clearInterval(m),m=null)},1e3))}v=setTimeout(async()=>{await $(a)},o)}async function $(e){const t=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.CONNECTION_MODE),o=t!=="sdk-managed";E({type:"qr-code-expired",source:"desktop",modalType:"scan",data:{connectionMode:t,isMerchantProvided:o,autoRefresh:o?!1:e}}),o?R(!1):e?(k(),await M()):R(!0)}async function M(){try{await A(),E({type:"qr-code-refreshed",source:"desktop",modalType:"scan",data:{timestamp:Date.now()}})}catch(e){console.error("Failed to refresh QR code:",e),h("Failed to refresh QR code. Please try again.")}}function R(e){const t=document.querySelector(f.QR_CONTAINER);if(t){const o=e?`<button id="refresh-qr" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
           Refresh QR Code
         </button>`:'<p class="text-sm text-inverse-tertiary mt-2">Waiting for new QR code from merchant...</p>';if(t.innerHTML=`
      <div class="text-center">
        <div class="w-48 h-48 bg-yellow-50 border-2 border-yellow-200 rounded flex items-center justify-center mx-auto mb-2">
          <svg class="w-16 h-16 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p class="text-sm text-yellow-600 font-semibold">QR Code Expired</p>
        ${o}
      </div>
    `,e){const n=t.querySelector("#refresh-qr");n&&n.addEventListener("click",async()=>{k(),await M()})}}}function k(){const e=document.querySelector(f.QR_CONTAINER);e&&(e.innerHTML=`
      <div class="animate-pulse text-center">
        <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
        <p class="text-sm text-inverse-tertiary">Refreshing QR code...</p>
      </div>
    `)}async function te(e){await S(e),E({type:"qr-code-refreshed",source:"desktop",modalType:"scan",data:{timestamp:Date.now(),source:"merchant"}})}function h(e){const t=document.querySelector(f.QR_CONTAINER);if(t){t.innerHTML=`
      <div class="text-center">
        <div class="w-48 h-48 bg-red-50 border-2 border-red-200 rounded flex items-center justify-center mx-auto mb-2">
          <svg class="w-16 h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <p class="text-sm text-red-600">${e}</p>
        <button id="retry-qr" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
          Retry
        </button>
      </div>
    `;const o=t.querySelector("#retry-qr");o&&o.addEventListener("click",async()=>{t.innerHTML=`
          <div class="animate-pulse text-center">
            <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
            <p class="text-sm text-inverse-tertiary">Generating QR code...</p>
          </div>
        `,await L()})}}function H(){const e=[],t=async n=>{T(),await new Promise(r=>setTimeout(r,350));const{showProcessingModal:a}=await u(async()=>{const{showProcessingModal:r}=await import("./UmyAeyn-.js");return{showProcessingModal:r}},__vite__mapDeps([11,1,2,4,5,6,7,10]),import.meta.url);await a()};window.addEventListener("concordium-event",n=>{n.detail?.type==="session-approved"&&t()});const o=()=>{window.removeEventListener("concordium-event",t)};e.push(o),window.scanEventListeners=e}async function G(){try{const{ServiceFactory:e}=await u(async()=>{const{ServiceFactory:n}=await import("./f7xkK54W.js").then(a=>a.f);return{ServiceFactory:n}},__vite__mapDeps([4,1,2,5,6,7]),import.meta.url),t=e.createWalletConnectService();await t.initialize();const o=t.getActiveSessions();return o.length>0?o[0]:null}catch(e){return console.error("Failed to check for active sessions:",e),null}}function V(e,t){const o=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_NETWORK)||"testnet",n=navigator.userAgent;let a=null;if(e===b.CONCORDIUM_WALLET)/iPad|iPhone|iPod/.test(n)&&!window.MSStream?a=`cryptox${o}://wc?uri=${encodeURIComponent(t)}&redirect=googlechrome://`:/android/i.test(n)&&(a=`cryptox-wc-${o}://wc?uri=${encodeURIComponent(t)}&go_back=true`);else if(e===b.CONCORDIUM_ID){const r=encodeURIComponent(window.location.href);a=`concordiumidapp://wc?uri=${encodeURIComponent(t)}&redirect=${r}`}return a}async function j(e,t){try{const{default:o}=await u(async()=>{const{default:a}=await import("./BsvZvVML.js").then(r=>r.b);return{default:a}},__vite__mapDeps([12,6]),import.meta.url),n=await o.toDataURL(e,{width:200,margin:2,color:{dark:"#000000",light:"#ffffff"}});t.innerHTML=`
      <div class="text-center py-4">
        <img src="${n}" alt="QR Code for wallet connection" class="w-48 h-48 mx-auto mb-2" style="border-radius: 12.414px; border: 1px solid rgba(0, 0, 0, 0.10); background: #FFF;" />
        <p class="desktop--scan-text">Scan the QR code with your<br>Concordium ID compatible device</p>
        <img src="${x}" alt="" class="mx-auto mt-4" />
        <div class="flex items-center justify-center mt-4">
          <p class="desktop--download-text">Download & Install the <a href="#">Concordium ID App</a> and come back here to verify.</p>
        </div>
      </div>
    `,t.classList.remove(d.HIDDEN),t.style.display="flex"}catch(o){console.error("[Mobile] Failed to generate QR code:",o)}}export{P as createScanModal,B as handleSessionApproval,T as hideScanModal,ee as showScanModal,te as updateQRCodeFromMerchant};
