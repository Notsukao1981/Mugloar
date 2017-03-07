import {Component, OnInit, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MdIconRegistry} from "@angular/material";
import {Router, NavigationEnd} from "@angular/router";
import {Subscription} from "rxjs";
import {animationInitializeB} from "./animation/component";


@Component({
    selector: 'mugloar-app',
    templateUrl: './mugloar.component.html',
    styleUrls: ['./mugloar.component.styl'],
    animations: [animationInitializeB]
})
export class MugloarComponent implements OnInit, AfterViewChecked {
    private routerSubscription: Subscription;
    private isLocationAbyss: boolean = false;
    private version: string = "1.2.0";

    /**
     * Component's animation state. Eligible states: init, ready.
     * */
    private animationState: string;

    constructor(private mdIconRegistry: MdIconRegistry, private sanitizer: DomSanitizer, private router: Router, private cdr: ChangeDetectorRef) {
        mdIconRegistry.addSvgIconSet(this.sanitizedResourceURL("../../../assets/icons/icons.svg")); // Register icon set.
    }

    /**
     * Upon initializing the Abyss aka the "Game over" component hide header and footer elements.
     * Hiding serves no other purpose, but to emphasize aesthetics.
     * */
    ngOnInit() {
        this.animationState = "init";
        this.routerSubscription = this.router.events.subscribe(
            (path) => {
                if (path instanceof NavigationEnd) {    // Filter-off other navigation cues and only check when it's a "NavigationEnd".
                    // TODO: Remove hardcoded url path and transform it into a class/collection implementation, also adjust *-routing.modules.ts.
                    this.isLocationAbyss = (path.urlAfterRedirects === "/abyss");
                }
            }
        );
    }

    ngAfterViewChecked() {
        this.animationState = "ready";
        this.cdr.detectChanges();
    }

    /**
     * To prevent memory leaks, terminate subscription on component destroy.
     * */
    ngOnDestroy() {
        this.routerSubscription.unsubscribe();
    }

    private sanitizedResourceURL(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);  // Register with DOMSanitizer due XSS.
    }

    get isGameOver(): boolean {
        return this.isLocationAbyss;
    }
}