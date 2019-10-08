/* Dependencies */
import anime from "animejs";
import { toArray } from "../toArray";
import { trapFocus } from "../trapFocus";

/**
 * Function used to animate the modal in.
 * @function
 * @ignore
 * @param {Object} modal - The modal instance.
 * @param {Function} callback - Optional callback parameter.
 * @example
 * // Animate the modal in
 * animateIn(modal, () => {
 *     console.log("Element is finished animating in");
 * });
 */
export const animateIn = (modal, callback) => {   
    // Elements to animate
    const modalContainer = modal.elements.modalContainer;
    const contentContainer = modal.elements.contentContainer;

    // Create timeline
    const timeline = anime.timeline({
        loop: false,
        autoPlay: false
    });

    // Animate the background in
    timeline.add({
        targets: modalContainer,
        duration: 300,
        opacity: 1,
        easing: "linear"
    });

    // Animate in the content
    timeline.add({
        begin: () => {
            // Offset the content
            contentContainer.style.transform = "translateY(100px)";
        },
        targets: contentContainer,
        duration: 300,
        translateY: [100, 0],
        offset: -100,
        opacity: 1,
        easing: "linear",
        complete: () => {
            // Add aria live to announce to the user
            modalContainer.setAttribute("aria-live", "assertive");
            // Focus on the container
            modalContainer.focus();

            // Fire callback
            if(callback) {
                callback();
            }
        }
    });

    // Play 
    timeline.play();
};

/**
 * Function used to animate the modal out.
 * @function
 * @ignore
 * @param {Object} modal - The modal instance.
 * @example 
 * // Animate the modal out
 * animateOut(modal);
 */
export const animateOut = (modal, callback) => {
    // Elements to animate
    const modalContainer = modal.elements.modalContainer;
    const contentContainer = modal.elements.contentContainer;

    // Create timeline
    const timeline = anime.timeline({
        loop: false,
        autoPlay: false
    });

    // Animate the content out
    timeline.add({
        targets: contentContainer,
        duration: 300,
        opacity: 0,
        translateY: [0, -100],
        easing: "linear"
    });

    // Animate the background out
    timeline.add({
        targets: modalContainer,
        duration: 300,
        opacity: 0,
        easing: "linear",
        complete: () => {
            // Update aria live
            modalContainer.setAttribute("aria-live", "off");
            // If there is an original element
            if(modalContainer.activeElement) {
                // Return focus to the original element
                modalContainer.activeElement.focus();
            }
            // Remove the modal from the dom
            document.body.removeChild(modalContainer);
            // Handle callback
            if(callback) {
                callback();
            }
        }
    });

    // Play 
    timeline.play();
};

/**
 * Function used to create the modal container element
 * @function
 * @ignore
 * @returns {HTMLElement} - The Modal container element.
 * @example 
 * // Create modal element
 * const modalElement = createModal();
 */
export const createModal = () => {
    // Create the modal element
    const modal = document.createElement("div");
    // Add class
    modal.addClass("modal");
    
    // Add aria attributes
    modal.setAttribute("aria-live", "off");
    
    // Set data attribute
    modal.setAttribute("data-modal", "");
    modal.setAttribute("tabindex", 0);

    // Define content 
    modal.insertAdjacentHTML("beforeend", `
        <!-- Container -->
        <div class="modal__container" data-modal-container>
            <button class="modal__close" data-close>X</button> 
            <!-- Modal Content -->
            <div class="modal__content" data-modal-content>
                
            </div>
            <!-- / Modal Content -->
        </div>
        <!-- / Container -->
    `);

    // Return the modal element
    return modal;
}

/**
 * Function used to set up the session expired modal
 * @function
 * @ignore
 */
export const sessionExpiredContent = (modal) => {
    // Get the actions
    const actionBtn = modal.elements.modalContainer.querySelector("[data-action]");

    // check the actions exist
    if(actionBtn) {
        // Bind click event
        actionBtn.addEventListener("click", (event) => {
            // Prevent default
            event.preventDefault();

            // Close the modal
            modal.close();

            // fire the bound click handler
            modal.handleClick();
        });
    }

    trapFocus(modal.elements.modalContainer)
}