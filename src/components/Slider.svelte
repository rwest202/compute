<script>
    export let value;
    export let min;
    export let max;
    export let step = 1;
</script>

<input type="range" bind:value {min} {max} {step} />
