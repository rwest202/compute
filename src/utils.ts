export function contentDimensions() {
    const w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const h =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    return [w - 300, h - 50];
}

export function downloadURL(url: string, filename: string) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
