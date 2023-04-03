<script lang="ts">
    import {
        PaperScope,
        Path,
        Point,
        Size,
        Shape,
    } from 'paper/dist/paper-core';
    import { onMount, onDestroy } from 'svelte';

    import { contentDimensions, rToColor } from 'src/utils';
    import {
        rStep,
        y0,
        minIterations,
        maxIterations,
        throttle,
    } from 'src/store/feigenbaum';
    import type { FeigenbaumPoint } from 'src/math/feigenbaum';

    const [w, h] = contentDimensions();

    const paper = new PaperScope();
    let canvas: HTMLCanvasElement;
    let background: paper.Shape.Rectangle;
    let dots: paper.Path.Circle[] = [];
    let x: number;
    let y: number;

    let worker: Worker;

    onMount(() => {
        draw();

        window.addEventListener('resize', () => {
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

        // Create a new worker on each render
        worker && worker.terminate();

        const [w, h] = contentDimensions();

        canvas.width = w;
        canvas.height = h;

        // Re-initialize PaperJS on every render to avoid fuzzy scaling
        paper.project && paper.project.remove();
        paper.setup(canvas);

        background = new Shape.Rectangle(new Point(0, 0), new Size(w, h));

        paper.view.viewSize.width = w;
        paper.view.viewSize.height = h;

        // Refers to pre-built worker file
        worker = new Worker('/workers/feigenbaum.js');

        // Initiate Feigenbaum iterations in separate worker
        worker.postMessage({
            rStep: $rStep,
            y0: $y0,
            minIterations: $minIterations,
            maxIterations: $maxIterations,
            throttle: $throttle,
        });

        /* const yAxis = new Path({
            segments: [
                [w / 6, h / 6],
                [w / 6, (h / 6) * 5],
            ],
            strokeColor: 'rgba(0, 0, 0, 0.3)',
            strokeWidth: 1,
        });

        const xAxis = new Path({
            segments: [
                [w / 6, (h / 6) * 5],
                [(w / 6) * 5, (h / 6) * 5],
            ],
            strokeColor: 'rgba(0, 0, 0, 0.3)',
            strokeWidth: 1,
        }); */

        console.log(w, h);

        function drawFeigenbaumTree({ data }: { data: FeigenbaumPoint }) {
            const { r, iteration, y } = data;
            // Prevent stray events from firing after the component is destroyed
            if (!paper.view) {
                worker && worker.terminate();
            }

            dots.push(
                new Path.Circle({
                    center: {
                        x: (((r - 0.25) * w) / 1.5) * 1.333 + w / 6,
                        y: h / 1.5 - (y * h) / 1.5 + h / 6,
                    },
                    radius: 0.5,
                    fillColor: rToColor(r),
                })
            );
        }

        worker.onmessage = drawFeigenbaumTree;
    }
</script>

<canvas bind:this={canvas} />

<style>
</style>
