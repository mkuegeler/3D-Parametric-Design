// Custom camera classes
import { FreeCamera } from 'babylonjs';
import { ArcRotateCamera } from 'babylonjs';
import { Camera } from 'babylonjs';
import { Scene } from 'babylonjs';
import { Vector3 } from 'babylonjs';
import PARAMS from './cameras.json';

// Custom Camera classes

// Othographic Camera
export class FDOrthoCamera {
    public camera: FreeCamera;
    constructor(
        public scene: Scene, readonly p: any = PARAMS.FDOrthoCamera
    ) {
        var name: string = "camera_" + Date.now();
        this.camera = new FreeCamera(name, new Vector3(p.x, p.y, p.z), scene);

        this.camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this.camera.orthoTop = p.orthoTop;
        this.camera.orthoBottom = p.orthoBottom;
        this.camera.orthoLeft = p.orthoLeft;
        this.camera.orthoRight = p.orthoRight;

        this.camera.setTarget(Vector3.Zero());
    }
}

// Rotate Camera
export class FDArcRotateCamera {
    public camera: ArcRotateCamera;
    constructor(
        public scene: Scene, readonly p: any = PARAMS.FDArcRotateCamera
    ) {
        var name: string = "camera_" + Date.now();
        Object.keys(p.RotateDegrees).map(function (key, index) {
            p.RotateDegrees[key] = (p.RotateDegrees[key] * Math.PI) / 180.0;
        });

        this.camera = new ArcRotateCamera(name, p.RotateDegrees.a, p.RotateDegrees.b, p.RotateDegrees.r, new Vector3(p.x, p.y, p.z), scene);
        this.camera.setTarget(Vector3.Zero());
    }
}