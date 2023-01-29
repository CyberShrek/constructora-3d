<script>
    import {onMount} from "svelte"
    import {workshop} from "./workshop/workshop"

    let canvas,
        height,
        width

    onMount(() => {
        workshop.assignCanvas(canvas)
    })
</script>

<scene bind:clientWidth={width}
       bind:clientHeight={height}>

    <canvas width={width}
            height={height}
            bind:this={canvas}></canvas>
</scene>
