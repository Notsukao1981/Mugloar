import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Dragon} from "../../../entity/dragon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'mugloar-dragon',
    templateUrl: './dragon.component.html',
    styleUrls: ['./dragon.component.styl']
})
export class DragonComponent {
    private autoTraining: boolean = true;

    @Input() dragon: Dragon;
    @Output('confirmDispatch') confirmDispatch = new EventEmitter<boolean>();

    constructor(private sanitizer: DomSanitizer) {
    }

    /**
     * Propagate internal color (hex) value and modify the style attribute directly. Uses DOM sanitizer due XSS.
     * */
    private sanitizedStyleColor(color: string) {
        return this.sanitizer.bypassSecurityTrustStyle("color: ".concat(color));
    }

    setTraining(options): void {
        this.autoTraining = options.checked;
    }

    /**
     * Event binder to the child form component for its (dragon) form confirmation status.
     * Forward it directly to the parent component, so the dragon can be dispatched for engagement.
     * */
    confirmed(status: boolean): void {
        if (status) {
            this.confirmDispatch.emit(true);
        }
    }
}
