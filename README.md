# Mugloar

This project is an implementation response to a challenge project @ http://www.dragonsofmugloar.com/.
<p>
<i>Desired dragon survival rate is 60%, the app scores a glorius 95+% - it all comes down to how many storms there are.</i> 
</p>

<p>
TLDR; This app resembles a game of knight and dragon.
</p>
<p>
However, there is a nontraditional twist here though - the knight is the intruder, whereas the dragon is the protector of princess virginity.
</p>
<p>
Upon the start, the app fetches a new game (which also contains a knight), then fetches a weather for that game.
In essence, they are a bunch of randomly generated numbers elegantly packed and form a foundation of an equation.
An equation to which the dragon is the key component to solve it.
</p>
<p>
The challenge comes down to generating a dragon with proper attributes to successfully solve the equation (aka defeat the knight).
Dragon generation is done automatically in response to knight's and weather's data combo, but can be overridden manually.
Automatic generation is done at all times (both in "game" and "practice" modes), however only the latter allows to override dragon attributes.
Speaking of which, the app can be smoothly transitioned between two modes: "game" and "practice".
</p>
<p>
In "game" mode - it's basically you setup the number of games to be played, click and watch how they play out.
See results, save the file and repeat if needed.
</p>
<p>
In "practice" mode you have more control over the dragon (attribute allocation). This mode allows for algorithm tunning and can be viewed as debug/testing mode.
</p>
<p>
Game results (and other relevant stats) are stored locally in memory per session and can be exported via Chronicle component (the yellow one at the bottom) for analysis.
Worth mentioning is that the dragon lair entity is responsible for breeding the mathematically-sound dragons in response, and the algorithm adopted is very loosely based on the "distribution bin" method.
Other than that, hopefully you'll enjoy it :)
</p>

P.S. App's core functionality depends on the availability of the resources hosted by: <a href="http://www.dragonsofmugloar.com" target="_blank">www.dragonsofmugloar.com</a>.
<br>
P.S.S. Deployed app can be seen here: <a href="https://mugloar.firebaseapp.com" target="_blank">https://mugloar.firebaseapp.com</a>
<br>
<br>

<div style="padding: 20px; border: 2px solid #a94442;">
<b style="color: red;">Important:</b> For app to work, this domain <a href="https://www.dragonsofmugloar.com" target="_blank"><em>https://www.dragonsofmugloar.com</em></a> should be added temporarily to the trusted sites in the browser.</b>
</div>

## Technicalities
<ul>
<li>
This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.22-1.
</li>
<li>
Exploits Angular2' 'in-memory DB' as a backend storage, which is sufficient for demo purposes.
</li>
<li>
Deliberately stripped of testing packages.
</li>
<li>
Targeted to modern browsers as a SPA in a desktop environment omitting viewform responsiveness for brevity and time constraints.
</li>
<li>
Stylus is a CSS preprocessor of choice, because it's great and saves time (less monkey jobs).
</li>
<li>
XML to JSON processing library, unlike all the rest, is a non-NPM and therefore its usage stands out.
</li>
<li>
There is some notable stuff going on with XML to JSON conversion, also heavy use of promises (sequential & parallel) and observables.
</li>
<li>
Spiced-up with animations for flavor.
</li>
</ul>

## TODOs or bits I would like to improve in the future
<ul>
<li>Switch xml2json library from non-NPM to NPM instead.</li>
<li>Add test coverage using Karma library.</li>
<li>Implement mask delay on component using 3rd party fonts due FOIT issues.</li>
<li>Add responsiveness based on viewform scaling, etc..</li>
<li>Animation optimizations on component initialization.</li>
<li>Resolve file saving issue on MS Edge browser.</li>
</ul>


### Build locally 
#### Development server
Run `ng serve` for a local dev server.
Navigate to `http://localhost:4200/`.
The app will automatically reload if you change any of the source files.

#### Code scaffolding
Run `ng generate component component-name` to generate a new component.
You can also use `ng generate directive/pipe/service/class`.

#### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `--prod --aot` flag for a production build with ahead-of-time precompile.

#### Deploying to Firebase hosting server
Build the app first, then run `firebase deploy`.

Initialize and associate the Firebase account if needed with `firebase login` and `firebase init`.
<br>
To test the deployed app on the Firebase host, run `firebase open` right from the console.
<br>
Make sure plugin is readily available if not, then run `npm install -g firebase-tools`.


#### Deploying to Github Pages
Run `ng github-pages:deploy` to deploy to Github Pages.

#### Further help
To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
