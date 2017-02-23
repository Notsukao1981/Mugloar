import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Chronicle, ChronicleExport} from "../entity/chronicle";
import {FeedbackService} from "./feedback.service";
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ChronicleService {
    private chroniclesUrl = 'mugloar/chronicle'; // Path is tricky: ${root component}/${variable's name in in-memory-data.service.ts}
    private headers = new Headers({'Content-Type': 'application/json'});
    chronicle: Observable<Chronicle[]>;
    private _chronicles: BehaviorSubject<Chronicle[]>;
    private dataStore: {  // This is where we will store our chronicle data in memory, so it can be readily available for dumping to file.
        chronicles: Chronicle[]
    };

    constructor(private http: Http, private feedbackService: FeedbackService) {
        this.dataStore = {chronicles: []};
        this._chronicles = <BehaviorSubject<Chronicle[]>> new BehaviorSubject([]);
        /**
         *  Expose public observable stream.
         *  Any component subscribed to this stream will get a value pushed down and always have the latest version of the data.
         *  This helps to keep the data consistent across entire application.
         * */
        this.chronicle = this._chronicles.asObservable();
    }

    loadAll() {
        this.http.get(this.chroniclesUrl)
            .map(response => response.json())
            .subscribe(
                data => {
                    this.dataStore.chronicles = data.data;
                    // Push a new copy of our chronicles array and an updated summary to all subscribers.
                    this._chronicles.next(Object.assign({}, this.dataStore).chronicles);
                }, error => this.feedbackService.displayError("Failed to load chronicle data due:".concat("\r\n", error))
            );
    }

    /**
     * Provide a convenient method to export all the chronicles data stored (data is transformed from Chronicle[] -> string[]).
     * */
    exportAll(): string[] {
        return new ChronicleExport(this.dataStore.chronicles).getData();
    }

    /**
     * Flush all chronicle records both from the local in-memory db and our internal storage.
     * */
    flushAll(): void {
        const url = `${this.chroniclesUrl}/commands/resetdb`; // This is specific to the backend implementation used, since its a demo of in-memory db, this is how it's done here.
        this.http
            .delete(url, {headers: this.headers})
            .subscribe(
                response => {
                    // Update our local dataStore.
                    this.dataStore.chronicles = [] as Chronicle[];
                    this._chronicles.next(Object.assign({}, this.dataStore).chronicles);
                }, error => this.feedbackService.displayError("Failed to flush chronicle data due:".concat("\r\n", error))
            );
    }

    /* CRUD methods: Create a new chronicle record. */
    createRecord(chronicle: Chronicle): void {
        this.http
            .post(this.chroniclesUrl, JSON.stringify(chronicle), {headers: this.headers})
            .map(response => response.json())
            .subscribe(
                data => {
                    this.dataStore.chronicles.push(data.data);
                    this._chronicles.next(Object.assign({}, this.dataStore).chronicles);
                }, error => this.feedbackService.displayError("Failed to create a chronicle data record due:".concat("\r\n", error))
            );
    }

    /* CRUD methods: Delete an existing chronicle record by id. (Not used currently) */
    deleteRecord(id: string): void {
        const url = `${this.chroniclesUrl}/${id}`;
        this.http
            .delete(url, {headers: this.headers})
            .subscribe(
                response => {
                    // Update our local dataStore by removing the already deleted chronicle record from the in-memory db.
                    this.dataStore.chronicles.forEach(
                        (e, i) => {
                            if (e.id === id) {
                                this.dataStore.chronicles.splice(i ,1);
                            }
                        }
                    );
                    this._chronicles.next(Object.assign({}, this.dataStore).chronicles);
                }, error => this.feedbackService.displayError("Failed to delete a chronicle data record due:".concat("\r\n", error))
            );
    }
}
