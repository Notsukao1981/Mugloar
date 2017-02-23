/*
*   This is used for demonstration purposes to imitate "real" backend service to accomplish log data storage.
*   Reference: https://github.com/angular/in-memory-web-api
*
* */

import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let chronicle = [
            /*
            {
                "id": 1,
                "knight":{"name":"Sir. Jim Fowler of Nunavut","attack":6,"armor":6,"agility":3,"endurance":5},
                "dragon":{"name":"Betsy","scaleThickness":1,"clawSharpness":3,"wingStrength":3,"fireBreath":4},
                "engagement":{"status":"Defeat","message":"Dragon died of starvation: need all 20 points divided."},
                "weather":{
                    "time": "Tue Dec 27 2016 14:57:38 GMT+0000 (UTC)",
                    "coords": {
                        "x":"3916.234", "y":"169.914", "z":"6.33"
                    },
                    "code":"NMR",
                    "message":"Another day of everyday normal regular weather, business as usual, unless it’s going to be like the time of the Great Paprika Mayonnaise Incident of 2014, that was some pretty nasty stuff.",
                    "varX-Rating":"8"
                }
            },
            {
                "id": 2,
                "knight":{"name":"Knight Geronimo","attack":1,"armor":9,"agility":9,"endurance":1},
                "dragon":{"name":"Betsy","scaleThickness":1,"clawSharpness":3,"wingStrength":3,"fireBreath":4},
                "engagement":{"status":"Defeat","message":"Dragon died of starvation: need all 20 points divided."},
                "weather":{
                    "time": "Tue Dec 27 2016 14:57:38 GMT+0000 (UTC)",
                    "coords": {
                        "x":"3916.234", "y":"169.914", "z":"6.33"
                    },
                    "code":"SRO",
                    "message":"Another day of everyday normal regular weather, business as usual, unless it’s going to be like the time of the Great Paprika Mayonnaise Incident of 2014, that was some pretty nasty stuff.",
                    "varX-Rating":"8"
                }
            },
            {
                "id": 3,
                "knight":{"name":"Knight Leeroy","attack":6,"armor":6,"agility":3,"endurance":5},
                "dragon":{"name":"Betsy","scaleThickness":1,"clawSharpness":3,"wingStrength":3,"fireBreath":4},
                "engagement":{"status":"Defeat","message":"Dragon died of starvation: need all 20 points divided."},
                "weather":{
                    "time": "Tue Dec 27 2016 14:57:38 GMT+0000 (UTC)",
                    "coords": {
                        "x":"3916.234", "y":"169.914", "z":"6.33"
                    },
                    "code":"T E",
                    "message":"Another day of everyday normal regular weather, business as usual, unless it’s going to be like the time of the Great Paprika Mayonnaise Incident of 2014, that was some pretty nasty stuff.",
                    "varX-Rating":"8"
                }
            }
            */
        ];
        return {chronicle};
    }
}
