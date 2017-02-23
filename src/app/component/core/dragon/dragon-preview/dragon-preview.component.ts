import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Dragon} from "../../../../entity/dragon";
import {Attribute} from "../../../../entity/attribute";

@Component({
    selector: 'mugloar-dragon-preview',
    templateUrl: './dragon-preview.component.html',
    styleUrls: ['./dragon-preview.component.styl']
})
export class DragonPreviewComponent implements OnInit, OnChanges {
    private attributes: Attribute[] = [];

    @Input() dragon: Dragon;

    ngOnInit(): void {
        this.attributes.push(new Attribute("clawSharpness", "Claws", "Claw sharpness", this.dragon.clawSharpness, "claw"));
        this.attributes.push(new Attribute("scaleThickness", "Scales", "Scale thickness", this.dragon.scaleThickness, "shieldcomb"));
        this.attributes.push(new Attribute("wingStrength", "Wings", "Wing strength", this.dragon.wingStrength, "wing"));
        this.attributes.push(new Attribute("fireBreath", "Fire", "Fire breath", this.dragon.fireBreath, "dragon-breath"));
    }

    /**
     * Whenever Dragon component changes, update his "score" attributes.
     * */
    ngOnChanges() {
        for (let attr of this.attributes) {
            attr.score = this.dragon[attr.id];
        }
    }
}
