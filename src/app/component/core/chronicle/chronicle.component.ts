import {Component, OnInit} from "@angular/core";
import {Chronicle, ChronicleSummary} from "../../../entity/chronicle";
import {ChronicleService} from "../../../service/chronicle.service";
import {Observable} from "rxjs/Observable";
import {FeedbackService} from "../../../service/feedback.service";

/**
 * Expose "file-saver" plugin from node_modules for "SaveAs" functionality.
 * Tricky part: to satisfy TypeScript compilation issues, a declaration to typings.d.ts had to be added as well duh ;(
 *
 * Ref.: https://github.com/angular/angular-cli/issues/999
 * And.: http://stackoverflow.com/questions/39670360/angular2-filesaver-js-cannot-find-module-file-saver
 * Also.: https://weblog.west-wind.com/posts/2016/Sep/12/External-JavaScript-dependencies-in-Typescript-and-Angular-2
 * */
import * as filesaver from 'file-saver';
import {Weather, iWeatherReport, WeatherTypes} from "../../../entity/weather";


@Component({
    selector: 'mugloar-chronicle',
    templateUrl: './chronicle.component.html',
    styleUrls: ['./chronicle.component.styl']
})
export class ChronicleComponent implements OnInit {
    private chronicles: Observable<Chronicle[]>;
    private summary: ChronicleSummary;
    private exportFileName = "Chronicles.txt";
    private expanded: boolean;  // Chronicles list container can be expanded or collapsed, initially it is collapsed for compactness.

    constructor(private chronicleService: ChronicleService, private feedbackService: FeedbackService) {
    }

    ngOnInit(): void {
        this.summary = new ChronicleSummary();
        this.chronicles = this.chronicleService.chronicle
            .map(   // Intercept chronicle data subscription to calculate summary details for each game play session.
                chronicles => {
                    this.summary.reset();
                    for (let chronicle of chronicles) {
                        this.summary.total++;
                        if (chronicle.engagement.status === "Victory") {  // Only two status types: Victory or Defeat.
                            this.summary.wins++;
                        } else {
                            this.summary.defeats++;
                        }

                        // Collect weather statistics as well. Initialize <Weather> class to exploit its handy methods.
                        let weather = new Weather(<iWeatherReport>{report: chronicle.weather});
                        if (weather.isTypeRegularOrUnknown()) {
                            this.summary.weather.normal++;
                        } else if (weather.isTypeFog()) {
                            this.summary.weather.fog++;
                        } else if (weather.isTypeHeavyRain()) {
                            this.summary.weather.heavy_rain++;
                        } else if (weather.isTypeLongDry()) {
                            this.summary.weather.long_dry++;
                        } else if (weather.isTypeStorm()) {
                            this.summary.weather.storm++;
                        }
                    }
                    return chronicles;
                }
            ); // Subscribe to the entire collection of chronicles.
        this.chronicleService.loadAll();    // Load all chronicles (existing in DB, created before the subscription).
    }

    expandChronicles(): void {
        this.expanded = true;
    }

    collapseChronicles(): void {
        this.expanded = false;
    }

    /**
     * Export entire chronicle data into a file.
     * */
    exportChronicles(): void {
        // TODO: Resolve issue with MS Edge.
        try {
            let data = this.chronicleService.exportAll();
            let file = new File(data, this.exportFileName, {type: "text/plain;charset=utf-8"});
            filesaver.saveAs(file);
        } catch (exception) {
            this.feedbackService.displayError("Failed to export the chronicle data due:".concat("\r\n", exception));
        }
    }

    /**
     * Flush entire chronicle data from the database. Local copy will be refreshed automatically because of subscription.
     * */
    flushChronicles(): void {
        this.chronicleService.flushAll();
    }

    // Getter for flag whether the engagements data is empty.
    get empty(): boolean {
        return this.summary.total === 0;
    }

    /**
     * Getters for weather type codes.
     */
    get WeatherTypeNormal(): string {
        return WeatherTypes[0];
    }

    get WeatherTypeHeavyRain(): string {
        return WeatherTypes[3];
    }

    get WeatherTypeLongDry(): string {
        return WeatherTypes[2];
    }

    get WeatherTypeLightningStorm(): string {
        return WeatherTypes[1];
    }

    get WeatherTypeFog(): string {
        return WeatherTypes[4];
    }

    /**
     * Getters for chronioles list container state: expanded or collapsed.
     * */
    get isCollapsed(): boolean {
        return !this.expanded;
    }

    get isExpanded(): boolean {
        return this.expanded;
    }
}
