<script>
    import debounce from 'lodash.debounce';
    import { onMount } from 'svelte';

    import { windowDimensions } from '../../utils';

    import Route from '../Route.svelte';

    export let location;
    let canvas;

    function draw() {
        const x = paper.view.bounds.width / 2;
        const y = paper.view.bounds.height / 2;

        const spiralWorker = new Worker('./spiral.js');

        const multiple = 10;
        const line = new paper.Path({
            from: [x, y],
            strokeColor: 'rgba(0, 0, 0, 0.2)'
        });
        line.moveTo(x, y);
        for (let i = 1; i < 500; i++) {
            const even = i % 2 === 0;
            line.lineBy((even ? -multiple : multiple) * i, 0);
            line.lineBy(0, (even ? multiple : -multiple) * i);
        }

        spiralWorker.postMessage({ x, y, length: 300, multiple });
        spiralWorker.onmessage = function(e) {
            new paper.Path.Circle({
                center: e.data,
                radius: 2,
                fillColor: 'black'
            });
        };
    }

    const debouncedSetViewSize = debounce(() => {
        paper.setup(canvas);
        const [w, h] = windowDimensions();
        canvas.width = paper.view.viewSize.width = w - 300;
        canvas.height = paper.view.viewSize.height = h;
        draw();
    }, 500);

    onMount(() => {
        const [w, h] = windowDimensions();
        canvas.width = w - 300;
        canvas.height = h;
        paper.setup(canvas);
        draw();

        window.addEventListener('resize', () => debouncedSetViewSize());
    });
</script>

<style>
    canvas {
        height: 100%;
        background: white;
    }
</style>

<Route>
    <canvas bind:this={canvas} />
</Route>
