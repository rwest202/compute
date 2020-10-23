import gol, { Grid } from '../math/gol';

type GameOfLifeMessage = MessageEvent & {
    data: {
        startIndex?: number;
        throttle: number;
        maxIterations: number;
        grid: Grid;
    }
};

onmessage = function (e: GameOfLifeMessage) {
    const { startIndex, throttle, maxIterations, grid } = e.data;

    let step: any = grid;
    let i = startIndex ? startIndex : 0;
    let t0: number;
    let t1: number;
    let elapsed: number;

    (self as any).postMessage({ step, iteration: startIndex ? startIndex : 0 });

    t0 = self.performance.now();
    self.requestAnimationFrame(next);

    function next() {
        if (i >= maxIterations) return;

        self.requestAnimationFrame(next);

        t1 = self.performance.now()
        elapsed = t1 - t0;

        if (elapsed > throttle) {
            t0 = t1 - (elapsed % throttle);
        
            step = gol(step);

            // If there are no changes, game has stalled out
            if (step === false) {
                return;
            }

            i++;
                
            (self as any).postMessage({
                step,
                iteration: i,
                framerate: Math.round(1000/elapsed),
            });
        }   
    }
}