import gol, { Grid, ALIVE, DEAD } from '../math/gol';

type StartPayload = {
    startIndex?: number;
    throttle: number;
    maxIterations: number;
    grid: Grid;
}

type ThrottlePayload = number;

type MaxIterationsPayload = number;

type CellStatePayload = {
    x: number,
    y: number,
    state: typeof ALIVE | typeof DEAD,
}

type GameOfLifeMessagePayload = StartPayload | ThrottlePayload | MaxIterationsPayload | CellStatePayload;

type GameOfLifeMessage = MessageEvent & {
    data: {
        action?: string;
        payload: GameOfLifeMessagePayload;
    }
};

class GameOfLifeWorker {
    i = 0;
    t0: number;
    t1?: number;
    elapsed?: number;
    maxIterations: number;
    step: Grid | false;
    throttle: number;

    constructor({ data: { startIndex, throttle, maxIterations, grid }}: GameOfLifeMessage) {
        this.step = grid;
        this.throttle = throttle;
        this.maxIterations = maxIterations;
        if (startIndex) {
            this.i = startIndex;
        }

        (self as any).postMessage({ step: grid, iteration: this.i });

        this.t0 = self.performance.now();
        self.requestAnimationFrame(this.next);
    }

    next = () => {
        if (this.i >= this.maxIterations || !this.step) return;

        self.requestAnimationFrame(this.next);

        this.t1 = self.performance.now()
        this.elapsed = this.t1 - this.t0;

        if (this.elapsed > this.throttle) {
            this.t0 = this.t1 - (this.elapsed % this.throttle);
            
            this.step = gol(this.step);
            
            // If there are no changes, game has stalled out
            if (this.step === false) {
                return;
            }

            this.i++;
                
            (self as any).postMessage({
                step: this.step,
                iteration: this.i,
                framerate: Math.round(1000/this.elapsed),
            });
        }
    }

    setThrottle(throttle: number) {
        this.throttle = throttle;
    }

    setMaxIterations(maxIterations: number) {
        this.maxIterations  = maxIterations;
    }

    setCellState({ x, y, state }: CellStatePayload) {
        this.step[x][y] = state;
    }
}

let golWorker: GameOfLifeWorker;
onmessage = function (e: GameOfLifeMessage) {
    if (!golWorker) {
        golWorker = new GameOfLifeWorker(e)
    }

    switch(e.data.action) {
        case 'SET_THROTTLE':
            golWorker.setThrottle(e.data.payload);
            break;
        case 'MAX_ITERATIONS':
            golWorker.setMaxIterations(e.data.payload);
            break;
        case 'SET_CELL_STATE':
            golWorker.setCellState(e.data.payload);
            break;
    }
}