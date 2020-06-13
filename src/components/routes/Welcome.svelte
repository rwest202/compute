<script>
    import Route from '../Route.svelte';

    export let location;
</script>

<style>
    h1 {
        margin: 0;
        margin-top: 20%;
        font-size: 64px;
        text-align: center;
    }

    h2 {
        text-align: center;
    }
</style>

<Route>
    <h1>Compute</h1>
    <h2>beep boop</h2>
</Route>
