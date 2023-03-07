<script lang="ts">
    import {
        PaperScope,
        Path,
        Point,
        Color,
        Size,
        Shape,
    } from 'paper/dist/paper-core';
    import { onMount, onDestroy } from 'svelte';

    import { contentDimensions } from 'src/utils';
    import { ALIVE, DEAD } from 'src/math/gol';
    import { initialGrid } from 'src/math/gol';
    import type { Grid } from 'src/math/gol';
    import {
        dotColor,
        backgroundColor,
        fpsThrottle,
        steps,
        fps,
        paused,
        maxIterations,
        gridSize,
    } from 'src/store/gol';

    const [w, h] = contentDimensions();

    const THROTTLE = 1000 / $fpsThrottle;

    const paper = new PaperScope();
    let canvas: HTMLCanvasElement;
    let drawDots: paper.Path.Circle[][];
    let drawGrid: paper.Path.Rectangle[][];
    let dotColorPaper = new Color($dotColor);
    const transparent = new Color('transparent');
    const grey = new Color('#dcdcdc');
    let background: paper.Shape.Rectangle;
    let x: number;
    let y: number;

    let worker: Worker;
    let savedGrid: Grid | undefined;

    paused.subscribe((val) => {
        worker && (val ? pause() : play());
    });

    // Update dot size and background color
    $: {
        if (background) {
            background.fillColor = new Color($backgroundColor);
        }
    }

    // Update dot color
    $: {
        if (drawDots) {
            const newColor = new Color($dotColor);
            drawDots.forEach((row) =>
                row.forEach((dot) => (dot.fillColor = newColor))
            );
        }
    }

    // Update Throttle
    $: worker?.postMessage({
        action: 'SET_THROTTLE',
        payload: 1000 / $fpsThrottle,
    });

    // Update Max Iterations
    $: worker?.postMessage({
        action: 'SET_MAX_ITERATIONS',
        payload: $maxIterations,
    });

    onMount(() => {
        draw();

        // Refers to pre-built worker file
        worker = new Worker('/workers/gol.js');

        // Initiate Game of Life iterations in separate worker
        worker.postMessage({
            grid: initialGrid($gridSize),
            maxIterations: $maxIterations,
            throttle: THROTTLE,
        });
        worker.onmessage = drawGameOfLife;

        window.addEventListener('resize', () => {
            paused.set(true);
            draw();
        });
    });

    onDestroy(() => {
        paper.project.remove();
        // Terminate worker so calls cease to the destroyed paper project
        worker.terminate();
    });

    function draw() {
        if (!canvas) return;

        const [w, h] = contentDimensions();
        canvas.width = w;
        canvas.height = h;

        // Re-initialize PaperJS on every render to avoid fuzzy scaling
        paper.project && paper.project.remove();
        paper.setup(canvas);

        background = new Shape.Rectangle(new Point(0, 0), new Size(w, h));

        paper.view.viewSize.width = w;
        paper.view.viewSize.height = h;

        x = paper.view.bounds.width / 2;
        y = paper.view.bounds.height / 2;

        drawDots = Array.from({ length: $gridSize })
            .fill(null)
            .map((_, i) =>
                Array.from({ length: $gridSize })
                    .fill(null)
                    .map((_, j) => {
                        const dot = new Path.Circle({
                            center: [x + (i - 25) * 16, y + (j - 25) * 16],
                            radius: 6,
                        });
                        dot.fillColor = dotColorPaper;
                        dot.opacity = 0;
                        dot.insertAbove(background);
                        return dot;
                    })
            );

        drawGrid = Array.from({ length: $gridSize })
            .fill(null)
            .map((_, i) =>
                Array.from({ length: $gridSize })
                    .fill(null)
                    .map(
                        (_, j) =>
                            new Path.Rectangle(
                                new Point(
                                    x + (i - 25) * 16 - 6,
                                    y + (j - 25) * 16 - 6
                                ),
                                new Size(12, 12)
                            )
                    )
            );

        let lastX;
        let lastY;
        paper.view.onMouseMove = (e) => {
            // Duplicate
            const xPos = Math.round((e.point.x - x) / 16) + 25;
            const yPos = Math.round((e.point.y - y) / 16) + 25;

            if (lastX !== undefined && lastY !== undefined) {
                const square = drawGrid[lastX][lastY];
                if (square.fillColor) {
                    square.fillColor = transparent;
                }
            }

            const square = drawGrid[xPos]?.[yPos];
            if (square) {
                square.fillColor = grey;
                square.insertAbove(background);

                lastX = xPos;
                lastY = yPos;
            }
        };

        paper.view.onMouseDown = (e) => {
            // Duplicate
            const xPos = Math.round((e.point.x - x) / 16) + 25;
            const yPos = Math.round((e.point.y - y) / 16) + 25;

            const dot = drawDots[xPos]?.[yPos];
            if (dot) {
                // Is not transparent, meanings it's alive.
                let newState: typeof ALIVE | typeof DEAD = DEAD;
                if (dot.opacity > 0) {
                    dot.opacity = 0;
                } else {
                    newState = ALIVE;
                    dot.opacity = 1;
                }

                if ($paused && savedGrid) {
                    savedGrid[xPos][yPos] = newState;
                } else if (!$paused) {
                    worker?.postMessage({
                        action: 'SET_CELL_STATE',
                        payload: {
                            x: xPos,
                            y: yPos,
                            state: newState,
                        },
                    });
                }
            }
        };

        if (savedGrid) {
            for (let i = 0; i < savedGrid.length; i++) {
                for (let j = 0; j < savedGrid[i].length; j++) {
                    if (savedGrid[i][j] === ALIVE) {
                        drawDots[i][j].opacity = 1;
                    } else {
                        drawDots[i][j].opacity = 0;
                    }
                }
            }
        }
    }

    function drawGameOfLife({
        data,
    }: {
        data: { step: Grid; iteration: number; framerate: number };
    }) {
        const { step, iteration, framerate } = data;
        // Prevent stray events from firing after the component is destroyed
        if (!paper.view) {
            worker && worker.terminate();
        } else {
            for (let i = 0; i < step.length; i++) {
                for (let j = 0; j < step[i].length; j++) {
                    if (step[i][j] === ALIVE) {
                        drawDots[i][j].opacity = 1;
                    } else {
                        drawDots[i][j].opacity = 0;
                    }
                }
            }
            savedGrid = step;
            steps.set(iteration);
            if (framerate) {
                fps.set(framerate);
            }
        }

        if (iteration === $maxIterations) {
            worker.terminate();
        }
    }

    function play() {
        worker && worker.terminate();
        // Refers to pre-built worker file
        worker = new Worker('/workers/gol.js');

        // Initiate Game of Life with saved grid in separate worker
        worker.postMessage({
            grid: savedGrid,
            startIndex: $steps,
            maxIterations: $maxIterations,
            throttle: THROTTLE,
        });

        worker.onmessage = drawGameOfLife;
        savedGrid = undefined;
    }

    function pause() {
        // Pause! Stop execution and save grid
        worker && worker.terminate();
    }
</script>

<canvas bind:this={canvas} />

<style>
    .hud {
        position: absolute;
        z-index: 1;
        bottom: 15px;
        left: 15px;
    }
</style>
