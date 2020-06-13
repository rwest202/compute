<script>
    import { Link } from 'svelte-routing';

    export let to;
    export let icon;

    function getProps() {
        return {
            class: 'nav-option'
        };
    }
</script>

<style>
    :global(.nav-option) {
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

<Link {to} {getProps}>
    <div>
        <i class="fas fa-{icon} fa-lg" />
    </div>
</Link>
