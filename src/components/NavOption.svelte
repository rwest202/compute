<script lang="ts">
    import { url } from '@sveltech/routify';

    export let to: string;
    export let icon: string;
</script>

<style>
    a {
        text-decoration: none;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        transition: font-size 150ms ease;
    }

    div:hover {
        font-size: 22px;
    }

    i {
        color: black;
    }
</style>

<a href={$url(to)}>
    <div>
        <i class="fas fa-{icon} fa-lg" />
    </div>
</a>
