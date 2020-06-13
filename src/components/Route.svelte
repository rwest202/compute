<script>
    import { fade } from 'svelte/transition';
</script>

<style>
    div {
        width: 100%;
    }
</style>

<div in:fade={{ intro: true }}>
    <slot />
</div>
