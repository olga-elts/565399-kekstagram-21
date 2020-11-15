(()=>{"use strict";window.util={debounce:e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},isEventAtTarget:(e,t)=>{2===e.eventPhase&&t()},isEscEvent:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())},isEnterEvent:(e,t)=>{"Enter"===e.key&&(e.preventDefault(),t())},getCoords:e=>{const t=e.getBoundingClientRect();return{top:t.top+pageYOffset,left:t.left+pageXOffset}},getShuffledArray:e=>{for(let t=e.length-1;t>0;t--){const o=Math.floor(Math.random()*(t+1));[e[o],e[t]]=[e[t],e[o]]}return e}},(()=>{const{isEscEvent:e}=window.util,t=/^\d+/,o=document.querySelector("body"),n=document.querySelector(".big-picture"),r=n.querySelector(".big-picture__cancel"),c=n.querySelector(".comments-loader"),s=n.querySelector(".social__comments"),l=s.querySelector(".social__comment"),i=e=>{const t=l.cloneNode(!0);return t.querySelector(".social__picture").src=e.avatar,t.querySelector(".social__picture").alt=e.name,t.querySelector(".social__text").textContent=e.message,t};c.addEventListener("click",(()=>{d()}));const d=()=>{const e=s.querySelectorAll(".social__comment"),o=n.querySelector(".social__comment-count"),r=e.length,l=r-s.querySelectorAll(".hidden").length;for(let n=l;n<Math.min(r,l+5);n++)e[n].classList.remove("hidden"),o.innerHTML=o.innerHTML.replace(o.innerHTML.match(t),n+1);r<=l+5?c.classList.add("hidden"):c.classList.remove("hidden")},a=()=>{n.classList.add("hidden"),o.classList.remove("modal-open"),document.removeEventListener("keydown",u),r.removeEventListener("click",a)},u=t=>{e(t,a)};window.preview={openBigPicture:e=>{(e=>{s.querySelectorAll(".social__comment").forEach((e=>{s.removeChild(e)}));const t=document.createDocumentFragment();for(let o=0;o<e.length;o++){const n=i(e[o]);t.appendChild(n),n.classList.add("hidden")}s.appendChild(t),d()})(e.comments),(e=>{n.querySelector(".big-picture__img img").src=e.url,n.querySelector(".comments-count").textContent=e.comments.length,n.querySelector(".social__caption").textContent=e.description,n.querySelector(".likes-count").textContent=e.likes})(e),n.classList.remove("hidden"),o.classList.add("modal-open"),document.addEventListener("keydown",u),r.addEventListener("click",a)}}})(),(()=>{const{isEventAtTarget:e,isEscEvent:t}=window.util,o="json",n=3e3,r="Ошибка соединения",c="Истекло время ожидания",s=document.querySelector("main"),l=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),i=l.querySelector(".error__button"),d=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),a=d.querySelector(".success__button"),u=()=>{l.remove(),document.removeEventListener("keydown",v),l.removeEventListener("click",p),i.removeEventListener("click",p)},m=()=>{d.remove(),document.removeEventListener("keydown",y),a.removeEventListener("click",f),d.removeEventListener("click",f)},v=e=>{t(e,u)},y=e=>{t(e,m)},p=t=>{e(t,u)},f=t=>{e(t,m)};window.server={Load:{METHOD:"GET",URL:"https://21.javascript.pages.academy/kekstagram/data",BUTTON:"Понятно, попробую снова"},Upload:{METHOD:"POST",URL:"https://21.javascript.pages.academy/kekstagram",BUTTON:"Загрузить другой файл"},showErrorBlock:(e,t)=>{s.appendChild(l),l.querySelector(".error__title").textContent=t,i.textContent=e.BUTTON,document.addEventListener("keydown",v),l.addEventListener("click",p),i.addEventListener("click",p)},showSuccessBlock:()=>{s.appendChild(d),a.addEventListener("click",f),document.addEventListener("keydown",y),d.addEventListener("click",f)},sendRequest:(e,t,s,l)=>{const i=((e,t)=>{const r=new XMLHttpRequest;return r.responseType=o,r.timeout=n,r.open(e,t),r})(e.METHOD,e.URL);i.addEventListener("load",(()=>{if(200===i.status)t(i.response);else{const t=`Ошибка ${i.status} ${i.statusText}`;s(e,t)}})),i.addEventListener("error",(()=>{s(e,r)})),i.addEventListener("timeout",(()=>{s(e,c)})),i.send(l)}}})(),(()=>{const{isEnterEvent:e}=window.util,{openBigPicture:t}=window.preview,o=document.querySelector("#picture").content.querySelector(".picture");window.gallery={renderPhotos:n=>{const r=document.createDocumentFragment();n.forEach((n=>{r.appendChild((n=>{const r=o.cloneNode(!0);return r.querySelector(".picture__img").src=n.url,r.querySelector(".picture__comments").textContent=n.comments.length,r.querySelector(".picture__likes").textContent=n.likes,r.addEventListener("click",(()=>{t(n)})),r.addEventListener("keydown",(o=>{e(o,t.bind(null,n))})),r})(n))}));const c=document.querySelector(".pictures");document.querySelectorAll(".picture").forEach((e=>{c.removeChild(e)})),c.appendChild(r)}}})(),(()=>{const{getShuffledArray:e,debounce:t}=window.util,{renderPhotos:o}=window.gallery,n=document.querySelector(".img-filters"),r=t(((t,r)=>{(e=>{const t=n.querySelector(".img-filters__button--active");e.target!==t&&(t.classList.remove("img-filters__button--active"),e.target.classList.add("img-filters__button--active"))})(t);const c=((t,o)=>{switch(t.target.id){case"filter-discussed":return o.slice().sort(((e,t)=>t.comments.length-e.comments.length));case"filter-random":return e(o.slice()).slice(0,10);default:return o}})(t,r);o(c)}));window.filter={showImgFilters:()=>{n.classList.remove("img-filters--inactive")},filterPhotos:r}})(),(()=>{const e={chrome:"grayscale",sepia:"sepia",marvin:"invert",phobos:"blur",heat:"brightness"},t={Grayscale:{MIN:0,MAX:1},Sepia:{MIN:0,MAX:1},Invert:{MIN:0,MAX:100,UNIT:"%"},Blur:{MIN:0,MAX:3,UNIT:"px"},Brightness:{MIN:1,MAX:3}},o={EFFECT:"none",EFFECT_LEVEL:100,FACTOR:1},n={STEP:25,MAX:100,MIN:25,UNIT:"%"},r=document.querySelector(".img-upload__preview img"),c=document.querySelector(".effect-level"),s=c.querySelector(".effect-level__pin"),l=c.querySelector(".effect-level__depth"),i=c.querySelector(".effect-level__value"),d=document.querySelector(".scale__control--value");for(let e in t)if(e){const o=e.toLowerCase();t[o]=t[e],delete t[e]}window.editing={DefaultSettings:o,Scale:n,setEffectLevel:o=>{const n=document.querySelector(".effects__radio:checked").value,c=e[n],s=t[c].MIN,l=t[c].MAX;let i="";t[c].UNIT&&(i=t[c].UNIT),r.style.filter=c+`(${s+(l-s)*o+i})`},setPinStyles:e=>{s.style.left=o.EFFECT_LEVEL*e+"%",l.style.width=o.EFFECT_LEVEL*e+"%",i.value=o.EFFECT_LEVEL*e},resetEffect:()=>{r.style.filter="",r.className=""},applyEffect:e=>{c.classList.remove("hidden"),r.classList.add("effects__preview--"+e),"none"===e&&c.classList.add("hidden")},resetScale:()=>{r.style.transform="",d.value=n.MAX+n.UNIT},changeScale:(e,t,o)=>{let n=parseFloat(d.value);n<e-o?n=e:n>t-o?n=t:n+=o,r.style.transform=`scale(${n/100})`,d.value=n+"%"}}})(),(()=>{const{isEscEvent:e}=window.util,{resetEffect:t,resetScale:o}=window.editing,n=document.querySelector("body"),r=document.querySelector(".img-upload__preview img"),c=document.querySelector("#upload-file"),s=document.querySelectorAll(".effects__preview"),l=document.querySelector(".img-upload__overlay"),i=document.querySelector(".effects__radio[value=none]"),d=document.querySelector(".text__hashtags"),a=document.querySelector(".text__description"),u=()=>{r.src=URL.createObjectURL(c.files[0]),s.forEach((e=>{e.style.backgroundImage=`url("${URL.createObjectURL(c.files[0])}")`}))},m=t=>{e(t,v)},v=()=>{t(),o(),c.value="",d.value="",a.value="",i.checked=!0,l.classList.add("hidden"),n.classList.remove("modal-open"),document.removeEventListener("keydown",m)};window.form={setUploadedPhoto:u,onUploadFormEscPress:m,openUploadForm:()=>{l.classList.remove("hidden"),n.classList.add("modal-open"),u(),document.addEventListener("keydown",m)},closeUploadForm:v}})(),(()=>{const e=/^#[а-яА-Я\w]+$/,t=document.querySelector(".text__hashtags");window.validation={checkArrayLength:e=>{e.length>5?t.setCustomValidity("Слишком много хэштегов!"):t.setCustomValidity("")},checkDuplicates:e=>{let o=!1;const n=e.map((e=>e.toUpperCase()));new Set(n).size!==e.length&&(o=!0),o?t.setCustomValidity("Есть повторяющиеся хэштеги!"):t.setCustomValidity("")},checkHashtagsValidity:o=>{o.some((t=>!e.test(t)))?t.setCustomValidity("Хэштег должен состоять только из букв, чисел и нижнего подчеркивания!"):t.setCustomValidity("")},checkHashtagsLength:e=>{e.some((e=>e.length>20))?t.setCustomValidity("Максимальная длина хэштега - 20"):t.setCustomValidity("")}}})(),(()=>{const{getCoords:e}=window.util,{renderPhotos:t}=window.gallery,{Load:o,Upload:n,showErrorBlock:r,showSuccessBlock:c,sendRequest:s}=window.server,{showImgFilters:l,filterPhotos:i}=window.filter,{onUploadFormEscPress:d,openUploadForm:a,closeUploadForm:u}=window.form,{DefaultSettings:m,Scale:v,setEffectLevel:y,setPinStyles:p,resetEffect:f,applyEffect:E,changeScale:h}=window.editing,{checkArrayLength:L,checkDuplicates:g,checkHashtagsValidity:_,checkHashtagsLength:S}=window.validation,w=document.querySelector("#upload-file"),q=document.querySelector(".img-upload__form"),k=document.querySelector("#upload-cancel"),C=document.querySelector(".scale__control--smaller"),T=document.querySelector(".scale__control--bigger"),M=document.querySelector(".effects"),F=document.querySelector(".effect-level"),U=F.querySelector(".effect-level__pin"),A=F.querySelector(".effect-level__line"),N=document.querySelector(".img-upload__text"),b=document.querySelector(".text__hashtags"),I=document.querySelector(".img-filters"),x=[g,L,S,_];let P;U.addEventListener("mousedown",(()=>{const t=e(A).left,o=A.offsetWidth,n=e=>{e.preventDefault();const n=e.clientX-t;if(n>=0&&n<=o){const e=(n/o).toFixed(2);y(e),p(e)}},r=e=>{e.preventDefault(),document.removeEventListener("mousemove",n),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",n),document.addEventListener("mouseup",r)})),M.addEventListener("click",(e=>{const t=e.target.value;f(),p(m.FACTOR),E(t)})),C.addEventListener("click",(()=>{h(v.MIN,v.MAX,-v.STEP)})),T.addEventListener("click",(()=>{h(v.MIN,v.MAX,v.STEP)})),b.addEventListener("input",(()=>{const e=b.value.trim().split(" ");for(let t=0;t<x.length;t++){if(x[t](e),b.validationMessage){b.style.outline="1px auto red";break}b.style.outline=""}})),w.addEventListener("change",(()=>{a(),f(),p(m.FACTOR),E(m.EFFECT)})),k.addEventListener("click",(()=>{u()})),N.addEventListener("focusin",(()=>{document.removeEventListener("keydown",d)})),N.addEventListener("focusout",(()=>{document.addEventListener("keydown",d)})),q.addEventListener("submit",(e=>{s(n,c,r,new FormData(q)),u(),e.preventDefault()})),s(o,(e=>{P=e,t(P),l()}),r),I.addEventListener("click",(e=>{i(e,P)}))})()})();