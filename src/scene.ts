// Import Libraries
import * as BABYLON from 'babylonjs';
import { FDOrthoCamera } from './cameras';
import { FDArcRotateCamera } from './cameras';

// Import default values
import PA from './params.json';
import CA from './cameras.json';

// Main Class
export default class MainScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _params: any;


    constructor(canvasElement: string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);

        this._params = { "PA": PA, "CA": CA };

    }

    createScene(): void {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);

        let cameras: any = [
            new FDOrthoCamera(this._scene, this._params.CA.FDOrthoCamera).camera,
            // new FDArcRotateCamera(this._scene, this._params.CA.FDArcRotateCamera).camera
            new FDArcRotateCamera(this._scene).camera
        ];

        // let camera = new FDArcRotateCamera(this._scene).camera

        // camera.attachControl(this._canvas, true);

        // static camera
        // let camera = new FDOrthoCamera(this._scene).camera;
        // this._scene.activeCamera = camera;
        // camera.attachControl(this._canvas, true);

        // Set active camera
        this._scene.activeCamera = cameras[1];
        cameras[1].attachControl(this._canvas, true);

        // const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 5, -20), this._scene);

        // const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 25, -50), this._scene);
        // Targets the camera to a particular position. In this case the scene origin
        // camera.setTarget(BABYLON.Vector3.Zero());

        // javascript radian to degree and vise versa
        // const radsToDegs = 2 * 180 / Math.PI;
        // const ArcRotateDegrees = { "a": 0, "b": 0, "r": 0 };
        // // const degsToRads: number = (45 * Math.PI) / 180.0;

        // let p = this._params.CA.FDArcRotateCamera;
        // Object.keys(p.RotateDegrees).map(function (key) {
        //     p.RotateDegrees[key] = (p.RotateDegrees[key] * Math.PI) / 180.0;
        // });
        // const camera = new BABYLON.ArcRotateCamera("camera", 0, p.RotateDegrees.b, 50, new BABYLON.Vector3(p.x, p.y, p.z), this._scene);
        // camera.setTarget(BABYLON.Vector3.Zero());
        // // dynamic camera control
        // camera.attachControl(this._canvas, true);

        // static camera
        // this._scene.activeCamera = camera;

        // Default light
        new BABYLON.HemisphericLight("light_" + Date.now(), new BABYLON.Vector3(0, 1, 0), this._scene);

        // Default geometry: a box
        let w: number = this._params.PA.box.width;
        let h: number = this._params.PA.box.height;
        let d: number = this._params.PA.box.depth;

        BABYLON.MeshBuilder.CreateBox("box_" + Date.now(), { width: w, height: h, depth: d }, this._scene);

    }

    doRender(): void {
        // Run the render loop.
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}