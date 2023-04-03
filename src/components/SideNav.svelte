<script>
    import NavLink from './NavLink.svelte';
    import NavOption from './NavOption.svelte';
</script>

<ul>
    <NavLink to="/index" icon="/img/wave.svg">Welcome to Compute!</NavLink>
    <NavLink to="/ulam-spiral" icon="/img/ulam.png" configurable>
        Ulam Spiral
        <div slot="options">
            <NavOption to="/ulam-spiral/information" icon="info" />
            <NavOption to="/ulam-spiral/configure" icon="cog" />
        </div>
    </NavLink>
    <NavLink to="/game-of-life" icon="/img/gol.png" configurable>
        Game of Life
        <div slot="options">
            <NavOption to="/game-of-life/information" icon="info" />
            <NavOption to="/game-of-life/configure" icon="cog" />
        </div>
    </NavLink>
    <NavLink to="/feigenbaum-tree" icon="/img/feigenbaum.png" configurable>
        Feigenbaum Tree
        <div slot="options">
            <NavOption to="/feigenbaum-tree/information" icon="info" />
            <NavOption to="/feigenbaum-tree/configure" icon="cog" />
        </div>
    </NavLink>
</ul>

<style>
    ul {
        position: relative;
        padding: 0;
        margin: 0;
    }
</style>
