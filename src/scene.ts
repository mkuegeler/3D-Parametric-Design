// Import Libraries
import * as BABYLON from 'babylonjs';
import { FDOrthoCamera } from './cameras';

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

        let cameras: any = [new FDOrthoCamera(this._scene, this._params.CA.FDOrthoCamera).camera,
        new FDOrthoCamera(this._scene, this._params.CA.FDOrthoCamera).camera
        ];

        // Create a orthographic front camera
        // this._camera = new FDOrthoCamera(this._scene,this._params.CA.FDOrthoCamera).camera;
        // this._scene.activeCamera = new FDOrthoCamera(this._scene,this._params.CA.FDOrthoCamera).camera;

        this._scene.activeCamera = cameras[0];

        // Default light
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), this._scene);

        // Default geometry: a box
        const box = BABYLON.MeshBuilder.CreateBox("box", { width: 20, height: 10, depth: 20 }, this._scene);

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