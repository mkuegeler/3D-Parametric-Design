// Import Libraries
import * as BABYLON from 'babylonjs';
import { FDOrthoCamera } from './cameras';
import { FDArcRotateCamera } from './cameras';
import { FDHemisphericLight } from './lights';
import { FDStandardMaterial } from './materials';

// Import default values
import PA from './scene.json';
import CA from './cameras.json';
import LA from './lights.json';
import MA from './materials.json';

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
        this._params = { "PA": PA, "CA": CA, "LA": LA, "MA": MA };

    }

    createScene(): void {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);

        // Enable Collisions
        this._scene.collisionsEnabled = true;


        let cameras: any = [
            // new FDOrthoCamera(this._scene, this._params.CA.FDOrthoCamera).camera,
            new FDOrthoCamera(this._scene).camera,
            // new FDArcRotateCamera(this._scene, this._params.CA.FDArcRotateCamera).camera
            new FDArcRotateCamera(this._scene).camera
        ];

        let lights: any = [
            new FDHemisphericLight(this._scene).light
        ]

        let materials: any = [
            new FDStandardMaterial(this._scene).material
        ]

        // Set active camera
        let camera = cameras[this._params.PA.camera.id];
        camera.checkCollisions = true;

        this._scene.activeCamera = camera;
        if (this._params.PA.camera.attachControl === true) { camera.attachControl(this._canvas, true); }

        // Default light
        lights[this._params.PA.light.id];

        // Default geometry: a box
        let w: number = this._params.PA.box.width;
        let h: number = this._params.PA.box.height;
        let d: number = this._params.PA.box.depth;
        let o: number = this._params.PA.scene.ground.offset;

        let box = BABYLON.MeshBuilder.CreateBox("box_" + Date.now(), { width: w, height: h, depth: d }, this._scene);
        box.checkCollisions = true;
        box.material = materials[0];
        box.position.y = (h / 2);

        // Ground

        if (this._params.PA.scene.ground.cone === true) {

            var height = this._params.PA.scene.ground.height;
            var tessellation = this._params.PA.scene.ground.tessellation;
            var subdivisions = this._params.PA.scene.ground.subdivisions;
            
            let cone = BABYLON.Mesh.CreateCylinder("cone", height, (w * o), (w * o), tessellation, subdivisions, this._scene);
                cone.position.y = (height / 2);
                cone.checkCollisions = true;

        } else {
             let ground = BABYLON.MeshBuilder.CreateGround("ground", { width: (w * o), height: (d * o) });
             ground.checkCollisions = true;
        }
         


        // Background

        this._scene.clearColor = new BABYLON.Color4(this._params.PA.scene.background.r,
            this._params.PA.scene.background.g,
            this._params.PA.scene.background.b);

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