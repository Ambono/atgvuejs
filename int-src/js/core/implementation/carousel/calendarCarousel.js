// Dependancies
import Siema from "siema";

/* Private Functions */
/**
 * Function used to check wether to show or hide the carousel arrows
 * @function
 * @ignore
 * @param {Object} carousel - The carousel instance.
 * @param {Object} arrows - The carousel arrows.
 * @param {HTMLElement} arrows.prevArrow - The previous carousel arrow.
 * @param {HTMLElement} arrows.nextArrow - The next carousel arrow.
 */
function checkCarouselArrows(carousel, arrows) {

    // Check if the arrows are present
    if(arrows) {
        // Check if first slide
        if(carousel.currentSlide === 0) {
            // Hide the first Arrow 
            arrows.prevArrow.style.display = "none";
        }
        else {
            // Show the first Arrow
            arrows.prevArrow.style.display = "flex";
        }

        // Check if last slide
        if(carousel.currentSlide >= carousel.innerElements.length - carousel.perPage) {
            // Hide the next arrow
            arrows.nextArrow.style.display = "none";
        }
        else {
            // Show the last arrow
            arrows.nextArrow.style.display = "flex";
        }               

    }
}

/**
 * Function used to iniate and bind a carousel instance to the calendar.
 * @function
 * @ignore
 * @param {HTMLElement} element - The element to have the carousel bound to.
 * @param {Object} arrows - The carousel arrows to be used to navigate.
 * @param {HTMLElement} arrows.prevArrow - The previous carousel arrow.
 * @param {HTMLElement} arrows.nextArrow - The next carousel arrow.
 * @returns {Object} - The Siema Instance
 * 
 * @example
 * // Get the test elements from the DOM
 * const element = document.querySelector("[data-carousel]");
 * const arrows = {
 *      prevArrow: document.querySelector("[data-carousel-prev]");
 *      nextArrow: document.querySelector("[data-carousel-next]");
 * };
 * 
 * // Create a new carousel
 * const carousel = calendarCarousel(element, arrows);
 */
export const calendarCarousel = (element, arrows) => {

    // Check the element is valid
    if(!element) {
        // Warn the user
        console.warn("Calendar carousel element not valid");
        // Cancel the code execution
        return false;
    }

    // Create a new siema instance
    const carousel = new Siema({
        selector: element,
        duration: 300,
        easing: 'ease-out',
        perPage: {
            0: 2,
            500: 3,
            768: 5,
            960: 7
        },
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: false,
        onChange: () => {
            // Handle carousel arrows
            checkCarouselArrows(carousel, arrows);
        }
    });

    // Handle the carousel arrows
    checkCarouselArrows(carousel, arrows);

    // Handle Interaction Events
    // Previous
    if(arrows && arrows.prevArrow) {
        // Add click event
        arrows.prevArrow.addEventListener("click", (event) => {
            // Call Carousel Previous
            carousel.prev();
        });
    }
    // Next
    if(arrows && arrows.nextArrow) {
        // Add click event
        arrows.nextArrow.addEventListener("click", (event) => {
            // Call Carousel next
            carousel.next();
        });
    }

    // set placeholder for resize timeout
    let resizeRange;

    // Add resize event
    window.addEventListener("resize", (event) => {
        // Clear the previous timeout
        clearTimeout(resizeRange);

        // Set a new resize timeout
        resizeRange = setTimeout(() => {
            // Re-check if the carousel needs arrows
            checkCarouselArrows(carousel, arrows);
        }, 50);
    });

    // Return the carousel instance
    return carousel;

};