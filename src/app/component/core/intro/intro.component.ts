import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {animationInitializeA} from "../../../animation/component";

@Component({
    selector: 'mugloar-intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.styl'],
    animations: [animationInitializeA]
})
export class IntroComponent implements OnInit, AfterViewChecked {
    /**
     * Component's animation state. Eligible states: init, ready.
     * */
    private animationState: string;

    ngOnInit() {
        this.animationState = "init";
    }

    ngAfterViewChecked() {
        this.animationState = "ready";
    }
}
