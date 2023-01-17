import {scene, sceneSize, shadowGenerator} from "./workshop"
import BABYLON from "babylonjs"
import MATERIALS from "babylonjs-materials"

let meshNumber = 0

export class Mesh{
    constructor(meshBuilderFunction,
                name,
                options,
                position = {x: 0, y: 0, z: 0},
                castShadows = true,
                receiveShadows = true)
    {
        this.mesh = meshBuilderFunction(`Mesh ${meshNumber}: ${name}`, options, scene)
        if(castShadows === true) shadowGenerator.addShadowCaster(this.mesh, true)
        this.mesh.receiveShadows = receiveShadows
        this.mesh.position.x = position.x
        this.mesh.position.y = position.y
        this.mesh.position.z = position.z
    }
}

export class Ground extends Mesh {
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

export class Grid extends Mesh{
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
        // groundMaterial.lineColor = new BABYLON.Color3(0.5, 0.5, 0.5)
        groundMaterial.backFaceCulling = false
        groundMaterial.opacity = 0.5
        this.mesh.material = groundMaterial
    }
}

export class Box extends Mesh{
    constructor(position) {
        super(
            BABYLON.MeshBuilder.CreateBox,
            "box",
            {size: 10},
            position
        )
    }
}

export class Sphere extends Mesh{
    constructor(position) {
        super(
            BABYLON.MeshBuilder.CreateSphere,
            "sphere",
            {diameter: 10, segments: 32},
            position
        )
    }
}