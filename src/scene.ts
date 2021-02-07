import * as BABYLON from 'babylonjs';
import { AbstractPoint } from './abstract';
import { AbstractBox } from './abstract';
import { AbstractNodes } from './abstract';
import PARAMS from './params.json';


// Auxiliary Classes
interface GridInterface {
    name: String;
}

class Grid implements GridInterface {
    name = "grid";
    constructor(x: number, y: number, z:number) { }
}


// Main Class
export default class MainScene {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.FreeCamera;
    private _light: BABYLON.Light;
    private _width: number;
    private _height: number;
    private _depth: number;
    private _offset: number;

    constructor(canvasElement: string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
        this._width = PARAMS.width;
        this._height = PARAMS.height;
        this._depth = PARAMS.depth;
        this._offset = PARAMS.offset;
    }

    createScene(): void {
        // Create a basic BJS Scene object.
        this._scene = new BABYLON.Scene(this._engine);

        // Create a FreeCamera, and set its position to (x:0, y:5, z:-10).
        let dist = -(this._depth+this._offset)
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

        let floor = BABYLON.MeshBuilder.CreateBox("floor", { width: this._width, height: this._height, depth: this._depth }, this._scene);
        floor.material = floorMat;

        // Columns
        

        let colMat = new BABYLON.StandardMaterial("colMat", this._scene);
        colMat.diffuseColor = new BABYLON.Color3(1, 0, 1);

        let col_size = {width:0.2, height:3, depth: 0.2};
        let ColGrid = new AbstractNodes(new AbstractBox(new AbstractPoint(),this._width,this._height,this._depth),4,4).create();
        
        var col: BABYLON.Mesh;
        var id: string;
        let scene = this._scene;
        let off = (col_size.width/2);

        ColGrid.forEach(function (value) {
            id = (Math.random().toString().replace(/\./g , "col")).substr(0, 4);
            col = BABYLON.MeshBuilder.CreateBox(id, { width: col_size.width, 
                  height: col_size.height, depth:col_size.depth }, scene);

            col.material = colMat;

            col.position.x = value.x;
            col.position.y = ((col_size.height/2)+off);
            col.position.z = value.z;   

            console.log(value);
               
        }); 

        // id = (Math.random().toString().replace(/\./g , "x")).substr(0, 4);
        // col = BABYLON.MeshBuilder.CreateBox(id, { width: col_size.width, 
        //     height: col_size.height, depth:col_size.depth }, this._scene);
            
        // let off = (col_size.width/2);

        // col.material = colMat;
        // col.position.y = ((col_size.height/2)+off);
        // col.position.x = -((this._width/2)-off);
        // col.position.z = -((this._depth/2)-off);

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