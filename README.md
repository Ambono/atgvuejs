# Best Union

SPA App written in vue for the best union ticket pathway. (Enta)

More in depth docs coming in future sprints.

Steps to get running:

* Clone Repo
* Yarn install
* run development: Yarn dev
* Open http://localhost:3000

# Frontend Documentation

## Overview
This is the front end documentation for the Viva Ticket ticketing pathway. The following document will cover the full front end structure and the technologies used within the project.

Links will be provided for relevant resources to learn the tools being used in the project. For information relevant to code please look within the code files as each part of the functionality will be documented with Javascript Docs 3 style comments that will provide an overview for each object.

The below document is subject to change throughout the lifecycle of the project so please ensure to be viewing the latest version when using the docs with the project.

## Technology Breakdown
This section will cover the technologies and frameworks being used within the project and will provide an overview on how the chosen technology is being used within the app. Links will be provided where relevant to resources that will help when learning / using the technology during development.

### Build Tools
The solution uses a set of custom defined build tools that are aimed at applying industry best standards when handling the compilation of our assets. The tools come with different scripts which will affect the way the assets are compiled into the distribution folder.

#### Tools
We have defined our build tools using industry standards and the following frameworks:

Name
Overview
Docs
Gulp 4
A Task runner working on node streams.
https://github.com/gulpjs/gulp/tree/4.0 
Webpack 4
A Module bundler used to compile our scripts.
https://webpack.js.org/ 
Babel
A Compiler for turning ES6 and stage 2 JS into es2015 code.
https://babeljs.io/ 
Browsersync
Synchronised browser testing. Allows us to live reload changes and control multiple instances when testing.
https://browsersync.io/ 

#### Scripts
(dev) Development - This will compile the assets with development in mind, the tools will set up a development server and allow automatic refresh when updating assets. This part of the build process is designed to speed up development and provide the relevant debug information where required.

(prod) Production - This will compile the assets with production settings in mind. This will ensure the assets are minified & optimised ready for use by the end user. We use this task as part of the build process on the server to ensure the end user will only receive the best optimised version of our code.

(test) Test - This will run the defined tests within a karma instance, When the tests run chrome will open and act as a DOM playground for the tests allowing for some integration tests to be completed as well as Unit Tests. This task will also run an instance of the dev server and watch for changes within the test files allowing for the developer to compile and run tests in an efficient manner.

(cypress) Cypress - This will run the E2E tests and will open the third party plugin within a chrome instance and will allow the developer to run the desired tests.

(docs) Documentation - This will run the tasks to compile and render the documentation relevant to the solution. This will open up on a different port than the dev server to allow for both to be run at the same time.

#### Task Overview
This section will provide an overview of the tasks defined within the build tools and what the desired purpose of each task is to accomplish.

Docs - This Task will run the desired commands to compile and render the documentation to the user. This uses the documentation approach outlined later in this doc.

Dev - This task will run the desired commands to compile and render the solutions assets in a way that is optimised for development. The following sub tasks will be used:
Assemble - This is used to compile the handlebars templates into HTML.
Clean - This is used to wipe the distribution folder to ensure the assets rendered are always the latest.

Favicons - This is used to render the relevant favicons for the project. This task will generate multiple size favicon files to allow the live product to be represented well across devices. 

Fonts - This is used to copy the fonts from source to distribution.

Imagemin - This is used to minimise the image assets within source and copy the new optimised assets to the distribution folder.

Sass - This is used to compile the SCSS code used for styling within the project.

Server - This is used to provide the developer a mock server to render the app. This will also handle live asset reload.

Sprite Sheet - This will compile all the source SVG icons into a single optimised sprite sheet for use within the build.

Videos - This is used to copy any video assets from the source into the distribution.

Watch - This is used to watch for file modification and allow the relevant tasks to be rerun and the updated assets to be auto loaded into the browser session.

