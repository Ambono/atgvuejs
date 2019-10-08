import apiEventBus from "../../services/apiEventBus";
import serviceBus from "../../services/serviceBus";

/**
 * Checkout Store
 * State, Getters, Mutaitions, Actions associated with the checkout.
 * @ignore
 */

 /**
 * Define initial state (this allows state to be reset).
 * @private
 * @function
 */
const getDefaultState = () => {
    return {
        formData: {
            paymentMethod: "creditDebit",
            details: {
                firstName: "",
                lastName: "",
                phoneNumber: "",
                emailAddress: ""
            },
            billing: {
                addressLine1: "",
                addressLine2: "",
                townCity: "",
                county: "", 
                postcode: "",
                postcode: "",
                country: ""
            },
            delivery: {
                addressLine1: "",
                addressLine2: "",
                townCity: "",
                county: "", 
                postcode: "",
                country: ""
            },
            ticketInsurance: "",
            cardDetails: {
                cardName: "",
                cardNumber: "",
                securityCode: "",
                edMonth: "",
                edYear: ""
            }
        },
        gdpr: [],
        deliveryMethods: [],
        formError: null,
        checkOutComplete: false
    }
};

/**
 * State
 * @property {Object} fromData - The data collected by the form.
 * @property {String} formError - Any API Error messages to pass to the front end.
 */
const state = getDefaultState();

/**
 * Getters
 * @function getCheckoutFormData - Returns the form data from state.
 * @function getCheckoutFormError - Returns the form error from state.
 */
const getters = {

    /**
     * Getter used to return the form data from state.
     * @function
     * @param {Object} state - The Vuex state.
     */
    getCheckoutFormData(state) {
        return state.formData;
    },

    getDeliveryAddress(state) {
        return state.formData.delivery;
    },

    /**
     * Getter used to return the form error from state.
     * @function
     * @param {Object} state - The Vuex state.
     */
    getCheckoutFormError(state) {
        return state.formError;
    },

    getCheckoutCompleteStatus(state) {
        return state.checkOutComplete;
    },

    getCheckoutGDPR(state) {
        return state.gdpr;
    },

    getCheckoutDeliveryMethods(state) {
        return state.deliveryMethods;
    }

};

/**
 * Mutations
 * @function setCheckoutFormData - Modifies the form data within state.
 * @function setCheckoutFormError - Modifies the form error within state.
 */
const mutations = {
    /**
     * Mutation used to update the form data within state.
     * @function
     * @param {Object} state - The Vuex state.
     * @param {Object} data - The submitted form Data.
     */
    setCheckoutFormData(state, data) {
        state.formData = data;
    },

    /**
     * Mutation used to update the form error within state.
     * @param {Object} state - The Vuex state.
     * @param {String} message - The message to be set.
     */
    setCheckoutFormError(state, message) {
        state.formError = message;
    },

    setCheckoutSuccess(state) {
        state.checkOutComplete = true;
    },

    setCheckoutGDPR(state, questions) {
        state.gdpr = questions;
    },

    setDeliveryMethods(state, methods) {
        state.deliveryMethods = methods;
    },

    setDeliveryAddress(state, data) {
        state.formData.delivery = data;
    },

    resetCheckoutState(state) {
        Object.assign(state, getDefaultState());
    }
};

/* Exports */ 
export default {
    state, 
    getters,
    mutations
}