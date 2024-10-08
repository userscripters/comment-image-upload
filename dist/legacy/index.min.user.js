// ==UserScript==
// @name            Comment Image Upload
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @contributors    double beep (https://github.com/double-beep)
// @description     Userscript for uploading comment images
// @grant           none
// @homepage        https://github.com/userscripters/comment-image-upload#readme
// @license         GPL-3.0-or-later
// @match           https://stackoverflow.com/questions/*
// @match           https://serverfault.com/questions/*
// @match           https://superuser.com/questions/*
// @match           https://*.stackexchange.com/questions/*
// @match           https://meta.superuser.com/questions/*
// @match           https://meta.serverfault.com/questions/*
// @match           https://askubuntu.com/questions/*
// @match           https://meta.askubuntu.com/questions/*
// @match           https://stackapps.com/questions/*
// @match           https://mathoverflow.net/questions/*
// @match           https://meta.mathoverflow.net/questions/*
// @match           https://pt.stackoverflow.com/questions/*
// @match           https://pt.meta.stackoverflow.com/questions/*
// @match           https://meta.stackoverflow.com/questions/*
// @match           https://ja.stackoverflow.com/questions/*
// @match           https://ja.meta.stackoverflow.com/questions/*
// @match           https://ru.stackoverflow.com/questions/*
// @match           https://ru.meta.stackoverflow.com/questions/*
// @match           https://es.stackoverflow.com/questions/*
// @match           https://es.meta.stackoverflow.com/questions/*
// @match           https://meta.meta.superuser.com/questions/*
// @match           https://meta.meta.serverfault.com/questions/*
// @match           https://meta.meta.askubuntu.com/questions/*
// @match           https://meta.meta.mathoverflow.net/questions/*
// @match           https://pt.meta.meta.stackoverflow.com/questions/*
// @match           https://meta.meta.stackoverflow.com/questions/*
// @match           https://ja.meta.meta.stackoverflow.com/questions/*
// @match           https://ru.meta.meta.stackoverflow.com/questions/*
// @match           https://es.meta.meta.stackoverflow.com/questions/*
// @namespace       userscripters
// @run-at          document-body
// @source          git+https://github.com/userscripters/comment-image-upload.git
// @supportURL      https://github.com/userscripters/comment-image-upload/issues
// @version         0.2.0
// ==/UserScript==

var __awaiter=this&&this.__awaiter||function(e,i,c,l){return new(c=c||Promise)(function(n,t){function r(e){try{o(l.next(e))}catch(e){t(e)}}function a(e){try{o(l.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?n(e.value):((t=e.value)instanceof c?t:new c(function(e){e(t)})).then(r,a)}o((l=l.apply(e,i||[])).next())})},__generator=this&&this.__generator||function(r,a){var o,i,c,l={label:0,sent:function(){if(1&c[0])throw c[1];return c[1]},trys:[],ops:[]},s=Object.create(("function"==typeof Iterator?Iterator:Object).prototype);return s.next=e(0),s.throw=e(1),s.return=e(2),"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function e(n){return function(e){var t=[n,e];if(o)throw new TypeError("Generator is already executing.");for(;l=s&&t[s=0]?0:l;)try{if(o=1,i&&(c=2&t[0]?i.return:t[0]?i.throw||((c=i.return)&&c.call(i),0):i.next)&&!(c=c.call(i,t[1])).done)return c;switch(i=0,(t=c?[2&t[0],c.value]:t)[0]){case 0:case 1:c=t;break;case 4:return l.label++,{value:t[1],done:!1};case 5:l.label++,i=t[1],t=[0];continue;case 7:t=l.ops.pop(),l.trys.pop();continue;default:if(!(c=0<(c=l.trys).length&&c[c.length-1])&&(6===t[0]||2===t[0])){l=0;continue}if(3===t[0]&&(!c||t[1]>c[0]&&t[1]<c[3]))l.label=t[1];else if(6===t[0]&&l.label<c[1])l.label=c[1],c=t;else{if(!(c&&l.label<c[2])){c[2]&&l.ops.pop(),l.trys.pop();continue}l.label=c[2],l.ops.push(t)}}t=a.call(r,l)}catch(e){t=[6,e],i=0}finally{o=c=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}},__read=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},__spreadArray=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,o=t.length;a<o;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))};function uploadImage(i){return __awaiter(this,void 0,void 0,function(){var t,n,r,a,o;return __generator(this,function(e){switch(e.label){case 0:return(r=new FormData).append("file",i),r.append("fkey",StackExchange.options.user.fkey),t=new URL("".concat(location.origin,"/upload/image")),[4,fetch(t,{method:"POST",body:r})];case 1:if((n=e.sent()).ok)return[4,n.json()];throw new Error("Request to ".concat(t.toString()," failed."));case 2:if(r=e.sent(),a=r.Success,o=r.UploadedImage,a)return[2,o];throw console.error(n),new Error("Failed to upload image.")}})})}function findImage(e){e=e instanceof ClipboardEvent?(null==(t=e.clipboardData)?void 0:t.items)||(null==(t=e.clipboardData)?void 0:t.files):(null==(t=e.dataTransfer)?void 0:t.items)||(null==(t=e.dataTransfer)?void 0:t.files);if(e){var t=__spreadArray([],__read(e),!1).find(function(e){return e.type.includes("image/")});if(t){e=t instanceof File?t:t.getAsFile();if(e){t=StackExchange.settings.image.maxImageUploadSizeInBytes;if(!(e.size>=t))return e}}}}function insertText(o,i){return __awaiter(this,void 0,void 0,function(){var t,n,r,a;return __generator(this,function(e){switch(e.label){case 0:return t=i.selectionStart,r=i.selectionEnd,n="[Uploading ".concat(o.name,"...]()"),i.setRangeText(n,t,r,"start"),[4,uploadImage(o)];case 1:return r=e.sent(),a="enter image description here",i.setRangeText("[".concat(a,"](").concat(r,")"),t,t+n.length,"start"),i.setSelectionRange(t+1,t+1+a.length,"forward"),[2]}})})}function handleEvent(a){return __awaiter(this,void 0,void 0,function(){var t,n,r;return __generator(this,function(e){switch(e.label){case 0:if(!(t=a.target).matches("textarea.js-comment-text-input"))return[2];if(a.preventDefault(),!(n=findImage(a)))return[2];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,insertText(n,t)];case 2:return e.sent(),[3,4];case 3:return r=e.sent(),console.error(r),[3,4];case 4:return[2]}})})}function appendButton(a){var e,t=this,o=document.createElement("input"),n=(o.type="file",o.addEventListener("change",function(){return __awaiter(t,void 0,void 0,function(){var t,n,r;return __generator(this,function(e){switch(e.label){case 0:if(r=null==(r=o.files)?void 0:r[0],t=a.querySelector("textarea.js-comment-text-input"),!r||!t)return[2];e.label=1;case 1:return e.trys.push([1,3,,4]),[4,insertText(r,t)];case 2:return e.sent(),[3,4];case 3:return n=e.sent(),console.error(n),[3,4];case 4:return[2]}})})}),document.createElement("button")),r=(n.classList.add("s-btn","s-btn__link","ta-left","px2"),n.type="button",n.innerText="Upload image",n.addEventListener("click",function(){o.click()}),a.querySelector(".js-comment-help-link"));r&&(null!=(e=r.parentElement)&&e.classList.add("g4"),r.before(n))}window.addEventListener("paste",handleEvent),window.addEventListener("drop",handleEvent),document.querySelectorAll(".js-add-link").forEach(function(t){t.addEventListener("click",function(){setTimeout(function(){var e=t.closest(".post-layout--right");e&&appendButton(e)},200)})});