Prod - This will run all the tasks used within development with the production parameter being passed into the each task and ensuring the rendered asset will be compiled with uglify, minimise and optimise settings where relevant.

For more information on what each task does please check the task js file as there has been sufficient comments provided, or check the package JSON and use the npm repository website to find the relevant documentation.

### Documentation
The project has been documented throughout the Javascript using JS Docs 3 Style comments which should allow for the build tools to auto generate documentation that can be viewed and referenced within the browser.


#### Technology Used
JS Docs 3
Documentation
http://usejsdoc.org/ 
Introduction.md
int-src/doc/jsdocs/introduction.md

These docs will be present within each relevant section of code, Non relevant or private sections of code will be documented with the @private property that will ensure it will not be loaded within the browser generated documentation, This is to ensure the documentation is only relating to the relevant & reusable code.

The documentation will render in browser and display a default page detailing information around the project. This can be edited within the relevant markdown file listed in the table above.

#### Fonts
There is a section within the source folder for fonts to be placed. These will be copied into the distribution folder by the build tools and should be stored in the following structure:

Int-src
Fonts
Font Name
Files

By using this structure we enable the ability for more fonts to be added to the solution in the future in a easy to maintain manner.


#### HTML
The HTML generation for the app has been implemented using handlebars which is a template framework based on the moustache render engine. This is a fairly familiar and quick to learn syntax that will allow for all the HTML code to be split into partials and used without our templates.


Technology Used
Handlebars
Documentation
https://handlebarsjs.com/ 

The following structure has been applied to the solution to allow the templates to be defined in a robust manner.

Layouts - This directory is used to contain the layout specific markup for our project. This allows for multiple layouts to be used throughout the development lifecycle and can be used to provide partial only rendering if desired. The structure of this directory should be a single level when simple layouts are defined but grouping should be used to ensure a good organisation of the solution.

Pages - This directory is used to contain the page specific markup for the app. Each page should reference the desired layout and pass a page title. The pages defined within this directory should contain mainly handlebar includes to partials defined within the partials directory.

Partials - This directory is used to contain the components (partials) that make up the page templates. This allows us to re-use markup across the solution and pass the desired content in using variables. The structure for this directory is each partial should be located within a directory matching the partial name, like so:

Component Name
Component File

This summarises the project approach to HTML, we use handlebars to speed up the development of sites and to ensure when making changes its a single point of entry for the markup to be changed.

#### Images
The images stored within the solution can be used for various purposes. By default any files placed within the images directory will be copied to the distribution, With the exceptions of Sprites & Favicons which will be copied by there relevant build tasks. We should ensure that the images folder is kept well organised to ensure that any developer can find the asset they require. This can be achieved by grouping the image assets into a directory relevant to there use or position on the page. 

The sprites folder is where any SVG icons should be placed. On compile all the icons within this folder will be merged together and compiled into a single sprite sheet which can be referenced within the build in the following manner:

<svg xmlns="http://www.w3.org/2000/svg">

        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#{Name Of Icon}"></use>


</svg>

This allows for the build to load a single asset on load opposed to multiple individual icon assets. For more information on what we are achieving here, please check out the optimization part of this document. 

### Javascript
This section will cover the javascript used within the solution. We have a strong preference towards using core javascript and utilising cutting edge javascript features with an aim for 0 dependencies within our modules, this ensures the code we ship to the end user will be optimized and free from clutter. If a dependency is required to complete the module it will be installed using NPM and will be version locked to ensure no issue occurs from the package being updated automatically.

#### Frameworks
Below is an overview of the frameworks being used within the solution:

