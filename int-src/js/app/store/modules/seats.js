import apiEventBus from "../../services/apiEventBus";
import store from "../store";

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
        seats: [],
        chosenArea: null
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
    getSelectedSeats(state) {
        return state.seats;
    },

    getChosenArea(state) {
        return state.chosenArea;
    }
}

/**
 * Mutations
 * @function updateBasketExtras - Update's the basket extras items.
 */
const mutations = {
    setSeats(state, seats) {
        state.seats = seats;
    },

    setChosenArea(state, area) {
        state.chosenArea = area;
    },
    clearSeats(state) {
        state.seats = [];
    },

    resetSeatState(state) {
        Object.assign(state, getDefaultState());
    }
}

/* Exports */ 
export default {
    state, 
    getters,
    mutations
};