//==================================================================================
//	Dependencies
//==================================================================================
import  anime  from "animejs";

// Declare global scoped scroll 
let scrollToObject;

/**
 * Request window scroll to a desired element. 
 * @function
 * @param {HTMLElement} target - The dom selected element to scroll to
 * @example
 * // Select element from dom
 * let target = document.querySelector(".element-name");
 * 
 * // Scroll to target
 * scrollTo(target);
 */
export const scrollTo = function(target) {
    
    // Get the body bounds
    if (target !== null) {
        let bodyBounds = document.body.getBoundingClientRect();

        // Work out the target elements position
        let targetElementPos = target.getBoundingClientRect();
        
        // Calculate Y position of target element
        let targetPosY = (targetElementPos.top - bodyBounds.top).toFixed(2);

        // Set scroll Object
        scrollToObject = {
            y: window.pageYOffset
        }

        // Update the window scroll
        const animate = anime({
            targets: scrollToObject,
            y: targetPosY,
            duration: 1000,
            easing: 'easeInOutCubic',
            update: function() {
                // Update the window scroll position
                window.scroll(0, scrollToObject.y);
            },
            complete: function() {
                // Remove interuption events
                dettachEvents();
            }
        });

        // Attach events
        attachEvents();
    }

}

/**
 * Function to handle interuption by user
 * @function
 * @ignore
 */
function handleInteruption() {
    // Remove animate in instance
    anime.remove(scrollToObject);

    // Remove the events
    dettachEvents();
}

/**
 * Function to Dettach events from the window
 * @function
 * @ignore
 */
function dettachEvents() {
    // Remove custom events from the window
    window.removeEventListener("touch", handleInteruption, false);
    window.removeEventListener("mousewheel", handleInteruption, false);
    window.removeEventListener("mousedown", handleInteruption, false);
}

/**
 * Function to Attach events to the window
 * @function
 * @ignore
 */
function attachEvents() {
    // Add custom events to the window
    window.addEventListener("touch", handleInteruption, false);
    window.addEventListener("mousewheel", handleInteruption, false);
    window.addEventListener("mousedown", handleInteruption, false);
}
