/* Dependencies */
import { router } from "../../../main";
import { settings as appSettings } from "../../../config/config";
import apiEventBus from "../../services/apiEventBus";

/**
 * App Store
 * State, Getters, Mutaitions, Actions associated with the basket.
 * @ignore
 * 
 * Stores:
 * - Session
 * - Save State
 * - Load State
 * - Check State
 */

 /**
 * Define initial state (this allows state to be reset).
 * @private
 * @function
 */
const getDefaultState = () => {
    return {
        isFirstLoad: true,
        event: null,
        ticketAmount: {
            items: appSettings.config.ticketAmounts
        },
        showID: appSettings.core.showID,
        layoutID: appSettings.core.layoutID,
        venueID: appSettings.core.venueID
    }
};

 /**
 * State
 * @property {Boolean} isFirstLoad - The status of firstload.
 * @property {Object} event - The Event details. 
 */
const state = getDefaultState;

 /**
 * Getters
 * @function getIsFirstLoad - Returns if its first load of the app.
 * @function getEventData - Returns the event data from state.
 */
const getters = {

    /**
     * Getter used to return if its first load of the app.
     * @function
     * @param {Object} state - the Vuex state.
     * @returns {Boolean} - The status of first load.
     */
    getIsFirstLoad(state) {
        return state.isFirstLoad;
    },
    
    /**
     * Getter used to return the event data from state.
     * @function
     * @param {Object} state - the Vuex state.
     * @returns {Object} - The event data.
     */
    getEventData(state) {
        // Return the event
        return state.event;
    },

    /**
     * Getter used to return the ticket amount data.
     * @function
     * @param {Object} state - The Vuex state.
     */
    getTicketAmountData(state) {
        return state.ticketAmount.items;
    },

    /**
     * Getter used to return the show id.
     * @function
     * @param {Object} state - The Vuex state.
     * @returns {Object} - The Show ID.
     */
    getShowID(state) {
        return state.showID;
    },

    getLayoutID(state) {
        return state.layoutID;
    },

    getVenueID(state) {
        return state.venueID;
    }
};

/**
 * Mutations
 * @function setEventDetails - Store's the event details within state.
 * @function updateFirstLoad - Updates the first load in state.
 */
const mutations = {
    
    /**
     * Mutation used to store the event details within state.
     * @param {Object} state - the Vuex state.
     * @param {Object} data - The event details as a data object.
     * @function 
     */
    setEventDetails(state, data) {
        // Set the event
        state.event = data;
    },

    /**
     * Mutation used to update the first load in state.
     * @param {Object} state - the Vuex state.
     * @function
     */
    updateFirstLoad(state) {
        // Set the first load to false
        state.isFirstLoad = false;
    },

    /**
     * Mutation used to set the active ticket amount.
     * @param {Object} state - The Vuex state.
     * @param {Object} desiredItem - The item to be set as active.
     * @function
     */
    setActiveAmount(state, desiredItem) {
                
        // Loop through all the state ticket amounts
        state.ticketAmount.items.forEach((currentItem) => {
            // Check if current item is selected
            if(currentItem.selected) {
                // Remove
                currentItem.selected = undefined;
            }

            // If the item is the desired item
            if(currentItem == desiredItem) {
                // Set the item as selected
                currentItem.selected = true;
            }
        });
    },

    resetAppState(state) {
        // Clear any selected ticket amounts
        state.ticketAmount.items.forEach((currentItem) =>  {
            if (currentItem.selected) { currentItem.selected = undefined };
        });
    },

    /**
     * Mutation used to set the show ID.
     * @param {Object} state - The Vuex state.
     * @param {int} showID - The id of the show.
     */
    setShowID(state, showID) {
        state.showID = showID;
    },

    /**
     * 
     * @param {any} state
     * @param {any} layoutID
     */
    setLayoutID(state, layoutID) {
        state.layoutID = layoutID;
    },

    /**
     * 
     * @param {any} state
     * @param {any} venueID
     */
    setVenueID(state, venueID) {
        state.venueID = venueID;
    }

};

/* Export */
export default {
    state,
    getters,
    mutations
};