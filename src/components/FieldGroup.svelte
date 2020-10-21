<script lang="ts">
    export let title: string;
</script>

<style>
    div {
        margin: 0 0 30px 0;
    }
    p {
        display: flex;
        align-items: center;
        position: relative;
        margin: 0 -10px 15px -10px;
        font-size: 18px;
        font-weight: bold;
        color: black;
        width: 100%;
        background: white;
        padding: 3px 10px;
        border-radius: 10px;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
    }
</style>

<div>
    <p>{title}</p>
    <slot />
</div>
