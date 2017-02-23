import {Knight} from "./knight";
import {Weather} from "./weather";
import {Dragon} from "./dragon";
import {Engagement} from "./engagement";

export class Game implements iGame {
    id: string;
    state: string;
    error: boolean;

    knight: Knight;
    weather?: Weather;
    dragon?: Dragon;
    engagement?: Engagement;

    constructor(id: string, knight: Knight) {
        this.id = id;
        this.state = "Started";
        this.error = false;
        this.knight = knight;
    }
}

export interface iGame {
    id: string;
    state: string;
    error: boolean;

    knight: Knight;
    weather?: Weather;
    dragon?: Dragon;
    engagement?: Engagement;
}