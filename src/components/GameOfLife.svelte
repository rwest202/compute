<script lang="ts">
    import { PaperScope, Path } from 'paper/dist/paper-core';
    import { onMount, onDestroy } from 'svelte';

    import { contentDimensions } from 'src/utils';
    import { ALIVE } from 'src/math/gol';

    import { initialGrid } from 'src/math/gol';
    import type { Grid } from 'src/math/gol';

    const MAX_ITERATIONS = 1000;
    const THROTTLE = 1000 / 21;

    const paper = new PaperScope();
    let canvas: HTMLCanvasElement;
    let drawGrid: paper.Path.Circle[][];
    const black = new paper.Color('black');
    const transparent = new paper.Color('transparent');
    let x: number;
    let y: number;

    let worker: Worker;
    let steps = 0;
    let paused = false;
    let savedGrid: Grid | undefined;

    let fps = 0;

    $: {
        draw();
    }

    onMount(() => {
        draw();

        // Refers to pre-built worker file
        worker = new Worker('/workers/gol.js');

        // Initiate Game of Life iterations in separate worker
        worker.postMessage({
            grid: initialGrid,
            maxIterations: MAX_ITERATIONS,
            throttle: THROTTLE,
        });
        worker.onmessage = drawGameOfLife;

        window.addEventListener('resize', () => {
            pause();
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

        paper.view.viewSize.width = w;
        paper.view.viewSize.height = h;

        x = paper.view.bounds.width / 2;
        y = paper.view.bounds.height / 2;

        drawGrid = new Array(50).fill(null).map((_, i) =>
            new Array(50).fill(null).map(
                (_, j) =>
                    new Path.Circle({
                        center: [x + (i - 25) * 8, y + (j - 25) * 8],
                        radius: 3,
                    })
            )
        );
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
                    if (step[i][j] !== savedGrid?.[i]?.[j]) {
                        if (step[i][j] === ALIVE) {
                            drawGrid[i][j].fillColor = black;
                        } else {
                            drawGrid[i][j].fillColor = transparent;
                        }
                    }
                }
            }
            savedGrid = step;
            steps = iteration;
            if (framerate) {
                fps = framerate;
            }
        }
    }

    function play() {
        worker && worker.terminate();
        // Refers to pre-built worker file
        worker = new Worker('/workers/gol.js');

        // Initiate Game of Life with saved grid in separate worker
        worker.postMessage({
            grid: savedGrid,
            startIndex: steps,
            maxIterations: MAX_ITERATIONS,
            throttle: THROTTLE,
        });

        worker.onmessage = drawGameOfLife;

        savedGrid = undefined;
        paused = false;
    }

    function pause() {
        // Pause! Stop execution and save grid
        worker.terminate();
        paused = true;
    }
</script>

<style>
    .hud {
        position: absolute;
        z-index: 1;
        bottom: 15px;
        left: 15px;
    }
</style>

<canvas bind:this={canvas} />

<div class="hud">
    <button on:click={() => (paused ? play() : pause())}>
        {#if paused}play{:else}pause{/if}
    </button>
    {steps}
    Steps &nbsp; FPS
    {fps}
</div>
