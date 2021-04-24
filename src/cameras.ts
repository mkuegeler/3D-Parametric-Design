// Custom camera classes
import { FreeCamera } from 'babylonjs';
import { Camera } from 'babylonjs';
import { Scene } from 'babylonjs';
import { Vector3 } from 'babylonjs';
import PARAMS from './cameras.json';

export class FDOrthoCamera {
    public _camera: FreeCamera;
    constructor(
        public scene: Scene
    ) {
        var name: string = "camera_"+Date.now();
        this._camera = new FreeCamera(name, new Vector3(0, 0, 0), scene);
        this._camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
        this._camera.orthoTop = 15;
        this._camera.orthoBottom = -15;
        this._camera.orthoLeft = -15;
        this._camera.orthoRight = 15;
        this._camera.setTarget(Vector3.Zero());
    }
  }

//   export class FDOrthoCamera {
//     public _camera: FreeCamera;
//     constructor(
//         public scene: Scene, public p: any = PARAMS
//     ) {
//         var name: string = "camera_"+Date.now();
//         this._camera = new FreeCamera(name, new Vector3(p.FDOrthoCamera.x, p.FDOrthoCamera.y, p.FDOrthoCamera.z), scene);
//         this._camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
//         this._camera.orthoTop = p.FDOrthoCamera.orthoTop;
//         this._camera.orthoBottom = p.FDOrthoCamera.orthoBottom;
//         this._camera.orthoLeft = p.FDOrthoCamera.orthoLeft;
//         this._camera.orthoRight = p.FDOrthoCamera.orthoRight;
//         this._camera.setTarget(Vector3.Zero());
//     }
//   }


// export class FDOrthoCamera {
//     _camera: FreeCamera;
//     x: number;
//     y: number;
//     z: number;
//     orthoTop: number;
//     orthoBottom: number;
//     orthoLeft: number;
//     orthoRight: number;
//     constructor(x: number = 0, y: number = 0, z: number = 0,
//         orthoTop: number = 15,
//         orthoBottom: number = -15,
//         orthoLeft: number = -15,
//         orthoRight: number = 15
//     ) {

//         this.x = x;
//         this.y = y;
//         this.z = z;
//         this.orthoTop = orthoTop;
//         this.orthoBottom = orthoBottom;
//         this.orthoLeft = orthoLeft;
//         this.orthoRight = orthoRight;
        
//     }
//     create(scene: Scene) {
//         var name: string = (Math.random().toString().replace(/\./g, "camera")).substr(0, 4);
//         this._camera = new FreeCamera(name, new Vector3(this.x, this.y, this.z), scene);
//         this._camera.mode = Camera.ORTHOGRAPHIC_CAMERA;
//         this._camera.orthoTop = this.orthoTop;
//         this._camera.orthoBottom = this.orthoBottom;
//         this._camera.orthoLeft = this.orthoLeft;
//         this._camera.orthoRight = this.orthoRight;
//         this._camera.setTarget(Vector3.Zero());

//         return this._camera;
//     }
// }
