import {Component, Input} from '@angular/core';
import {Attribute} from "../../../entity/attribute";

@Component({
    selector: 'mugloar-attribute',
    templateUrl: './attribute.component.html',
    styleUrls: ['./attribute.component.styl']
})
export class AttributeComponent {
    @Input() attribute: Attribute;

    /* Attribute's value is represented visually by tokens. */
    private tokens: any[] = new Array(10);  // Attribute's value range is [0 to 10].

    /**
     * Token class modifier methods depending on the token's index. This is a visual flavor thing.
     * Token index starts from 0.
     * */
    isTokenRare(tokenIndex: number): boolean {
        return !this.isTokenMissing(tokenIndex) && (tokenIndex + 1) === 6;
    }

    isTokenEpic(tokenIndex: number): boolean {
        return !this.isTokenMissing(tokenIndex) && (tokenIndex + 1) > 6;
    }

    isTokenMissing(tokenIndex: number): boolean {
        return (tokenIndex + 1) > this.attribute.score;
    }
}