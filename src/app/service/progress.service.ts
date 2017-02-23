import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Progress} from "../entity/progress";

@Injectable()
export class ProgressService {
    public progressCycleStatus: BehaviorSubject<Progress> = new BehaviorSubject<Progress>(new Progress(0, 0, false));
    public progressSpinnerStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /**
     * Display engagement (percent) progress using determinate approach.
     * Provide <Progress> param, that contains:
     * - current value (current game being played), and
     * - total value (total games scheduled to be played).
     * - show flag (whether progress should be visible or hidden).
     */
    displayProgressCycle(progress: Progress) {
        this.progressCycleStatus.next(progress);
    }

    /**
     * Display engagement progress using indeterminate approach.
     * Provide <boolean> param, that:
     * - either is true (shows progress), or
     * - false (hides progress).
     */
    displayProgressSpinner(status: boolean) {
        this.progressSpinnerStatus.next(status);
    }
}