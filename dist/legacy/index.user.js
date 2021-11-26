// ==UserScript==
// @author          Oleg Valter <oleg.a.valter@gmail.com>
// @description     Userscript for uploading comment images
// @grant           none
// @homepage        https://github.com/userscripters/comment-image-upload#readme
// @match           https://*.stackexchange.com/question/*
// @match           https://askubuntu.com/question/*
// @match           https://es.stackoverflow.com/question/*
// @match           https://ja.stackoverflow.com/question/*
// @match           https://mathoverflow.net/question/*
// @match           https://pt.stackoverflow.com/question/*
// @match           https://ru.stackoverflow.com/question/*
// @match           https://serverfault.com/question/*
// @match           https://stackapps.com/question/*
// @match           https://stackoverflow.com/question/*
// @match           https://superuser.com/question/*
// @name            Comment Image Upload
// @namespace       userscripters
// @run-at          document-start
// @source          git+https://github.com/userscripters/comment-image-upload.git
// @supportURL      https://github.com/userscripters/comment-image-upload/issues
// @version         0.1.0
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
        while (_) try {
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
(function (w, d) {
    var makeStacksButton = function (id, text, _a) {
        var _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.classes, classes = _d === void 0 ? [] : _d, title = _c.title, _f = _c.danger, danger = _f === void 0 ? false : _f, _g = _c.loading, loading = _g === void 0 ? false : _g, _h = _c.muted, muted = _h === void 0 ? false : _h, _j = _c.primary, primary = _j === void 0 ? false : _j, _k = _c.type, type = _k === void 0 ? "filled" : _k;
        var btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        (_b = btn.classList).add.apply(_b, __spreadArray(["s-btn", "s-btn__".concat(type)], __read(classes), false));
        btn.setAttribute("role", "button");
        btn.setAttribute("aria-label", title || text);
        if (danger)
            btn.classList.add("s-btn__danger");
        if (muted)
            btn.classList.add("s-btn__muted");
        if (primary)
            btn.classList.add("s-btn__primary");
        if (loading)
            btn.classList.add("is-loading");
        if (title) {
            btn.title = title;
        }
        return btn;
    };
    var makeStacksModal = function (id, title, _a) {
        var _b;
        var _c = _a === void 0 ? {} : _a, _d = _c.classes, classes = _d === void 0 ? [] : _d, _f = _c.danger, danger = _f === void 0 ? false : _f, _g = _c.fullscreen, fullscreen = _g === void 0 ? false : _g;
        var ariaLabelId = "modal-title";
        var ariaDescrId = "modal-description";
        var wrap = document.createElement("aside");
        (_b = wrap.classList).add.apply(_b, __spreadArray(["s-modal"], __read(classes), false));
        wrap.id = id;
        wrap.tabIndex = -1;
        wrap.setAttribute("role", "dialog");
        wrap.setAttribute("aria-labelledby", ariaLabelId);
        wrap.setAttribute("aria-describeddy", ariaDescrId);
        wrap.setAttribute("aria-hidden", "true");
        if (danger)
            wrap.classList.add("s-modal__danger");
        var dataset = wrap.dataset;
        dataset.sModalTarget = "modal";
        dataset.controller = "s-modal";
        var doc = document.createElement("div");
        doc.classList.add("s-modal--dialog", "ps-relative", "hmx6", "w90");
        doc.setAttribute("role", "document");
        doc.id = "".concat(id, "-document");
        if (fullscreen)
            doc.classList.add("s-modal__full");
        var ttl = document.createElement("h1");
        ttl.classList.add("s-modal--header");
        ttl.id = ariaLabelId;
        ttl.textContent = title;
        var close = document.createElement("button");
        close.classList.add("s-modal--close", "s-btn", "s-btn__muted");
        close.type = "button";
        close.dataset.action = "s-modal#hide";
        var svgNS = "http://www.w3.org/2000/svg";
        var closeIcon = document.createElementNS(svgNS, "svg");
        closeIcon.setAttribute("aria-hidden", "true");
        closeIcon.setAttribute("viewBox", "0 0 14 14");
        closeIcon.setAttribute("width", "14");
        closeIcon.setAttribute("height", "14");
        closeIcon.classList.add("svg-icon", "iconClearSm");
        var iconPath = document.createElementNS(svgNS, "path");
        iconPath.setAttribute("d", "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z");
        closeIcon.append(iconPath);
        close.append(closeIcon);
        doc.append(ttl, close);
        wrap.append(doc);
        return wrap;
    };
    var makeStacksUploader = function (id, label, _a) {
        var uploader = _a.uploader, resetter = _a.resetter, onReset = _a.onReset, onUpload = _a.onUpload;
        var upl = document.createElement("div");
        var lbl = document.createElement("label");
        lbl.classList.add("d-block", "s-label", "mb4");
        lbl.htmlFor = id;
        lbl.textContent = label;
        var wrap = document.createElement("div");
        wrap.dataset.controller = "s-uploader";
        var inputWrap = document.createElement("div");
        inputWrap.classList.add("s-uploader", "mb24", "wmx3");
        inputWrap.dataset.target = "s-uploader.uploader";
        var input = document.createElement("input");
        input.classList.add("s-uploader--input");
        input.id = id;
        input.type = "file";
        input.dataset.action = "input->s-uploader#handleInput";
        input.setAttribute("data-s-uploader-target", "input");
        var previews = document.createElement("div");
        previews.classList.add("s-uploader--previews", "d-none");
        previews.dataset.target = "s-uploader.previews";
        previews.toggleAttribute("data-s-uploader-show-on-input");
        var actionWrap = document.createElement("div");
        var uploadBtn = makeStacksButton.apply(void 0, __spreadArray(__spreadArray([], __read(uploader), false), [{
                classes: ["s-btn", "s-btn__primary"],
            }], false));
        uploadBtn.disabled = true;
        uploadBtn.toggleAttribute("data-s-uploader-enable-on-input");
        uploadBtn.addEventListener("click", function (event) {
            return onUpload(event, input.files);
        });
        var resetBtn = makeStacksButton.apply(void 0, __spreadArray(__spreadArray([], __read(resetter), false), [{
                classes: ["s-btn", "d-none"],
            }], false));
        resetBtn.dataset.action = "click->s-uploader#reset";
        resetBtn.toggleAttribute("data-s-uploader-show-on-input");
        resetBtn.addEventListener("click", function (event) {
            return onReset === null || onReset === void 0 ? void 0 : onReset(event, input.files);
        });
        actionWrap.append(uploadBtn, resetBtn);
        wrap.append(inputWrap, actionWrap);
        inputWrap.append(input, previews);
        upl.append(lbl, wrap);
        return upl;
    };
    w.addEventListener("load", function () {
        var _a;
        var uploadModal = makeStacksModal("comment-image-modal", "Image Uploader");
        document.body.append(uploadModal);
        var uploader = makeStacksUploader("comment-image-uploader", "Upload an Image", {
            resetter: ["reset-uploader", "Reset"],
            uploader: ["submit-uploader", "Upload"],
            onUpload: function (_e, files) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, file, body, hostname, url, res, _b, Success, UploadedImage, imageMDlink, field, updateEvent;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!files)
                                return [2];
                            _a = __read(files, 1), file = _a[0];
                            body = new FormData();
                            body.append("file", file);
                            body.append("fkey", StackExchange.options.user.fkey);
                            hostname = w.location.hostname;
                            url = new URL("https://".concat(hostname, "/upload/image"));
                            url.search = new URLSearchParams({
                                method: "json",
                            }).toString();
                            return [4, fetch(url.toString(), {
                                    method: "POST",
                                    body: body,
                                })];
                        case 1:
                            res = _c.sent();
                            if (!res.ok)
                                return [2];
                            return [4, res.json()];
                        case 2:
                            _b = (_c.sent()), Success = _b.Success, UploadedImage = _b.UploadedImage;
                            if (!Success)
                                return [2];
                            imageMDlink = "[](".concat(UploadedImage, ")");
                            field = d.querySelector("textarea[name='comment']");
                            if (!field)
                                return [2];
                            updateEvent = new Event("keyup", { bubbles: true });
                            field.textContent += imageMDlink;
                            field.dispatchEvent(updateEvent);
                            Stacks.hideModal(uploadModal);
                            return [2];
                    }
                });
            }); },
        });
        (_a = uploadModal.querySelector(".s-modal--dialog")) === null || _a === void 0 ? void 0 : _a.append(uploader);
        var addUploadButton = function () {
            var commentFields = d.querySelectorAll("div.js-comment-text-input-container");
            commentFields.forEach(function (field, i) {
                if (field.querySelector("[id^='upload-']"))
                    return;
                var button = makeStacksButton("upload-".concat(i), "Upload image", {
                    primary: true,
                });
                button.addEventListener("click", function () {
                    Stacks.showModal(uploadModal);
                });
                field.append(button);
            });
        };
        var obs = new MutationObserver(function (rs) {
            var nodes = rs.flatMap(function (_a) {
                var addedNodes = _a.addedNodes;
                return __spreadArray([], __read(addedNodes), false);
            });
            var addingCommentInput = nodes.some(function (node) {
                return node.nodeType !== 3 &&
                    node.matches("textarea[name='comment']");
            });
            if (!addingCommentInput)
                return;
            addUploadButton();
        });
        obs.observe(d.body, {
            childList: true,
            subtree: true,
        });
        addUploadButton();
    });
})(window, document);
