<script>
    import {onMount} from "svelte"
    import {mountSceneToCanvas} from "./workshop";

    let canvas

    onMount(() => mountSceneToCanvas(canvas))
</script>

<scene>
    <canvas bind:this={canvas}></canvas>
</scene>
