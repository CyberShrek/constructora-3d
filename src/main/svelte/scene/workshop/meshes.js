import {scene, sceneSize, shadowGenerator} from "./workshop"
import BABYLON from "babylonjs"
import MATERIALS from "babylonjs-materials"

let meshNumber = 0

// An abstract facade for BABYLON mesh provides convenient use of it.
// Consists of the BABYLON mesh and some clear functions useful for this project
class Facade{

    babylonMesh

    constructor(meshBuilderFunction,
                name,
                options,
                position = {x: 0, y: 0, z: 0},
                castShadows = true,
                receiveShadows = true)
    {
        this.babylonMesh = meshBuilderFunction(`Mesh ${meshNumber}: ${name}`, options, scene)
        if(castShadows === true) shadowGenerator.addShadowCaster(this.babylonMesh, true)
        this.babylonMesh.receiveShadows = receiveShadows
        this.moveTo(position)
    }

    // Ghost-state is useful to show that mesh does not currently exist
    set isGhost(isIt){
        if(isIt){
            this.babylonMesh.visibility = 0.5
        }
        else {
            this.babylonMesh.visibility = 1
        }
        this.babylonMesh.isGhost = !!isIt
    }
    get isGhost(){
        return this.babylonMesh
    }

    // Suitable with every object containing x, y, z props. Not only with BABYLON.Vector3
    moveTo(position){
        if(position) {
            this.babylonMesh.position.x = position.x
            this.babylonMesh.position.y = position.y
            this.babylonMesh.position.z = position.z
        }
    }
}

export class Ground extends Facade {
    constructor() {
        super(
            BABYLON.MeshBuilder.CreateGround,
            "ground",
            {width: sceneSize, height: sceneSize, subdivisions: sceneSize/2},
            {x: 0, y: 0, z: 0},
            false
        )
    }
}

export class Grid extends Facade{
    constructor() {
        super(
            BABYLON.MeshBuilder.CreateGround,
            "grid",
            {width: sceneSize, height: sceneSize},
            {x: 0, y: 0.05, z: 0},
            false,
            false
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