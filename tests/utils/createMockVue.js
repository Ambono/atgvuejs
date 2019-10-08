// Dependencies
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from "@vue/test-utils";

import Test from "./Test.vue";

/**
 * Helper function used to create a mock local vue instance
 * @function
 * @param {Array} modules - Any Modules to be bound to the VUEX state.
 * @returns {Object} - The created local view instance
 * @example 
 * // Create a mock vue instance with the calendar store
 * const vm = createMockView([calendarStore]);
 */
export const createMockView = (modules) => {
    // Create a new local vue
    const localVue = createLocalVue()

    // Set vue to use Vuex
    localVue.use(Vuex);

    // Create a new store
    const store = new Vuex.Store({
        modules
    });

    // Mount the test component
    const wrapper = shallowMount(Test, {store, localVue});
    
    // Declare the Vue instance
    const vm = wrapper.vm;

    // Return the vue instance
    return vm;
};