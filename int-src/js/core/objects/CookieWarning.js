/* Dependencies */
import Cookies from "js-cookie";

/**
 * Constructor for creating a cookie warning instance
 * @constructor
 * @param {HTMLElement} element - The container element for the cookie warning.
 * @param {Object} options - Additional options for the instance.
 * @param {Function} options.animateIn - The function to be used for animating in the element.
 * @param {Function} options.animateOut - The function to be used for animating out the element.
 * 
 * @property {Object} elements - Dom elements to be associated with the instance.
 * @property {HTMLElement} elements.container - The Cookie warning contianer.
 * @property {HTMLElement} elements.acceptBtn - The Cookie warning accept button.
 * @property {Boolean} elements.isAllowed - Tracks the status of cookie acceptance.
 * @property {Function} animateIn - Function used to animate the element in.
 * @property {Function} animateOut - Function used to animate the element out.
 * 
 * @example
 * // Lookup the cookie warning
 * const cookieWarningElement = document.querySelector("[data-cookie-warning]");
 *
 * // If the warning exists
 * if(cookieWarningElement) {
 *     // Create a new cookie warning instance
 *     const cookieWarning = new CookieWarning(cookieWarningElement, {
 *         animateInFunc,
 *         animateOutFunc
 *     });
 *
 *     // Check if cookies have not been accepted
 *     if(!cookieWarning.checkStatus()) {
 *         // Show the cookie warning
 *         cookieWarning.showCookieWarning();
 *     }
 * }
 */
export const CookieWarning = function(element, options) {
    // Cache instance
    const cookieWarning = this;

    // Set properties
    cookieWarning.elements = {
        container: element,
        acceptBtn: element.querySelector("[data-accept]")
    };
    cookieWarning.isAllowed = false;
    cookieWarning.animateIn = (options && options.animateIn) ? options.animateIn : undefined;
    cookieWarning.animateOut = (options && options.animateOut) ? options.animateOut : undefined;

    // Initiate
    cookieWarning.init();
};

/**
 * Initiates the cookie warning instance
 * @function
 * @memberof CookieWarning
 */
CookieWarning.prototype.init = function() {
    // Cache instance
    const cookieWarning = this;

    // Attach events
    cookieWarning.attachEvents();
};

/**
 * Binds the events to elements associated with instance
 * @function
 * @memberof CookieWarning
 */
CookieWarning.prototype.attachEvents = function() {
    // Cache instance
    const cookieWarning = this;

    // Check if the accept button exists
    if(cookieWarning.elements.acceptBtn) {
        // Bind click event
        cookieWarning.elements.acceptBtn.addEventListener("click", (event) => {
            // Prevent default
            event.preventDefault();
            // Accept cookies
            cookieWarning.acceptCookies();
        });
    }
};

/**
 * Used to accept cookies, This will set the acceptCookies cookie.
 * @function
 * @memberof CookieWarning
 */
CookieWarning.prototype.acceptCookies = function() {
    // Cache instance
    const cookieWarning = this;

    // Set the cookie
    Cookies.set("acceptCookies", "true", { expires: 7, path: '' });

    // If animate out is defined
    if(cookieWarning.animateOut) {
        // Animate the cookie warning out
        cookieWarning.animateOut(cookieWarning.elements.container);
    }    
};

/**
 * Used to check the status of the cookie acceptance.
 * @function 
 * @memberof CookieWarning
 * @returns {Boolean} - True = Accepted / False = Not Accepted.
 * @example
 * // Check if cookies have not been accepted
 * if(!cookieWarning.checkStatus()) {
 *     // Cookies are not accepted
 * }
 */
CookieWarning.prototype.checkStatus = function() {
    // Cache the instance
    const cookieWarning = this;

    // Check if the cookie is set
    if(Cookies.get("acceptCookies") === "true") {
        // Update the state
        cookieWarning.isAllowed = true;
    }

    // Return the status of isAllowed
    return cookieWarning.isAllowed;
};

/**
 * Used to show the cookieWarning, This will animate the cookie warning in
 */
CookieWarning.prototype.showCookieWarning = function() {
    // Cache instance
    const cookieWarning = this;

    // Check if a animate in function is defined
    if(cookieWarning.animateIn) {
        // Animate the cookie warning in
        cookieWarning.animateIn(cookieWarning.elements.container);
    }
    else {
        // Return false
        return false;
    }

};