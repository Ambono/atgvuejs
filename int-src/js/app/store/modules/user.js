/* Dependencies */
import moment from "moment";

/**
 * User Store
 * State, Getters, Mutaitions, Actions associated with the user store.
 * @ignore
 */

 /**
 * Define initial state (this allows state to be reset).
 * @private
 * @function
 */
const getDefaultState = () => {
    return {
        ticketChoice: null,
        dateSelected: null
    }
};

/**
 * State
 * @property {Object} user - The user object.
 * @property {Object} user.ticketChoice - The chosen ticket amount item.
 * @property {Date} user.dateSelected - The chosen date for the show.
 */
const state = getDefaultState;

/**
 * Getters
 * @function getTicketAmount - Returns the number of tickets chosen.
 * @function getChosenDate - Returns the chosen date.
 */
const getters = {
    /**
     * Getter used to return the number of tickets chosen.
     * @function
     * @param {Object} state - The Vuex state.
     * @returns {Number} - The number of tickets chosen or undefined.
     */
    getTicketAmount(state) {
        // Return the chosen number
        return state.ticketChoice;
    },

    /**
     * Getter used to retrieve the date chosen by the user.
     * @function
     * @param {Object} state - The current state object.
     * @returns {String} - The formatted date (Saturday 16th September 2017 - 19:30pm).
     */
    getChosenDate(state) {
        
        // Check if there is a chosen item
        if(!state.dateSelected) {
            return undefined;        
        }
        
        // Retrive the date object
        const date = state.dateSelected.datetime;
        
        // Format the date (Saturday 16th September 2017 - 19:30pm)
        const formattedDate = moment(date).format("dddd Do MMMM YYYY - kk:mma"); 
        const shortDate = moment(date).format("DD/MM/YYYY - kk:mma");

        // Return the formatted date
        return { long: formattedDate, short: shortDate };
    },

    getChosenPerformanceID(state) {
        
        if(!state.dateSelected) {
            return undefined;        
        }

        return state.dateSelected.id;
    }
};

/**
 * Mutations
 * @function setNumberOfTickets - Sets the chosen ticket amount within state.
 * @function setChosenDate - Sets the chosen date within state.
 */
const mutations = {
    /**
     * Mutation used to update the state ticket choice.
     * @function
     * @param {Function} state - The Vuex state.
     * @param {Object} ticketObject - The ticket amount to be used.
     */
    setNumberOfTickets(state, ticketObject) {
        state.ticketChoice =  ticketObject;
    },

    /**
     * Mutation used to set the chosen item in state.
     * @function
     * @param {Object} state - The current state object.
     * @param {Object} item - The item that has been selected from the calendar
     */
    setChosenDate(state, item) {
        state.dateSelected = item;
    },

    resetUserState(state) {
        Object.assign(state, getDefaultState());
    }
};

/**
 * Actions
 * @function setTicketAmount - Sets the chosen ticket amounts.
 * @function setSelectedEvent - Sets the selected event from the calendar.
 */
const actions = {
    /**
     * Action used to set the new ticket amount.
     * @function
     * @param {Function} commit - Vuex commit function.
     * @param {Function} dispatch - Vuex dispatch function.      
     * @param {Object} ticketObject - The item to be set as active.
     */
    setTicketAmount({commit, dispatch}, ticket ) {

        // Filter all tickets
        commit("setNumberOfTickets", ticket);

        // Set the new active amount
        commit("setActiveAmount", ticket);
    }
    
};

/* Export */
export default {
    state,
    getters,
    mutations,
    actions
};