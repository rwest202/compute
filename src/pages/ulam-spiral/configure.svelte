<script lang="ts">
    import {
        backgroundColor,
        dotColor,
        dotSize,
        showGrid,
        gridColor,
        gridWidth,
        density,
        throttle,
        dataUrl,
    } from '../../store/spiral';

    import MainLayout from '../../layouts/MainLayout.svelte';
    import UlamSpiral from '../../components/UlamSpiral.svelte';
    import BackButton from '../../components/BackButton.svelte';
    import Slider from '../../components/Slider.svelte';
    import ColorPicker from '../../components/ColorPicker.svelte';
    import FieldGroup from '../../components/FieldGroup.svelte';
    import FieldLabel from '../../components/FieldLabel.svelte';
    import Button from '../../components/Button.svelte';
</script>

<style>
    h1 {
        color: white;
        font-size: 30px;
        margin-top: 30px 0;
    }
    
    /* Windows Chrome, make configure section scrollable */
    [slot="sidebar"] {
        height: 100%;
        overflow: auto;
        padding: 30px;
    }
</style>

<MainLayout>
    <div slot="sidebar">
        <BackButton to="/ulam-spiral" />

        <h1>Configure</h1>

        <FieldGroup title="Style">
            <FieldLabel for="backgroundColor">Background</FieldLabel>
            <ColorPicker id="backgroundColor" bind:color={$backgroundColor} />

        </FieldGroup>

        <FieldGroup title="Prime Number Dots">
            <FieldLabel for="dotColor">Color</FieldLabel>
            <ColorPicker id="dotColor" bind:color={$dotColor} />

            <FieldLabel for="dotSize">Size</FieldLabel>
            <Slider
                id="dotSize"
                min={1}
                max={4}
                step={0.5}
                bind:value={$dotSize} />
        </FieldGroup>

        <FieldGroup title="Grid">
            <FieldLabel for="showGrid">Show Grid</FieldLabel>
            <input id="showGrid" type="checkbox" bind:checked={$showGrid} />

            <FieldLabel for="dotColor">Color</FieldLabel>
            <ColorPicker id="dotColor" bind:color={$gridColor} />

            <FieldLabel for="lineWidth">Line Width</FieldLabel>
            <Slider
                id="lineWidth"
                min={1}
                max={4}
                step={1}
                bind:value={$gridWidth} />

        </FieldGroup>

        <FieldGroup title="Performance">
            <FieldLabel for="renderDensity">Render Density</FieldLabel>
            <Slider
                id="renderDensity"
                min={2}
                max={15}
                step={1}
                bind:value={$density} />

            <FieldLabel for="throttleRendering">
                Throttle Rendering (ms)
            </FieldLabel>
            <input
                id="throttleRendering"
                type="number"
                bind:value={$throttle} />

        </FieldGroup>

        <FieldLabel title="Stats" />
        <FieldLabel title="Number of primes" />
        <FieldLabel title="Rendered in 20ms" />

    </div>
    <div slot="content">
        <UlamSpiral />
    </div>
</MainLayout>
