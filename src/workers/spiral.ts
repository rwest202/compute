import ulamSpiral, { UlamSpiral } from '../math/ulam';
import { isPrime } from '../math/utils';

type UlamSpiralMessage = MessageEvent & {
    data: UlamSpiral;
};
onmessage = function (e: UlamSpiralMessage) {
    const { throttle } = e.data;
    const point = ulamSpiral(e.data);
    let t0 = 0;
    let t1 = 0;
    let integer = 2;
    for (let next = point.next(); !next.done; ) {
        t1 = self.performance.now();
        if (t1 - t0 > throttle) {
            t0 = self.performance.now();
            if (isPrime(integer)) {
                (self as any).postMessage(next.value);
            }
            next = point.next();
            integer++;
        }
    }
};
