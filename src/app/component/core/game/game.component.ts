import {Component, OnInit, ChangeDetectorRef, AfterViewChecked} from '@angular/core';
import {Router} from "@angular/router";

import {Game} from '../../../entity/game';
import {Status} from "../../../entity/status";
import {DragonLair} from "../../../entity/dragon.lair";
import {Chronicle} from "../../../entity/chronicle";

import {ProgressService} from "../../../service/progress.service";
import {FeedbackService} from "../../../service/feedback.service";
import {HttpService} from "../../../service/http.service";
import {ChronicleService} from "../../../service/chronicle.service";
import {animationInitializeB, animationSlideFromLeft, animationSlideFromRight, animationPhaseIn} from "../../../animation/component";
import {Progress} from "../../../entity/progress";
import {Abyss} from "../../../entity/abyss";

@Component({
    selector: 'mugloar-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.styl'],
    providers: [ProgressService, FeedbackService, HttpService, ChronicleService],
    animations: [animationInitializeB, animationSlideFromLeft, animationSlideFromRight, animationPhaseIn]
})
export class GameComponent implements OnInit, AfterViewChecked {
    /**
     * Component's animation state. Eligible states: init, ready. Each state visually differs.
     * */
    private animationState: string;
    /**
     * Flag used to trigger animation for component's internal parts.
     * This flag is state-agnostic, so it only matters that it changes its value in order for animation to trigger.
     * */
    private animateFlag: boolean;
    /**
     * Flag used to trigger animation for controls block to make a visual cue.
     * */
    private animateControlsFlag: boolean;
    private status: Status;
    private gameFinished: boolean;
    private gamesMax: number;
    private gamesCount: number;
    private progressDelay: number;
    private gameDelay: number;
    private strategySwitchThreshold: number;
    private tips: any;

    constructor(private httpService: HttpService,
                private chronicleService: ChronicleService,
                private router: Router,
                private progressService: ProgressService,
                private feedbackService: FeedbackService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.gamesMax = 256;    // Limitation on amount of tries for the auto-play, 256 just because.
        this.gamesCount = 20;   // Default amount of tries for the auto-play session.
        this.progressDelay = 1000;   // Game play progress cue delay in ms. The delay before progress disappears after showing the final cue.
        this.gameDelay = 250;   // Game delay in ms between last game finished and next game being played. This is relevant only in sequential play.
        this.strategySwitchThreshold = 10; // Threshold of games count in order to switch between sequential and parallel game processing mode.
        this.status = new Status();
        this.gameFinished = false;
        this.animateControlsFlag = false;
        this.animationState = "init";
        this.tips = {};
        this.tips.play = "Play automatically a set a mount of games";
        this.tips.restart = "Reset and start a new game play session";
        this.tips.quit = "Quit the game, that's it!";
    }

    ngAfterViewChecked() {
        this.animationState = "ready";
        this.cdr.detectChanges();
    }

