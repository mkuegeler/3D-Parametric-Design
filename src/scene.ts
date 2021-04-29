// Import Libraries
import * as BABYLON from 'babylonjs';
import { FDOrthoCamera } from './cameras';
import { FDArcRotateCamera } from './cameras';
import { FDHemisphericLight } from './lights';

// Import default values
import PA from './scene.json';
import CA from './cameras.json';
import LA from './lights.json';

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
        this._params = { "PA": PA, "CA": CA, "LA": LA };

    }

    createScene(): void {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);

        let cameras: any = [
            // new FDOrthoCamera(this._scene, this._params.CA.FDOrthoCamera).camera,
            new FDOrthoCamera(this._scene).camera,
            // new FDArcRotateCamera(this._scene, this._params.CA.FDArcRotateCamera).camera
            new FDArcRotateCamera(this._scene).camera
        ];

        let lights: any = [
            new FDHemisphericLight(this._scene).light
        ]

        // Set active camera
        this._scene.activeCamera = cameras[this._params.PA.camera.id];
        if (this._params.PA.camera.attachControl === true) {cameras[this._params.PA.camera.id].attachControl(this._canvas, true);}

        // Default light
        lights[this._params.PA.light.id];

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