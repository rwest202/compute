<script lang="ts">
    import { url } from '@sveltech/routify';

    export let to: string;
</script>

<style>
    a {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        color: white;
        font-size: 30px;
    }
</style>

<a href={$url(to)} aria-label="Go back">
    <i class="far fa-arrow-alt-circle-left" />
</a>
