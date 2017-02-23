/**
 * Class to contain (external) service's response for engagement resolution between the dragon and the knight.
 * */
export class Engagement {
    status: string;
    message: string;

    constructor(engagement: iEngagement) {
        this.status = engagement.status;
        this.message = engagement.message;
    }

    isDragonVictor(): boolean {
        return this.status === "Victory";
    }
}

export interface iEngagement {
    status: string; // Either: Defeat | Victory
    message: string;
}
