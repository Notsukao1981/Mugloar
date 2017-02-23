import {Component, OnInit, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {Router} from "@angular/router";

import {Game} from '../../../entity/game';
import {Status} from "../../../entity/status";
import {DragonLair} from "../../../entity/dragon.lair";
import {Chronicle} from "../../../entity/chronicle";

import {ProgressService} from "../../../service/progress.service";
import {FeedbackService} from "../../../service/feedback.service";
import {HttpService} from "../../../service/http.service";
import {ChronicleService} from "../../../service/chronicle.service";
import {animationInitializeB, animationSlideFromLeft, animationSlideFromRight} from "../../../animation/component";
import {Abyss} from "../../../entity/abyss";

@Component({
    selector: 'mugloar-practice',
    templateUrl: './practice.component.html',
    styleUrls: ['./practice.component.styl'],
    providers: [ProgressService, FeedbackService, HttpService, ChronicleService],
    animations: [animationInitializeB, animationSlideFromLeft, animationSlideFromRight]
})
export class PracticeComponent implements OnInit, AfterViewChecked {
    /**
     * Component's animation state. Eligible states: init, ready. Each state visually differs.
     * */
    private animationState: string;
    /**
     * Flag used to trigger animation for component's internal parts.
     * This flag is state-agnostic, so it only matters that it changes its value in order for animation to trigger.
     * */
    private animateFlag: boolean;
    private status: Status;
    private game: Game;
    private tips: any;
    /**
     * Contrary to the Game component, Practice component keeps a separate track of death statistics.
     * Death that occurs within its jurisdiction, however only Abyss component appreciates these numbers.
     * */
    private knightsVanquished: number;
    private dragonsLost: number;

    constructor(private httpService: HttpService,
                private chronicleService: ChronicleService,
                private router: Router,
                private progressService: ProgressService,
                private feedbackService: FeedbackService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.knightsVanquished = 0;
        this.dragonsLost = 0;
        this.status = new Status();
        this.tips = {};
        this.tips.dragon = "Dispatch the dragon to engage the knight";
        this.tips.restart = "Reset and fetch a new game";
        this.tips.quit = "Quit the game, that's it!";
    }

    ngAfterViewChecked(): void {
        this.animationState = "ready";
        this.cdr.detectChanges();
    }

    doRestart(): void {
        this.feedbackService.clearFeedback();
        this.chronicleService.flushAll();
        this.status.reset();
        this.status.toBePlayed = 1; // In practice mode only a single game is played per each "restart".
        this.newGame();
        this.animateFlag = !this.animateFlag;
    }

    doQuit(): void {
        /**
         * On exit construct a simple Abyss object to pass info to the Abyss component about number of fallen knights and slain dragons.
         * */
        this.router.navigate(['/abyss', new Abyss(this.knightsVanquished, this.dragonsLost)])
            .catch(
                error => this.feedbackService.displayError("Rejoice, stuck in Mugloar for good :D".concat("\r\n", error))
            );
    }

    doDispatchDragon(): void {
        this.status.addMessage("Dispatching dragon to engage...");
        this.progressService.displayProgressSpinner(true);
        this.httpService.sendDragon(this.game.id, this.game.dragon)
            .then(
                engagement => {
                    this.status.addMessage("Engagement is on!");
                    this.status.played++;
                    this.game.engagement = engagement;
                    if (this.game.engagement.isDragonVictor()) {
                        this.status.won++;
                        this.knightsVanquished++;
                        this.status.addMessage("Game #".concat(this.game.id, " won!"));
                    } else {
                        this.dragonsLost++;
                        this.status.addMessage("Game #".concat(this.game.id, " lost!"));
                    }
                    this.chronicleService.createRecord(
                        new Chronicle(this.game.id, this.game.knight, this.game.dragon, this.game.engagement, this.game.weather)
                    );
                    this.status.addMessage("Chronicle crated.");
                    this.progressService.displayProgressSpinner(false);
                }
            ).catch(
                error => {
                    this.feedbackService.displayError("Failed to dispatch the dragon due:".concat("\r\n", error));
                    this.status.addMessage("Engagement is not happening!");
                    this.status.failed++;
                    this.progressService.displayProgressSpinner(false);
                }
            );
    }

    /**
     * Activates a new game instance along with a knight and a weather.
     * @returns True if all three instances were successful.
     */
    private newGame(): void {
        this.status.addMessage("Starting a new game...");
        this.progressService.displayProgressSpinner(true);
        this.httpService.getGame()
            .then(
                game => {
                    this.game = game;
                    this.status.addMessage("Got game, getting weather...");
                    this.httpService.getWeather(this.game.id)
                        .then(
                            weather => {
                                this.status.addMessage("Got weather.");
                                this.game.weather = weather;
                                this.status.addMessage("Summoning a suitable dragon...");
                                this.game.dragon = DragonLair.summonDragon(this.game.knight, this.game.weather);
                                this.status.addMessage("Dragon summoned.");
                                this.progressService.displayProgressSpinner(false);
                            }
                        ).catch(
                            error => {
                                this.status.addMessage("No weather, no game :(");
                                this.feedbackService.displayError("Failed to retrieve the weather due:".concat("\r\n", error));
                                this.progressService.displayProgressSpinner(false);
                            }
                        );
                }
            ).catch(
                error => {
                    this.status.addMessage("No game, no play :(");
                    this.feedbackService.displayError("Failed to retrieve a new game due:".concat("\r\n", error));
                    this.progressService.displayProgressSpinner(false);
                }
            );
    }

    /**
     * Provide tooltips for menu.
     * @param key
     * @returns {string}
     */
    getTip(key: string): string {
        return this.tips[key];
    }
}