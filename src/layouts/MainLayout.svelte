<style>
    main {
        height: calc(100vh - 50px);
        width: 100%;
        display: flex;
    }

    nav {
        z-index: 1;
        flex: 0 0 300px;
        padding: 30px;
        box-shadow: 5px 0 5px -2px #0b8dfe;
        background-color: #0b8dfe;
        background-image: url('/img/circuit-board.svg');
        background-blend-mode: soft-light;
        overflow: auto;
    }

    div {
        width: 100%;
    }
</style>

<main>
    <!-- Fix double slot warning https://github.com/sveltejs/svelte/issues/4546 -->
    {#if false}
        <slot />
    {/if}

    <nav>
        <slot name="sidebar" />
    </nav>

    <div>
        <slot name="content" />
    </div>
</main>
