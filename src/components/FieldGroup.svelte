<script lang="ts">
    export let title: string;
</script>

<style>
    div {
        margin: 30px 0;
    }
    p {
        margin: 0 0 15px 0;
        font-size: 18px;
        font-weight: bold;
        color: white;
    }
</style>

<div>
    <p>{title}</p>
    <slot />
</div>