Name
Overview
Docs
Siema
This is a lightweight open source carousel that is 0 dependency written in core js.
https://github.com/pawelgrzybek/siema 
Core JS
This is an open source library full of polyfills for the latest javascript features within es6 & 8.
https://github.com/zloirock/core-js
Axios
This is a lightweight open source HTTP client based on the es6 Promise features.
https://github.com/axios/axios 
Anime Js
This is a lightweight open source javascript animation library.
https://github.com/juliangarnier/anime 
Hammer Js
This is a lightweight open source javascript library for handling gesture based events.
https://hammerjs.github.io/getting-started/ 
JS Cookie
This is a lightweight open source javascript library for handling cookie manipulation within the browser.
https://github.com/js-cookie/js-cookie 
SVG4Everybody
This is an open source library used to ensure consistent SVG rendering across browsers.
https://github.com/jonathantneal/svg4everybody 
Vue.js, Vue Router, Vuex
Vue a versatile, performant and lightweight javascript framework which we use to easily implement js templates and partials.

Vue Router - is a wrapper added to the vue instance to provide routing capabilities to the solution.

Vuex - is a wrapper added to the vue instance to implement simple and robust state management.
https://github.com/vuejs/vue 

https://github.com/vuejs/vue-router 

https://github.com/vuejs/vuex 


#### Structure
Below is an overview of the structure used within the solution for handling the mixture of vue js and core js objects.

##### App
Components - This is the directory that contains all the Vue JS components. Components allow us to create modular chunks of code that can be passed props and handle the relevant methods without a dependency on the view it is used within. Each component should have a directory and file name specified within the root and shared components should follow the sam structure but should be added within the Shared folder. 

Components
ExampleComponent
ExampleComponent.vue
Shared
Header
Header.vue

Routes - This is the directory that contains the routes that will be used within the project. These will be contained within routes.js but can be separated into separate files if the routing becomes advanced within the application.

Store - The store is used to contain all the files relevant to the state management within Vuex. This is organised in a way to ensure that the app can be maintained and expanded upon easily in the future. The structure includes:

Modules - This si the directory that contains each vuex module. Modules are used here to ensure that the Actions, Mutations & Getters relevant to that module are presented in a single file and that each module is self contained.

Store.js - This file is used to initiate the store and attach the defined modules.

Axios.js - This file is used to initiate the axios instance and allow us to bind additional headers in a self contained scope. This allows the app to use the same settings for the HTTP client across the project.

Views - This is the directory that contains the views relevant to the app. We split views up into a seperate directory to enable us to easily manage and reference the views within the app js. This also allows us to keep a well organised structure that modular and easy to maintain.

App.vue - This is the main file for the App, this file sets up the Vue instance and creates the relevant base functionality that will be used throughout the app / widget.

##### Config
This is the main configuration file for the project, Here we store options that will be used throughout the app. Config properties should be used when a part of the app could be changed for re-use, such as currency, name, timeout values etc.

##### Core
The core directory is used to contain all the non-app specific logic. This will contain any javascript objects and helpers that will be used within the implementation of a js feature. We us this folder to allow us to create modular Object Oriented Javascript that can be used as “plug and play” modules within the Vue app. Below is the structure of the core folder and what each part is used for:

Base - This is the directory that contains all the functionality that is used to extend existing DOM Objects. For example this allows us to add prototypes to the HTMLElement object to add useful functions such as addClass & removeClass.

Helpers - This is the directory that contains all the helper functions defined for use within the solution. A helper function is a piece of modular code that can be used in multiple places to solve a problem. We also store animations here as animations should be available for use on any instance and should be overridable on a component basis.

Implementation - This is the directory that contains all the implementation functions used within the solution. We use implementation functions to allow us to keep the Vue.js components clutter free and so the code can be modular and used throughout different views. An implementation function should be used to form an instance of an object.

Objects - This is the directory that contains all the constructor functions used within the solution. Each constructor is well documented and is used to create a scoped instance of functionality to an element or module. By using this approach we can initiate multiple instances on the page without the worry for functionality clashing.

Main.js - This is the single point of entry for the solution. In this file we import all our modules that should fire on document ready state. This is also used to define any global logic that is to used outwidth our Vue App.

