<script>
    import { onMount } from 'svelte';
    import { Link } from 'svelte-routing';

    export let to = '';
    export let icon;
    export let configurable = false;

    let active;

    function getProps({ isCurrent }) {
        active = isCurrent;

        return {
            class: 'link'
        };
    }
</script>

<style>
    :global(.navlink > a) {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 15px;
        color: white;
        flex: 3;
    }

    li {
        transition: border-color 150ms ease;
        cursor: pointer;
        position: relative;
        list-style: none;
        height: 200px;
        background: #0b8dfe;
        border: 2px solid rgba(255, 255, 255, 0.2);
        border-bottom-width: 8px;
        margin-bottom: 20px;
        display: flex;
    }

    li.active {
        border-color: white;
        box-shadow: 0 0 10px 0 white, inset 0 0 10px 0 white;
        border-bottom-width: 8px;
    }

    img {
        height: 70px;
        width: 70px;
    }

    li p {
        margin: 0;
        color: white;
        font-size: 20px;
    }

    div {
        display: flex;
        flex-direction: column-reverse;
        transition: flex 150ms ease;
        flex: 0 0 0px;
        overflow-x: hidden;
    }

    div.show {
        flex: 0 0 50px;
    }
</style>

<li on: class="navlink" class:active>
    <Link {to} {getProps}>
        <img alt="" src={icon} />

        <p>
            <slot />
        </p>
    </Link>
    <div class:show={active && configurable}>
        <slot name="options" />
    </div>
</li>
