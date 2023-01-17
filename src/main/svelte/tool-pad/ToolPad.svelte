<script>
    export let workshop;

</script>

<tool-pad>
    <button class="create polygon">
        <img src="images/pentagon.png" alt="">
    </button>
    <button class="create box"
            on:click={() => workshop.createBox()}>
        <img src="images/cube.png" alt="">
    </button>
    <button class="create sphere"
            on:click={() => workshop.createSphere()}>
        <img src="images/sphere.png" alt="">
    </button>
</tool-pad>