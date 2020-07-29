<script lang="ts">
    import { onMount } from 'svelte';
    import { url, isActive } from '@sveltech/routify';

    export let to = '';
    export let icon: string;
    export let configurable = false;
</script>

<style>
    a {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        padding: 15px;
        flex: 3;
        color: black;
    }

    li {
        display: flex;
        transition: border-color 150ms ease;
        cursor: pointer;
        position: relative;
        list-style: none;
        height: 200px;
        background: white;
        border-bottom-width: 8px;
        margin-bottom: 20px;
        border-radius: 8px;
    }

    li.active {
        border-color: white;
        box-shadow: 0 0 10px white;
        border-bottom-width: 8px;
    }

    img {
        height: 70px;
        width: 70px;
        filter: invert();
    }

    li p {
        margin: 0;
        font-size: 20px;
    }

    div {
        display: flex;
        flex-direction: column-reverse;
        transition: flex 150ms ease;
        flex: 0 0 0px;
        overflow: hidden;
    }

    div.show {
        flex: 0 0 50px;
    }
</style>

<li on: class="navlink" class:active={$isActive(to)}>
    <a href={$url(to)}>
        <img alt="" src={icon} />

        <p>
            <slot />
        </p>
    </a>
    <div class:show={$isActive(to) && configurable}>
        <slot name="options" />
    </div>
</li>