    doAutoPlay(): void {
        let timeStarted = performance.now();
        this.status.addMessage("Game play session started...");
        if (this.gamesCount && this.gamesCount <= this.gamesMax) {
            this.chronicleService.flushAll();
            this.status.reset();
            this.status.toBePlayed = this.gamesCount;
            /**
             *  A deliberate switch of game play session running strategy depending on the amount of games to be played per session:
             *  a) Waterfall approach - each promised game is executed sequentially, thus takes longer to execute all the games in the session,
             *      however it has one great advantage by allowing to implement a delay (aka "pause) between each game play.
             *      This is useful to handle UX & animation smoothness.
             *
             *  b) Parallel approach - all the games are executed simultaneously in parallel, which ensures the fastest execution result,
             *      however resource usage may skyrocket (depending of the number of games) and as a result, UX & animation smoothness may greatly suffer.
             *      UI feels jarring and non-responsive until execution finishes.
             *
             *  Arbitrary threshold switch is 10 games just because, however UI jarring starts to be noticeable, in this version, at 50+ games.
             * */
            if (this.gamesCount > this.strategySwitchThreshold) {
                this.status.addMessage("Running games sequentially.");
                /**
                 * Make a definite number array with length equal to the number of games to be played.
                 * Array contains numeric elements, whose value is its index in the array, ei.: [0,1,2,3,4,...].
                 */
                let gamesToBePlayedArray = Array.from({length: this.gamesCount}, (v, i) => i);
                /**
                 * Array will be used as a vessel to run games using "reduce" technique, it's a way to implement promise waterfall using vanilla JS.
                 * Otherwise, NPM package "promise-waterfall" could be used for "real" project.
                 */
                gamesToBePlayedArray.reduce(
                    (accumulator, currValue, currIndex) => {
                        return accumulator.then(
                            (resp) => {
                                return this.doPlay(currIndex + 1).then(
                                    (result) => {
                                        resp.push(result);
                                        return resp;
                                    }
                                );
                            }
                        );
                    }, Promise.resolve([])
                ).then(
                    () => {
                        /**
                         * On game session finish, notify progress cue to hide, however give it a slight delay,
                         * so it has a chance to visualize the final progress cue, ei.: 100 of 100.
                         * Otherwise, progress cue will abruptly end on penultimate value.
                         * */
                        setTimeout(
                            () => {
                                this.progressService.displayProgressCycle(new Progress(0, 0, false))
                            }, this.progressDelay
                        );
                        let timeFinished = performance.now();
                        this.gameFinished = true;
                        this.feedbackService.displayNotification("Game play session (of " + gamesToBePlayedArray.length + " game(s)) successful!");
                        this.status.addMessage("Session finished in " + Math.round((timeFinished - timeStarted) / 10) / 100 + "s.");
                        this.animateFlag = !this.animateFlag;
                    }
                );
            } else {
                this.status.addMessage("Running games simultaneously.");
                /**
                 * Make a definite array of promises (aka "promised games").
                 * */
                let gamesToBePlayedArray = Array.from({length: this.gamesCount}, (v, i) => this.doPlay(i + 1));
                /**
                 * Pass the array to be executed in parallel, where all the promised games will run simultaneously.
                 * */
                Promise.all(gamesToBePlayedArray)
                    .then(
                        (gamesPlayedArray) => {
                            setTimeout(
                                () => {
                                    this.progressService.displayProgressCycle(new Progress(0, 0, false))
                                }, this.progressDelay
                            );
                            let timeFinished = performance.now();
                            this.gameFinished = true;
                            this.feedbackService.displayNotification("Game play session (of " + gamesPlayedArray.length + " game(s)) successful!");
                            this.status.addMessage("Session finished in " + Math.round((timeFinished - timeStarted) / 10) / 100 + "s.");
                            this.animateFlag = !this.animateFlag;
                        }
                    ).catch(
                        error => {
                            setTimeout(
                                () => {
                                    this.progressService.displayProgressCycle(new Progress(0, 0, false))
                                }, this.progressDelay
                            );
                            let timeFinished = performance.now();
                            this.feedbackService.displayWarning("Game play session failed. Not all games could play-out successfully.".concat("\r\n", error));
                            this.status.addMessage("Session failed! Lasted " + Math.round((timeFinished - timeStarted) / 10) / 100 + "s.");
                        }
                    );
                }
        }
    }

    doRestart(): void {
        this.animateControlsFlag = !this.animateControlsFlag;
        this.feedbackService.clearFeedback();
        this.gameFinished = false;
        this.gamesCount = 20;
        this.status.reset();
        this.chronicleService.flushAll();
    }

    doQuit(): void {
        /**
         * On exit construct a simple Abyss object to pass info to the Abyss component about number of fallen knights and slain dragons.
         * */
        this.router.navigate(['/abyss', new Abyss(this.status.won, this.status.played - this.status.won)])
            .catch(
                error => this.feedbackService.displayError("Oh-oh, failed to quit...".concat("\r\n", error))
            );
    }

