// ==UserScript==
// @name            Comment Image Upload
// @namespace       userscripters
// @version         0.2.0
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @contributors    double beep (https://github.com/double-beep)
// @description     Userscript for uploading comment images
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
// @grant           none
// @run-at          document-body
// @supportURL      https://github.com/userscripters/comment-image-upload/issues
// @source          git+https://github.com/userscripters/comment-image-upload.git
// @homepage        https://github.com/userscripters/comment-image-upload#readme
// ==/UserScript==

async function uploadImage(e){var t=new FormData,e=(t.append("file",e),t.append("fkey",StackExchange.options.user.fkey),new URL(location.origin+"/upload/image")),t=await fetch(e,{method:"POST",body:t});if(!t.ok)throw new Error(`Request to ${e.toString()} failed.`);var{Success:e,UploadedImage:a}=await t.json();if(e)return a;throw console.error(t),new Error("Failed to upload image.")}function findImage(e){e=e instanceof ClipboardEvent?e.clipboardData?.items||e.clipboardData?.files:e.dataTransfer?.items||e.dataTransfer?.files;if(e){e=[...e].find(e=>e.type.includes("image/"));if(e){e=e instanceof File?e:e.getAsFile();if(e){var t=StackExchange.settings.image.maxImageUploadSizeInBytes;if(!(e.size>=t))return e}}}}async function insertText(e,t){var a=t.selectionStart,n=`[Uploading ${e.name}...]()`,e=(t.setRangeText(n,a,t.selectionEnd,"start"),await uploadImage(e)),i="enter image description here";t.setRangeText(`[${i}](${e})`,a,a+n.length,"start"),t.setSelectionRange(a+1,a+1+i.length,"forward")}async function handleEvent(e){var t=e.target;if(t.matches("textarea.js-comment-text-input")){e.preventDefault();e=findImage(e);if(e)try{await insertText(e,t)}catch(e){console.error(e)}}}function appendButton(a){let n=document.createElement("input");n.type="file",n.addEventListener("change",async()=>{var e=n.files?.[0],t=a.querySelector("textarea.js-comment-text-input");if(e&&t)try{await insertText(e,t)}catch(e){console.error(e)}});var e=document.createElement("button"),t=(e.classList.add("s-btn","s-btn__link","ta-left","px2"),e.type="button",e.innerText="Upload image",e.addEventListener("click",()=>{n.click()}),a.querySelector(".js-comment-help-link"));t&&(t.parentElement?.classList.add("g4"),t.before(e))}window.addEventListener("paste",handleEvent),window.addEventListener("drop",handleEvent),document.querySelectorAll(".js-add-link").forEach(t=>{t.addEventListener("click",()=>{setTimeout(()=>{var e=t.closest(".post-layout--right");e&&appendButton(e)},200)})});