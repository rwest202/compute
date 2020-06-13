<style>
    main {
        height: 100vh;
        width: 100%;
        display: flex;
    }

    nav {
        z-index: 1;
        flex: 0 0 300px;
        padding: 30px;
        box-shadow: 0 0 10px 0 #0b8dfe;
        background-color: #0b8dfe;
        background-image: url('/img/circuit-board.svg');
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

    <slot name="content" />
</main>
