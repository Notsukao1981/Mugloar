import {DragonColor} from "./dragon.assets";

export class Dragon {
    name: string;
    clawSharpness: number;
    scaleThickness: number;
    wingStrength: number;
    fireBreath: number;
    color?: DragonColor;  /* Optional */
    title?: string;  /* Optional */

    constructor(name: string, clawSharpness: number, scaleThickness: number, wingStrength: number, fireBreath: number) {
        this.name = name;
        this.clawSharpness = clawSharpness;
        this.scaleThickness = scaleThickness;
        this.wingStrength = wingStrength;
        this.fireBreath = fireBreath;
    }
}