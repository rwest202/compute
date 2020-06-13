<script>
    import { fade } from 'svelte/transition';
    import { Router, Route } from 'svelte-routing';

    import { currentTopic } from './store/navigation';

    import MainLayout from './components/MainLayout.svelte';
    import SideNav from './components/SideNav.svelte';
    import Welcome from './components/routes/Welcome.svelte';
    import UlamSpiral from './components/routes/UlamSpiral.svelte';
</script>

<style>
    ul {
        padding: 0;
    }
    div {
        width: 100%;
    }
</style>

<Router>
    <MainLayout>
        <ul slot="sidebar">
            <SideNav />
        </ul>
        <div slot="content">
            <Route path="/" component={Welcome} />
            <Route path="/ulam-spiral" component={UlamSpiral} />
        </div>
    </MainLayout>
</Router>
