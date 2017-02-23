import {Component, OnInit} from '@angular/core';
import {ProgressService} from "../../../../service/progress.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'mugloar-progress-spinner',
    templateUrl: './progress.spinner.component.html',
    styleUrls: ['./progress.spinner.component.styl']
})
export class ProgressSpinnerComponent implements OnInit {
    private progressStatus: boolean;
    private progressSubscription: Subscription;

    constructor(private progressService: ProgressService) {
        this.progressStatus = false;
    }

    /**
     * Establish subscription with the progress service to visualize progress engagement.
     */
    ngOnInit() {
        this.progressSubscription = this.progressService.progressSpinnerStatus.subscribe(
            (status: boolean) => {
                this.progressStatus = status;
            }
        );
    }

    /**
     * Terminate subscription to prevent memory leak on destroy.
     */
    ngOnDestroy() {
        this.progressSubscription.unsubscribe();
    }

    /**
     * Getter for flag whether progress engagement item should be visible.
     */
    get showProgress(): boolean {
        return this.progressStatus;
    }
}
