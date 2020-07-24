<script>
    import { onMount } from 'svelte';
    import Pickr from '@simonwep/pickr';

    let el;
    export let color;

    onMount(() => {
        const pickr = new Pickr({
            el,
            theme: 'nano',
            default: color,
            defaultRepresentation: 'HEX',
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
        }).on('change', c => {
            pickr.applyColor();
            color = c.toHEXA().toString();
        });
    });
</script>

<button bind:this={el}>
    <slot />
</button>
