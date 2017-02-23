import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from '@angular/http';
import {MugloarRoutingModule} from "./mugloar-routing.module";
import {MaterialModule} from "@angular/material";
import 'hammerjs';  // Needed for @angular/material (sliders).

// Import the entire RxJS bundle.
import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api. This will be used to store chronicle logs.
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './service/in-memory-data.service';

import {HttpService} from './service/http.service';
import {ChronicleService} from "./service/chronicle.service";

import {MugloarComponent} from './mugloar.component';
import {IntroComponent} from './component/core/intro/intro.component';
import {GameComponent} from './component/core/game/game.component';
import {ChronicleComponent} from './component/core/chronicle/chronicle.component';
import {ChronicleAttributeComponent} from './component/core/chronicle/chronicle-attribute/chronicle-attribute.component';
import {DragonComponent} from './component/core/dragon/dragon.component';
import {DragonPreviewComponent} from './component/core/dragon/dragon-preview/dragon-preview.component';
import {DragonFormComponent} from './component/core/dragon/dragon-form/dragon-form.component';
import {KnightComponent} from './component/core/knight/knight.component';
import {WeatherComponent} from './component/core/weather/weather.component';
import {AbyssComponent} from './component/core/abyss/abyss.component';
import {StatusComponent} from './component/core/status/status.component';
import {AttributeComponent} from './component/support/attribute/attribute.component';
import {AttributeNameComponent} from './component/support/attribute/attribute-name/attribute-name.component';
import {ValidateScoreDirective} from './directive/validate-score.directive';
import {PracticeComponent} from './component/core/practice/practice.component';
import {FeedbackComponent} from './component/support/feedback/feedback.component';
import {ProgressCycleComponent} from './component/support/progress/determinate/progress.cycle.component';
import {ProgressSpinnerComponent} from "./component/support/progress/indeterminate/progress.spinner.component";
import {AbyssGraveComponent} from './component/core/abyss/abyss-grave/abyss-grave.component';
import { AbyssGhostComponent } from './component/core/abyss/abyss-ghost/abyss-ghost.component';

@NgModule({
    declarations: [
        MugloarComponent,
        IntroComponent,
        GameComponent,
        WeatherComponent,
        KnightComponent,
        DragonComponent,
        DragonFormComponent,
        DragonPreviewComponent,
        ChronicleComponent,
        AbyssComponent,
        StatusComponent,
        AttributeComponent,
        AttributeNameComponent,
        ChronicleAttributeComponent,
        ValidateScoreDirective,
        PracticeComponent,
        FeedbackComponent,
        ProgressCycleComponent,
        ProgressSpinnerComponent,
        AbyssGraveComponent,
        AbyssGhostComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        MugloarRoutingModule,
        MaterialModule.forRoot()
    ],
    providers: [HttpService, ChronicleService],
    bootstrap: [MugloarComponent]
})
export class MugloarModule {
}
