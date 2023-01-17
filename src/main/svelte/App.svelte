<script>
	import Toolpad from "./tool-pad/ToolPad.svelte"
    import Scene from "./scene/Scene.svelte"

    let workshop

</script>

<Toolpad workshop={workshop}/>

<Scene bind:workshop/>

<style>

</style>