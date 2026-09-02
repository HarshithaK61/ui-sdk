const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./B5pi48n5.js","./1HnB0Zqs.js","./entry.C8kur5Mj.css","./DQ1KZ1g8.js","./ZGRwnBuQ.js","./CE1G-McA.js","./useChallengePresentation.Drs-I8St.css","./DcQm8KL9.js","./B3P_QiOj.js","./Oa3qmtNl.js","./DHjanPqv.js","./D8T4dCz3.js","./1-Zg5deT.js","./CSAlQF8V.js","./FVMfpm40.js"])))=>i.map(i=>d[i]);
import{x as l}from"./1HnB0Zqs.js";import{a as P}from"./9WNwlQjE.js";import{a as B}from"./DQ1KZ1g8.js";import{M as p,h as A,i as x,S as q,c as N}from"./ZGRwnBuQ.js";import{s as F}from"./DcQm8KL9.js";import"./CE1G-McA.js";const j=globalThis.setInterval;let m=null,E=null,f=null,w=null,L;const I={CONCORDIUM_WALLET:"concordium-wallet",BROWSER_WALLET:"browser-wallet",CONCORDIUM_ID:"concordium-id"};L=I.CONCORDIUM_ID;const v={HIDDEN:"hidden",FLEX:"flex",FLEX_COL:"flex-col"},C={APP:"#app",SCAN_MODAL:"#scan-modal",BACK_BTN:"#back-btn",QR_CONTAINER:"#qr-container"},M=[400,900,1600];function U(t){return new Promise(e=>setTimeout(e,t))}async function K(t,e,o=6e3,a=200){const r=Date.now()+o;for(;Date.now()<r;){if((t?.getActiveSessions()||[]).some(c=>c.topic===e))return;await U(a)}throw new Error(`Session topic ${e} was not active before timeout`)}async function z({wcService:t,topic:e,chainId:o,presentationRequest:a,metadata:r}){const s=M.length+1;let c;for(let n=1;n<=s;n++)try{await K(t,e);try{return{response:await t.request({topic:e,chainId:o,request:{method:"request_verifiable_presentation_v1",params:{...a,metadata:r}}}),methodUsed:"v1"}}catch{return{response:await t.request({topic:e,chainId:o,request:{method:"request_verifiable_presentation",params:{...a,metadata:r}}}),methodUsed:"v0"}}}catch(i){if(c=i,n===s)break;const d=M[n-1];await U(d)}throw c instanceof Error?c:new Error("Failed to auto-send presentation request")}function J(){return`
    <div class="desktop--modal-overlay">
      <div class="desktop--modal-container">
        <div class="desktop--modal-body">
          <div class="flex items-center justify-between p-2">
            <button class="desktop--navigation-button" id="back-btn">
              <img src="${P}" alt="arrow-left-icon" />
              <span>Back</span>
            </button>
            <div>
              <img src="${N}" alt="concordium-modal-logo" />
            </div>
          </div>

          <div id="qr-container" class="${v.FLEX} items-center justify-center" style="min-height: 380px;">
            <div class="animate-pulse text-center" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
              <div class="w-48 h-48 bg-gray-200 rounded mb-2"></div>
              <p class="text-sm" style="color: #0D0F11;">Generating QR code...</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `}function X(){return`
    <div class="mobile--modal-overlay position-relative">
      <div class="mobile--modal-container">
        <div class="mobile--modal-body">
          <div class="flex items-center justify-between p-2">
            <button class="mobile--navigation-button" id="back-btn">
              <img src="${P}" alt="arrow-left-icon" />
              <span>Back</span>
            </button>
            <div>
              <img src="${N}" alt="concordium-modal-logo" />
            </div>
          </div>

          <div id="mobile-loading" class="${v.FLEX} items-center justify-center min-h-[300px]">
            <div class="animate-pulse text-center">
              <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
              <p class="text-sm" style="color: #0D0F11;">Preparing wallet connection...</p>
            </div>
          </div>

          <div id="mobile-content" class="${v.HIDDEN}">
            <div id="btn-wrapper" class="flex flex-col w-full items-center gap-2 mt-4">
            <button class="mobile--primary-button w-full" id="open-in-wallet-btn">
              <span id="wallet-btn-text">Verify with ConcordiumID</span>
              <img src="${B}" alt="arrow-right-icon" />
            </button>
            <button class="mobile--primary-outline-button w-full" id="open-other-device-btn">
              <span>Verify on Another Device</span>
            </button>
          </div>

          <div id="qr-container" class="${v.HIDDEN}" style="display: none;">
            <!-- QR code will be generated here when user clicks "Verify on Another Device" -->
          </div>
          </div>
        </div>
      </div>
    </div>
  `}const Y=()=>{const t=x(),e=t?X():J(),o=document.createElement("div");o.innerHTML=e,o.id="scan-modal";const a={backBtn:o.querySelector(C.BACK_BTN),openInWalletBtn:o.querySelector("#open-in-wallet-btn"),openOtherDeviceBtn:o.querySelector("#open-other-device-btn"),qrContainer:o.querySelector(C.QR_CONTAINER)},r=async()=>{const{showLandingModal:n}=await l(async()=>{const{showLandingModal:i}=await import("./B5pi48n5.js");return{showLandingModal:i}},__vite__mapDeps([0,1,2,3,4,5,6,7,8]),import.meta.url);Q(),await n()},s=async()=>{try{if(!w){const d=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.WALLET_CONNECT_URI);if(d)w=d;else if(await O(),!w){alert("Connection URI not available. Please refresh and try again.");return}}const n=L===I.CONCORDIUM_ID?"concordium-id":"concordium-wallet",i=ie(L,w);if(console.info("[verification-web-ui] scan Open in wallet deep link",{wallet:L,walletConnectUri:w,deepLink:i}),i)if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&n==="concordium-id"){try{const{handoffIosClipboard:_}=await l(async()=>{const{handoffIosClipboard:h}=await import("./Oa3qmtNl.js").then(S=>S.b);return{handoffIosClipboard:h}},__vite__mapDeps([9,4,1,2,5,6,10]),import.meta.url);await _(w)}catch{}const{openIosCustomScheme:u}=await l(async()=>{const{openIosCustomScheme:_}=await import("./ZGRwnBuQ.js").then(h=>h.n);return{openIosCustomScheme:_}},__vite__mapDeps([4,1,2,5,6]),import.meta.url);u(i)}else window.location.href=i;else if(n==="concordium-id"){const{redirectToIdAppStore:d}=await l(async()=>{const{redirectToIdAppStore:u}=await import("./B3P_QiOj.js");return{redirectToIdAppStore:u}},__vite__mapDeps([8,1,2]),import.meta.url);await d(w)}else{const{openAppStore:d}=await l(async()=>{const{openAppStore:u}=await import("./B3P_QiOj.js");return{openAppStore:u}},__vite__mapDeps([8,1,2]),import.meta.url);d(n)}}catch{alert("Failed to open wallet app. Please try again.")}},c=async()=>{const n=o.querySelector("#btn-wrapper");n&&n.classList.add(v.HIDDEN),w&&a.qrContainer&&await re(w,a.qrContainer)};return a.backBtn?.addEventListener("click",r),t&&(a.openInWalletBtn?.addEventListener("click",s),a.openOtherDeviceBtn?.addEventListener("click",c)),o},pe=async()=>{const{getGlobalContainer:t}=await l(async()=>{const{getGlobalContainer:o}=await import("./ZGRwnBuQ.js").then(a=>a.o);return{getGlobalContainer:o}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),e=t();e&&(m=Y(),m.id="scan-modal",m.classList.add("modal-wrapper"),e.appendChild(m),m.offsetHeight,setTimeout(()=>{m&&m.classList.add("is-visible")},10),ne(),await O())},Q=()=>{m&&(m.dropdownInstance?.destroy&&m.dropdownInstance.destroy(),m.classList.add("modal-exiting"),setTimeout(()=>{const t=m?.parentNode;t&&m&&t.removeChild(m),m=null,!document.querySelector(".desktop--modal-overlay")&&!document.querySelector(".mobile--modal-overlay")&&(document.body.style.overflowX="")},300)),E&&(clearTimeout(E),E=null),f&&(clearInterval(f),f=null),window.scanEventCleanup&&(window.scanEventCleanup(),window.scanEventCleanup=null),window.scanEventListeners&&(window.scanEventListeners.forEach(t=>t()),window.scanEventListeners=null)};async function O(){try{const t=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.CONNECTION_MODE);if(t==="sdk-managed"){const e=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_PROJECT_ID),o=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_NETWORK),a=localStorage.getItem("sdkWalletConnectMetadata"),r=a?JSON.parse(a):null;if(e&&o&&(window.__CONCORDIUM_WC_CONFIG__={projectId:e,network:o,metadata:r},await ae())){document.querySelectorAll(".desktop--modal-overlay, .mobile--modal-overlay").forEach(i=>{i.parentNode&&i.parentNode.removeChild(i)}),m=null,await new Promise(i=>setTimeout(i,100));const{showReturningUserModal:n}=await l(async()=>{const{showReturningUserModal:i}=await import("./D8T4dCz3.js");return{showReturningUserModal:i}},__vite__mapDeps([11,1,2,3,4,5,6,12]),import.meta.url);await n();return}}t==="sdk-managed"?await W():await Z()}catch{b("Failed to generate QR code. Please try again.")}}async function W(){const t=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_PROJECT_ID),e=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_NETWORK);if(!t||!e)throw new Error("SDK project ID or network not found. Please call initWalletConnect() first.");const o=q.createWalletConnectService();await o.initialize(),await o.clearAllSessionsForNewPairing();const{WalletConnectConstants:a}=await l(async()=>{const{WalletConnectConstants:n}=await import("./ZGRwnBuQ.js").then(i=>i.w);return{WalletConnectConstants:n}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),r=a.CHAIN_IDS[e],{uri:s,approval:c}=await o.connect({ccd:{methods:[...a.ALL_METHODS],chains:r,events:[...a.EVENTS]}});if(!s)throw new Error("Failed to generate WalletConnect URI from SDK");if(w=s,c().then(async n=>{await te(n)}).catch(()=>{}),x()){const n=document.querySelector("#mobile-loading"),i=document.querySelector("#mobile-content");n&&i&&(n.classList.add(v.HIDDEN),i.classList.remove(v.HIDDEN))}else await T(s)}async function Z(){const t=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.WALLET_CONNECT_URI);if(!t){b("WalletConnect not configured. Please set up WalletConnect first by calling setWalletConnectUri() or initWalletConnect().");return}if(w=t,x()){const e=document.querySelector("#mobile-loading"),o=document.querySelector("#mobile-content");e&&o&&(e.classList.add(v.HIDDEN),o.classList.remove(v.HIDDEN))}else await T(t)}async function ee(t){try{const e=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_PRESENTATION_REQUEST);if(!e)return;const o=JSON.parse(e),a=q.getWalletConnectService();if(!a)return;const s=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_NETWORK)==="mainnet"?"ccd:9dd9ca4d19e9393877d2c44b70f89acb":"ccd:4221332d34e1694168c2a0c0b3fd0f27",c=localStorage.getItem("sdkWalletConnectMetadata"),n=c?JSON.parse(c):{},i={description:n?.description||"Requesting verification",appName:n?.name||"Concordium Verification WebUI",url:n?.url||window.location.origin,icons:n?.icons||[]},{response:d}=await z({wcService:a,topic:t,chainId:s,presentationRequest:o,metadata:i});window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"presentation_received",data:d},bubbles:!0,composed:!0}));try{if(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream){const{openIosCustomScheme:_}=await l(async()=>{const{openIosCustomScheme:h}=await import("./ZGRwnBuQ.js").then(S=>S.n);return{openIosCustomScheme:h}},__vite__mapDeps([4,1,2,5,6]),import.meta.url);_(`concordiumidapp://r?_t=${Date.now()}`)}}catch(u){console.warn("[verification-web-ui] post-send iOS wake failed",u)}setTimeout(()=>{l(async()=>{const{showSuccessState:u}=await import("./CSAlQF8V.js");return{showSuccessState:u}},__vite__mapDeps([13,1,2,4,5,6,12]),import.meta.url).then(({showSuccessState:u})=>{u()})},400)}catch(e){window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"error",data:{message:"Failed to send verification request",error:e}},bubbles:!0,composed:!0}));const{showErrorState:o}=await l(async()=>{const{showErrorState:a}=await import("./CSAlQF8V.js");return{showErrorState:a}},__vite__mapDeps([13,1,2,4,5,6,12]),import.meta.url);await o()}}async function te(t){try{const{topic:e,namespaces:o}=t,a=o?.ccd?.accounts||[],r=t.peer?.metadata?.name||"Wallet";localStorage.setItem(p.LOCAL_STORAGE_FLAGS.CONNECTED_WALLET_NAME,r);const s={topic:e,accounts:a,namespaces:o,walletName:r};window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"session_approved",data:s},bubbles:!0,composed:!0}));const{showProcessingModal:c}=await l(async()=>{const{showProcessingModal:n}=await import("./CSAlQF8V.js");return{showProcessingModal:n}},__vite__mapDeps([13,1,2,4,5,6,12]),import.meta.url);await c(),await ee(e)}catch(e){window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"error",data:{message:"Failed to handle session approval",error:e}},bubbles:!0,composed:!0})),b("Failed to process wallet connection. Please try again.")}}async function T(t){try{const{default:e}=await l(async()=>{const{default:n}=await import("./FVMfpm40.js").then(i=>i.b);return{default:n}},__vite__mapDeps([14,5]),import.meta.url),{getConfig:o}=await l(async()=>{const{getConfig:n}=await import("./ZGRwnBuQ.js").then(i=>i.l);return{getConfig:n}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),{getIdAppStoreUrl:a}=await l(async()=>{const{getIdAppStoreUrl:n}=await import("./ZGRwnBuQ.js").then(i=>i.n);return{getIdAppStoreUrl:n}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),{prepareQrHandoffPayload:r}=await l(async()=>{const{prepareQrHandoffPayload:n}=await import("./Oa3qmtNl.js").then(i=>i.b);return{prepareQrHandoffPayload:n}},__vite__mapDeps([9,4,1,2,5,6,10]),import.meta.url),s=o(),c=document.querySelector(C.QR_CONTAINER);if(c){const{qrUrl:n}=await r(t),i=await e.toDataURL(n,{width:200,margin:2,color:{dark:"#000000",light:"#ffffff"}}),d=window.location.hostname,_=d==="localhost"||d==="127.0.0.1"||d==="::1"?'<p class="text-xs text-center mt-2" style="color: #B45309; max-width: 280px; margin-left: auto; margin-right: auto;">This page is running on localhost. Phone camera scans cannot open localhost on another device. Use a LAN/public URL.</p>':"",h=s.qrCode?.showCountdown!==!1,S=s.qrCode?.expiryDuration||300*1e3,R=Math.floor(S/6e4),D=Math.floor(S%6e4/1e3),y=`${R}:${D.toString().padStart(2,"0")}`,g=h?`<p id="qr-countdown" class="desktop--qr-countdown">Expires in: <span class="font-semibold">${y}</span></p>`:"",V=a();console.info("[IDApp] scan QR encoded",{qrUrlLength:n.length}),c.innerHTML=`
        <div class="text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center;">
          <img src="${i}" alt="QR Code for wallet connection" class="w-48 h-48 mx-auto mb-2" style="border-radius: 12.414px; border: 1px solid rgba(0, 0, 0, 0.10); background: #FFF;" />
          <p class="desktop--scan-text mt-2">Scan the QR code with your<br>Concordium ID compatible device</p>
          ${_}
          ${g}
          <img src="${F}" alt="" class="mx-auto mt-4" />
          <div class="flex items-center justify-center mt-4">
            <p class="desktop--download-text">Download & Install the <a href="${V}" target="_blank" rel="noopener noreferrer">Concordium ID App</a> and come back here to verify.</p>
          </div>
        </div>
      `,$()}}catch{b("Failed to generate QR code. Please try again.")}}async function $(){E&&(clearTimeout(E),E=null),f&&(clearInterval(f),f=null);const{getConfig:t}=await l(async()=>{const{getConfig:c}=await import("./ZGRwnBuQ.js").then(n=>n.l);return{getConfig:c}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),e=t(),o=e.qrCode?.expiryDuration||300*1e3,a=e.qrCode?.showCountdown!==!1,r=e.qrCode?.autoRefresh!==!1,s=Date.now()+o;if(a){const c=document.querySelector("#qr-countdown span");c&&(f=j(()=>{const n=Math.max(0,s-Date.now()),i=Math.floor(n/6e4),d=Math.floor(n%6e4/1e3);c.textContent=`${i}:${d.toString().padStart(2,"0")}`,n<=0&&f&&(clearInterval(f),f=null)},1e3))}E=setTimeout(async()=>{await oe(r)},o)}async function oe(t){const e=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.CONNECTION_MODE),o=e!=="sdk-managed";A({type:"qr-code-expired",source:"desktop",modalType:"scan",data:{connectionMode:e,isMerchantProvided:o,autoRefresh:o?!1:t}}),o?k(!1):t?(G(),await H()):k(!0)}async function H(){try{await W(),A({type:"qr-code-refreshed",source:"desktop",modalType:"scan",data:{timestamp:Date.now()}})}catch{b("Failed to refresh QR code. Please try again.")}}function k(t){const e=document.querySelector(C.QR_CONTAINER);if(e){const o=t?`<button id="refresh-qr" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
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
    `,t){const a=e.querySelector("#refresh-qr");a&&a.addEventListener("click",async()=>{G(),await H()})}}}function G(){const t=document.querySelector(C.QR_CONTAINER);t&&(t.innerHTML=`
      <div class="animate-pulse text-center" style="min-height: 350px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div class="w-48 h-48 bg-gray-200 rounded mb-2 mx-auto"></div>
        <p class="text-sm text-inverse-tertiary">Refreshing QR code...</p>
      </div>
    `)}async function we(t){await T(t),A({type:"qr-code-refreshed",source:"desktop",modalType:"scan",data:{timestamp:Date.now(),source:"merchant"}})}function b(t){const e=document.querySelector(C.QR_CONTAINER);if(e){e.innerHTML=`
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
        `,await O()})}}function ne(){const t=[],e=async a=>{Q(),await new Promise(s=>setTimeout(s,350));const{showProcessingModal:r}=await l(async()=>{const{showProcessingModal:s}=await import("./CSAlQF8V.js");return{showProcessingModal:s}},__vite__mapDeps([13,1,2,4,5,6,12]),import.meta.url);await r()};window.addEventListener("concordium-event",a=>{a.detail?.type==="session-approved"&&e()});const o=()=>{window.removeEventListener("concordium-event",e)};t.push(o),window.scanEventListeners=t}async function ae(){try{const{ServiceFactory:t}=await l(async()=>{const{ServiceFactory:a}=await import("./Oa3qmtNl.js").then(r=>r.i);return{ServiceFactory:a}},__vite__mapDeps([9,4,1,2,5,6,10]),import.meta.url),e=t.createWalletConnectService();await e.initialize();const o=e.getActiveSessions();return o.length>0?o[0]:null}catch{return null}}function ie(t,e){const o=localStorage.getItem(p.LOCAL_STORAGE_FLAGS.SDK_NETWORK)||"testnet",a=navigator.userAgent;let r=null;return t===I.CONCORDIUM_WALLET?/iPad|iPhone|iPod/.test(a)&&!window.MSStream?r=`cryptox${o}://wc?uri=${encodeURIComponent(e)}&redirect=googlechrome://`:/android/i.test(a)&&(r=`cryptox-wc-${o}://wc?uri=${encodeURIComponent(e)}&go_back=true`):t===I.CONCORDIUM_ID&&(r=/iPad|iPhone|iPod/.test(a)&&!window.MSStream?`concordiumidapp://open?source=clipboard&_t=${Date.now()}`:`concordiumidapp://wc?uri=${encodeURIComponent(e)}&_t=${Date.now()}`),r}async function re(t,e){try{const{default:o}=await l(async()=>{const{default:y}=await import("./FVMfpm40.js").then(g=>g.b);return{default:y}},__vite__mapDeps([14,5]),import.meta.url),{getConfig:a}=await l(async()=>{const{getConfig:y}=await import("./ZGRwnBuQ.js").then(g=>g.l);return{getConfig:y}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),{getIdAppStoreUrl:r}=await l(async()=>{const{getIdAppStoreUrl:y}=await import("./ZGRwnBuQ.js").then(g=>g.n);return{getIdAppStoreUrl:y}},__vite__mapDeps([4,1,2,5,6]),import.meta.url),{prepareQrHandoffPayload:s}=await l(async()=>{const{prepareQrHandoffPayload:y}=await import("./Oa3qmtNl.js").then(g=>g.b);return{prepareQrHandoffPayload:y}},__vite__mapDeps([9,4,1,2,5,6,10]),import.meta.url),c=a(),{qrUrl:n}=await s(t),i=await o.toDataURL(n,{width:200,margin:2,color:{dark:"#000000",light:"#ffffff"}}),d=c.qrCode?.showCountdown!==!1,u=c.qrCode?.expiryDuration||300*1e3,_=Math.floor(u/6e4),h=Math.floor(u%6e4/1e3),S=`${_}:${h.toString().padStart(2,"0")}`,R=d?`<p id="qr-countdown" class="desktop--qr-countdown">Expires in: <span class="font-semibold">${S}</span></p>`:"",D=r();e.innerHTML=`
      <div class="text-center py-4">
        <img src="${i}" alt="QR Code for wallet connection" class="w-48 h-48 mx-auto mb-2" style="border-radius: 12.414px; border: 1px solid rgba(0, 0, 0, 0.10); background: #FFF;" />
        <p class="desktop--scan-text">Scan the QR code with your<br>Concordium ID compatible device</p>
                ${R}
        <img src="${F}" alt="" class="mx-auto mt-4" />
        <div class="flex items-center justify-center mt-4">
                    <p class="desktop--download-text">Download & Install the <a href="${D}" target="_blank" rel="noopener noreferrer">Concordium ID App</a> and come back here to verify.</p>
        </div>
      </div>
    `,e.classList.remove(v.HIDDEN),e.style.display="flex",await $()}catch{}}export{ee as autoSendPresentationRequestIfConfigured,Y as createScanModal,te as handleSessionApproval,Q as hideScanModal,pe as showScanModal,we as updateQRCodeFromMerchant};
