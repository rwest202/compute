<script>
    import debounce from 'lodash.debounce';
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
        dataUrl
    } from '../store/spiral';

    // The user inputted density number will be divided by this constant. This
    // constant is arbitrariily picked because it fills the screen with dots
    const DENSITY_CONSTANT = 3000;

    let canvas;
    let worker;

    $: {
        // Reactive update when these variables change
        $backgroundColor,
            $dotColor,
            $dotSize,
            $showGrid,
            $gridColor,
            $gridWidth,
            $density,
            $throttle;
        draw();
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

        paper.view.viewSize.width = w;
        paper.view.viewSize.height = h;

        const x = paper.view.bounds.width / 2;
        const y = paper.view.bounds.height / 2;

        worker = new Worker('/spiral.js');

        // Background
        const background = new paper.Path.Rectangle([0, 0], [w, h]);
        background.fillColor = $backgroundColor;

        // Draw Ulam Sprial grid
        if ($showGrid) {
            const line = new paper.Path({
                from: [x, y],
                strokeWidth: $gridWidth,
                strokeColor: $gridColor
            });
            line.moveTo(x, y);
            for (let i = 1; i < DENSITY_CONSTANT / $density; i++) {
                const even = i % 2 === 0;
                line.lineBy((even ? -$density : $density) * i, 0);
                line.lineBy(0, (even ? $density : -$density) * i);
            }
        }

        // Initiate prime number calculations in separate worker
        worker.postMessage({
            x,
            y,
            length: DENSITY_CONSTANT / $density,
            density: $density,
            throttle: $throttle
        });

        /**
         * Draw prime dots with worker data
         * @param {Object} workerEvent.data - x & y coordinates of prime dot
         */
        function drawPrimeDots({ data }) {
            // Prevent stray events from firing after the component is destroyed
            if (!paper.view) return;
            new paper.Path.Circle({
                center: data,
                radius: $dotSize,
                fillColor: $dotColor
            });
        }
        worker.onmessage = drawPrimeDots;
    }
</script>

<canvas bind:this={canvas} />
