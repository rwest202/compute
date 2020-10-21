import gol, { Grid } from '../math/gol';

type GameOfLifeMessage = MessageEvent & {
    data: {
        throttle: number;
        maxIterations: number;
        grid: Grid;
    }
};
onmessage = function (e: GameOfLifeMessage) {
    const { throttle, maxIterations, grid } = e.data;
    let t0 = 0;
    let t1 = 0;
    let step = grid;
    (self as any).postMessage(step)
    
    for (let i = 0; i <= maxIterations;) {
        t1 = self.performance.now();
        if (t1 - t0 > throttle) {
            t0 = self.performance.now();
            step = gol(step);

            // If there are no changes, game has stalled out
            if (step === false) {
                break;
            }
            
            (self as any).postMessage(step);
            i++;
        }
    }
}