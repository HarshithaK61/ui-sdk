const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./Oa3qmtNl.js","./ZGRwnBuQ.js","./1HnB0Zqs.js","./entry.C8kur5Mj.css","./CE1G-McA.js","./useChallengePresentation.Drs-I8St.css","./DHjanPqv.js","./B5pi48n5.js","./DQ1KZ1g8.js","./DcQm8KL9.js","./B3P_QiOj.js","./CSAlQF8V.js","./1-Zg5deT.js","./BWzDRxIH.js","./9WNwlQjE.js","./D_W6nS3r.js"])))=>i.map(i=>d[i]);
import{x as t}from"./1HnB0Zqs.js";import{a as L}from"./DQ1KZ1g8.js";import{c as g,M as r,h as S}from"./ZGRwnBuQ.js";import{m as w}from"./1-Zg5deT.js";import"./CE1G-McA.js";const O=()=>{const n=`
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
          <img src="${w}" alt="success-graphic" class="object-cover" />
        </div>

        <div class="flex flex-col items-center gap-2">
          <p class="font-medium text-[20px] leading-[25px] tracking-[0.2px] font-jakarta" style="color: #0D0F11;">Your ID is still connected</p>
        </div>

        <div class="flex flex-col items-center gap-4">
          <button class="desktop--primary-button" id="continue-btn" style="margin-bottom: 10px;">
            <span>Start private verification</span>
            <img src="${L}" alt="arrow-right-icon" class="object-cover" />
          </button>

          <button class="desktop--outline-button" id="disconnect-btn">Disconnect</button>
        </div>
      </div>
    </div>
  </div>
  `,e=document.createElement("div");e.innerHTML=n;const c=e.querySelector("#continue-btn"),o=e.querySelector("#disconnect-btn");return c?.addEventListener("click",async()=>{const{ServiceFactory:i}=await t(async()=>{const{ServiceFactory:d}=await import("./Oa3qmtNl.js").then(m=>m.i);return{ServiceFactory:d}},__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url),s=i.createWalletConnectService();await s.initialize();const l=s.getMostRecentSession();if(!l){_();const{showLandingModal:d}=await t(async()=>{const{showLandingModal:m}=await import("./B5pi48n5.js");return{showLandingModal:m}},__vite__mapDeps([7,2,3,8,1,4,5,9,10]),import.meta.url);await d();return}const{topic:u,namespaces:a}=l,v=a?.ccd?.accounts||[];window.dispatchEvent(new CustomEvent("verification-web-ui-event",{detail:{type:"active_session",data:{message:"Active WalletConnect session detected",timestamp:Date.now(),topic:u,accounts:v,namespaces:a,session:l}},bubbles:!0,composed:!0}));try{localStorage.setItem(r.LOCAL_STORAGE_FLAGS.ACTIVE_SESSION,JSON.stringify(!0)),_();const{showProcessingModal:d}=await t(async()=>{const{showProcessingModal:p}=await import("./CSAlQF8V.js");return{showProcessingModal:p}},__vite__mapDeps([11,2,3,1,4,5,12]),import.meta.url);await d(),S({type:"active-session-continue",source:"desktop",modalType:"returning-user"});const{autoSendPresentationRequestIfConfigured:m}=await t(async()=>{const{autoSendPresentationRequestIfConfigured:p}=await import("./BWzDRxIH.js");return{autoSendPresentationRequestIfConfigured:p}},__vite__mapDeps([13,2,3,14,8,1,4,5,9]),import.meta.url);await m(u)}catch{}}),o?.addEventListener("click",async()=>{try{const{ServiceFactory:i}=await t(async()=>{const{ServiceFactory:a}=await import("./Oa3qmtNl.js").then(v=>v.i);return{ServiceFactory:a}},__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url);await i.createWalletConnectService().disconnectAll();const{updateWalletFlags:l}=await t(async()=>{const{updateWalletFlags:a}=await import("./D_W6nS3r.js");return{updateWalletFlags:a}},__vite__mapDeps([15,1,2,3,4,5]),import.meta.url);l(),localStorage.removeItem(r.LOCAL_STORAGE_FLAGS.ONLY_ONE_OPTION),localStorage.removeItem(r.LOCAL_STORAGE_FLAGS.APP_NOT_INSTALLED),localStorage.removeItem(r.LOCAL_STORAGE_FLAGS.CONCORDIUM_ID_NOT_INSTALLED);const{showLandingModal:u}=await t(async()=>{const{showLandingModal:a}=await import("./B5pi48n5.js");return{showLandingModal:a}},__vite__mapDeps([7,2,3,8,1,4,5,9,10]),import.meta.url);await u(),_()}catch{try{localStorage.removeItem(r.LOCAL_STORAGE_FLAGS.ONLY_ONE_OPTION),localStorage.removeItem(r.LOCAL_STORAGE_FLAGS.APP_NOT_INSTALLED),localStorage.removeItem(r.LOCAL_STORAGE_FLAGS.CONCORDIUM_ID_NOT_INSTALLED)}catch{}const{showLandingModal:i}=await t(async()=>{const{showLandingModal:s}=await import("./B5pi48n5.js");return{showLandingModal:s}},__vite__mapDeps([7,2,3,8,1,4,5,9,10]),import.meta.url);await i(),_()}}),e.firstElementChild},C=async()=>{const{getGlobalContainer:n}=await t(async()=>{const{getGlobalContainer:i}=await import("./ZGRwnBuQ.js").then(s=>s.o);return{getGlobalContainer:i}},__vite__mapDeps([1,2,3,4,5]),import.meta.url),e=n();if(!e)return;const c=e.querySelector(".desktop--modal-overlay"),o=O();o.id="returning-user-modal",o.classList.add("modal-entering"),e.appendChild(o),o.offsetHeight,setTimeout(()=>{c&&(c.classList.add("modal-exiting"),setTimeout(()=>{c.parentNode?.removeChild(c)},350)),o.classList.remove("modal-entering"),o.classList.add("modal-visible")},10)},_=()=>{const n=document.querySelector("#returning-user-modal");n&&(n.classList.add("modal-exiting"),setTimeout(()=>{n.remove()},300))};export{O as createReturningUserModal,_ as hideReturningUserModal,C as showReturningUserModal};
