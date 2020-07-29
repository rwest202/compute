<script lang="ts">
    import { onMount } from 'svelte';
    import Pickr from '@simonwep/pickr';
    import { Path } from 'paper/dist/paper-core';

    export let id: string;
    export let color: string;

    let el: HTMLButtonElement;

    onMount(() => {
        const pickr = new Pickr({
            el,
            theme: 'nano',
            default: color,
            defaultRepresentation: 'HEXA',
            components: {
                preview: true,
                opacity: true,
                hue: true,
                interaction: {
                    input: true,
                    hex: true,
                    rgba: true
                }
            }
        })
            .on('init', instance => {
                if (id) {
                    instance._root.button.id = id;
                }
            })
            .on('change', c => {
                pickr.applyColor();
                color = c.toHEXA().toString();
            });
    });
</script>

<button bind:this={el} {...$$restProps}>
    <slot />
</button>