    /**
     * Plays-through a single game (all of its steps) from start to finish.
     * This is where game's composite steps (aka dependent events) have to be registered for accountability, ie.: update the play-through status etc..
     * */
    private doPlay(index: number): Promise<boolean> {
        return new Promise(
            (resolve, reject) => {
                this.newGame().then(
                    game => this.attachWeather(game)
                ).then(
                    game => this.summonDragon(game)
                ).then(
                    game => {
                        this.status.played++;
                        if (game.engagement.isDragonVictor()) {
                            this.status.won++;
                        }
                        /**
                         * Increment progress cue.
                         * At this point, current game index and total count of games are available here,
                         * however, let the parent method control when to hide the progress cue.
                         * */
                        this.progressService.displayProgressCycle(new Progress(index, this.gamesCount, true));
                        /**
                         * Add miniscule delay of 50ms in case there is a need for UX animation smoothness.
                         * In this case there is no obvious animation jarring.
                         * This delay makes most sense in promise waterfall scenario, as it delays every game being played (every doPlay() invocation),
                         * thus ensuring smooth transition animation-wise for determinate progress trackers etc..
                         * In case of a parallel run scenario, this delay is added to the game play session only once,
                         * irrelevant to the number of doPlay() invocations, so makes less sense if at all.
                         * */
                        if (this.gamesCount > this.strategySwitchThreshold) {
                            setTimeout(resolve(true), this.gameDelay);
                        } else {
                            setTimeout(resolve(true), 500);
                        }
                    }
                ).catch(
                    error => {
                        this.progressService.displayProgressCycle(new Progress(index, this.gamesCount, true));
                        this.feedbackService.displayError("Oops, game failed...".concat("\r\n", error));
                        this.status.failed++;
                        return reject(false);
                    }
                )
            }
        );
    }

    /**
     * Retrieves a new game (with a knight inside) and returns the initialized game object.
     */
    private newGame(): Promise<Game> {
        return new Promise(
            (resolve, reject) => {
                this.httpService.getGame()
                    .then(
                        game => resolve(game)
                    ).catch(
                        error => {
                            this.feedbackService.displayError("Failed to retrieve a new game due:".concat("\r\n", error));
                            return reject(null);
                        }
                    );
            }
        );

    }

    /**
     * Retrieves the weather for the game and attaches it to the (parameter provided) game object if successful.
     * */
    private attachWeather(game: Game): Promise<Game> {
        return new Promise(
            (resolve, reject) => {
                this.httpService.getWeather(game.id)
                    .then(
                        weather => {
                            game.weather = weather;
                            return resolve(game);
                        }
                    ).catch(
                        error => {
                            this.feedbackService.displayError("Failed to retrieve the weather due:".concat("\r\n", error));
                            return reject(game);
                        }
                    );
            }
        );
    }

    /**
     * Summons a trained dragon to combat (parameter provided) game's knight and dispatches the dragon to engage him.
     * If successful, returns a game with both dragon and engagement objects initialized.
     * */
    private summonDragon(game: Game): Promise<Game> {
        return new Promise(
            (resolve, reject) => {
                game.dragon = DragonLair.summonDragon(game.knight, game.weather);
                this.httpService.sendDragon(game.id, game.dragon)
                    .then(
                        engagement => {
                            game.engagement = engagement;
                            this.chronicleService.createRecord(
                                new Chronicle(game.id, game.knight, game.dragon, game.engagement, game.weather)
                            );
                            return resolve(game);
                        }
                    ).catch(
                        error => {
                            this.feedbackService.displayError("Dragon failed to engage the knight due:".concat("\r\n", error));
                            return reject(game);
                        }
                    );
            }
        );
    }


    /**
     * Validate input for games count and reset it if it's not valid.
     */
    onChangeGamesCount(): void {
        if (this.gamesCount === null || isNaN(this.gamesCount)) {
            this.gamesCount = 0;
        } else {
            this.gamesCount = Number(this.gamesCount); // Reset any leading zeroes.
        }
    }

    /**
     * Provide tooltips for the menu.
     */
    getTip(key: string): string {
        return this.tips[key];
    }

    // Getter for a textual representation of games count (with additional processing).
    get gamesCountText(): string {
        return (this.gamesCount && this.gamesCount <= this.gamesMax) ? String(this.gamesCount) : "???";
    }

    get finished(): boolean {
        return this.gameFinished;
    }
}
