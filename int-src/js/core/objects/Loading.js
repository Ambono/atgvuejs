/* Dependancies */ 
import anime from "animejs";
import { createLoader } from "../helpers/loading/loading";
import  i18n  from '../../i18n-setup'; 
/**
 * Constructor for creating a loading instance
 * @constructor
 * @param {HTMLElement} container - The container the loading element will be placed within.
 * @param {Object} options - The data provided for the loading element.
 * @param {String} options.title - The title to be displayed within the loader.
 * @param {String} options.icon - The name of the icon to be used within the loader.
 * 
 * @property {HTMLElement} container - The container passed into the instance.
 * @property {Object} options - The formed options object that is used to provide failsafe data.
 * @property {String} options.title - The title to be displayed within the loader.
 * @property {String} options.icon - The name of the icon to be used within the loader. 
 * @property {HTMLElement} loadingElement - The loading element that is created.
 * 
 * @example
 * // Create a new loader 
 * var errormsg= i18n.t('object.loading.title');
 * const loader = new Loading(this.$el.parentNode, {
 *     title: errormsg,
 *     icon: "calendar"
 * });

 * // Insert the loader 
 * loader.insert();
 * 
 * // Remove the loader after 2s
 * setTimeout(() => loader.remove(), 2000);
 */
export const Loading = function(container, options) {
    // Cache instance
    const loading = this;

    // Set properties
    loading.container = container;
    loading.options = {
        title: (options.title) ? options.title : this.$t('core.objects.loading.title'),
        icon: (options.icon) ? options.icon : "calendar"
    };

    // Initate the loader
    loading.init();
};

/**
 * Initiate loading instance.
 * @memberof Loading
 */
Loading.prototype.init = function() {
    // Cache instance
    const loading = this;

    // Create the loader
    loading.loadingElement = createLoader(loading.options);
};

/**
 * Insert Loader into the container element.
 * @memberof Loading
 */
Loading.prototype.insert = function() {
    // Cache instance
    const loading = this;

    // Add the element to the DOM
    loading.container.appendChild(loading.loadingElement);
    
    // Animate the element into view
    const animateIn = anime({
        targets: loading.loadingElement,
        delay: 100,
        duration: 300,
        opacity: 1,
        easing: "linear"
    });
};

/**
 * Remove Loader from the container element.
 * @memberof Loading
 */
Loading.prototype.remove = function() {
    // Cache instance
    const loading = this;

    // Animate the element out then once complete remove
    const animateIn = anime({
        targets: loading.loadingElement,
        delay: 100,
        duration: 300,
        opacity: 0,
        easing: "linear",
        complete: () => {
            // Remove the element
            loading.container.removeChild(loading.loadingElement);
        }
    });
};