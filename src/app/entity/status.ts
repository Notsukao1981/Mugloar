/**
 * Playing session status.
 * */
export class Status {
    toBePlayed: number;
    played: number;
    failed: number; // Games that fail due to unexpected issues (mostly technical).
    won: number;
    msg: string[];  // FIFO type message stack.
    private msgSize: number = 5;

    constructor() {
        this.toBePlayed = 0;
        this.played = 0;
        this.failed = 0;
        this.won = 0;
        this.msg = [];
    }

    reset(): void {
        this.toBePlayed = 0;
        this.played = 0;
        this.failed = 0;
        this.won = 0;
        this.msg = ["Ready."];
    }

    addMessage(message: string): void {
        if (this.msg.length > this.msgSize) {
            this.msg.splice(0,1);  // Remove "first" (aka the oldest) message, as it is probably no longer relevant.
        }
        this.msg.push(message);
    }
}