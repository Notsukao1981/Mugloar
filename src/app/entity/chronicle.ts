/**
 * Class to contain (dragon vs. knight) engagement details. Engagement is chronicled and can be exported.
 * */
import {Knight} from "./knight";
import {Dragon} from "./dragon";
import {Engagement} from "./engagement";
import {Weather} from "./weather";

export class Chronicle {
    id?: number | string;   // Optional, assigned internally in DB.
    gameId: string;
    knight: Knight;
    dragon: Dragon;
    engagement: Engagement;
    weather: Weather;

    constructor(gameId: string, knight: Knight, dragon: Dragon, feedback: Engagement, weather: Weather) {
        this.gameId = gameId;
        this.knight = knight;
        this.dragon = dragon;
        this.engagement = feedback;
        this.weather = weather;
    }
}

/**
 * Tiny class to deliver chronicle data summary. Subscribers will appreciate this.
 * */
export class ChronicleSummary {
    total: number;
    wins: number;
    defeats: number;
    weather: {
        normal: number;
        heavy_rain: number;
        long_dry: number;
        storm: number;
        fog: number;
    }

    constructor() {
        this.reset();
    }

    reset(): void {
        this.total = 0;
        this.wins = 0;
        this.defeats = 0;
        this.weather = {
            normal: 0,
            heavy_rain: 0,
            long_dry: 0,
            storm: 0,
            fog: 0
        };
    }
};


/**
 * Class to handle the export of Chronicle data to the outside in a MS Excel friendly format.
 * */
export class ChronicleExport {
    private chronicles: Chronicle[];

    constructor (chronicles: Chronicle[]) {
        this.chronicles = chronicles;
    }

    /**
     * Expose a method to get the provided chronicles data formatted into an export-ready state.
     * */
    getData(): string[] {
        let data = [];
        let lineNumber = 0;

        // Note: Calculate exported data summary (again), since ChronicleExport' caller has no summary
        // then it is obvious to calculate it here. Since this data structure is very simplistic,
        // it is ok to calculate it here, otherwise it should be calculated by the ChronicleService class.
        let wins = 0;
        let defeats = 0;

        data.push(this.getHeader());    // Get exported data header line first.
        for(let chronicle of this.chronicles) {
            lineNumber++;
            if (chronicle.engagement.status === "Victory") {
                wins++;
            } else {
                defeats++;
            }
            data.push(String(lineNumber).concat("|", this.parseData(chronicle)));   // Push chronicle's actual data, however prefix it with a line number.
        }
        data.push(this.getFooter(lineNumber, wins, defeats));    // Supplement with a summary footer (provide summary details to the footer).

        return data;
    }

    /**
     * Parsed chronicle record's data into a singular string.
     * */
    private parseData(chronicle: Chronicle): string {
        return ""
            + chronicle.id + "|" // Chronicle Id
            + chronicle.gameId + "|" // Game Id
            + chronicle.weather.code + ", X-rating: " + chronicle.weather['varX-Rating'] + "|" // Weather data
            + chronicle.knight.name + " : " // Knight data
            + chronicle.knight.attack + ","
            + chronicle.knight.armor + ","
            + chronicle.knight.agility + ","
            + chronicle.knight.endurance + "|"
            + chronicle.dragon.name + " : " // Dragon data
            + chronicle.dragon.clawSharpness + ","
            + chronicle.dragon.scaleThickness + ","
            + chronicle.dragon.wingStrength + ","
            + chronicle.dragon.fireBreath + "|"
            + chronicle.engagement.status + ", " + chronicle.engagement.message // Engagement data
            + "\r\n";
    }

    private getHeader(): string {
        return "#|"
            + "Chronicle Id|"
            + "Game Id|"
            + "Weather (code, X-rating)|"
            + "Knight (name : attack, armor, agility, endurance)|"
            + "Dragon (name : claws, scales, wings, breath)|"
            + "Engagement (status, message)"
            + "\r\n"
            + "-"
            + "\r\n";
    }

    private getFooter(total: number, wins: number, defeats: number): string {
        return "="
            + "\r\n"
            + "Total: ".concat(String(total), " ")
            + "Wins: ".concat(String(wins), " ")
            + "Defeats: ".concat(String(defeats), ".");
    }
}