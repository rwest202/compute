<script lang="ts">
    import {
        PaperScope,
        Path,
        Point,
        Color,
        Shape,
    } from 'paper/dist/paper-core';
    import { onMount, onDestroy } from 'svelte';

    import { contentDimensions } from '../utils';
    import {
        backgroundColor,
        dotColor,
        dotSize,
        showGrid,
        gridColor,
        gridWidth,
        density,
        throttle,
    } from '../store/spiral';
    import { Size } from 'paper';

    // The user inputted density number will be divided by this constant. This
    // constant is arbitrariily picked because it fills the screen with dots
    const DENSITY_CONSTANT = 3000;

    const [w, h] = contentDimensions();

    const paper = new PaperScope();
    let canvas: HTMLCanvasElement;
    let worker: Worker;
    let background: paper.Shape.Rectangle;
    let dots: paper.Path.Circle[] = [];
    let line: paper.Path;

    $: {
        // Reactive update when these variables change

        $density;
        dots.forEach((dot) => {
            dot.remove();
        });
        dots = [];
        draw();
    }

    $: {
        let color = new Color($dotColor);
        if (paper.project) {
            // Draw Ulam Sprial grid
            if ($showGrid) {
                if (line) line.remove();

                const x = paper.view.bounds.width / 2;
                const y = paper.view.bounds.height / 2;
                line = new Path({
                    from: [x, y],
                    strokeWidth: $gridWidth,
                    strokeColor: $gridColor,
                });
                line.moveTo(new Point(x, y));
                for (let i = 1; i < DENSITY_CONSTANT / $density; i++) {
                    const even = i % 2 === 0;
                    line.lineBy(
                        new Point((even ? -$density : $density) * i, 0)
                    );
                    line.lineBy(
                        new Point(0, (even ? $density : -$density) * i)
                    );
                }
            } else {
                line && line.remove();
            }

            dots = dots.map((dot) => {
                const newDot = new Path.Circle({
                    center: dot.position,
                    radius: $dotSize,
                    fillColor: color,
                });
                dot.remove();
                return newDot;
            });
        }
    }

    $: {
        if (paper.project) {
            background.fillColor = new Color($backgroundColor);
            background.size = new Size(w, h);
        }
    }

    onMount(() => {
        draw();
        window.addEventListener('resize', draw);
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

        const x = paper.view.bounds.width / 2;
        const y = paper.view.bounds.height / 2;

        // Refers to pre-built worker file
        worker = new Worker('/workers/spiral.js');

        // Initiate prime number calculations in separate worker
        worker.postMessage({
            x,
            y,
            length: DENSITY_CONSTANT / $density,
            density: $density,
            throttle: $throttle,
        });

        function drawPrimeDots({ data }: { data: [number, number] }) {
            // Prevent stray events from firing after the component is destroyed
            if (!paper.view) {
                worker && worker.terminate();
            } else {
                dots.push(
                    new Path.Circle({
                        center: data,
                        radius: $dotSize,
                        fillColor: $dotColor,
                    })
                );
            }
        }
        worker.onmessage = drawPrimeDots;
    }
</script>

<canvas bind:this={canvas} />
