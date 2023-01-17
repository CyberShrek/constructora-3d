import {scene, sceneSize, shadowGenerator} from "./workshop"
import BABYLON from "babylonjs";

let meshNumber = 0

export class Mesh{
    constructor(meshBuilderFunction,
                name,
                options,
                position = {x: 0, y: 0, z: 0})
    {
        this.mesh = meshBuilderFunction(`Mesh ${meshNumber}: ${name}`, options, scene)
        shadowGenerator.addShadowCaster(this.mesh, true)
        this.mesh.receiveShadows = true
        this.mesh.position.x = position.x
        this.mesh.position.y = position.y
        this.mesh.position.z = position.z
    }
}

export class Ground extends Mesh{
    constructor() {
        super(
            BABYLON.MeshBuilder.CreateGround,
            "ground",
            {width: sceneSize, height: sceneSize}
        )
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