Polyfill.js - This file is used to include any polyfills that are required for the solution. A polyfill is a function used to simulate a javascript feature in browser that are legacy or don't support the latest features. By using a polyfill we bring the latest javascript functionality to the legacy browsers and ensure a consistent experience.

#### Mock Data
This directory contains all the mock json files used to simulate what will be returned from the endpoint and allow for local development without the dependency for a live endpoint.

#### SCSS
We use Sass for our styling within the solution and implement the SCSS version with the aim to create a well organised, modular and easy to maintain style structure for the project.

##### Frameworks
We use the following frameworks to optimise our SCSS workflow:

Name
Overview
Documentation
Normalise
This framework makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.
https://necolas.github.io/normalize.css/ 
Sass MQ
This is a sass mixin that helps us compose media queries in a elegant manner.
https://github.com/sass-mq/sass-mq 
BEM
Block, Element, Modifier is a industry standard naming convention for HTML class names.
http://getbem.com/introduction/ 

##### Main structure of files
The below is the structure for all scss files used within the solution. We split the code into separate blocks and document the specified approach. All component are built to BEM standard and the following layout is designed for use with BEM:

Overview - All files should first contain a overview comment to specify the name of the file and the purpose of the styles. This looks like:

	/**
* Name
* Purpose of the styles or component it is attached to.
*/


Main Styles - This is the section for the main styles to be defined. For specificity we should avoid nesting more than 3 levels deep and should aim to style on the top level of the tag to allow for easy overrides within modifiers and media queries. This should be highlighted with the following CSS comment:
/* Main Styles */

It is also best practice to add similar comments throughout the main styles section to separate the blocks.

Modifiers - This is the sections for any modifiers to be used to extend the base styles. This section should have a main comment and a comment per modifier to provide a name and purpose for the changes. This should look like the following:

/* Modifiers */
/**
* Name
* Purpose of the modifier
*/

Animations - This is the section to define any css animation that should be scoped to the specific component. This should follow a similar comment style as the modifiers section.
	
	/* Animations */
/**
* Name
* Purpose of the Animation
*/

Media Queries - This is the section to define the media queries relevant to the component. These should be defined under the following comment:
	
	/* Media Queries */

By using the above structure we keep the css organised and allos future developers to easily maintain the solution and find the desired code to update.

##### Mixins
Mixins are similar to helper functions within javascript. We use helper functions to solve a problem or create a reusable junk of code. The following base mixins are defined within the solution:


Name
Overview
Line Height
Set Appropriate Line Height Relevant To Calculated Font Size.
Rem
Takes HTML Font Size & Calculates The Appropriate Rem Value.
Set Font
Used to set the base font styles to a tag.

We use mixins to speed up development and ensure that modular code can be re-used throughout the project.
Structure
We use a set structure to organise our sass. This is defined below:

Base - This directory is used to contain the styles that are used to set a base for the components. This is mainly resets and any styles that are set to the HTML or body tags.

Components - This directory is used to contain the component based styles for the project. Each component should have a directory and file matching the name of the element within the HTML. For example this structure could look like:

Components
Example-component
_Example-component.scss

Each component should have styles contained within its file, this ensures that when maintaining th component the code is not split across multiple files and can be edited within 1 place.

Layouts - This directory is used to contain the layout specific styles for the project. This will contain styles relevant to parts of pages or specific to a desired layout within the design. Each layout file should be contained within a directory matching the element name. An example of this is:

Layouts
Booking-app
_booking-app.scss 

This allows the layouts to be easily maintained and separated from the component and base.

Mixins - This directory is used to contain all mixins. Each mixin should be contained within a directory with the same name. This allows mixins to be kept organised. An example of the structure is:

Mixins
Line-height
_Line-height.scss


Variables - This file is used to define all the SASS variables for the solution. The purpose of a variable is to create a single point of reference for a property value. By having a single file that has all the colours and sizes defined in variables will allow the project core to be maintained mostly from a single file allowing a single change to roll out across all components on the site. This means if the project need  an update to the brand colours this can be completed within a matter of minutes compared to hours.

