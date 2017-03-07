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
    private showSetup: boolean;

    ngOnInit() {
        this.animationState = "init";
        this.showSetup = true;
    }

    ngAfterViewChecked() {
        this.animationState = "ready";
    }

    confirmSSL(): void {
        this.showSetup = false;
    }
}