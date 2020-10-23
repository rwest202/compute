const DEAD = 0;
const ALIVE = 1;
function gol (grid) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let changed = false;
    // Copy multi-dimensional array
    const newGrid = grid.map(row => row.slice());
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

onmessage = function (e) {
    const { startIndex, throttle, maxIterations, grid } = e.data;
    let step = grid;
    let i = startIndex ? startIndex : 0;
    let t0;
    let t1;
    let elapsed;
    self.postMessage({ step, iteration: startIndex ? startIndex : 0 });
    t0 = self.performance.now();
    self.requestAnimationFrame(next);
    function next() {
        if (i >= maxIterations)
            return;
        self.requestAnimationFrame(next);
        t1 = self.performance.now();
        elapsed = t1 - t0;
        if (elapsed > throttle) {
            t0 = t1 - (elapsed % throttle);
            step = gol(step);
            // If there are no changes, game has stalled out
            if (step === false) {
                return;
            }
            i++;
            self.postMessage({
                step,
                iteration: i,
                framerate: Math.round(1000 / elapsed),
            });
        }
    }
};
//# sourceMappingURL=gol.js.map
