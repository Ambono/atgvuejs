/**
 * Name: Core -> Base
 * Description: Entensions to core objects
 */
import "./core/base/HTMLElement";

/**
 * Name: Frameworks
 * Description: Third Party Dependencies
 */
import Vue from "vue";
import VueRouter from "vue-router";
import VueAnalytics from 'vue-analytics';
import App from "./app/App.vue";
import { settings as appSettings } from "./config/config";
import vuetifycss from 'vuetify/dist/vuetify.min.css';
import vuetify from 'vuetify';
import CryptoJS from "crypto-js";






/**
 * Name: Implementation
 * Description: Functions to be run on dom ready
 */
import svg4everybody from "svg4everybody"; 
import { initCookieWarning } from "./core/implementation/cookieWarning/cookieWarning";
import { testModal } from "./core/implementation/modal";

 // Add Content loaded event listener
 document.addEventListener("DOMContentLoaded", (event) => {
    // SVG 4 Eevrybody
    svg4everybody();

    // Cookie Warning
    initCookieWarning();

    // Test Modal
    testModal();

    // Execute the functions
    console.log("DOM has fully loaded");
 });


/**
 * Name: Settings
 * Description: Settings for the app
 */
import { createRouter } from "./app/router/router";
import serviceBus from "./app/services/serviceBus";
import store from './app/store/store';


/**
 * Sentry
 * 
 */
import * as Sentry from '@sentry/browser';

Sentry.init({  
   /* dsn: 'https://c72a61eac29a48d1956e55c1b98f38e3@sentry.io/1354182',
    dsn: appSettings.sentry.dsn,
    release: appSettings.sentry.release,
    environment: appSettings.sentry.environment,
    maxBreadcrumbs: appSettings.sentry.maxBreadcrumbs,
    debug: appSettings.sentry.debug  */  
});


// Router
Vue.use(VueRouter);


// Install Vue extensions
Vue.use(vuetify);
Vue.use(vuetifycss);
Vue.use(CryptoJS);



export const router = createRouter();
//export default new vuetify({ })

/**
 * Validation
 * Used to validate data within state.
 */
import Vuelidate from 'vuelidate'
import { isBuffer } from "util";

// Tell vue to use vuelidate
Vue.use(Vuelidate)

// Tell vue to use Google Analytics
Vue.use(VueAnalytics, {
  id: appSettings.core.gaClients,
  router
})

// Internationalisation
import i18n from "./i18n-setup.js";
//import FlagIcon from 'vue-flag-icon';

//Vue.use(FlagIcon);
//Vue.config.productionTip = false;
/**
 * Name: App Initialisation
 * Description: The setup for the core App
 */
// Create the app
const app = new Vue({
    el: "#app",
    router: router,
    store: store,
    i18n,
    //vuetify: new vuetify(),
    render: h => h(App)
});