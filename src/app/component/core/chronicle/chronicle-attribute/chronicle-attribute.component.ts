import {Component, Input} from '@angular/core';

@Component({
    selector: 'mugloar-chronicle-attribute',
    templateUrl: './chronicle-attribute.component.html',
    styleUrls: ['./chronicle-attribute.component.styl']
})
export class ChronicleAttributeComponent {
    @Input() name: string;
    @Input() icon: string;
    @Input() score: number;
}