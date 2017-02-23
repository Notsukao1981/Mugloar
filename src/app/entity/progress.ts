/**
 * Progress class, that carries progress related info to implement visual cue.
 * */
export class Progress {
    current: number;
    total: number;
    show: boolean;

    constructor(current: number, total: number, show: boolean) {
        this.current = current;
        this.total = total;
        this.show = show;
    }
}