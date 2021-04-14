import * as BABYLON from 'babylonjs';
import { AbstractPoint } from './abstract';
import { AbstractBox } from './abstract';
import { AbstractNodes } from './abstract';
import { FDOrthoCamera } from './cameras';
import PARAMS from './params.json';

// Main Class
export default class MainScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera1: BABYLON.FreeCamera;
    private _camera2: BABYLON.FreeCamera;
    private _light: BABYLON.Light;
    private _params: any;


    constructor(canvasElement: string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._params = PARAMS;
    }

    createScene(): void {

        let camera1_params = this._params.camera1;
        let camera2_params = this._params.camera2;
        let floor_params = this._params.floor;
        let column_params = this._params.column;
        let wall_params = this._params.wall;
        let grid_params = this._params.grid;
        let is_floor: Boolean = floor_params.active;
        let is_col: Boolean = column_params.active;
        let is_wal: Boolean = wall_params.active;

        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);

        // Create a FreeCamera, and set its position.
        let dist1 = -(floor_params.depth + camera1_params.z)
        // this._camera1 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(camera1_params.x, camera1_params.y, dist1), this._scene);
        // this._camera1.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;

        // this._camera1.orthoTop = 15;
        // this._camera1.orthoBottom = -15;
        // this._camera1.orthoLeft = -15;
        // this._camera1.orthoRight = 15;

        // // Target the camera to scene origin.
        // this._camera1.setTarget(BABYLON.Vector3.Zero());

        // let dist2 = -(floor_params.depth + camera2_params.z)
        // this._camera2 = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(camera2_params.x, camera2_params.y, dist2), this._scene);
        // // Attach the camera to the canvas.
        // this._camera2.attachControl(this._canvas, false);

        // camera1_params.x, camera1_params.y, dist1

        this._camera1 = new FDOrthoCamera(camera1_params.x, camera1_params.y, dist1).create(this._scene);

        this._scene.activeCamera = this._camera1;

        // Create a basic light, aiming 0,1,0 - meaning, to the sky.
        this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);

        // Floor Material
        let floorMat = new BABYLON.StandardMaterial("floorMat", this._scene);
        floorMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
        // Column Material
        let colMat = new BABYLON.StandardMaterial("colMat", this._scene);
        colMat.diffuseColor = new BABYLON.Color3(1, 1, 0);
        // Wall Material
        let walMat = new BABYLON.StandardMaterial("colMat", this._scene);
        walMat.diffuseColor = new BABYLON.Color3(1, 0, 1);


        // Check if number of floors is equal or larger than 1
        if (Number(grid_params.ny) <= 0) { grid_params.ny = 1; }

        let ColGrid = new AbstractNodes(new AbstractBox(new AbstractPoint(),
            (floor_params.width - column_params.width),
            (column_params.height + floor_params.height),
            (floor_params.depth - column_params.depth)), grid_params.nx, grid_params.ny, grid_params.nz).create();

        var col: BABYLON.Mesh;
        var flo: BABYLON.Mesh;
        var wal: BABYLON.Mesh;
        let scene = this._scene;
        var offset = ((column_params.height / 2) + (floor_params.height / 2));
        let prey: number;
        var level: number = 0;
        var wal_width: number;
        var wal_count: number = 0;
        var wal_offset: number = 2;


        ColGrid.forEach(function (value) {

            if (is_col == true) {

                col = BABYLON.MeshBuilder.CreateBox((Math.random().toString().replace(/\./g, "col")).substr(0, 4), {
                    width: column_params.width,
                    height: column_params.height, depth: column_params.depth
                }, scene);
                col.material = colMat;
                col.position.x = Number(value.x);
                prey = Number(value.y);
                col.position.y = (Number(value.y) + offset);
                col.position.z = value.z;

            }

            // wal_width = ((Number(floor_params.width)/Number(grid_params.nx))-(Number(column_params.width)*Number(grid_params.nx)));
            // wal_width = ((Number(floor_params.width)-(Number(column_params.width)*Number(grid_params.nx)))/Number(grid_params.nx));
            // console.log(wal_width.toFixed(4));
            // console.log(Number(floor_params.width));
            // console.log(Number(column_params.width));
            // console.log(level);

            if (is_wal == true) {

                //if ((wal_count < Number(grid_params.nx)) && (level < 4)) {
                wal_width = ((Number(floor_params.width) / Number(grid_params.nx)) - (Number(column_params.width)));
                wal = BABYLON.MeshBuilder.CreateBox((Math.random().toString().replace(/\./g, "wal")).substr(0, 4), {
                    width: wal_width,
                    height: column_params.height, depth: (Number(column_params.depth) / wal_offset)
                }, scene);
                wal.material = walMat;
                // wal.position.x = (Number(value.x)+(wal_width/2)+(Number(column_params.width)/2));
                // wal.position.x = Number(value.x);
                wal.position.x = (Number(value.x) + ((wal_width / 2) + (Number(column_params.width) / 2)));
                wal.position.y = (Number(value.y) + offset);
                wal.position.z = value.z;
                //}
                wal_count = (wal_count < Number(grid_params.nx)) ? wal_count : 0;
                wal_count++;

            }

            if (is_floor == true) {

                if ((prey != (Number(value.y) + offset)) && (level <= Number(grid_params.ny))) {

                    flo = BABYLON.MeshBuilder.CreateBox((Math.random().toString().replace(/\./g, "flo")).substr(0, 4), {
                        width: floor_params.width,
                        height: floor_params.height, depth: floor_params.depth
                    }, scene);
                    flo.material = floorMat;
                    if (level >= 1) {
                        flo.position.y = ((column_params.height + floor_params.height) * level);
                    }
                    level++;
                }

            }

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