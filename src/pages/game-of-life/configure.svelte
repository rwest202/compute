<script lang="ts">
    import {
        dotColor,
        backgroundColor,
        fpsThrottle,
        paused,
        steps,
        fps,
        maxIterations,
        gridSize,
    } from '../../store/gol';

    import ConfigureLayout from '../../layouts/ConfigureLayout.svelte';
    import GameOfLife from '../../components/GameOfLife.svelte';
    import ColorPicker from '../../components/ColorPicker.svelte';
    import FieldGroup from '../../components/FieldGroup.svelte';
    import FieldLabel from '../../components/FieldLabel.svelte';
    import Slider from '../../components/Slider.svelte';
    import Button from '../../components/Button.svelte';

    function play() {
        paused.set(false);
    }

    function pause() {
        paused.set(true);
    }
</script>

<ConfigureLayout>
    <div slot="settings">
        <FieldGroup title="Controls">
            <Button on:click={() => ($paused ? play() : pause())}>
                {#if $paused}play{:else}pause{/if}
            </Button>

            <FieldLabel for="maxIterations">Max Iterations</FieldLabel>
            <input
                id="maxIterations"
                type="number"
                bind:value={$maxIterations}
            />
        </FieldGroup>
        <FieldGroup title="Style">
            <FieldLabel for="backgroundColor">Background</FieldLabel>
            <ColorPicker id="backgroundColor" bind:color={$backgroundColor} />

            <FieldLabel for="dotColor">Color</FieldLabel>
            <ColorPicker id="dotColor" bind:color={$dotColor} />
        </FieldGroup>
    </div>
    <div slot="settings">
        <FieldGroup title="Performance">
            <FieldLabel for="fpsThrottle">FPS Throttle</FieldLabel>
            <Slider
                id="fpsThrottle"
                min={1}
                max={30}
                step={1}
                bind:value={$fpsThrottle}
            />

            <FieldLabel for="size">Grid Size</FieldLabel>
            <input id="gridSize" type="number" bind:value={$gridSize} />
        </FieldGroup>
        <FieldGroup title="Stats">
            <FieldLabel>Steps</FieldLabel>
            {$steps}

            <FieldLabel>FPS</FieldLabel>
            {$fps}
        </FieldGroup>
    </div>
    <div slot="content">
        <GameOfLife />
    </div>
</ConfigureLayout>

<style>
    h1 {
        color: white;
        font-size: 30px;
        margin-top: 30px 0;
    }

    /* Windows Chrome, make configure section scrollable */
    [slot='sidebar'] {
        height: 100%;
        overflow: auto;
        padding: 30px;
    }
</style>
