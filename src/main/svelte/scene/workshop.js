import BABYLON from "babylonjs"

let scene,
    light,
    shadowGenerator

export class Workshop{

    constructor(canvas, sceneSize = 100) {
        mountScene()
        mountGround()
        mountLight()
        mountCamera()

        function mountScene() {
            scene = new BABYLON.Scene(new BABYLON.Engine(canvas, true))
            scene.getEngine().runRenderLoop(() => scene.render())
        }
        function mountGround() {
            createMeshBy(
                BABYLON.MeshBuilder.CreateGround,
                "ground",
                {width: sceneSize, height: sceneSize})
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

    createSphere=(x = 0, y = 0, z = 0) =>
        createMeshBy(
            BABYLON.MeshBuilder.CreateSphere,
            "sphere",
            {diameter: 10, segments: 32},
            x, y, z)

}

function createMeshBy(meshBuilderFunction, name, options, x = 0, y = 0, z = 0) {
    const mesh = meshBuilderFunction(name, options, scene)
    shadowGenerator.addShadowCaster(mesh, true)
    mesh.receiveShadows = true
    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = z
    return mesh
}