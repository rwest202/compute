import ulamSpiral from '../math/ulam';
import { isPrime } from '../math/utils';

onmessage = function (e) {
    const { x, y, length, multiple } = e.data;
    const point = ulamSpiral(x, y, length, multiple);
    let t0 = 0;
    let t1 = 0;
    let integer = 1;
    let next = point;
    while (!next.done) {
        t1 = performance.now();
        if (t1 - t0 > 0.01) {
            t0 = performance.now();
            if (isPrime(integer)) {
                postMessage(next.value);
            }
            next = point.next();
            integer++;
        }
    }
};
