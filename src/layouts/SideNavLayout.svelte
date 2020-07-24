<script>
    import MainLayout from './MainLayout.svelte';
    import SideNav from '../components/SideNav.svelte';
</script>

<style>
    div {
        height: 100%;
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
