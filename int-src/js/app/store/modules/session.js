/* Dependencies */ 
import apiEventBus  from "../../services/apiEventBus";
import { checkCache } from "../../../core/helpers/checkCache";
import moment from "moment";
/**
 * App JS State Management
 * Stores:
 * - Session
 * - Save State
 * - Load State
 * - Check State
 */

/**
 * Session Store
 * State, Getters, Mutaitions, Actions associated with the users session.
 * @ignore
 */

/**
 * Define initial state (this allows state to be reset).
 * @private
 * @function
 */
const getDefaultState = () => {
    return {
        userSession: null
    }
};


/**
 * State
 * @property {Object}  userSession - The session data.
 */
const state = getDefaultState;

/**
 * Getters
 */
const getters = {
    getSessionStatus(state) {
        return (state.userSession) ?  state.userSession : undefined;
    },
    getSession(state) {
        return state.userSession;
    }
};


/**
 * Mutations
 * @function updateSession - Used to update the session in state.
 */
const mutations = {
    /**
     * Mutation used to update the stores session state.
     * @function
     * @param {Object} state - The Vuex state.
     * @param {Object} sessionObj - The session data.
     */
    updateSession(state, sessionObj) {
        // Set the session data in state
         state.userSession = sessionObj;
    },

    resetSesssionTime(state) {
        state.userSession.timeStamp = moment().format();
    },

    resetSessionState(state) {
        Object.assign(state, getDefaultState());
    }
};


/* Export */ 
export default {
    state,
    getters,
    mutations
};