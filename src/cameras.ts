// Custom camera classes
import * as BABYLON from 'babylonjs';

export class FD_OrthoCamera {
    _camera: BABYLON.FreeCamera;
    _scene: BABYLON.Scene;
    x: number;
    y: number;
    z: number;
    orthoTop: number;
    orthoBottom: number;
    orthoLeft: number;
    orthoRight: number;
    name: string;
    constructor(x: number = 0, y: number = 0, z: number = 0,
        name = (Math.random().toString().replace(/\./g, "camera")).substr(0, 4),
        orthoTop = 15,
        orthoBottom = -15,
        orthoLeft = 15,
        orthoRight = 15
    ) {
        this._camera = new BABYLON.FreeCamera(name, new BABYLON.Vector3(x, y, z), this._scene);
        this._camera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        this._camera.orthoTop = orthoTop;
        this._camera.orthoBottom = orthoBottom;
        this._camera.orthoLeft = orthoLeft;
        this._camera.orthoRight = orthoRight;
        this._camera.setTarget(BABYLON.Vector3.Zero());
    }
}
