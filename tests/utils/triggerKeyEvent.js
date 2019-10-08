/**
 * triggerKeyEvent Helper
 * Simulates keyboard events to assist with accessibility testing.
 * @function
 * @param {Object} Document - The instance of the document created with JSDOM.
 * @param {HTMLElement} element - The element to have the event fired against.
 * @param {String} type - The type of event: keypress, keydown, keyup etc.
 * @param {String} code - The code value to be stored in the event. i.e "Arrow Down".
 * @param {Object} options - Data object containing settings
 * @param {Boolena} options.ctrlKey - If set to true will add the ctrl key to the event.
 */
export const triggerKeyEvent = function(doc, element, type, code, options) {
    // Name event
    var event = doc.createEvent('HTMLEvents');
    
    // Set the code for the desired key
    event.code = code;
    
    // Options
    if(options !== null && options !== undefined) {

        // Control Key 
        if(options.ctrlKey === true) {
            event.ctrlKey = true;
        }

    }
    
    // Initiated the event
    event.initEvent(type, true, true);
    
    // Dispatch the event
    element.dispatchEvent(event);
}