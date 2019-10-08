/* Dependencies */
import { toArray } from "./toArray";

/**
 * Function used to trap the users focus to a desired element.
 * @param {HTMLElement} element - The element to be keyboard trapped.
 */
export const trapFocus = (element) => {
    // List all focusable elements
    const focusableElements = toArray(element.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'));

    // Store the first element
    const firstElement = focusableElements[0];

    // Store the last element
    const lastElement = focusableElements[focusableElements.length - 1];

    // Add a decendent selector event
    element.addEventListener("keydown", (event) => {
        // Check if the key was a tab
        if(event.key === "Tab" || event.keyCode === "9") {
            // Check if the shift key was pressed
            if(event.shiftKey) {
                // Check if the active element is the first element
                if(document.activeElement === firstElement) {
                    // Prevent default
                    event.preventDefault();
                    
                    // Focus the last element
                    lastElement.focus();
                }
            }
            else {
                // check if the last element is in focus
                if(document.activeElement === lastElement) {
                    // Prevent default
                    event.preventDefault();

                    // Focus on the first element
                    firstElement.focus();
                }
            }
        }
    });

    // Focus on the first element
    focusableElements[0].focus();
};