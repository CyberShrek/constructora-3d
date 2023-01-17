<script>
    export let workshop;

</script>

<tool-pad>
    <button class="create polygon">
        <img src="images/pentagon.png" alt="">
    </button>
    <button class="create box"
            on:click={() => workshop.createBox({x:0, y: 50, z: 0})}>
        <img src="images/cube.png" alt="">
    </button>
    <button class="create sphere"
            on:click={() => workshop.createSphere({x:0, y: 65, z: 0})}>
        <img src="images/sphere.png" alt="">
    </button>
</tool-pad>