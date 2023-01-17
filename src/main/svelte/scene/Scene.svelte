<script>
    import {onMount} from "svelte"
    import {Workshop} from "./workshop/workshop"

    export let workshop
    let canvas,
        height,
        width

    onMount(() => {
        workshop = new Workshop(canvas)
    })
</script>

<scene bind:clientWidth={width}
       bind:clientHeight={height}>
    <canvas width={width}
            height={height}
            bind:this={canvas}></canvas>
</scene>
