/**
 * Feedback component handles application component cues and translates them into user feedback.
 * Feedback is segregated into three types: error, warning, notification.
 * */

import {Component, OnInit} from '@angular/core';
import {FeedbackService} from "../../../service/feedback.service";
import {Subscription} from "rxjs";
import {animationSpawnIn} from "../../../animation/component";

@Component({
    selector: 'mugloar-feedback',
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.styl'],
    animations: [animationSpawnIn]
})
export class FeedbackComponent implements OnInit {
    private notificationMessage: string;
    private warningMessage: string;
    private errorMessage: string;
    private notificationSubscription: Subscription;
    private warningSubscription: Subscription;
    private errorSubscription: Subscription;

    constructor(private feedbackService: FeedbackService) {
        this.notificationMessage = "";
        this.warningMessage = "";
        this.errorMessage = "";
    }

    ngOnInit(): void {
        /** Establish subscription with the engagement service to visually process the appropriate engagement. */
        this.notificationSubscription = this.feedbackService.notificationMessage.subscribe(
            (notification: string) => {
                this.notificationMessage = notification;
            }
        );
        this.warningSubscription = this.feedbackService.warningMessage.subscribe(
            (warning: string) => {
                this.warningMessage = warning;
            }
        );
        this.errorSubscription = this.feedbackService.errorMessage.subscribe(
            (error: string) => {
                this.errorMessage = error;
            }
        );
    }

    /**
     * Terminate subscriptions to prevent memory leak on destroy.
     */
    ngOnDestroy(): void {
        this.notificationSubscription.unsubscribe();
        this.warningSubscription.unsubscribe();
        this.errorSubscription.unsubscribe();
    }

    /**
     * Dismisses message engagement by the provided type.
     * */
    clickDismiss(type: string): void {
        switch (type) {
            case "notification":
                this.notificationMessage = "";
                break;
            case "warning":
                this.warningMessage = "";
                break;
            case "error":
                this.errorMessage = "";
                break;
            default:
                this.errorMessage = "Wrong message type, cannot dismiss.";
        }
    }

    /** Primary use: Getters for flag when to show the engagement message respectively by type.
     *  Secondary use: Spawning animation are triggered on the same condition respectively. */
    get showNotification(): boolean {
        return this.notificationMessage.length > 0;
    }

    get showWarning(): boolean {
        return this.warningMessage.length > 0;
    }

    get showError(): boolean {
        return this.errorMessage.length > 0;
    }
}
