import BABYLON from "babylonjs"
import {Ground, Grid, Sphere, Box} from "./meshes"

export let
    canvas,
    sceneSize = 200, //mm
    scene,
    light,
    camera,
    shadowGenerator

export class Workshop {

    constructor(canvas) {
        mountScene()
        mountLight()
        mountShadows()
        mountCamera()
        new Ground()
        new Grid()

        function mountScene() {
            scene = new BABYLON.Scene(new BABYLON.Engine(canvas, true))
            scene.getEngine().runRenderLoop(() => scene.render())
        }

        function mountLight() {
            light = new BABYLON.DirectionalLight("light",
                new BABYLON.Vector3(0, -sceneSize, 0), scene)
            light.intensity = 0.9
            light.shadowMaxZ = sceneSize + 1
            light.shadowMinZ = sceneSize/10
        }

        function mountShadows(){
            shadowGenerator = new BABYLON.ShadowGenerator(sceneSize, light)
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
            camera.upperRadiusLimit = sceneSize;
        }
    }

    createSphere = (position) => new Sphere(position)

    createBox = (position) => new Box(position)
}