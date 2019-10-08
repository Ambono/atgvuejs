/* Dependencies */ 
import apiEventBus from "../../services/apiEventBus";
import serviceBus from "../../services/serviceBus";

/**
 * Basket Store
 * State, Getters, Mutaitions, Actions associated with the basket.
 * @ignore
 */


/**
 * Define initial state (this allows state to be reset).
 * @private
 * @function
 */
const getDefaultState = () => {
    return {
        offeredSeatGroups: null,
        calendarData: null,
        extras: null,
        seatData: null,
    }
};

/**
 * State
 * @property {Object} basket - The users basket object.
 * @property {Array} basket.extras - The Additional items added during the checkout process.
 */
const state = getDefaultState;

/**
 * Getters
 * @function getBasketExtras - Returns the extras stored in the basket.
 */
const getters = {

    getOfferedSeatsCache(state) {
        return state.offeredSeatGroups;
    },

    /**
     * Function used to retrieve the calendar data from state.
     * @function
     * @param {Object} state - The current state object.
     * @returns {Object} - The formatted calendar data.
     */
    getCalendarData(state) {
        // Return the calendar data
        return state.calendarData;
    },

    /**
     * Function used to retrieve the calendar cache timestamp
     * @function
     * @param {Object} state - The current state object.
     * @returns {Date} - Returns the timestamp.
     */
    getCalendarCache(state) {
        // Check if the calenderData exists
        if(!state.calendarData) {
            // Return undefined
            return undefined;
        }

        // Return the cache timestamp
        return state.calendarData.timestamp;
    },

    getExtras(state) {
        return state.extras;
    },

    getActiveExtras(state) {
        return (state.extras) ? state.extras.filter((currentItem) => currentItem.quantity > 0) : undefined;
    },

    getSeatData(state) {
        return state.seatData;
    },
};

/**
 * Mutations
 * @function updateBasketExtras - Update's the basket extras items.
 */
const mutations = {
    removeOfferedSeatsCache(state) {
        state.offeredSeatGroups = null;
    },

    setOfferedSeatsCache(state, seatGroups) {
        state.offeredSeatGroups = seatGroups;
    },

    removeAllCachedData(state) {
        Object.assign(state, getDefaultState());
    },

    /**
     * Mutation used to update the calendars state.
     * @function
     * @param {Object} state - The current state object. 
     * @param {Object} data - The data object contianing the calendar data.
     */
    setCalenderData(state, data) {
        state.calendarData =  data;
    },

    /**
     * Mutation used to remove the calendar cache.
     * @function
     * @param {Object} state - The current state object. 
     */
    removeCalendarCache(state) {
        // Void the cache
        state.calendarData = null;
    },

    setExtras(state, items) {
        state.extras = items;
    },

    updateExtra(state, {item, quantity}) {
        const target = state.extras.filter((currentItem) => currentItem.id === item.id);
        if(target) {
            target[0].quantity = quantity;
        }
    },

    removeExtras(state) {
        state.extras = null;
    },

    resetExtrasState(state) {
        Object.assign(state, getDefaultState());
    },

    setSeatData(state, seatData) {
        state.seatData = seatData;
    },

    clearSeatData(state) {
        state.seatData = null;
    }
};

/* Exports */ 
export default {
    state, 
    getters,
    mutations
};