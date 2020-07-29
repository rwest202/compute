<script lang="ts">
    export let value: number;
    export let min: number;
    export let max: number;
    export let step = 1;
</script>

<input type="range" bind:value {min} {max} {step} {...$$restProps} />
