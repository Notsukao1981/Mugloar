import {Component, OnInit, HostBinding, AnimationTransitionEvent, Input} from '@angular/core';
import {animationGhost} from "./abyss-ghost.component.animation";

@Component({
    selector: 'mugloar-abyss-ghost',
    templateUrl: './abyss-ghost.component.html',
    styleUrls: ['./abyss-ghost.component.styl'],
    animations: [animationGhost]
})
export class AbyssGhostComponent implements OnInit {
    private animationEnter: string = "init";
    @Input() enterFrom: string;
    @HostBinding('style.position') position = "absolute";
    @HostBinding('style.left') left;
    @HostBinding('style.right') right;
    @HostBinding('style.bottom') bottom;
    @HostBinding('style.height') height = "50px";
    @HostBinding('style.width') width = "50px";

    /**
     * Initialize grave component with a slight variation of its coordinates on the canvas,
     * to prevent over saturation in single spot and spread them linearly all over the abyss component's container.
     * */
    ngOnInit() {
        this.bottom = "50%";
        if (this.enterFrom === "left") {
            this.left = "20%";
        } else if (this.enterFrom === "right") {
            this.right = "20%";
        }
        setTimeout(
            () => {
                this.animationEnter = 'ready';
            }, Math.random() * 5000 // Give ghost a couple of seconds spawn delay.
        );
    }

    /**
     * React to animation done event to handle its next state, as this is a 6-state complex animation.
     * */
    private animationDone(event: AnimationTransitionEvent) {
        switch (event.toState) {
            case "left":
                this.animationEnter = 'turnRight';
                break;

            case "right":
                this.animationEnter = 'turnLeft';
                break;

            case "turnLeft":
                this.animationEnter = 'left';
                break;

            case "turnRight":
                this.animationEnter = 'right';
                break;

            case "ready":
                if (this.enterFrom === "left") {
                    this.animationEnter = 'right';
                } else { // From right
                    this.animationEnter = 'left';
                }
                break;

            default:
                this.animationEnter = 'init';
                break;
        }
    }
}