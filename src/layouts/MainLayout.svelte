<script lang="ts">
    let minimized = false;
</script>

<main>
    <!-- Fix double slot warning https://github.com/sveltejs/svelte/issues/4546 -->
    {#if false}
        <slot />
    {/if}

    <nav>
        <slot name="sidebar" />
    </nav>

    <div class="content">
        <slot name="content" />
    </div>
</main>

<style>
    main {
        display: flex;
        height: calc(100vh - 50px);
        width: 100%;
    }

    nav {
        z-index: 1;
        flex: 0 0 300px;
        background-color: #0b8dfe;
        background-image: url('/img/circuit-board.svg');
        background-blend-mode: soft-light;
        max-height: 100vh;
        overflow: scroll;
    }

    .content {
        width: 100%;
        height: 100%;
    }
</style>
