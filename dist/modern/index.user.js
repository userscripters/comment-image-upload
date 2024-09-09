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

"use strict";
async function uploadImage(file) {
    const body = new FormData();
    body.append("file", file);
    body.append("fkey", StackExchange.options.user.fkey);
    const url = new URL(`${location.origin}/upload/image`);
    const res = await fetch(url, {
        method: "POST",
        body,
    });
    if (!res.ok) {
        throw new Error(`Request to ${url.toString()} failed.`);
    }
    const { Success: success, UploadedImage: image, } = await res.json();
    if (!success) {
        console.error(res);
        throw new Error("Failed to upload image.");
    }
    return image;
}
async function handleEvent(event) {
    var _a, _b, _c, _d;
    const target = event.target;
    if (!target.matches("textarea.js-comment-text-input"))
        return;
    event.preventDefault();
    const items = event instanceof ClipboardEvent
        ? ((_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.items) || ((_b = event.clipboardData) === null || _b === void 0 ? void 0 : _b.files)
        : ((_c = event.dataTransfer) === null || _c === void 0 ? void 0 : _c.items) || ((_d = event.dataTransfer) === null || _d === void 0 ? void 0 : _d.files);
    if (!items)
        return;
    const image = [...items].find(item => item.type.includes("image/"));
    if (!image)
        return;
    const file = image instanceof File
        ? image
        : image.getAsFile();
    if (!file) {
        return;
    }
    const maxFileSize = StackExchange.settings.image.maxImageUploadSizeInBytes;
    if (file.size >= maxFileSize) {
        return;
    }
    try {
        const start = target.selectionStart;
        const end = target.selectionEnd;
        const replaceText = `[Uploading ${file.name}...]()`;
        target.setRangeText(replaceText, start, end, "start");
        const imageUrl = await uploadImage(file);
        console.log(imageUrl);
        const linkDescription = "enter image description here";
        target.setRangeText(`[${linkDescription}](${imageUrl})`, start, start + replaceText.length, "start");
        target.setSelectionRange(start + 1, start + 1 + linkDescription.length, "forward");
    }
    catch (error) {
        console.error(error);
    }
}
(() => {
    window.addEventListener("paste", handleEvent);
    window.addEventListener("drop", handleEvent);
})();
