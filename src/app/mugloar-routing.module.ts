import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IntroComponent} from "./component/core/intro/intro.component";
import {GameComponent} from "./component/core/game/game.component";
import {AbyssComponent} from "./component/core/abyss/abyss.component";
import {PracticeComponent} from "./component/core/practice/practice.component";

const routes: Routes = [
    {path: '', redirectTo: '/intro', pathMatch: 'full'},
    {path: 'intro', component: IntroComponent},
    {path: 'game', component: GameComponent},
    {path: 'practice', component: PracticeComponent},
    {path: 'abyss', component: AbyssComponent},
    {path: '**', component: AbyssComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class MugloarRoutingModule {
}
