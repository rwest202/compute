import feigenbaumTree, { FeigenbaumTree } from '../math/feigenbaum';

type FeigenbaumTreeMessage = MessageEvent & {
    data: FeigenbaumTree;
};
onmessage = function (e: FeigenbaumTreeMessage) {
    const { rStep, y0, minIterations, maxIterations, throttle } = e.data;
    const point = feigenbaumTree({
        rRange: { start: 0.25, end: 1, step: rStep },
        y0,
        minIterations: minIterations,
        maxIterations: maxIterations,
    });

    let t0 = 0;
    let t1 = 0;
    for (let next = point.next(); !next.done; ) {
        if (throttle) {
            t1 = self.performance.now();
        }

        if (!throttle || t1 - t0 > throttle) {
            if (throttle) {
                t0 = self.performance.now();
            }

            (self as any).postMessage(next.value);
            next = point.next();
        }
    }
};
