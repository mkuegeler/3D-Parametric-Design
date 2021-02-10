import * as BABYLON from 'babylonjs';
import { AbstractPoint } from './abstract';
import { AbstractBox } from './abstract';
import { AbstractNodes } from './abstract';
import PARAMS from './params.json';

// Main Class
export default class MainScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;
    private _params: any;


    constructor(canvasElement: string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._params = PARAMS;
    }

    createScene(): void {

        let camera_params = this._params.camera;
        let floor_params = this._params.floor;
        let column_params = this._params.column;
        let grid_params = this._params.grid;

        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);

        // Create a FreeCamera, and set its position.
        let dist = -(floor_params.depth + camera_params.offset)
        this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, dist), this._scene);

        // Target the camera to scene origin.
        this._camera.setTarget(BABYLON.Vector3.Zero());

        // Attach the camera to the canvas.
        this._camera.attachControl(this._canvas, false);

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

        // Geometry


        // Floor
        let floorMat = new BABYLON.StandardMaterial("floorMat", this._scene);
        floorMat.diffuseColor = new BABYLON.Color3(1, 0, 0);

        let floor = BABYLON.MeshBuilder.CreateBox("floor", { width: floor_params.width, height: floor_params.height, depth: floor_params.depth }, this._scene);
        floor.material = floorMat;

        // Columns


        let colMat = new BABYLON.StandardMaterial("colMat", this._scene);
        colMat.diffuseColor = new BABYLON.Color3(1, 0, 1);

        // let col_size = {width:0.2, height:3, depth: 0.2};
        let ColGrid = new AbstractNodes(new AbstractBox(new AbstractPoint(), floor_params.width, floor_params.height, floor_params.depth), grid_params.nx, grid_params.nz).create();

        var col: BABYLON.Mesh;
        var id: string;
        let scene = this._scene;
        let off = (column_params.width / 2);

        ColGrid.forEach(function (value) {
            id = (Math.random().toString().replace(/\./g, "col")).substr(0, 4);
            col = BABYLON.MeshBuilder.CreateBox(id, {
                width: column_params.width,
                height: column_params.height, depth: column_params.depth
            }, scene);

            col.material = colMat;

            col.position.x = value.x;
            col.position.y = ((column_params.height / 2) + off);
            col.position.z = value.z;

            console.log(value);

        });
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