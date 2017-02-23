import {Component, Input, OnInit, OnChanges} from "@angular/core";
import {Knight} from "../../../entity/knight";
import {Attribute} from "../../../entity/attribute";

@Component({
    selector: 'mugloar-knight',
    templateUrl: './knight.component.html',
    styleUrls: ['./knight.component.styl']
})
export class KnightComponent implements OnInit, OnChanges {
    private attributes: Attribute[] = [];

    @Input() knight: Knight;

    ngOnInit(): void {
        this.attributes.push(new Attribute("attack", "Attack", "Attack", this.knight.attack, "crossed-swords"));
        this.attributes.push(new Attribute("armor", "Armor", "Armor", this.knight.armor, "shield"));
        this.attributes.push(new Attribute("agility", "Agility", "Agility", this.knight.agility, "walking-boot"));
        this.attributes.push(new Attribute("endurance", "Endurance", "Endurance", this.knight.endurance, "heart-beats"));
    }

    /**
     * Whenever Knight component changes, update his "score" attributes.
     * */
    ngOnChanges() {
        for (let attr of this.attributes) {
            attr.score = this.knight[attr.id];
        }
    }
}
