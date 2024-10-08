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
// @run-at         document-body
// @source         git+https://github.com/userscripters/comment-image-upload.git
// @supportURL     https://github.com/userscripters/comment-image-upload/issues
// @version        0.1.0
// ==/UserScript==

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function uploadImage(file) {
    return __awaiter(this, void 0, void 0, function () {
        var body, url, res, _a, success, image;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = new FormData();
                    body.append("file", file);
                    body.append("fkey", StackExchange.options.user.fkey);
                    url = new URL("".concat(location.origin, "/upload/image"));
                    return [4, fetch(url, {
                            method: "POST",
                            body: body,
                        })];
                case 1:
                    res = _b.sent();
                    if (!res.ok) {
                        throw new Error("Request to ".concat(url.toString(), " failed."));
                    }
                    return [4, res.json()];
                case 2:
                    _a = _b.sent(), success = _a.Success, image = _a.UploadedImage;
                    if (!success) {
                        console.error(res);
                        throw new Error("Failed to upload image.");
                    }
                    return [2, image];
            }
        });
    });
}
function findImage(event) {
    var _a, _b, _c, _d;
    var items = event instanceof ClipboardEvent
        ? ((_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.items) || ((_b = event.clipboardData) === null || _b === void 0 ? void 0 : _b.files)
        : ((_c = event.dataTransfer) === null || _c === void 0 ? void 0 : _c.items) || ((_d = event.dataTransfer) === null || _d === void 0 ? void 0 : _d.files);
    if (!items)
        return;
    var image = __spreadArray([], __read(items), false).find(function (item) { return item.type.includes("image/"); });
    if (!image)
        return;
    var file = image instanceof File
        ? image
        : image.getAsFile();
    if (!file) {
        return;
    }
    var maxFileSize = StackExchange.settings.image.maxImageUploadSizeInBytes;
    if (file.size >= maxFileSize) {
        return;
    }
    return file;
}
function insertText(file, textarea) {
    return __awaiter(this, void 0, void 0, function () {
        var start, end, replaceText, imageUrl, linkDescription;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = textarea.selectionStart;
                    end = textarea.selectionEnd;
                    replaceText = "[Uploading ".concat(file.name, "...]()");
                    textarea.setRangeText(replaceText, start, end, "start");
                    return [4, uploadImage(file)];
                case 1:
                    imageUrl = _a.sent();
                    linkDescription = "enter image description here";
                    textarea.setRangeText("[".concat(linkDescription, "](").concat(imageUrl, ")"), start, start + replaceText.length, "start");
                    textarea.setSelectionRange(start + 1, start + 1 + linkDescription.length, "forward");
                    return [2];
            }
        });
    });
}
function handleEvent(event) {
    return __awaiter(this, void 0, void 0, function () {
        var target, file, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    target = event.target;
                    if (!target.matches("textarea.js-comment-text-input"))
                        return [2];
                    event.preventDefault();
                    file = findImage(event);
                    if (!file)
                        return [2];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, insertText(file, target)];
                case 2:
                    _a.sent();
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3, 4];
                case 4: return [2];
            }
        });
    });
}
function appendButton(location) {
    var _this = this;
    var _a;
    var input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", function () { return __awaiter(_this, void 0, void 0, function () {
        var file, textarea, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
                    textarea = location.querySelector("textarea.js-comment-text-input");
                    if (!file || !textarea)
                        return [2];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4, insertText(file, textarea)];
                case 2:
                    _b.sent();
                    return [3, 4];
                case 3:
                    error_2 = _b.sent();
                    console.error(error_2);
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); });
    var uploadButton = document.createElement("button");
    uploadButton.classList.add("s-btn", "s-btn__link", "ta-left", "px2");
    uploadButton.type = "button";
    uploadButton.innerText = "Upload image";
    uploadButton.addEventListener("click", function () {
        input.click();
    });
    var helpLink = location.querySelector(".js-comment-help-link");
    if (!helpLink)
        return;
    (_a = helpLink.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("g4");
    helpLink.before(uploadButton);
}
(function () {
    window.addEventListener("paste", handleEvent);
    window.addEventListener("drop", handleEvent);
    document
        .querySelectorAll(".js-add-link")
        .forEach(function (link) {
        link.addEventListener("click", function () {
            setTimeout(function () {
                var parent = link.closest(".post-layout--right");
                if (!parent)
                    return;
                appendButton(parent);
            }, 200);
        });
    });
})();
