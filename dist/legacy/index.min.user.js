// ==UserScript==
// @name           Comment Image Upload
// @author         Oleg Valter <oleg.a.valter@gmail.com>
// @description    Userscript for uploading comment images
// @grant          none
// @homepage       https://github.com/userscripters/comment-image-upload#readme
// @match          https://stackoverflow.com/questions/*
// @match          https://serverfault.com/questions/*
// @match          https://superuser.com/questions/*
// @match          https://*.stackexchange.com/questions/*
// @match          https://askubuntu.com/questions/*
// @match          https://stackapps.com/questions/*
// @match          https://mathoverflow.net/questions/*
// @match          https://pt.stackoverflow.com/questions/*
// @match          https://ja.stackoverflow.com/questions/*
// @match          https://ru.stackoverflow.com/questions/*
// @match          https://es.stackoverflow.com/questions/*
// @match          https://meta.stackoverflow.com/questions/*
// @match          https://meta.serverfault.com/questions/*
// @match          https://meta.superuser.com/questions/*
// @match          https://meta.askubuntu.com/questions/*
// @match          https://meta.mathoverflow.net/questions/*
// @match          https://pt.meta.stackoverflow.com/questions/*
// @match          https://ja.meta.stackoverflow.com/questions/*
// @match          https://ru.meta.stackoverflow.com/questions/*
// @match          https://es.meta.stackoverflow.com/questions/*
// @namespace      userscripters
// @run-at         document-start
// @source         git+https://github.com/userscripters/comment-image-upload.git
// @supportURL     https://github.com/userscripters/comment-image-upload/issues
// @version        0.1.0
// ==/UserScript==

var __awaiter=this&&this.__awaiter||function(e,i,l,c){return new(l=l||Promise)(function(n,t){function r(e){try{o(c.next(e))}catch(e){t(e)}}function a(e){try{o(c.throw(e))}catch(e){t(e)}}function o(e){var t;e.done?n(e.value):((t=e.value)instanceof l?t:new l(function(e){e(t)})).then(r,a)}o((c=c.apply(e,i||[])).next())})},__generator=this&&this.__generator||function(r,a){var o,i,l,c={label:0,sent:function(){if(1&l[0])throw l[1];return l[1]},trys:[],ops:[]},s={next:e(0),throw:e(1),return:e(2)};return"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function e(n){return function(e){var t=[n,e];if(o)throw new TypeError("Generator is already executing.");for(;c=s&&t[s=0]?0:c;)try{if(o=1,i&&(l=2&t[0]?i.return:t[0]?i.throw||((l=i.return)&&l.call(i),0):i.next)&&!(l=l.call(i,t[1])).done)return l;switch(i=0,(t=l?[2&t[0],l.value]:t)[0]){case 0:case 1:l=t;break;case 4:return c.label++,{value:t[1],done:!1};case 5:c.label++,i=t[1],t=[0];continue;case 7:t=c.ops.pop(),c.trys.pop();continue;default:if(!(l=0<(l=c.trys).length&&l[l.length-1])&&(6===t[0]||2===t[0])){c=0;continue}if(3===t[0]&&(!l||t[1]>l[0]&&t[1]<l[3]))c.label=t[1];else if(6===t[0]&&c.label<l[1])c.label=l[1],l=t;else{if(!(l&&c.label<l[2])){l[2]&&c.ops.pop(),c.trys.pop();continue}c.label=l[2],c.ops.push(t)}}t=a.call(r,c)}catch(e){t=[6,e],i=0}finally{o=l=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}}},__read=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,o=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=o.next()).done;)i.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=o.return)&&n.call(o)}finally{if(a)throw a.error}}return i},__spreadArray=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,o=t.length;a<o;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))};function uploadImage(i){return __awaiter(this,void 0,void 0,function(){var t,n,r,a,o;return __generator(this,function(e){switch(e.label){case 0:return(r=new FormData).append("file",i),r.append("fkey",StackExchange.options.user.fkey),t=new URL("".concat(location.origin,"/upload/image")),[4,fetch(t,{method:"POST",body:r})];case 1:if((n=e.sent()).ok)return[4,n.json()];throw new Error("Request to ".concat(t.toString()," failed."));case 2:if(r=e.sent(),a=r.Success,o=r.UploadedImage,a)return[2,o];throw console.error(n),new Error("Failed to upload image.")}})})}function handleEvent(u){return __awaiter(this,void 0,void 0,function(){var t,n,r,a,o,i,l,c,s;return __generator(this,function(e){switch(e.label){case 0:if(!(t=u.target).matches("textarea.js-comment-text-input"))return[2];if(u.preventDefault(),!(s=u instanceof ClipboardEvent?(null==(c=u.clipboardData)?void 0:c.items)||(null==(c=u.clipboardData)?void 0:c.files):(null==(c=u.dataTransfer)?void 0:c.items)||(null==(s=u.dataTransfer)?void 0:s.files)))return[2];if(!(n=__spreadArray([],__read(s),!1).find(function(e){return e.type.includes("image/")})))return[2];if(!(n=n instanceof File?n:n.getAsFile()))return[2];if(a=StackExchange.settings.image.maxImageUploadSizeInBytes,n.size>=a)return[2];e.label=1;case 1:return e.trys.push([1,3,,4]),r=t.selectionStart,a=t.selectionEnd,o="[Uploading ".concat(n.name,"...]()"),t.setRangeText(o,r,a,"start"),[4,uploadImage(n)];case 2:return l=e.sent(),console.log(l),i="enter image description here",t.setRangeText("[".concat(i,"](").concat(l,")"),r,r+o.length,"start"),t.setSelectionRange(r+1,r+1+i.length,"forward"),[3,4];case 3:return l=e.sent(),console.error(l),[3,4];case 4:return[2]}})})}window.addEventListener("paste",handleEvent),window.addEventListener("drop",handleEvent);