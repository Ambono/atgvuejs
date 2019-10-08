/* Dependencies */ 
import { addExtrasData } from "./addExtras-data.mock";

/**
 * Actions
 * @function fetchExtras - Makes the API call for the extras data.
 * @function formatExtrasData - Fomats the data returned from the API.
 * @function removeExtrasCache - Removes the extra's items.
 */
const actions = {
  /**
   * Replacement for the fetchExtras action to use local mock data.
   * @function
   * @param {Function} dispatch - The Vuex dispatch function.
   */
  fetchExtras({dispatch}) {
      // Format the data
      dispatch("formatExtrasData", addExtrasData.data);
  }
};

/* Exports */
export default {
  actions
};