import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {Dragon} from "../../../../entity/dragon";

@Component({
    selector: 'mugloar-dragon-form',
    templateUrl: './dragon-form.component.html',
    styleUrls: ['./dragon-form.component.styl']
})
export class DragonFormComponent implements OnInit, OnChanges {
    /* Dragon attributes UI restrictions: */
    private NAME_MAX_LENGTH: number = 22;
    private NAME_MAX_TITLE: number = 29;
    private SCORE_MAX: number = 10;
    private SCORE_MIN: number = 0;

    private dragonTrained: Dragon; // Local working copy of the original provided (summoned) dragon (to handle form submit or reset).

    @Input() dragonSummoned: Dragon;
    // Simple emitter to deliver a flag to the parent component whether the manually trained dragon is confirmed for use.
    @Output('confirm') confirmDragon = new EventEmitter<boolean>();

    ngOnInit() {
        this.dragonTrained = this.copyDragon(this.dragonSummoned);
    }

    ngOnChanges() {
        this.dragonTrained = this.copyDragon(this.dragonSummoned);
    }

    /**
     * "Submit" form triggers the confirmation emitter to the parent, that the trained dragon is valid and is dispatched to engage.
     * */
    doSubmit(ngForm: any) {
        if (ngForm.form.valid) {
            for (let attr in this.dragonSummoned) {
                if (this.dragonSummoned.hasOwnProperty(attr)) {
                    this.dragonSummoned[attr] = this.dragonTrained[attr];
                }
            }
            this.confirmDragon.emit(true);
        }
    }

    /**
     * Reset trained dragon's attributes and fallback to the summoned one's.
     * */
    doReset() {
        this.dragonTrained = this.copyDragon(this.dragonSummoned);
    }

    /**
     * Make a junk-less local dragon copy.
     * */
    private copyDragon(source: Dragon): Dragon {
        let dragon = new Dragon("", 0, 0, 0, 0);
        for (let key in source) {
            if (source.hasOwnProperty(key)) {
                dragon[key] = source[key];
            }
        }
        return dragon;
    }

    // Getters for hint messages.
    get hintFormPristine(): string {
        return "Distribute 20 points on attributes.";
    }

    get hintFormValid(): string {
        return "Great job, now send him to fight!";
    }

    get hintNameInvalid(): string {
        return "Oops, name's missing!";
    }

    get hintScoreInvalid(): string {
        let sum = 0;
        sum += this.dragonTrained.clawSharpness;
        sum += this.dragonTrained.scaleThickness;
        sum += this.dragonTrained.fireBreath;
        sum += this.dragonTrained.wingStrength;

        let prefix = "Dragon score is invalid. ";
        return sum > 20 ?
            prefix.concat("Overtrained in ", String(sum - 20), " points!") :
            prefix.concat("Undertrained in ", String(20 - sum), " points!");
    }
}