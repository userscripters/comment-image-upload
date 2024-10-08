// ==UserScript==
// @name           Comment Image Upload
// @author         Oleg Valter <oleg.a.valter@gmail.com>
// @description    Userscript for uploading comment images
// @grant          none
// @homepage       https://github.com/userscripters/comment-image-upload#readme
// @license        GPL-3.0-or-later
// @match          https://stackoverflow.com/questions/*
// @match          https://serverfault.com/questions/*
// @match          https://superuser.com/questions/*
// @match          https://*.stackexchange.com/questions/*
// @match          https://meta.superuser.com/questions/*
// @match          https://meta.serverfault.com/questions/*
// @match          https://askubuntu.com/questions/*
// @match          https://meta.askubuntu.com/questions/*
// @match          https://stackapps.com/questions/*
// @match          https://mathoverflow.net/questions/*
// @match          https://meta.mathoverflow.net/questions/*
// @match          https://pt.stackoverflow.com/questions/*
// @match          https://pt.meta.stackoverflow.com/questions/*
// @match          https://meta.stackoverflow.com/questions/*
// @match          https://ja.stackoverflow.com/questions/*
// @match          https://ja.meta.stackoverflow.com/questions/*
// @match          https://ru.stackoverflow.com/questions/*
// @match          https://ru.meta.stackoverflow.com/questions/*
// @match          https://es.stackoverflow.com/questions/*
// @match          https://es.meta.stackoverflow.com/questions/*
// @match          https://meta.meta.superuser.com/questions/*
// @match          https://meta.meta.serverfault.com/questions/*
// @match          https://meta.meta.askubuntu.com/questions/*
// @match          https://meta.meta.mathoverflow.net/questions/*
// @match          https://pt.meta.meta.stackoverflow.com/questions/*
// @match          https://meta.meta.stackoverflow.com/questions/*
// @match          https://ja.meta.meta.stackoverflow.com/questions/*
// @match          https://ru.meta.meta.stackoverflow.com/questions/*
// @match          https://es.meta.meta.stackoverflow.com/questions/*
// @namespace      userscripters
// @run-at         document-body
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
function findImage(event) {
    const items = event instanceof ClipboardEvent
        ? event.clipboardData?.items || event.clipboardData?.files
        : event.dataTransfer?.items || event.dataTransfer?.files;
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
    return file;
}
async function insertText(file, textarea) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const replaceText = `[Uploading ${file.name}...]()`;
    textarea.setRangeText(replaceText, start, end, "start");
    const imageUrl = await uploadImage(file);
    const linkDescription = "enter image description here";
    textarea.setRangeText(`[${linkDescription}](${imageUrl})`, start, start + replaceText.length, "start");
    textarea.setSelectionRange(start + 1, start + 1 + linkDescription.length, "forward");
}
async function handleEvent(event) {
    const target = event.target;
    if (!target.matches("textarea.js-comment-text-input"))
        return;
    event.preventDefault();
    const file = findImage(event);
    if (!file)
        return;
    try {
        await insertText(file, target);
    }
    catch (error) {
        console.error(error);
    }
}
function appendButton(location) {
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", async () => {
        const file = input.files?.[0];
        const textarea = location.querySelector("textarea.js-comment-text-input");
        if (!file || !textarea)
            return;
        try {
            await insertText(file, textarea);
        }
        catch (error) {
            console.error(error);
        }
    });
    const uploadButton = document.createElement("button");
    uploadButton.classList.add("s-btn", "s-btn__link", "ta-left", "px2");
    uploadButton.type = "button";
    uploadButton.innerText = "Upload image";
    uploadButton.addEventListener("click", () => {
        input.click();
    });
    const helpLink = location.querySelector(".js-comment-help-link");
    if (!helpLink)
        return;
    helpLink.parentElement?.classList.add("g4");
    helpLink.before(uploadButton);
}
(() => {
    window.addEventListener("paste", handleEvent);
    window.addEventListener("drop", handleEvent);
    document
        .querySelectorAll(".js-add-link")
        .forEach((link) => {
        link.addEventListener("click", () => {
            setTimeout(() => {
                const parent = link.closest(".post-layout--right");
                if (!parent)
                    return;
                appendButton(parent);
            }, 200);
        });
    });
})();
