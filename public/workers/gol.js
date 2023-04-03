const DEAD = 0;
const ALIVE = 1;
function gol (grid) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let changed = false;
    // Copy multi-dimensional array
    const newGrid = grid.map((row) => row.slice());
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const NW = ((_a = grid[i - 1]) === null || _a === void 0 ? void 0 : _a[j - 1]) || 0;
            const N = ((_b = grid[i - 1]) === null || _b === void 0 ? void 0 : _b[j]) || 0;
            const NE = ((_c = grid[i - 1]) === null || _c === void 0 ? void 0 : _c[j + 1]) || 0;
            const E = ((_d = grid[i]) === null || _d === void 0 ? void 0 : _d[j + 1]) || 0;
            const SE = ((_e = grid[i + 1]) === null || _e === void 0 ? void 0 : _e[j + 1]) || 0;
            const S = ((_f = grid[i + 1]) === null || _f === void 0 ? void 0 : _f[j]) || 0;
            const SW = ((_g = grid[i + 1]) === null || _g === void 0 ? void 0 : _g[j - 1]) || 0;
            const W = ((_h = grid[i]) === null || _h === void 0 ? void 0 : _h[j - 1]) || 0;
            const neighbors = NW + N + NE + E + SE + S + SW + W;
            if (grid[i][j] === ALIVE) {
                // 1. Any live cell with two or three live neighbours survives.
                if (neighbors === 2 || neighbors === 3) ;
                else {
                    changed = true;
                    // Die
                    newGrid[i][j] = DEAD;
                }
            }
            else {
                // 2. Any dead cell with three live neighbours becomes a live cell.
                if (neighbors === 3) {
                    changed = true;
                    // Born
                    newGrid[i][j] = ALIVE;
                }
            }
        }
    }
    return changed ? newGrid : false;
}

class GameOfLifeWorker {
    constructor({ data: { startIndex, throttle, maxIterations, grid }, }) {
        this.i = 0;
        this.next = () => {
            if (this.i >= this.maxIterations || !this.step)
                return;
            self.requestAnimationFrame(this.next);
            this.t1 = self.performance.now();
            this.elapsed = this.t1 - this.t0;
            if (this.elapsed > this.throttle) {
                this.t0 = this.t1 - (this.elapsed % this.throttle);
                const nextStep = gol(this.step);
                // If there are no changes, game has stalled out
                if (nextStep === false) {
                    return;
                }
                this.step = nextStep;
                this.i++;
                self.postMessage({
                    step: this.step,
                    iteration: this.i,
                    framerate: Math.round(1000 / this.elapsed),
                });
            }
        };
        this.step = grid;
        this.throttle = throttle;
        this.maxIterations = maxIterations;
        if (startIndex) {
            this.i = startIndex;
        }
        self.postMessage({ step: grid, iteration: this.i });
        this.t0 = self.performance.now();
        self.requestAnimationFrame(this.next);
    }
    setThrottle(throttle) {
        this.throttle = throttle;
    }
    setMaxIterations(maxIterations) {
        this.maxIterations = maxIterations;
    }
    setCellState({ x, y, state }) {
        this.step[x][y] = state;
    }
}
let golWorker;
onmessage = function (e) {
    if (!golWorker) {
        golWorker = new GameOfLifeWorker(e);
    }
    switch (e.data.action) {
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
};
//# sourceMappingURL=gol.js.map
