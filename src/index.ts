interface ImageUploadResponse {
    Success: boolean;
    Error: number;
    UploadedImage: string;
}

async function uploadImage(file: File): Promise<string> {
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

    const {
        Success: success,
        UploadedImage: image,
    } = await res.json() as ImageUploadResponse;

    if (!success) {
        console.error(res);
        throw new Error("Failed to upload image.");
    }

    return image;
}

function findImage(event: ClipboardEvent | DragEvent): File | undefined {
    const items = event instanceof ClipboardEvent
        ? event.clipboardData?.items || event.clipboardData?.files
        : event.dataTransfer?.items || event.dataTransfer?.files;

    if (!items) return;

    // only keep the first image
    const image = [...items].find(item => item.type.includes("image/"));
    if (!image) return; // no images pasted

    const file = image instanceof File
        ? image
        : image.getAsFile();
    if (!file) {
        // couldn't parse image file
        return;
    }

    const maxFileSize = StackExchange.settings.image.maxImageUploadSizeInBytes;
    if (file.size >= maxFileSize) {
        // file size more than SE allows
        return;
    }
    return file;
}

async function insertText(file: File, textarea: HTMLTextAreaElement): Promise<void> {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const replaceText = `[Uploading ${file.name}...]()`;
    textarea.setRangeText(
        replaceText,
        start,
        end,
        "start",
    );

    const imageUrl = await uploadImage(file);

    const linkDescription = "enter image description here";
    textarea.setRangeText(
        `[${linkDescription}](${imageUrl})`,
        start,
        start + replaceText.length,
        "start",
    );

    textarea.setSelectionRange(
        start + 1, // move past [
        start + 1 + linkDescription.length,
        "forward",
    );
}

async function handleEvent(event: ClipboardEvent | DragEvent): Promise<void> {
    const target = event.target as HTMLTextAreaElement;
    // image should be pasted in the comment box textarea
    if (!target.matches("textarea.js-comment-text-input")) return;

    // https://dev.stackoverflow.com/content/js/wmd.en.js

    const file = findImage(event);
    if (!file) return;

    event.preventDefault();

    try {
        await insertText(file, target);
    } catch (error) {
        console.error(error);
    }
}

function appendButton(location: HTMLElement): void {
    const input = document.createElement("input");
    input.type = "file";

    input.addEventListener("change", async () => {
        const file = input.files?.[0];
        const textarea = location.querySelector("textarea.js-comment-text-input");

        if (!file || !textarea) return;

        try {
            await insertText(file, textarea as HTMLTextAreaElement);
        } catch (error) {
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
    if (!helpLink) return;

    helpLink.parentElement?.classList.add("g4"); // increase spacing
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
                    const parent = link.closest<HTMLElement>(".post-layout--right");
                    if (!parent) return;

                    appendButton(parent);
                }, 200);
            });
        });
})();
