export default function* (x, y, length, density) {
    const xSigns = [-1, 0, 1, 0];
    const ySigns = [0, 1, 0, -1];
    let repeats = 1;
    for (let i = 0; i < length; i++) {
        for (let j = 1; j < repeats; j++) {
            x = x + xSigns[(i - 1) % 4] * density;
            y = y + ySigns[(i - 1) % 4] * density;
            yield [x, y];
        }

        if (i !== 0 && i % 2 === 0) {
            repeats++;
        }
    }
}
