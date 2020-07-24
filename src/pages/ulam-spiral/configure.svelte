<script>
    import MainLayout from '../../layouts/MainLayout.svelte';
    import UlamSpiral from '../../components/UlamSpiral.svelte';

    import BackButton from '../../components/BackButton.svelte';
    import Slider from '../../components/Slider.svelte';
    import ColorPicker from '../../components/ColorPicker.svelte';

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
    } from '../../store/spiral';
</script>

<style>
    h1 {
        color: white;
        font-size: 30px;
        margin-top: 30px;
    }
</style>

<MainLayout>
    <div slot="sidebar">
        <BackButton to="/ulam-spiral" />

        <h1>Configure</h1>

        <label>
            <b>Style</b>
        </label>
        <br />
        <label>Background</label>
        <ColorPicker bind:color={$backgroundColor}>DOT COLOR</ColorPicker>
        <br />
        <br />
        <label>
            <b>Prime Dots</b>
        </label>
        <br />
        <label>Color</label>
        <ColorPicker bind:color={$dotColor}>DOT COLOR</ColorPicker>
        <br />
        <br />
        <label>Size</label>
        <br />
        <Slider min={1} max={4} step={0.5} bind:value={$dotSize} />
        <br />
        <br />
        <label>
            <b>Grid</b>
        </label>
        <br />
        <label>Show Grid</label>
        <input type="checkbox" bind:checked={$showGrid} />
        <br />
        <br />
        <label>Color</label>
        <ColorPicker bind:color={$gridColor}>DOT COLOR</ColorPicker>
        <br />
        <br />
        <label>Line Width</label>
        <br />
        <Slider min={1} max={4} step={0.5} bind:value={$gridWidth} />
        <br />
        <br />
        <label>
            <b>Performance</b>
        </label>
        <br />
        <label>Render Density</label>
        <br />
        <Slider min={2} max={15} step={1} bind:value={$density} />
        <br />
        <br />
        <label>Throttle Rendering</label>
        <br />
        <input type="number" bind:value={$throttle} />
        <br />
        <br />
        <button
            on:click={() => ($dataUrl = document
                    .querySelector('canvas')
                    .toDataURL())}>
            Save Image
        </button>
        {#if $dataUrl}
            <iframe title="Download image" src={$dataUrl}>
                Download Image
            </iframe>
        {/if}

        <h1>Stats</h1>
        <label>Number of primes</label>
        <br />
        <label>Rendered in 20ms</label>

    </div>
    <div slot="content">
        <UlamSpiral />
    </div>
</MainLayout>
