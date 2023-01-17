import BABYLON from "babylonjs"
import {Box, Ground, Sphere} from "./meshes"

export let
    canvas,
    sceneSize = 100,
    scene,
    light,
    shadowGenerator

export class Workshop {

    constructor(canvas) {
        mountScene()
        mountLight()
        mountCamera()
        new Ground()

        function mountScene() {
            scene = new BABYLON.Scene(new BABYLON.Engine(canvas, true))
            scene.getEngine().runRenderLoop(() => scene.render())
        }

        function mountLight() {
            light = new BABYLON.DirectionalLight("light",
                new BABYLON.Vector3(sceneSize, -sceneSize, sceneSize), scene)
            shadowGenerator = new BABYLON.ShadowGenerator(1024, light)
        }

        function mountCamera() {
            new BABYLON.ArcRotateCamera(
                "camera",
                BABYLON.Tools.ToRadians(90),
                BABYLON.Tools.ToRadians(65),
                100,
                BABYLON.Vector3.Zero(), scene)
                .attachControl(canvas, true)
        }
    }

    sphereCount = 0
    createSphere = (position) => new Sphere(position)

    createBox = (position) => new Box(position)
}