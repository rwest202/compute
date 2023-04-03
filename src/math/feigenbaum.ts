import feiganbaumCache from './feigenbaum.json';

export type FeigenbaumTree = {
    rRange: { start: number; end: number; step: number };
    y0: number;
    minIterations: number;
    maxIterations: number;
};

export type FeigenbaumPoint = {
    r: number;
    iteration: number;
    y: number;
};

// f_r(y) = 4 r y (1-y)

export default function* ({
    rRange,
    y0,
    minIterations,
    maxIterations,
}: FeigenbaumTree): Generator<{
    r: number;
    iteration: number;
    y: number;
}> {
    const { start, end, step } = rRange;

    for (let r = start; r <= end; r += step) {
        let y = y0;
        let lastY = y;

        let i = 1;
        let cacheValue =
            feiganbaumCache[r.toFixed(3)][minIterations.toFixed(0)];
        if (cacheValue) {
            i = minIterations;
            y = cacheValue;
            lastY = cacheValue;
        }

        for (i; i <= maxIterations; i++) {
            lastY = y;
            y = 4 * r * y * (1 - y);

            /* if (i === minIterations) {
                if (!cache[r.toFixed(3)]) {
                    cache[r.toFixed(3)] = {};
                }
                cache[r.toFixed(3)][i.toFixed(0)] = y;
            } */

            if (i >= minIterations) {
                yield { r, iteration: i, y };

                if (Math.abs(y - lastY) < 1e-10) {
                    break;
                }
            }
        }
    }

    // write cache to feigenbaum.json
    /* fs.writeFileSync(
        'feigenbaum.json',
        JSON.stringify(cache, null, 2),
        'utf-8'
    ); */
}
