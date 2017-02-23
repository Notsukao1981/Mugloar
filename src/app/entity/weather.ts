export class Weather implements iWeather {
    code: string;
    coords: {
        x: string;
        y: string;
        z: string;
    };
    message: string;
    time: string;
    "varX-Rating": string;

    constructor(weatherReport: iWeatherReport) {
        this.code = weatherReport.report.code;
        this.coords = weatherReport.report.coords;
        this.message = weatherReport.report.message;
        this.time = weatherReport.report.time;
        this["varX-Rating"] = weatherReport.report["varX-Rating"];
    }

    /**
     * Determine if the weather is regular or totally unknown/unexpected. This is going to be of use for dragon training.
     * */
    isTypeRegularOrUnknown(): boolean {
        return this.code === "NMR" || WeatherTypes.indexOf(this.code) === -1;
    }

    isTypeHeavyRain(): boolean {
        return this.code === "HVA";
    }

    isTypeLongDry(): boolean {
        return this.code === "T E";
    }

    isTypeFog(): boolean {
        return this.code === "FUNDEFINEDG";
    }

    isTypeStorm(): boolean {
        return this.code === "SRO";
    }
}

export interface iWeather {
    code: string;
    coords: {
        x: string;
        y: string;
        z: string;
    };
    message: string;
    time: string;
    "varX-Rating": string;
    [props: string]: any;   /* Note: In case Weather report has new fields, prevent TypeScript to fail. */

    isTypeRegularOrUnknown(): boolean;
    isTypeHeavyRain(): boolean;
    isTypeLongDry(): boolean;
    isTypeLongDry(): boolean;
    isTypeFog(): boolean;
    isTypeStorm(): boolean;
}

export interface iWeatherReport {
    report: iWeather;
}

/* Known weather types. */
export const WeatherTypes: string[] = ["NMR", "SRO", "T E", "HVA", "FUNDEFINEDG"];