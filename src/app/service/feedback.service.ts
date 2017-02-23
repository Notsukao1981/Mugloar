import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FeedbackService {
    public notificationMessage: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public warningMessage: BehaviorSubject<string> = new BehaviorSubject<string>("");
    public errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>("");

    /**
     * Display notification engagement.
     * @param message text.
     */
    displayNotification(value: string) {
        this.notificationMessage.next(value);
    }

    /**
     * Display warning engagement.
     * @param message text.
*/
    displayWarning(value: string) {
        this.warningMessage.next(value);
    }

    /**
     * Display error engagement.
     * @param message text.
     */
    displayError(value: string) {
        this.errorMessage.next(value);
    }

    /**
     * Clear all engagement.
     */
    clearFeedback() {   // Communicate to all subscribers - they'll know each how to react appropriately.
        this.notificationMessage.next("");
        this.warningMessage.next("");
        this.errorMessage.next("");
    }
}