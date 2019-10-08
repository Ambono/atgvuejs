/* Dependecies */ 
import { getOffset } from "../helpers/getOffset";

/**
 * Used to
 * @param {*} element 
 * @param {*} container 
 */
export const FixedOnScroll = function(element, container) {
    // Cache instance
    const fixedOnScroll = this;

    // Set Properties
    fixedOnScroll.scrollTarget = element;
    fixedOnScroll.container = container;
    fixedOnScroll.scrollMin = undefined;
    fixedOnScroll.scrollMax = undefined;
    fixedOnScroll.isMobile = false;
    fixedOnScroll.reachedMax = false;
    fixedOnScroll.reachedMin = false;

    // Initiate
    fixedOnScroll.init();
};

FixedOnScroll.prototype.init = function() {
    // Cache instance
    const fixedOnScroll = this;

    // Bind events
    fixedOnScroll.bindEvents();

    
    // Handle Resize
    fixedOnScroll.handleResize();

    // Handle Scroll
    fixedOnScroll.handleScroll();
};

/**
 * Used to bind events to the window
 * @member
 */

FixedOnScroll.prototype.bindEvents = function() { 
    // Cache instance
    const fixedOnScroll = this;
    
    // Store events on instance & bind this
    fixedOnScroll.handleScrollEvent = fixedOnScroll.handleScroll.bind(fixedOnScroll);
    fixedOnScroll.handleResizeEvent = fixedOnScroll.handleResize.bind(fixedOnScroll);
    
    // Bind events
    window.addEventListener("scroll", fixedOnScroll.handleScrollEvent, true);
    window.addEventListener("resize", fixedOnScroll.handleResizeEvent, true);
};

FixedOnScroll.prototype.destroy = function() {
    // Cache instance
    const fixedOnScroll = this;

    // Remove events
    window.removeEventListener("scroll", fixedOnScroll.handleScrollEvent, true);
    window.removeEventListener("resize", fixedOnScroll.handleResizeEvent, true);
};

/**
 * Used to handle scrolling.
 * @memberof FixedOnScroll
 * @function
 * @example
 * // Bind events
 * window.addEventListener("scroll", () => {
 *     fixedOnScroll.handleScroll()
 * });
 */
FixedOnScroll.prototype.handleScroll = function() {
    // Cache instance
    const fixedOnScroll = this;

    // If mobile do not execute
    if(fixedOnScroll.isMobile) {
        // Return to cancel execution
        return false;
    }

    // Set min / max scroll values
    fixedOnScroll.scrollMin = getOffset(fixedOnScroll.container).top - 20;
    fixedOnScroll.scrollMax = getOffset(fixedOnScroll.container).bottom - fixedOnScroll.scrollTarget.clientHeight;

    // Handle Min
    if(window.pageYOffset < fixedOnScroll.scrollMin && !fixedOnScroll.reachedMin) {
        // Set min flag
        fixedOnScroll.reachedMin = true;
        // Update status
        fixedOnScroll.scrollTarget.setAttribute("data-scroll-status", "start");
        // Remove the right
        fixedOnScroll.scrollTarget.style.right = "";
    }
    // Handle Max
    else if(window.pageYOffset >= fixedOnScroll.scrollMax && !fixedOnScroll.reachedMax) {
        // Update status
        fixedOnScroll.scrollTarget.setAttribute("data-scroll-status", "end");
        // Remove the right
        fixedOnScroll.scrollTarget.style.right = "";    
        // Set max flag to true
        fixedOnScroll.reachedMax = true;
    }
    // Handle other scroll points
    else if(window.pageYOffset < fixedOnScroll.scrollMax && window.pageYOffset > fixedOnScroll.scrollMin) {
        // Set the status if required
        if(fixedOnScroll.scrollTarget.getAttribute("data-scroll-status") !== "scrolling") {
            fixedOnScroll.scrollTarget.setAttribute("data-scroll-status", "scrolling");        
        }
        // Set the container width
        const containerWidth = fixedOnScroll.container.clientWidth;
        fixedOnScroll.scrollTarget.style.maxWidth = `${containerWidth}px`;
        // Set the right
        fixedOnScroll.scrollTarget.style.right = `${document.body.clientWidth - getOffset(fixedOnScroll.container).right}px`;
        // Update the flags if required
        (fixedOnScroll.reachedMax === true) ? fixedOnScroll.reachedMax = false : "";
        (fixedOnScroll.reachedMin === true) ? fixedOnScroll.reachedMin = false : "";
    }
};

/**
 * Used to handle resizing.
 * @memberof FixedOnScroll
 * @function
 * @example
 * // Bind events
 * window.addEventListener("resize", () => {
 *     fixedOnScroll.handleResize()
 * });
 */
FixedOnScroll.prototype.handleResize = function() {
    // Cache instance
    const fixedOnScroll = this;

    // Clear Debounce
    clearTimeout(fixedOnScroll.resizeTimeout);
    
    // Add Debounce
    fixedOnScroll.resizeTimeout = setTimeout(() => {
        if(window.innerWidth > 1000) {
            fixedOnScroll.isMobile = false;
            fixedOnScroll.handleScroll();
        }
        else {
            fixedOnScroll.isMobile = true;
            fixedOnScroll.scrollTarget.removeAttribute("data-scroll-status");
            fixedOnScroll.scrollTarget.style.maxWidth = "";
        }
    }, 50);
};