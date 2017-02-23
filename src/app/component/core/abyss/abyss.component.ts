import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {animationInitializeB, animationSpinningSlingshotInward} from "../../../animation/component";
import {ActivatedRoute} from "@angular/router";
import {Abyss} from "../../../entity/abyss";

@Component({
    selector: 'mugloar-abyss',
    templateUrl: './abyss.component.html',
    styleUrls: ['./abyss.component.styl'],
    animations: [animationInitializeB, animationSpinningSlingshotInward]
})
export class AbyssComponent implements OnInit, AfterViewChecked {
    /**
     * Component's animation state. Eligible states: init, ready.
     * */
    private animationState: string;
    private spawnGraves: boolean;
    private graves: Array<any> [];
    private knightsVanquished: number;
    private dragonsLost: number;
    private princessesHarmed: number;

    constructor(private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.animationState = "init";
        this.princessesHarmed = 0;
        /**
         * Subscribe to the route's params data, so that Abyss knows how many knights and dragons need their graves.
         * */
        this.activatedRoute.params
            .subscribe(
                (abyss: Abyss) => {
                    this.knightsVanquished = abyss.knights;
                    this.dragonsLost = abyss.dragons;
                    this.graves = [];
                    this.graves = this.graves.concat(Array.from({length: this.knightsVanquished}, (v, i) => 'carrion'));
                    this.graves = this.graves.concat(Array.from({length: this.dragonsLost}, (v, i) => 'hasty-grave'));
                }
            );
    }

    ngAfterViewChecked(): void {
        this.animationState = "ready";
    }

    /**
     * Callback method that signals about the skull animation being completed.
     * Dependant animations can be triggered soon after.
     * */
    private animationSkullDone(): void {
        this.spawnGraves = true;
    }

    /**
     * Getter flag when the grave shower animation should start.
     * */
    get startGraveShower(): boolean {
        return this.spawnGraves;
    }

    /**
     * Other getters for different death counts.
     * */
    get knightsVanquishedCount(): number {
        return this.knightsVanquished;
    }

    get dragonsLostCount(): number {
        return this.dragonsLost;
    }

    get princessesHarmedCount(): number {
        return this.princessesHarmed;
    }
}