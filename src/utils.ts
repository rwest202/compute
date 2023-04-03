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

export function rToColor(r) {
    const rStart = 0.25;
    const rEnd = 1;

    const t = (r - rStart) / (rEnd - rStart);

    const rGradient = Math.round(255 * Math.sin(3 * Math.PI * t));
    const gGradient = Math.round(
        255 * Math.sin(3 * Math.PI * t + (2 * Math.PI) / 3)
    );
    const bGradient = Math.round(
        255 * Math.sin(3 * Math.PI * t + (4 * Math.PI) / 3)
    );

    return `rgb(${rGradient}, ${gGradient}, ${bGradient})`;
}
