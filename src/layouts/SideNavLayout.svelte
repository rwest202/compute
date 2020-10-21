<script>
    import MainLayout from './MainLayout.svelte';
    import SideNav from '../components/SideNav.svelte';
</script>

<style>
    [slot="sidebar"] {
        padding: 30px;
    }

    [slot="content"] {
        position: relative;
    }
</style>

<MainLayout>
    <div slot="sidebar">
        <SideNav />
    </div>
    <div slot="content">
        <slot />
    </div>
</MainLayout>
