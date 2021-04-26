// Custom light classes
import { HemisphericLight } from 'babylonjs';
import { Scene } from 'babylonjs';
import { Vector3 } from 'babylonjs';
import PARAMS from './lights.json';

export class FDHemisphericLight {
    public light: HemisphericLight;
    constructor(public scene: Scene, readonly p: any = PARAMS.FDHemisphericLight) {
        var name: string = "light_" + Date.now();
        this.light = new HemisphericLight("light_" + Date.now(), new Vector3(0, 1, 0), scene);
    }
}