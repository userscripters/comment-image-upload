((w, d) => {
    interface StacksCommonOptions {
        classes?: string[];
    }

    type ButtonType = "outlined" | "link" | "filled";

    type StacksIconButtonOptions = StacksCommonOptions & {
        title?: string;
        muted?: boolean;
        type?: ButtonType;
        primary?: boolean;
        danger?: boolean;
        loading?: boolean;
    };

    interface StacksUploaderOptions {
        uploader: [id: string, text: string];
        resetter: [id: string, text: string];
        onReset?: (
            ev: MouseEvent,
            val: FileList | null
        ) => void | Promise<void>;
        onUpload: (
            ev: MouseEvent,
            val: FileList | null
        ) => void | Promise<void>;
    }

    interface ImageUploadResponse {
        Success: boolean;
        Error: number;
        UploadedImage: string;
    }

    type StacksModalOptions = StacksCommonOptions & {
        danger?: boolean;
        fullscreen?: boolean;
    };

    const makeStacksButton = (
        id: string,
        text: string,
        {
            classes = [],
            title,
            danger = false,
            loading = false,
            muted = false,
            primary = false,
            type = "filled",
        }: StacksIconButtonOptions = {},
    ) => {
        const btn = document.createElement("button");
        btn.id = id;
        btn.textContent = text;
        btn.classList.add("s-btn", `s-btn__${type}`, ...classes);
        btn.setAttribute("role", "button");
        btn.setAttribute("aria-label", title || text);

        if (danger) btn.classList.add("s-btn__danger");
        if (muted) btn.classList.add("s-btn__muted");
        if (primary) btn.classList.add("s-btn__primary");
        if (loading) btn.classList.add("is-loading");

        if (title) {
            btn.title = title;
        }

        return btn;
    };

    /**
     * @see https://stackoverflow.design/product/components/modals/
     *
     * @summary creates a Stacks modal
     * @param {string} id id of the modal
     * @param {string} title modal title
     * @param {StacksModalOptions} options modal configuration
     * @returns {HTMLElement}
     */

    const makeStacksModal = (
        id: string,
        title: string,
        {
            classes = [],
            danger = false,
            fullscreen = false,
        }: StacksModalOptions = {},
    ): HTMLElement => {
        const ariaLabelId = "modal-title";
        const ariaDescrId = "modal-description";

        const wrap = document.createElement("aside");
        wrap.classList.add("s-modal", ...classes);
        wrap.id = id;
        wrap.tabIndex = -1;
        wrap.setAttribute("role", "dialog");
        wrap.setAttribute("aria-labelledby", ariaLabelId);
        wrap.setAttribute("aria-describeddy", ariaDescrId);
        wrap.setAttribute("aria-hidden", "true");

        if (danger) wrap.classList.add("s-modal__danger");

        const { dataset } = wrap;
        dataset.sModalTarget = "modal";
        dataset.controller = "s-modal";

        const doc = document.createElement("div");
        doc.classList.add("s-modal--dialog", "ps-relative", "hmx6", "w90");
        doc.setAttribute("role", "document");
        doc.id = `${id}-document`;

        if (fullscreen) doc.classList.add("s-modal__full");

        const ttl = document.createElement("h1");
        ttl.classList.add("s-modal--header");
        ttl.id = ariaLabelId;
        ttl.textContent = title;

        const close = document.createElement("button");
        close.classList.add("s-modal--close", "s-btn", "s-btn__muted");
        close.type = "button";
        close.dataset.action = "s-modal#hide";

        const svgNS = "http://www.w3.org/2000/svg";

        const closeIcon = document.createElementNS(svgNS, "svg");
        closeIcon.setAttribute("aria-hidden", "true");
        closeIcon.setAttribute("viewBox", "0 0 14 14");
        closeIcon.setAttribute("width", "14");
        closeIcon.setAttribute("height", "14");
        closeIcon.classList.add("svg-icon", "iconClearSm");

        const iconPath = document.createElementNS(svgNS, "path");
        iconPath.setAttribute(
            "d",
            "M12 3.41 10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7 12 3.41z",
        );

        closeIcon.append(iconPath);
        close.append(closeIcon);
        doc.append(ttl, close);
        wrap.append(doc);
        return wrap;
    };

    const makeStacksUploader = (
        id: string,
        label: string,
        { uploader, resetter, onReset, onUpload }: StacksUploaderOptions,
    ) => {
        const upl = document.createElement("div");

        const lbl = document.createElement("label");
        lbl.classList.add("d-block", "s-label", "mb4");
        lbl.htmlFor = id;
        lbl.textContent = label;

        const wrap = document.createElement("div");
        wrap.dataset.controller = "s-uploader";

        const inputWrap = document.createElement("div");
        inputWrap.classList.add("s-uploader", "mb24", "wmx3");
        inputWrap.dataset.target = "s-uploader.uploader";

        const input = document.createElement("input");
        input.classList.add("s-uploader--input");
        input.id = id;
        input.type = "file";
        input.dataset.action = "input->s-uploader#handleInput";
        input.setAttribute("data-s-uploader-target", "input");

        const previews = document.createElement("div");
        previews.classList.add("s-uploader--previews", "d-none");
        previews.dataset.target = "s-uploader.previews";
        previews.toggleAttribute("data-s-uploader-show-on-input");

        const actionWrap = document.createElement("div");

        const uploadBtn = makeStacksButton(...uploader, {
            classes: ["s-btn", "s-btn__primary"],
        });
        uploadBtn.disabled = true;
        uploadBtn.toggleAttribute("data-s-uploader-enable-on-input");
        uploadBtn.addEventListener("click", event =>
            onUpload(event, input.files),
        );

        const resetBtn = makeStacksButton(...resetter, {
            classes: ["s-btn", "d-none"],
        });
        resetBtn.dataset.action = "click->s-uploader#reset";
        resetBtn.toggleAttribute("data-s-uploader-show-on-input");
        resetBtn.addEventListener("click", event =>
            onReset?.(event, input.files),
        );

        actionWrap.append(uploadBtn, resetBtn);
        wrap.append(inputWrap, actionWrap);
        inputWrap.append(input, previews);
        upl.append(lbl, wrap);
        return upl;
    };

    w.addEventListener("load", () => {
        const uploadModal = makeStacksModal(
            "comment-image-modal",
            "Image Uploader",
        );
        document.body.append(uploadModal);

        const uploader = makeStacksUploader(
            "comment-image-uploader",
            "Upload an Image",
            {
                resetter: ["reset-uploader", "Reset"],
                uploader: ["submit-uploader", "Upload"],
                onUpload: async (_e, files) => {
                    if (!files) return;

                    const [file] = files;

                    const body = new FormData();
                    body.append("file", file);
                    body.append("fkey", StackExchange.options.user.fkey);

                    const {
                        location: { hostname },
                    } = w;
                    const url = new URL(`https://${hostname}/upload/image`);
                    url.search = new URLSearchParams({
                        method: "json",
                    }).toString();

                    const res = await fetch(url.toString(), {
                        method: "POST",
                        body,
                    });

                    if (!res.ok) return;

                    const { Success, UploadedImage }
                        = (await res.json()) as ImageUploadResponse;

                    if (!Success) return;

                    const imageMDlink = `[](${UploadedImage})`;

                    // TODO: determine input uniquely
                    const field = d.querySelector<HTMLElement>("textarea[name='comment']");
                    if (!field?.textContent) return;

                    const updateEvent = new Event("keyup", { bubbles: true });

                    field.textContent += imageMDlink;
                    field.dispatchEvent(updateEvent);

                    Stacks.hideModal(uploadModal);
                },
            },
        );

        uploadModal.querySelector(".s-modal--dialog")?.append(uploader);

        const addUploadButton = () => {
            const commentFields = d.querySelectorAll(
                "div.js-comment-text-input-container",
            );

            commentFields.forEach((field, i) => {
                if (field.querySelector("[id^='upload-']")) return;

                const button = makeStacksButton(`upload-${i}`, "Upload image", {
                    primary: true,
                });

                button.addEventListener("click", () => {
                    Stacks.showModal(uploadModal);
                });

                field.append(button);
            });
        };

        const obs = new MutationObserver((rs) => {
            const nodes = rs.flatMap(({ addedNodes }) => [...addedNodes]);

            const addingCommentInput = nodes.some(
                node =>
                    node.nodeType !== 3
                    && (node as Element).matches("textarea[name='comment']"),
            );

            if (!addingCommentInput) return;

            addUploadButton();
        });

        obs.observe(d.body, {
            childList: true,
            subtree: true,
        });

        addUploadButton();
    });
})(window, document);
