/* Dependencies */ 
import apiEventBus from "../../services/apiEventBus";
import serviceBus from "../../services/serviceBus";
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
        basket: {
            extras: [],
            seats: [],
            seatGroups: [],
            ticketInsurance: [],
            deliveryMethod: null
        },
        basketTotal: 0,
        timeout: null,
        bookingRef: null,
        checkoutComplete: false 
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

    /**
     * Getter used to fetch the extras within the basket.
     * @function
     * @param {Object} state - The current stores state.
     * @example 
     * // Get the extras
     * const extras = $store.getters.getBasketExtras;
     */
    getBasketExtras(state) {
        // Return the extras
        return state.basket.extras;
    },

    getBasketDeliveryMethod(state) {
        return state.basket.deliveryMethod;
    },

    getBasketTicketInsurance(state) {
        return state.basket.ticketInsurance;
    },

    getBasketSeats(state) {
        return state.basket.seats;
    },

    getBasketSeatsGrouped(state) {
        return state.basket.seatGroups;
    },

    getBasketSeatsNum(state) {
        return state.basket.seats.length;
    },

    getBasketTotal(state) {
        return state.basketTotal;
    },

    getBasketTimeOut(state) {
        return state.timeout;
    },

    getBookingRef(state) {
        return state.bookingRef;
    },

    getOfferedSeatsRowId(state) {
        return state.basket.offeredSeatsRowId;
    },


    getCheckoutStatus(state) {
        return state.checkoutComplete;
    },

    get3dCheckout(state) {
        return state.threeDcheckout;
    }

};

/**
 * Mutations
 * @function updateBasketExtras - Update's the basket extras items.
 */
const mutations = {

    updateBasketTicketInsurance(state, {item, callback}) {
        state.basket.ticketInsurance = [];        
        state.basket.ticketInsurance.push(item);
        callback();
    },

    updateBasketDeliveryMethod(state, {item, callback}) {
        state.basket.deliveryMethod = item;
        callback();
    },

    setDefaultDeliveryMethod(state, {item, callback}) {
        if(!state.basket.deliveryMethod) {
            state.basket.deliveryMethod = item;
        }
        callback();
    },

    resetBasketState(state) {
        // THIS IS CAUSING THE BUG WITH THE TIMER NOT SHOWING
        // TO SIMULATE ACCESS THE TIMER THEN CLEAR THE CACHE AND RE-SET THE TIMER
        Object.assign(state, getDefaultState());
    },


    // Timeout
    basketSetTimeout(state, timeout) {
        state.timeout = timeout;
    },

    basketRemoveTimeout(state) {
        state.timeout = null;
    },


    setBasketSeats(state, seats) {
        state.basket.seats = seats;
    },

    setBasketSeatGroups(state, seatGroups) {
        state.basket.seatGroups = seatGroups;
    },

    setBasketExtras(state, extras) {
        state.basket.extras = extras;
    },

    basketRemoveSeats(state, seats) {
        seats.forEach((currentSeat) => {
            state.basket.seats = state.basket.seats.filter((item) => item !== currentSeat);
        });
    },

    basketWipeSeats(state) {
        state.basket.seats = [];
        store.commit("removeOfferedSeatsCache");
    },

    setBasketTotal(state, total) {
        state.basketTotal = total;
    },
    
    basketSetBookingRef(state, bookingRef) {
        state.bookingRef = bookingRef;
    },

    setCheckoutStatus(state, value ) {
        state.checkoutComplete = value;
    },

    set3dCheckout(state, value ) {
        state.threeDcheckout = value;
    }


};

/* Exports */ 
export default {
    state, 
    getters,
    mutations
};