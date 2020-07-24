<script>
    import { url } from '@sveltech/routify';

    export let to;
    export let icon;
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
        transition: background-color 150ms ease;
    }

    div:hover {
        background-color: rgba(255, 255, 255, 0.3);
    }

    i {
        color: white;
    }
</style>

<a href={$url(to)}>
    <div>
        <i class="fas fa-{icon} fa-lg" />
    </div>
</a>
