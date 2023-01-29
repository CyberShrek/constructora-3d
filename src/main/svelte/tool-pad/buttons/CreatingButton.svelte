<script>
    import {activeCreatingButton} from "./stores";

    export let
        title = "",
        isActive = false,
        imageSrc

    let buttonEl

    function toggleButton(){
        activeCreatingButton.set(isActive ? null : buttonEl)
    }

    // Only one button can be active
    activeCreatingButton.subscribe(value => {
        isActive = value === buttonEl
    })

</script>

<button bind:this={buttonEl}
        title={title}
        class="create"
        class:active={isActive}
        on:click={toggleButton}>

    <img src={imageSrc}
         alt="img">

</button>