const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Bkvv8jkL.js","./DMbhhi1-.js","./entry.DO9vU0DM.css","./index.DOnQTpA4.css","./DKFWaazl.js","./DQ1KZ1g8.js","./DcQm8KL9.js","./DJdpx81g.js","./1-Zg5deT.js","./cN9fHkmH.js"])))=>i.map(i=>d[i]);
import{i as r}from"./DMbhhi1-.js";import{a as y}from"./DQ1KZ1g8.js";import{c as L,M as d,d as S}from"./Bkvv8jkL.js";import{m as g}from"./1-Zg5deT.js";const w=()=>{const i=`
  <div class="desktop--modal-overlay">
    <div class="desktop--modal-container">
      <div class="desktop--modal-body">
        <div class="flex items-center justify-end p-2">
          <img
            src="${L}"
            alt="concordium-modal-logo"
            class="object-cover"
          />
        </div>

        <div class="flex items-center justify-center">
          <img src="${g}" alt="success-graphic" class="object-cover" />
        </div>

        <div class="flex flex-col items-center gap-2">
          <p class="font-medium text-[20px] leading-[25px] tracking-[0.2px] font-jakarta" style="color: #0D0F11;">Your ID is still connected</p>
        </div>

        <div class="flex flex-col items-center gap-4">
          <button class="desktop--primary-button" id="continue-btn" style="margin-bottom: 10px;">
            <span>Start private verification</span>
            <img src="${y}" alt="arrow-right-icon" class="object-cover" />
          </button>

          <button class="desktop--outline-button" id="disconnect-btn">Disconnect</button>
        </div>
      </div>
    </div>
  </div>
  `,n=document.createElement("div");n.innerHTML=i;const t=n.querySelector("#continue-btn"),o=n.querySelector("#disconnect-btn");return t?.addEventListener("click",async()=>{const{ServiceFactory:a}=await r(async()=>{const{ServiceFactory:l}=await import("./Bkvv8jkL.js").then(u=>u.h);return{ServiceFactory:l}},__vite__mapDeps([0,1,2,3]),import.meta.url),e=a.createWalletConnectService();await e.initialize();const m=e.getActiveSessions()[0];if(!m){console.error("No active session found"),p();const{showLandingModal:l}=await r(async()=>{const{showLandingModal:u}=await import("./DKFWaazl.js");return{showLandingModal:u}},__vite__mapDeps([4,1,2,5,0,3,6]),import.meta.url);await l();return}const{topic:c,namespaces:_}=m,v=_?.ccd?.accounts||[];window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"active_session",data:{message:"Active WalletConnect session detected",timestamp:Date.now(),topic:c,accounts:v,namespaces:_,session:m}},bubbles:!0,composed:!0}));try{localStorage.setItem(d.LOCAL_STORAGE_FLAGS.ACTIVE_SESSION,JSON.stringify(!0)),p();const{showProcessingModal:l}=await r(async()=>{const{showProcessingModal:u}=await import("./DJdpx81g.js");return{showProcessingModal:u}},__vite__mapDeps([7,1,2,0,3,8]),import.meta.url);await l(),S({type:"active-session-continue",source:"desktop",modalType:"returning-user"})}catch(l){console.error("Failed to continue with existing session:",l)}}),o?.addEventListener("click",async()=>{try{const{ServiceFactory:a}=await r(async()=>{const{ServiceFactory:c}=await import("./Bkvv8jkL.js").then(_=>_.h);return{ServiceFactory:c}},__vite__mapDeps([0,1,2,3]),import.meta.url);await a.createWalletConnectService().disconnectAll();const{updateWalletFlags:s}=await r(async()=>{const{updateWalletFlags:c}=await import("./cN9fHkmH.js");return{updateWalletFlags:c}},__vite__mapDeps([9,0,1,2,3]),import.meta.url);s(),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.ONLY_ONE_OPTION),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.APP_NOT_INSTALLED),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.CONCORDIUM_ID_NOT_INSTALLED);const{showLandingModal:m}=await r(async()=>{const{showLandingModal:c}=await import("./DKFWaazl.js");return{showLandingModal:c}},__vite__mapDeps([4,1,2,5,0,3,6]),import.meta.url);await m(),p()}catch(a){console.error("Failed to disconnect sessions:",a);try{localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.ONLY_ONE_OPTION),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.APP_NOT_INSTALLED),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.CONCORDIUM_ID_NOT_INSTALLED)}catch(s){console.error("Failed to clear localStorage flags:",s)}const{showLandingModal:e}=await r(async()=>{const{showLandingModal:s}=await import("./DKFWaazl.js");return{showLandingModal:s}},__vite__mapDeps([4,1,2,5,0,3,6]),import.meta.url);await e(),p()}}),n.firstElementChild},T=async()=>{const{getGlobalContainer:i}=await r(async()=>{const{getGlobalContainer:e}=await import("./Bkvv8jkL.js").then(s=>s.f);return{getGlobalContainer:e}},__vite__mapDeps([0,1,2,3]),import.meta.url),n=i();if(!n){console.error("Container not found for modal");return}const t=n.querySelector(".desktop--modal-overlay"),o=w();o.id="returning-user-modal";const a=o.querySelector(".desktop--modal-container");o.style.opacity="0",a.style.transform="translateY(-20px) scale(0.95)",a.style.transition="transform 0.3s ease-out",n.appendChild(o),o.offsetHeight,o.style.transition="opacity 0.3s ease-out",setTimeout(()=>{if(t){const e=t.querySelector(".desktop--modal-container");t.style.transition="opacity 0.3s ease-in",e&&(e.style.transition="transform 0.3s ease-in",e.style.transform="translateY(-20px) scale(0.95)"),t.style.opacity="0",t.style.pointerEvents="none",t.style.zIndex="9998"}o.style.opacity="1",a.style.transform="translateY(0) scale(1)",t&&setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},350)},10)},p=()=>{const i=document.querySelector("#returning-user-modal");i&&(i.classList.add("modal-exiting"),setTimeout(()=>{i.remove()},300))};export{w as createReturningUserModal,p as hideReturningUserModal,T as showReturningUserModal};
