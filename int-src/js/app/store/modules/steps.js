/**
 * Steps Store
 * State, Getters, Mutaitions, Actions associated with the application steps.
 * @ignore
 */

 /**
 * Define initial state (this allows state to be reset).
 * @private
 * @function
 */
const getDefaultState = () => {
    return {
        activeStep: null,
        previousStep: null
    }
};

/**
 * State
 * @property {String} activeStep - The active step name.
 */
const state = getDefaultState;


/**
 * Getters
 * @function getTicketAmountData - Returns the ticket amount data.
 * @function getActiveStep - Returns the active step.
 */
const getters = {

    /**
     * Getter used to return the active step.
     * @function
     * @param {Object} state - The Vuex state.
     */
    getActiveStep(state) {
        return state.activeStep;
    }
};

/**
 * Mutations
 * @function updateStep - used to update the active step within state.
 * @function setActiveAmount - Used to set the active ticket amount.
 */
const mutations = {
    /**
     * Mutation used to update the active step in state
     * @function
     * @param {Object} state - The Vuex state.
     * @param {String} stepName - The Step to be set as active.
     */
    updateStep(state, stepName) {
        state.activeStep = stepName;
    },

    resetStepsState(state) {
        Object.assign(state, getDefaultState());
    }
};

/**
 * Actions
 * @function setCurrentStep - Used to set the current active step.
 */
const actions = {
    /**
     * Action used to set the current active step.
     * @function
     * @param {Function} commit - The Vuex commit function.
     * @param {String} stepName - The step name.
     */
    setCurrentStep({commit, dispatch}, stepName) {
        // Update the active step
        commit("updateStep", stepName);
    }
};

/* Export */
export default {
    state,
    getters,
    mutations,
    actions
};