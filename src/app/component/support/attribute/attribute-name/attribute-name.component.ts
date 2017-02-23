import {Component, Input} from '@angular/core';

@Component({
    selector: 'mugloar-attribute-name',
    templateUrl: './attribute-name.component.html',
    styleUrls: ['./attribute-name.component.styl']
})
export class AttributeNameComponent {
    @Input() name: string;
    @Input() tooltip: string;
}
