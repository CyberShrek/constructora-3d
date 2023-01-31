import BABYLON from "babylonjs"
import {Ground, Grid, Sphere, Box} from "./meshes"

export let
    sceneSize = 200, //mm
    canvas,
    scene,
    ground,
    light,
    camera,
    shadowGenerator

// Allows interacting with the scene
export const workshop = {

    // First step
    assignCanvas(that) {
        if(canvas) throw Error("Canvas is already assigned!")
        canvas = that
        mountScene()
        mountLight()
        mountShadows()
        mountCamera()
        mountGround()

        new Sphere({x: 0, y: 15, z: 0})
    },

    // Allows toggling of creating
    creatingMode: {
        meshAdvance: null,

        enableBox() { this.startMeshAdvance(Box) },

        enableSphere(){ this.startMeshAdvance(Sphere) },

        startMeshAdvance(MeshClass){
            this.meshAdvance = new MeshClass()
            this.meshAdvance.isGhost = true
            on.pointerMove=() => this.meshAdvance?.moveTo(getPointerMeshPosition(), true)
        },

        disable(){

        }
    }
}

// Event callbacks
const on = {
    pointerMove(){},
    pointerUp(){}
}

// Returns BABYLON.Vector3 position of the pointer if it is inside any af babylon meshes or false if it isn't
function getPointerMeshPosition(){
    const pickInfo = scene.pick(
        scene.pointerX,
        scene.pointerY,
        function (mesh) {
            return (mesh && !mesh.isGhost)
        }
    )
    return pickInfo.hit ? pickInfo.pickedPoint: false
}

function mountScene() {
    scene = new BABYLON.Scene(new BABYLON.Engine(canvas, true))
    scene.getEngine().runRenderLoop(() => scene.render())
    scene.onPointerObservable.add((pointerInfo) => {
        switch (pointerInfo.type) {
            case BABYLON.PointerEventTypes.POINTERMOVE: on.pointerMove(); break
            case BABYLON.PointerEventTypes.POINTERUP: on.pointerUp(); break
        }
    })
}

function mountLight() {
    light = new BABYLON.DirectionalLight("light",
        new BABYLON.Vector3(0, -sceneSize, 0), scene)
    light.intensity = 0.9
    light.shadowMaxZ = sceneSize + 1
    light.shadowMinZ = sceneSize/10
}

function mountShadows(){
    shadowGenerator = new BABYLON.ShadowGenerator(sceneSize * 5, light)
    shadowGenerator.bias = 0.005
    shadowGenerator.normalBias = 0.2
    shadowGenerator.useContactHardeningShadow = true
}

function mountCamera() {
    camera = new BABYLON.ArcRotateCamera(
        "camera",
        BABYLON.Tools.ToRadians(90),
        BABYLON.Tools.ToRadians(65),
        100,
        BABYLON.Vector3.Zero(), scene)

    camera.attachControl(canvas, true)
    camera.upperRadiusLimit = sceneSize + 100;
}

function mountGround(){
    ground = new Ground()
    const grid = new Grid()
}