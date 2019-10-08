/* Dependencies */
import { toArray } from "../helpers/toArray";
import { Modal } from "../objects/Modal";
import { trapFocus } from "../helpers/trapFocus";
// Handle click
const contentEvents = (modal) => {
    // Get the actions
    const actions = toArray(modal.elements.modalContainer.querySelectorAll("[data-action]"));

    // check the actions exist
    if(actions) {
        // Loop through the actions
        actions.forEach((currentAction) => {
            // Bind click event
            currentAction.addEventListener("click", (event) => {
                // Prevent default
                event.preventDefault();
                // Close the modal
                modal.close();
            });
        });
    }

    trapFocus(modal.elements.modalContainer)

};

export const testModal = () => {
    // Get the target
    const target = document.querySelector(".user-message");

    // Create a new modal
    const modal = new Modal(target, {
        contentEvents
    });
    window.modal = modal;

    // Open the modal 
    // setTimeout(() => {
    //     modal.open();
    // }, 1000);
};