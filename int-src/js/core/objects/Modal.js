/* Dependencies */
import { createModal, animateIn, animateOut } from "../helpers/modal/modal";
import { trapFocus } from "../helpers/trapFocus";

/**
 * Constructor function used to create an instance of a modal.
 * @constructor
 * @param {HTMLElement} target - The Element to be cloned.
 * @param {Object} options - Options for the instance.
 * @param {Function} options.animateIn - (Optional) Defines the animate in function.
 * @param {Function} options.animateOut - (Optional) Defines the animate out function.
 * @param {Function} options.createModal - (Optional) Defines the function used to create the modal wrapper.
 * @param {Function} options.contentEvents - (Optional) Function to be called when the lightbox is bound to the dom.
 * 
 * @property {HTMLElement} activeElement - The previous active element in the DOM.
 * @property {Function} animateIn - Function called to animate the modal in.
 * @property {Function} animateOut - Function called to animate the modal out.
 * @property {Function} createModal - Function called to create the modal element.
 * @property {Function} contentEvents - Function called to allow events to be bound to the modal content.
 * @property {Boolean} isActive - Tracks the status of the modal (true = open | false = closed).
 * @property {Object} elements - The elements to be used with the instance.
 * @property {HTMLElement} target - The element to be cloned.
 * @property {HTMLElement} modalContainer - The modal element.
 * @property {HTMLElement} contentContainer - The modal content container element.
 * @property {HTMLElement} content - The content that has been cloned.
 * 
 * @example 
 * // Create Content Events Functions
 * const contentEvents = (modal) => {
 *     console.log("Called when content is bound");
 * };
 * 
 * // Get the target
 * const target = document.querySelector(".test");
 * 
 * // Create a new modal
 * const modal = new Modal(target, {
 *     contentEvents
 * });
 * 
 * // Open the modal
 * modal.open();
 */
export const Modal = function(target, options) {
    // Cache instance
    const modal = this;

    // Set properties
    modal.activeElement = undefined;
    modal.enableClose = (options && options.enableClose) ? options.enableClose : undefined;
    modal.animateIn = (options && options.animateIn) ? options.animateIn : animateIn;
    modal.animateOut = (options && options.animateOut) ? options.animateOut : animateOut;
    modal.createModal = (options && options.createModal) ? options.createModal : createModal;
    modal.contentEvents = (options && options.contentEvents) ? options.contentEvents : undefined;
    modal.closeEvents = (options && options.closeEvents) ? options.closeEvents : undefined;
    modal.isActive = false;
    modal.elements = {
        target: target,
        modalContainer: modal.createModal()
    };
    modal.elements.closeBtn = modal.elements.modalContainer.querySelector("[data-close]");

    // Initiate
    modal.init();
};

/**
 * Used to initiate the modal
 * @function
 * @memberof Modal
 */
Modal.prototype.init = function() {
    // Cache instance
    const modal = this;

    // Attach Modal Events
    modal.attachEvents();
};

/**
 * Used to open the modal
 * @function
 * @memberof Modal
 */
Modal.prototype.open = function() {
    // Cache instance
    const modal = this;

    // Store the active element
    modal.activeElement = document.activeElement;

    // Clone the target
    const clone = modal.elements.target.cloneNode(true);

    // Check if the content container is defined
    if(!modal.elements.content) {
        modal.elements.contentContainer = modal.elements.modalContainer.querySelector("[data-modal-container]");
        modal.elements.content = modal.elements.modalContainer.querySelector("[data-modal-content]");
    }


    // Append the target to the modal
    modal.elements.content.appendChild(clone);

    // Add the modal to the dom
    document.body.appendChild(modal.elements.modalContainer);

    // Animate the modal in
    animateIn(modal, () => {
        // If the modal has content events
        if(modal.contentEvents) { 
            modal.contentEvents(modal);
        }

        // Attach Keyboard trap
        trapFocus(clone);
    });

    // Set the modal to active
    modal.isActive = true;
};

/**
 * Used to close the modal
 * @function
 * @memberof Modal
 */
Modal.prototype.close = function() {
    // Cache instance
    const modal = this;

    // Close the modal
    modal.animateOut(modal, () => {
        // Clear the content
        modal.elements.content.innerHTML = "";

        if(modal.closeEvents) {
            modal.closeEvents();
        }
    });

    // Set the modal to inactive
    modal.isActive = false;
};

/**
 * Used to bind modal specific events
 * @function
 * @memberof Modal
 */
Modal.prototype.attachEvents = function() {
    // Cache instance
    const modal = this;

    // Check if close button is defined
    if(modal.elements.closeBtn) {
        // Bind click event
        modal.elements.closeBtn.addEventListener("click", (event) => {
            // Prevent default
            event.preventDefault();
            // Close the modal
            modal.close();
        });
    }

    if(modal.enableClose) {
        modal.elements.modalContainer.addEventListener("click", (event) => {
            if(event.target === modal.elements.modalContainer) {
                modal.close();
            }
        });
    }
};