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

async function uploadImage(e){var a=new FormData,e=(a.append("file",e),a.append("fkey",StackExchange.options.user.fkey),new URL(location.origin+"/upload/image")),a=await fetch(e,{method:"POST",body:a});if(!a.ok)throw new Error(`Request to ${e.toString()} failed.`);var{Success:e,UploadedImage:t}=await a.json();if(e)return t;throw console.error(a),new Error("Failed to upload image.")}async function handleEvent(e){var a=e.target;if(a.matches("textarea.js-comment-text-input")){e.preventDefault();e=e instanceof ClipboardEvent?(null==(t=e.clipboardData)?void 0:t.items)||(null==(t=e.clipboardData)?void 0:t.files):(null==(t=e.dataTransfer)?void 0:t.items)||(null==(t=e.dataTransfer)?void 0:t.files);if(e){var t=[...e].find(e=>e.type.includes("image/"));if(t){e=t instanceof File?t:t.getAsFile();if(e){t=StackExchange.settings.image.maxImageUploadSizeInBytes;if(!(e.size>=t))try{var n=a.selectionStart,i=a.selectionEnd,o=`[Uploading ${e.name}...]()`,r=(a.setRangeText(o,n,i,"start"),await uploadImage(e)),l=(console.log(r),"enter image description here");a.setRangeText(`[${l}](${r})`,n,n+o.length,"start"),a.setSelectionRange(n+1,n+1+l.length,"forward")}catch(e){console.error(e)}}}}}}window.addEventListener("paste",handleEvent),window.addEventListener("drop",handleEvent);