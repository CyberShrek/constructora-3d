<script>
    import {onMount} from "svelte"
    import {Workshop} from "./workshop/workshop"

    export let workshop

    let canvas

    onMount(() => {
        workshop = new Workshop(canvas)
    })

</script>

<scene>
    <canvas bind:this={canvas}></canvas>
</scene>
