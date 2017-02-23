import {Component, OnInit, HostBinding} from '@angular/core';
import {ProgressService} from "../../../../service/progress.service";
import {Subscription} from "rxjs";
import {Progress} from "../../../../entity/progress";
import {animationFadeInFadeOut} from "../../../../animation/component";

@Component({
    selector: 'mugloar-progress-cycle',
    templateUrl: './progress.cycle.component.html',
    styleUrls: ['./progress.cycle.component.styl'],
    animations: [animationFadeInFadeOut]
})
export class ProgressCycleComponent implements OnInit {
    private progress: Progress;
    private progressSubscription: Subscription;

    @HostBinding('@animationFadeInFadeOut') animationFadeInFadeOut = true;  // Primitive trigger to signal animation to play on component "birth" and "death".

    constructor(private progressService: ProgressService) {
        this.progress = new Progress(0, 0, false);
    }

    /**
     * Establish subscription with the progress service to visualize progress engagement.
     */
    ngOnInit() {
        this.progressSubscription = this.progressService.progressCycleStatus.subscribe(
            (progress: Progress) => {
                this.progress = progress;
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
        return this.progress.show;
    }

    /**
     * Getter of progress value percent in real time. Value range is in [1, 100].
     * */
    get getProgressValue(): number {
        return Math.round((this.progress.current / this.progress.total) * 100);
    }

    /**
     * Getter of progress current value.
     * */
    get getCurrent(): number {
        return this.progress.current;
    }

    /**
     * Getter of progress total value.
     * */
    get getTotal(): number {
        return this.progress.total;
    }

    /**
     * Getter whether progress cue value should be emphasized slightly visually when the progress reaches its final cue.
     * */
    get isEmphasized(): boolean {
        return this.progress.current === this.progress.total;
    }
}
