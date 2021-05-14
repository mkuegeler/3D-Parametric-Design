// Custom material classes
import { StandardMaterial } from 'babylonjs';
import { Scene } from 'babylonjs';
import { Color3 } from 'babylonjs';
import { Texture } from 'babylonjs';
import PARAMS from './materials.json';

/* 
Types of Materials

StandardMaterial

*/

export class FDStandardMaterial {
    public material: StandardMaterial;
    constructor(public scene: Scene, readonly p: any = PARAMS.FDStandardMaterial) {
        this.material = new StandardMaterial("material_" + Date.now(), scene);

        if (p.diffuseColor.active === true) {
            this.material.diffuseColor = new Color3(p.diffuseColor.r, p.diffuseColor.g, p.diffuseColor.b);
        }
        if (p.specularColor.active === true) {
            this.material.specularColor = new Color3(p.specularColor.r, p.specularColor.g, p.specularColor.b);
        }
        if (p.emissiveColor.active === true) {
            this.material.emissiveColor = new Color3(p.emissiveColor.r, p.emissiveColor.g, p.emissiveColor.b);
        }
        if (p.ambientColor.active === true) {
            this.material.ambientColor = new Color3(p.ambientColor.r, p.ambientColor.g, p.ambientColor.b);
        }
        if (p.diffuseTexture.active === true) {
            this.material.diffuseTexture = new Texture(p.diffuseTexture.texture, scene);
        }
    }
}
