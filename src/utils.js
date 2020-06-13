export function windowDimensions() {
    const w =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
    const h =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;

    return [w, h];
}
