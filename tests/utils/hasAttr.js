/**
 * hasAttr Helper
 * Checks if an element contains a desired attribute.
 * @function
 * @param {HTMLElement} element - The element to be checked.
 * @param {String} attr - The attribute to be checked for.
 * @returns {Boolean} - The result (true/false).
 */
export const hasAttr = function(element, attr) {

    // If element has the data attribute
    if(element.hasAttribute(attr)) {
        return true;
    }

    // Return false
    return false;

};