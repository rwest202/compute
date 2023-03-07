<script lang="ts">
    import MainLayout from './MainLayout.svelte';
    import BackButton from '../components/BackButton.svelte';
</script>

<MainLayout>
    <div slot="sidebar">
        <BackButton to="/ulam-spiral" />

        <h1>Configure</h1>

        <slot name="settings" />
    </div>
    <div slot="content">
        <slot name="content" />
    </div>
</MainLayout>

<style>
    h1 {
        color: white;
        font-size: 30px;
        margin-top: 30px 0;
    }

    /* Windows Chrome, make configure section scrollable */
    [slot='sidebar'] {
        height: 100%;
        overflow: auto;
        padding: 30px;
    }
</style>
