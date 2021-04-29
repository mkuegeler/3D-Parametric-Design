// Custom light classes
import { HemisphericLight } from 'babylonjs';
import { Scene } from 'babylonjs';
import { Vector3 } from 'babylonjs';
import PARAMS from './lights.json';

/* 
Types of Light

PointLight 
DirectionalLight
SpotLight
HemisphericLight

*/

export class FDHemisphericLight {
    public light: HemisphericLight;
    constructor(public scene: Scene, readonly p: any = PARAMS.FDHemisphericLight) {
        var name: string = "light_" + Date.now();
        this.light = new HemisphericLight("light_" + Date.now(), new Vector3(p.x, p.y, p.z), scene);
    }
}