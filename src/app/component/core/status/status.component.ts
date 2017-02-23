import {Component, Input} from "@angular/core";
import {Status} from "../../../entity/status";

@Component({
    selector: 'mugloar-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.styl']
})
export class StatusComponent {
    @Input() status: Status;

    /**
     * Getter for calculated dragon/games win ratio.
     * Extra magic added to enforce rounding with 2 decimal precision.
     */
    get winRatio(): number {
        return this.status.played ? Math.round((this.status.won / this.status.played) * 10000) / 100 : 0;
    }
}