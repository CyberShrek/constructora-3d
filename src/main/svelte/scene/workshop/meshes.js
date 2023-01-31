import {scene, sceneSize, shadowGenerator} from "./workshop"
import BABYLON from "babylonjs"
import MATERIALS from "babylonjs-materials"

// An abstract facade for BABYLON mesh provides convenient use of it.
// Consists of the BABYLON mesh and some clear functions useful for this project
class Facade{

    babylonMesh

    constructor(meshBuilderFunction,
                name,
                options,
                position = {x: undefined, y: undefined, z: undefined})
    {
        this.babylonMesh = meshBuilderFunction(name, options, scene)
        shadowGenerator.addShadowCaster(this.babylonMesh, true)
        this.babylonMesh.receiveShadows = true
        // this.babylonMesh.setPivotPoint({x: 0, y: -5, z: 0})
        this.moveTo(position)
    }

    // Ghost-state is useful to show that mesh does not currently exist
    set isGhost(isIt){
        this.babylonMesh.visibility = isIt ? 0.5 : 1
        // this.babylonMesh.receiveShadows = !isIt
        this.babylonMesh.isGhost    = !!isIt
    }
    get isGhost(){
        return this.babylonMesh.isGhost
    }

    // Suitable with every object containing x, y, z props. Not only with BABYLON.Vector3
    moveTo(position, round = false){
        let x = position.x,
            y = position.y,
            z = position.z

        const distanceToBottomMesh = 12

        if(round === true){
            x = Math.round(x)
            y = Math.round(y)
            z = Math.round(z)
        }

        this.babylonMesh.position.x = x
        this.babylonMesh.position.y = y
        this.babylonMesh.position.z = z
    }

    rotate(rotation){
        this.babylonMesh.rotation.x = rotation.x
        this.babylonMesh.rotation.y = rotation.y
        this.babylonMesh.rotation.z = rotation.z
    }
}

export class Ground extends Facade {
    constructor() {
        super(
            BABYLON.MeshBuilder.CreateGround,
            "ground",
            {width: sceneSize, height: sceneSize, subdivisions: sceneSize/2},
            {x: 0, y: 0, z: 0}
        )
    }
}

export class Grid extends Facade{
    constructor() {
        super(
            BABYLON.MeshBuilder.CreateGround,
            "grid",
            {width: sceneSize, height: sceneSize},
            {x: 0, y: 0.05, z: 0}
        )
        const groundMaterial = new MATERIALS.GridMaterial("groundMaterial", scene)
        groundMaterial.mainColor = new BABYLON.Color3(1, 1, 1)
        groundMaterial.lineColor = new BABYLON.Color3(0.0, 0.0, 0.0)
        groundMaterial.backFaceCulling = false
        groundMaterial.opacity = 0.5
        this.babylonMesh.material = groundMaterial
    }
}

export class Box extends Facade{
    constructor(position) {
        super(
            BABYLON.MeshBuilder.CreateBox,
            "box",
            {size: 10},
            position
        )
    }
}

export class Sphere extends Facade{
    constructor(position) {
        super(
            BABYLON.MeshBuilder.CreateSphere,
            "sphere",
            {diameter: 10, segments: 32},
            position
        )
    }
}

// Ghost-version of PrettyMesh
export class Ghost{
    constructor(/*PrettyMesh*/ prettyMesh) {

    }
}