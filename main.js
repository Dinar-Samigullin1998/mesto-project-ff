(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("mousedown",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("mousedown",r)}function n(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");n&&t(n)}}function r(e){e.target.classList.contains("popup")&&t(e.target)}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-30",headers:{authorization:"0ab4c9cd-2905-462f-b972-f5c51f2695c1","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},i=function(){return fetch("".concat(o.baseUrl,"/users/me"),{method:"GET",headers:o.headers}).then(c)};function u(e,t,n){var r=t.classList.contains("card__like-button_is-active");likeCardApi(e,!r).then((function(e){n.textContent=e.likes.length,t.classList.toggle("card__like-button_is-active")})).catch((function(e){console.error("Ошибка при изменении состояния лайка:",e)}))}function a(e,t){console.log("Удаление карточки с ID: ".concat(t)),e.remove()}var l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},s=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){var r=e.querySelector(".".concat(n.id,"-error"));n.classList.remove(t.inputErrorClass),r.textContent=""})),r.classList.add(t.inactiveButtonClass),r.disabled=!0};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p=document.querySelector(".popup_type_edit"),f=document.querySelector(".popup_type_new-card"),_=document.querySelector(".popup_type_image"),m=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),v=p.querySelector(".popup__close"),S=f.querySelector(".popup__close"),b=_.querySelector(".popup__close"),h=document.forms["edit-profile"],q=document.querySelector(".popup__input_type_name"),L=document.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__title"),E=document.querySelector(".profile__description"),k=document.forms["new-place"],g=(document.querySelector(".places__list"),k.querySelector(".popup__input_type_card-name"),k.querySelector(".popup__input_type_url"),_.querySelector(".popup__image"),_.querySelector(".popup__caption"),{formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),x=document.querySelector(".profile__image");m.addEventListener("click",(function(){q.value=C.textContent,L.value=E.textContent,s(h,g),e(p)})),y.addEventListener("click",(function(){k.reset(),s(k,g),e(f)})),v.addEventListener("click",(function(){return t(p)})),S.addEventListener("click",(function(){return t(f)})),b.addEventListener("click",(function(){return t(_)})),h.addEventListener("submit",(function(e){e.preventDefault();var n=p.querySelector(".popup__button");n.textContent="Сохранение...";var r=q.value,o=L.value;updateUserInfo(r,o).then((function(e){r.textContent=e.name,o.textContent=e.about,t(p)})).catch((function(e){console.error("Ошибка при сохранении данных профиля:",e)})).finally((function(){n.textContent="Сохранить"}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));r.textContent="",t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass)}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));o.textContent=n,t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))})),l(n,r,t)}(t,e)}))}(g),i().then((function(e){!function(e,t,n,r){e.textContent=r.name,t.textContent=r.about,n.style.backgroundImage="url(".concat(r.avatar,")")}(C,E,x,e)})).catch((function(e){console.log(e)})),Promise.all([i(),fetch("".concat(o.baseUrl,"/cards"),{method:"GET",headers:o.headers}).then(c)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,i,u=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return u}}(n,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0];!function(e,t,n,r,o){var c=document.querySelector(".places__list");c.innerHTML="",e.forEach((function(e){var i=function(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),i=c.querySelector(".card__image"),u=c.querySelector(".card__title"),a=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".card__like-counter");return i.src=e.link,i.alt=e.name,u.textContent=e.name,e.owner._id!==o?a.remove():a.addEventListener("click",(function(){return t(c,e._id)})),e.likes.some((function(e){return e._id===o}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){return n(e._id,l,s)})),i.addEventListener("click",(function(){return r({name:e.name,link:e.link})})),c}(e,n,r,t,o);c.append(i)}))}(o[1],e,a,u,c._id)})).catch((function(e){console.log(e)}))})();