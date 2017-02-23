import {Component, OnInit, HostBinding, Input} from '@angular/core';
import {animationBounceFromAboveOnEnter} from "../../../../animation/component";

@Component({
    selector: 'mugloar-abyss-grave',
    templateUrl: './abyss-grave.component.html',
    styleUrls: ['./abyss-grave.component.styl'],
    animations: [animationBounceFromAboveOnEnter]
})
export class AbyssGraveComponent implements OnInit {
    private animationEnter: string = 'init';
    @Input() graveIcon: string;
    @HostBinding('style.position') position = "absolute";
    @HostBinding('style.height') height = "50px";
    @HostBinding('style.width') width = "50px";
    @HostBinding('style.left') left;
    @HostBinding('style.bottom') bottom;
    @HostBinding('style.color') color;
    @HostBinding('style.z-index') zIndex;

    /**
     * Initialize grave component with a slight variation of its coordinates on the canvas,
     * to prevent over saturation in single spot and spread them linearly all over the abyss component's container.
     * */
    ngOnInit() {
        let perspective = Math.round(Math.random() * 10);
        this.left = String(Math.round(Math.random() * 100)).concat("%");
        this.bottom = String(perspective).concat("%");
        this.zIndex = String(10 - perspective);
        this.color = this.getRandomColor();
        setTimeout(
            () => {
                this.animationEnter = 'ready';
            }, Math.random() * 5000 // Delay each grave by ~1-9.5s, to prevent overwhelming shower (basically visual clutter).
        );
    }

    /**
     * Generates a random color hex.
     * */
    private getRandomColor(): string {
        let letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
}