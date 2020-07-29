<script>
    import NavLink from './NavLink.svelte';
    import NavOption from './NavOption.svelte';
</script>

<style>
    ul {
        position: relative;
        padding: 0;
        margin: 0;
    }
</style>

<ul>
    <NavLink to="/index" icon="/img/wave.svg">Welcome to Compute!</NavLink>
    <NavLink to="/ulam-spiral" icon="/img/ulam.png" configurable>
        Ulam Spiral
        <div slot="options">
            <NavOption to="/ulam-spiral/information" icon="info" />
            <NavOption to="/ulam-spiral/configure" icon="cog" />
        </div>
    </NavLink>
</ul>
