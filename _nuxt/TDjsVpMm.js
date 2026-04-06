const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./BEP63aU0.js","./w6yw6ddM.js","./_CSVFNIn.js","./entry.Bv58BlFP.css","./CE1G-McA.js","./useChallengePresentation.DlatBVEz.css","./DarhMoVt.js","./DcQm8KL9.js","./4KloPWgM.js","./_XbgiawH.js","./1-Zg5deT.js","./BVKaDGvm.js","./9WNwlQjE.js","./BD8VRbFU.js"])))=>i.map(i=>d[i]);
import{D as r}from"./_CSVFNIn.js";import{a as y}from"./BEP63aU0.js";import{c as g,M as d,h as L}from"./w6yw6ddM.js";import{m as S}from"./1-Zg5deT.js";import"./CE1G-McA.js";const w=()=>{const c=`
  <div class="desktop--modal-overlay">
    <div class="desktop--modal-container">
      <div class="desktop--modal-body">
        <div class="flex items-center justify-end p-2">
          <img
            src="${g}"
            alt="concordium-modal-logo"
            class="object-cover"
          />
        </div>

        <div class="flex items-center justify-center">
          <img src="${S}" alt="success-graphic" class="object-cover" />
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
  `,s=document.createElement("div");s.innerHTML=c;const t=s.querySelector("#continue-btn"),a=s.querySelector("#disconnect-btn");return t?.addEventListener("click",async()=>{const{ServiceFactory:n}=await r(async()=>{const{ServiceFactory:l}=await import("./BEP63aU0.js").then(m=>m.i);return{ServiceFactory:l}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url),e=n.createWalletConnectService();await e.initialize();const o=e.getMostRecentSession();if(!o){console.error("No active session found"),_();const{showLandingModal:l}=await r(async()=>{const{showLandingModal:m}=await import("./DarhMoVt.js");return{showLandingModal:m}},__vite__mapDeps([6,2,3,0,1,4,5,7,8]),import.meta.url);await l();return}const{topic:u,namespaces:i}=o,p=i?.ccd?.accounts||[];window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"active_session",data:{message:"Active WalletConnect session detected",timestamp:Date.now(),topic:u,accounts:p,namespaces:i,session:o}},bubbles:!0,composed:!0}));try{localStorage.setItem(d.LOCAL_STORAGE_FLAGS.ACTIVE_SESSION,JSON.stringify(!0)),_();const{showProcessingModal:l}=await r(async()=>{const{showProcessingModal:v}=await import("./_XbgiawH.js");return{showProcessingModal:v}},__vite__mapDeps([9,2,3,1,4,5,10]),import.meta.url);await l(),L({type:"active-session-continue",source:"desktop",modalType:"returning-user"});const{autoSendPresentationRequestIfConfigured:m}=await r(async()=>{const{autoSendPresentationRequestIfConfigured:v}=await import("./BVKaDGvm.js");return{autoSendPresentationRequestIfConfigured:v}},__vite__mapDeps([11,2,3,12,0,1,4,5,7]),import.meta.url);await m(u)}catch(l){console.error("Failed to continue with existing session:",l)}}),a?.addEventListener("click",async()=>{try{const{ServiceFactory:n}=await r(async()=>{const{ServiceFactory:i}=await import("./BEP63aU0.js").then(p=>p.i);return{ServiceFactory:i}},__vite__mapDeps([0,1,2,3,4,5]),import.meta.url);await n.createWalletConnectService().disconnectAll();const{updateWalletFlags:o}=await r(async()=>{const{updateWalletFlags:i}=await import("./BD8VRbFU.js");return{updateWalletFlags:i}},__vite__mapDeps([13,1,2,3,4,5]),import.meta.url);o(),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.ONLY_ONE_OPTION),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.APP_NOT_INSTALLED),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.CONCORDIUM_ID_NOT_INSTALLED);const{showLandingModal:u}=await r(async()=>{const{showLandingModal:i}=await import("./DarhMoVt.js");return{showLandingModal:i}},__vite__mapDeps([6,2,3,0,1,4,5,7,8]),import.meta.url);await u(),_()}catch(n){console.error("Failed to disconnect sessions:",n);try{localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.ONLY_ONE_OPTION),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.APP_NOT_INSTALLED),localStorage.removeItem(d.LOCAL_STORAGE_FLAGS.CONCORDIUM_ID_NOT_INSTALLED)}catch(o){console.error("Failed to clear localStorage flags:",o)}const{showLandingModal:e}=await r(async()=>{const{showLandingModal:o}=await import("./DarhMoVt.js");return{showLandingModal:o}},__vite__mapDeps([6,2,3,0,1,4,5,7,8]),import.meta.url);await e(),_()}}),s.firstElementChild},T=async()=>{const{getGlobalContainer:c}=await r(async()=>{const{getGlobalContainer:e}=await import("./w6yw6ddM.js").then(o=>o.p);return{getGlobalContainer:e}},__vite__mapDeps([1,2,3,4,5]),import.meta.url),s=c();if(!s){console.error("Container not found for modal");return}const t=s.querySelector(".desktop--modal-overlay"),a=w();a.id="returning-user-modal";const n=a.querySelector(".desktop--modal-container");a.style.opacity="0",n.style.transform="translateY(-20px) scale(0.95)",n.style.transition="transform 0.3s ease-out",s.appendChild(a),a.offsetHeight,a.style.transition="opacity 0.3s ease-out",setTimeout(()=>{if(t){const e=t.querySelector(".desktop--modal-container");t.style.transition="opacity 0.3s ease-in",e&&(e.style.transition="transform 0.3s ease-in",e.style.transform="translateY(-20px) scale(0.95)"),t.style.opacity="0",t.style.pointerEvents="none",t.style.zIndex="9998"}a.style.opacity="1",n.style.transform="translateY(0) scale(1)",t&&setTimeout(()=>{t.parentNode&&t.parentNode.removeChild(t)},350)},10)},_=()=>{const c=document.querySelector("#returning-user-modal");c&&(c.classList.add("modal-exiting"),setTimeout(()=>{c.remove()},300))};export{w as createReturningUserModal,_ as hideReturningUserModal,T as showReturningUserModal};
