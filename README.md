# Mugloar

This project is an implementation response to a challenge project @ http://www.dragonsofmugloar.com/.

TLDR; This app resembles a game of knight and dragon.
However, there is a nontraditional twist here though - the knight is the intruder, whereas the dragon is the protector of princess virginity.
Upon the start, the app fetches a new game (which also contains a knight), then fetches a weather for that game.
In essence, they are a bunch of randomly generated numbers elegantly packed and form a foundation of an equation.
An equation to which the dragon is the key component to solve it.
The challenge comes down to generating a dragon with proper attributes to successfully solve the equation (aka defeat the knight).
Dragon generation is done automatically in response to knight's and weather's data combo, but can be overridden manually.
Automatic generation is done at all times (both in "game" and "practice" modes), however only the latter allows to override dragon attributes.
Speaking of which, the app can be smoothly transitioned between two modes: "game" and "practice".
In "game" mode - it's basically you setup the number of games to be played, click and watch how they play out.
See results, save the file and repeat if needed.
In "practice" mode you have more control over the dragon (attribute allocation). This mode allows for algorithm tunning and can be viewed as debug/testing mode.
Game results (and other relevant stats) are stored locally in memory per session and can be exported via Chronicle component (the yellow one at the bottom) for analysis.
Worth mentioning is that the dragon lair entity is responsible for breeding the mathematically-sound dragons in response, and the algorithm adopted is very loosely based on the "distribution bin" method.
Other than that, hopefully you'll enjoy it :)

P.S. App's core functionality depends on the availability of the resources hosted by http://www.dragonsofmugloar.com/.

## Technicalities
This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.
Exploits Angular2' 'in-memory DB' as a backend storage, which is sufficient for demo purposes.
Deliberately stripped of testing packages.
Targeted to modern browsers as a SPA in a desktop environment omitting viewform responsiveness for brevity and time constraints.
Stylus is a CSS preprocessor of choice, because it's great and saves time (less monkey jobs).
XML to JSON processing library, unlike all the rest, is a non-NPM and therefore its usage stands out.
There is some notable stuff going on with XML to JSON conversion, also heavy use of promises (sequential & parallel) and observables.
Spiced-up with animations for flavor.

### TODOs or bits I would like to improve in the future
Switch xml2json library from non-NPM to NPM instead.
Add test coverage using Karma library.
Implement mask delay on component using 3rd party fonts due FOIT issues.
Add responsiveness based on viewform scaling, etc..
Animation optimizations on component initialization.
Resolve file saving issue on MS Edge browser.

## Development server
Run `ng serve` for a local dev server.
Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

## Code scaffolding
Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive/pipe/service/class`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `--prod --aot` flag for a production build with ahead-of-time precompile.

## Deploying to Firebase hosting server
Run build first, then run `firebase deploy`.

### Initialize & associate the Firebase account if needed with `firebase login` & `firebase init`.
### To test the deployed app on the Firebase host, run `firebase open` right from the console.
### Make sure plugin is readily available if not, then run `npm install -g firebase-tools`.

## Deploying to Github Pages
Run `ng github-pages:deploy` to deploy to Github Pages.

## Further help
To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
