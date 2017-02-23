import {Dragon} from "./dragon";
import {Knight} from "./knight";
import {Weather} from "./weather";
import {DragonAssets, DragonColor} from "./dragon.assets";

export class DragonLair {

    /* Definition of Dragon specific properties. Make use of Dragon assets external module. */
    private static colors: DragonColor[] = DragonAssets.colors;
    private static names: string[] = DragonAssets.names;
    private static titles: string[] = DragonAssets.titles;

    private static TOTAL = 20;          // Total points to distribute among dragon's attributes.
    private static MAX = 10;            // Maximum allowance of points per single attribute.
    private static EPIC_THRESHOLD = 6;  // Attribute value threshold at which it becomes EPIC. EPIC values are treated differently.
    private static EPIC_COUNTER = 2;    // Points needed to counter an EPIC attribute's value.

    /**
     *  Summons an appropriate Dragon entity based on provided Knight & Weather conditions.
     * */
    static summonDragon(knight: Knight, weather: Weather): Dragon {
        let score = 0;
        let dragonModel = {
            claws: 0,
            scales: 0,
            wings: 0,
            breath: 0
        }

        let points: number = this.TOTAL;

        if (!this.isWeatherKnown(weather.code)) {
            console.log("[Warning] DragonLair :: Unexpected weather code! No one in the lair knows anything about it, dragon is going into the unknown.", weather.code);
        }

        // First step: Sort knight's attributes in a descending order (because epic scores have to be countered first!).
        let knightAttributesSorted = Object
            .keys(
                // Knight's object could be used for sorting, however philosophically we don't want to sort keys we have no interest in, so return a new constructed object just for that.
                {
                    "attack": knight.attack,
                    "armor": knight.armor,
                    "agility": knight.agility,
                    "endurance": knight.endurance
                }
            ).sort(
                (a,b) => {
                    if (knight[a] > knight[b]) {
                        return -1;
                    } else if (knight[a] < knight[b]) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            );

        // Second step: Adjust points to counter knight's attributes. Adjust in order of priorities (attribute with a higher score = higher priority).
        for (let i=0; i < knightAttributesSorted.length; i++) {
            let dragonAttributeName = this.getDragonCounterAttributeName(knightAttributesSorted[i]);
            score = this.determineCounterAttributeValue(dragonAttributeName, knight, weather.code, points, i + 1);
            dragonModel[dragonAttributeName] = score;
            points -= score;
        }

        // Done. Spawn the dragon now.
        let dragon = new Dragon(this.getNameRandom(), dragonModel.claws, dragonModel.scales, dragonModel.wings, dragonModel.breath);
        dragon.color = this.getColorRandom();
        dragon.title = this.getTitleRandom();
        return dragon;
    }

    /**
     * Internal utility method to return dragon's attribute name that is countered by the Knight's attribute.
     * */
    private static getDragonCounterAttributeName(knightAttributeName: string): string {
        switch (knightAttributeName) {
            case "attack":
                return "scales";

            case "armor":
                return "claws";

            case "agility":
                return "wings";

            case "endurance":
                return "breath";

            default:
                console.error("Unexpected knight attribute %s!", knightAttributeName);
                return "";
        }
    }

    /**
     * Method to determine attribute value based on knight's attributes and the weather conditions, etc..
     * Attribute value is determined using the following steps:
     * 1) Step #1 - Decide by weather:
     * 1.1) "NMR" (Normal weather) - proceed to step 2.
     * 1.2) "SRO" (Lightning storm), "FUNDEFINEDG" (Fog), "T E" (The long dry) - use certain or all values predefined.
     * 2) Step #2 - Roll attribute value using the "priority descend" algorithm.
     * */
    private static determineCounterAttributeValue(attribute: string, knight: Knight, weather: string, remaining_points: number, seq: number): number {
        switch (attribute) {
            case "claws":
                if (weather === "NMR") {
                    return this.rollValue(knight.armor, remaining_points, seq);
                } else if (weather === "HVA") {
                    return 10;
                } else {
                    return 5;
                }

            case "scales":
                if (weather === "NMR") {
                    return this.rollValue(knight.attack, remaining_points, seq);
                } else {
                    return 5;
                }

            case "wings":
                if (weather === "NMR") {
                    return this.rollValue(knight.agility, remaining_points, seq);
                } else {
                    return 5;
                }

            case "breath":
                if (weather === "NMR") {
                    return this.rollValue(knight.endurance, remaining_points, seq);
                } else if (weather === "HVA") {
                    return 0;
                } else {
                    return 5;
                }

            default:
                console.error("Unexpected dragon attribute %s!", attribute);
                return 0;
        }
    }

    /**
     * Roll attribute's value based on the parameter provided restrictions:
     *  againstScore - knight's attribute value that should be "dealt" with by the dragon.
     *  remaining_points - self-explanatory, keep track of points left for distribution, so the dragon is optimally balanced.
     *  seq - sequence number of the attribute being worked on (attributes are this point are sorted in descending order).
     *
     *  Algorithm breaks down value calculation by the knight's value "EPICness", it distinguishes between these states:
     *  1) epic value
     *  2) sub epic value, and
     *  3) "borderline epic" value.
     *
     *  Each state is dealt with in a slightly different fashion with a heavy emphasis on the knight's attribute sequential number (ordered ascending).
     *  Higher sequential number translates to a higher priority.
     *
     *  Algorithm is tuned based on "black box assertions"
     *  and ensures a guaranteed win against any knight given any weather except storm (surprise, surprise ;)).
     *
     *  Also, algorithm takes advantage of the "equilibrium knight" case (5,5,5,5), where any chosen dragon's attribute EPIC value is
     *  sufficient to guarantee its victory. This tiny bit of knowledge simplifies the algorithm by not incorporating attribute "weight" factors into it.
     * */
    private static rollValue(againstScore: number, remaining_points: number, seq: number): number {
        let value: number = 0;

        if (againstScore < this.EPIC_THRESHOLD) {
            value = Math.max(0, againstScore - 1 + Math.floor((this.EPIC_COUNTER - 1) / seq)) + Math.floor(1 / seq) * 2;
        } else if (againstScore === this.EPIC_THRESHOLD) {
            value = againstScore + Math.floor(this.EPIC_COUNTER / seq) + Math.floor(1 - seq);
        } else {
            value = againstScore - 1 + Math.floor((this.EPIC_COUNTER + 1) / seq) + Math.floor(1 - seq);
        }

        value = Math.min(this.MAX, value);              // Ensure value is within required limits: [0, 10]
        value = Math.min(value, remaining_points);      // Ensure value does not exceed total points remaining for rolling.
        value = Math.max(value, remaining_points * Math.floor(seq / 4));  // Ensure the last attribute gets all the remaining points if there are any left undistributed.

        return value;
    }

    /**
     * Utility method to verify weather (by code) is known in the dragon lair.
     * */
    private static isWeatherKnown(code: string): boolean {
        switch (code) {
            case "NMR": /* Normal regular weather */
                return true;

            case "HVA": /* Heavy rain */
                return true;

            case "SRO": /* Lightning storm */
                return true;

            case "FUNDEFINEDG": /* Fog */
                return true;

            case "T E": /* The long dry */
                return true;

            default:
                return false;
        }
    }

    /**
     * Utility "flavor" methods (to spice-up the dragon), specific to this particular class's implementation.
     * */
    private static getNameRandom(): string {
        return this._getRandom(this.names);
    }

    private static getColorRandom(): DragonColor {
        return this._getRandom(this.colors);
    }

    private static getTitleRandom(): string {
        return this._getRandom(this.titles);
    }

    private static _getRandom(list: any[]): any {
        var pick = Math.floor(Math.random() * list.length);
        return list[pick];
    }
}
