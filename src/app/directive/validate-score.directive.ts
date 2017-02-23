import {Directive, forwardRef, Attribute} from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl} from '@angular/forms';

@Directive({
    selector: '[mugloarValidateScore][ngModel],[mugloarValidateScore][formControl],[mugloarValidateScore][formGroup]',
    providers: [
        {provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateScoreDirective), multi: true}
    ]
})
export class ValidateScoreDirective implements Validator {
    constructor(@Attribute("mugloarValidateScore") private attributes: string) {
    }

    /**
     * Validates Dragon form's "score" attribute values in a combined fashion.
     * @returns null if validation succeeds, otherwise an error object.
     * */
    validate(c: FormControl): { [key: string]: any } {
        let MAX: number = 20;   // TODO: Pull this value out of the game component.
        let score: number = +c.value;    // Initialize score with the value of the attribute being validated.
        let scoreValid: boolean = false;
        let error = {
            mugloarValidateScore: {
                valid: false
            }
        };

        for (let attr of this.attributes.split(',')) {
            let obj = c.parent.get(attr);
            if (typeof obj !== 'undefined' && obj != null) {
                score += +obj.value;
            } else {
                return null;
            }
        }

        scoreValid = MAX === score; // Validate the score to decide what's next.

        // If the overall group score is valid, then reset any validation errors imperatively on the previous group attributes (if any).
        if (scoreValid) {
            for (let attr of this.attributes.split(',')) {
                let obj = c.parent.get(attr);
                if (obj.errors) {
                    delete obj.errors['mugloarValidateScore'];
                    obj.setErrors(null);
                }
            }
            return null;
        } else {
            // At this point, if the score is invalid, then
            // a) either form is not yet fully loaded (attribute elements don't exist yet), or
            // b) attribute elements produce a combined score that fails to validate against the MAX value.
            // Course of action:
            // In case "a" there is not so much we can do, so we do nothing, and
            // in case "b", we set the error flag on the remaining score attributes (besides this one).
            for (let attr of this.attributes.split(',')) {
                let obj = c.parent.get(attr);
                if (typeof obj !== 'undefined' && obj != null) {
                    obj.setErrors(error);
                }
            }
        }
        return error;
    }
}