<script>

    import CreatingButton from "./buttons/CreatingButton.svelte"
    import {workshop} from "../scene/workshop/workshop"

    let isBoxCreatingActive    = false,
        isSphereCreationActive = false

    $:   if(isBoxCreatingActive)    workshop.creatingMode.enableBox()
    else if(isSphereCreationActive) workshop.creatingMode.enableSphere()
    else workshop.creatingMode.disable()

</script>

<tool-pad>

    <CreatingButton title="Create a Box"
                    bind:isActive={isBoxCreatingActive}
                    imageSrc="images/box.png"/>

    <CreatingButton title="Create a Sphere"
                    bind:isActive={isSphereCreationActive}
                    imageSrc="images/sphere.png"/>

</tool-pad>