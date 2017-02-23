import {Component, Input} from '@angular/core';
import {Weather} from '../../../entity/weather';

@Component({
    selector: 'mugloar-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.styl']
})
export class WeatherComponent {
    @Input() weather: Weather;

    /**
     * Weather coordinates.
     * */
    get coordinates(): string {
        return this.weather.coords.x + ", "
            + this.weather.coords.y + ", "
            + this.weather.coords.z;
    };

    /**
     * Weather rating.
     * */
    get rating(): string {
        return this.weather["varX-Rating"];
    }

    /**
     * Weather icon.
     * */
    get icon(): string {
        let icon: string;

        switch (this.weather.code) {
            case "T E":
                icon = "hot-surface";
                break;

            case "SRO":
                icon = "lightning-storm";
                break;

            case "FUNDEFINEDG":
                icon = "dust-cloud";
                break;

            case "HVA":
                icon = "raining";
                break;

            default:
                icon = "sun";
        }

        return icon.concat("_color");
    }

    /**
     * Getters for different weather wrapper modifiers.
     * */
    get normal(): boolean {
        return this.weather.code === 'NMR';
    }

    get storm(): boolean {
        return this.weather.code === 'SRO';
    }

    get rain(): boolean {
        return this.weather.code === 'HVA';
    }

    get dry(): boolean {
        return this.weather.code === 'T E';
    }

    get fog(): boolean {
        return this.weather.code === 'FUNDEFINEDG';
    }
}