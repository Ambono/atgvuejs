/* Dependencies */
import Vue from "vue";
import Vuex from "vuex";

/* Modules */
import app from "./modules/app";
import session from "./modules/session";
import user from "./modules/user";
import steps from "./modules/steps";
import basket from "./modules/basket";
import checkout from "./modules/checkout";
import seats from "./modules/seats";
import cache from "./modules/cache";


/**
 * Application Store
 * State, Getters, Mutaitions, Actions & Modules associated with Vuex store.
 * @ignore
 */

// Tell vue to use Vuex
Vue.use(Vuex);



// Create new vue store
const store = new Vuex.Store({
    data() {
        return {
            preventCache: false
        }
    },

    /**
     * Mutations
     * @function initialiseStore - Used to initialise the store from local storage.
     */
    mutations: {

        setStore(state, storeObj) {
            // Replace the state object with the stored item
            this.replaceState(
                Object.assign(state, JSON.parse(storeObj))
            );
        }
    },
    /**
     * Actions
     */
    actions: {
        /**
         * Mutation used to initialise the state from local storage.
         * @function
         * @param {Object} state - The Vuex state.
         */
        initialiseStore({commit}) {
			// Check if the ID exists
			if(sessionStorage.getItem('store')) {
                commit("setStore", sessionStorage.getItem('store'))
			}
        },
        
        resetState({commit, state}, callback) {
            // Remove the stored local storage
            sessionStorage.removeItem("store");
            
            // Disable local storage caching
            state.preventCache = true;

            // Clear each modules sates
            commit("resetAppState");
            commit("resetSessionState");
            commit("resetUserState");
            commit("resetStepsState");
            commit("resetBasketState");
            commit("resetCheckoutState");
            commit("resetSeatState");
            commit("removeAllCachedData");
            
             // Enable local storage caching
             state.preventCache = false;
        }
    },

    /**
     * Modules
     * @ignore
     * @property {Object} session - The session module.
     * @property {Object} user - The user module.
     * @property {Object} steps - The steps module.
     * @property {Object} calendar - The calendar module.
     * @property {Object} basket - The basket module.
     * @property {Object} extras - The extras module.
     * @property {object} checkout - The Checkout module.
     * @property {Object} app - The app module.
     */
    modules: {
        session,
        cache,
        user,
        steps,
        seats,
        basket,
        checkout,
        app
    }
});

/**
 * Method call to bind an observer to watch for state change.
 * @function
 * @param {Function} mutation - The mutation object.
 * @param {Object} state - The Vuex state.
 */
store.subscribe((mutation, state) => {
    // Check the mutation is for updated state
    if(!state.preventCache) {
        // Store the state in local storage
        sessionStorage.setItem('store', JSON.stringify(state));
    }
});

/* Export */
export default store;