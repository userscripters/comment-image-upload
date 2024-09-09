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

async function handleEvent(event: ClipboardEvent | DragEvent): Promise<void> {
    const target = event.target as HTMLTextAreaElement;
    // image should be pasted in the comment box textarea
    if (!target.matches("textarea.js-comment-text-input")) return;

    // https://dev.stackoverflow.com/content/js/wmd.en.js
    event.preventDefault();

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

    try {
        const start = target.selectionStart;
        const end = target.selectionEnd;

        const replaceText = `[Uploading ${file.name}...]()`;
        target.setRangeText(
            replaceText,
            start,
            end,
            "start",
        );

        const imageUrl = await uploadImage(file);
        console.log(imageUrl);

        const linkDescription = "enter image description here";
        target.setRangeText(
            `[${linkDescription}](${imageUrl})`,
            start,
            start + replaceText.length,
            "start",
        );

        target.setSelectionRange(
            start + 1, // move past [
            start + 1 + linkDescription.length,
            "forward",
        );
    } catch (error) {
        console.error(error);
    }
}

(() => {
    window.addEventListener("paste", handleEvent);
    window.addEventListener("drop", handleEvent);
})();