App - This is the single point of entry for the scss within the project. This file is used to control the import order of the components used. This file should only contain imports.
Videos
There is a section within the source folder for fonts to be placed. These will be copied into the distribution folder by the build tools.

#### Tests
For testing within the solution we have opted to use frameworks that are widely used and well maintained. 
##### Frameworks
The following frameworks are being used:

Name
Overview
Documentation
Cypress
This is a fast, easy to use and reliable test runner for End 2 End testing.
https://www.cypress.io/ 
Mocha
Mocha is a feature rich javascript test framework. Its aimed at making testing simple.
https://mochajs.org/ 
Chai
Chai is an assertion library that can be paired with any testing framework.
http://www.chaijs.com/ 
Karma
Karma is an open source test runner. This is used to run our mocha tests in a productive test environment.
https://karma-runner.github.io/2.0/index.html 
Istanbul
Istanbul is a javascript test coverage tool. This aims to show how much of the code has been tested.
https://istanbul.js.org/ 

By using the frameworks above we implement a test environment that can be easily extended to suit the needs of the project.

##### Structure
A structure has been set for the test directory within the solution to ensure that tests are contained within an organised fashion. The structure used for tests is as follows:

Components - This directory contains the relevant tests associated with components. This will include tests for the Store on SPA and Objects within core js. The structure should be set in the following way:

Component Name
Object
Component.test.js

Store
Store.Test.js

Component.test.html

There is a folder containing the types of test being performed, Each type has a test.js file detailing the tests to be run. There is also an optional test.html file which can be referenced within karma to provide the test instance any relevant DOM elements to when testing.


Helpers - This directory contains the relevant tests associated with the helpers used within the solution. If a helper is defined there should be an associated test to confirm that the helper is performing the desired action. This should contain a similar structure to the components as shown below:

Helper Name
Helper.test.js
Helper.test.html

Utils - This directory contains the relevant helper functions to be used for testing. Similar to JS helpers, these are used to help the tests complete their desired actions and provide modular solutions to actions required within testing such as providing a test instance or checking for desired attributes.

## Optimization
Industry standard approaches have been taken into account when developing the ap to ensure that the code shipped to the user is optimised for use. The following are areas we have focused on to optimise the solution:

Sprite Sheets - We use sprite sheets for the icons within the solution, This allows all icons to be shipped to the user in a single sprite file. This reduces the amount of HTTP requests the app requires and speeds up the loading time of the app.

Image minification - We minify all images within the solution in the build process. This ensures that the assets deployed to the user are optimised and reduced in file size.

Object Oriented Javascript - All custom modules have been defined as Objects, This allows for the code to be scoped to an instance. This will prevent functionality from interfering with other components and ensures that when the component is loaded onto the page it has no awareness of the components around it. By using Objects we also make the modules easy to maintain and test.

Futuristic Js Features - We have utilised the latest javascript features to ensure that the app is built with the future in mind along with being well supported by mainstream browsers. By using ES6 & ES8 features we can quickly develop modules that are efficient and robust.

Caching Endpoint Data - Where relevant the returned endpoint data has been cached within local storage for a set period of time. This is to ensure that the user can navigate sections of the app with speed, reduce the loading time for sections of the site and reduces the amount of API requests sent from the app to the server. 

Accessibility Approach - We are taking advantage of HTML5 landmark elements and the ARIA specified attributes to ensure that impaired users can navigate the app with ease. When testing we use screen reading software to check that when landing on areas of the app the user is provided with the relevant information to make their journey no different from a user with a mouse.

Version Locking - All third party dependencies listed within the package json are version locked to ensure that the build process will work as expected and not unexpectedly break due to packages updating. This also ensures each developer has the same local environment and will prevent node module specific bugs.
