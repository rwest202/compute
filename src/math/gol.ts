export const DEAD = 0;
export const ALIVE = 1;

export type Grid = (0 | 1)[][];
export default function (grid: Grid): Grid | false {
    let changed = false;

    // Copy multi-dimensional array
    const newGrid = grid.map((row) => row.slice());

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const NW = grid[i - 1]?.[j - 1] || 0;
            const N = grid[i - 1]?.[j] || 0;
            const NE = grid[i - 1]?.[j + 1] || 0;
            const E = grid[i]?.[j + 1] || 0;
            const SE = grid[i + 1]?.[j + 1] || 0;
            const S = grid[i + 1]?.[j] || 0;
            const SW = grid[i + 1]?.[j - 1] || 0;
            const W = grid[i]?.[j - 1] || 0;

            const neighbors = NW + N + NE + E + SE + S + SW + W;

            if (grid[i][j] === ALIVE) {
                // 1. Any live cell with two or three live neighbours survives.
                if (neighbors === 2 || neighbors === 3) {
                    // Survive
                    // 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.
                } else {
                    changed = true;
                    // Die
                    newGrid[i][j] = DEAD;
                }
            } else {
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

/*
 * - - - - -
 * - - 0 0 -
 * - 0 0 - -
 * - - - - -
 * */
export const initialGrid = (size: number) =>
    Array.from<(0 | 1)[][]>({ length: size })
        .fill(Array.from<(0 | 1)[]>({ length: size }).fill(0 as any))
        .map((_, row) =>
            _.map((_, col) => {
                const center = Math.floor((size - 1) / 2);
                if (row === center && col === center) return ALIVE;
                if (row === center && col === center + 1) return ALIVE;
                if (row === center + 1 && col === center - 1) return ALIVE;
                if (row === center + 1 && col === center) return ALIVE;

                return DEAD;
            })
        );
