/**
 * Function used to return the offset of an element. 
 * @function
 * @param {*} element - The element to be used.
 * @returns {Object} - .top,.left,.right,.bottom - The offset in pixels.
 * @example 
 * // Select Element
 * const element = document.querySelector("[data-test]");
 * 
 * // Get the offset
 * const offset = getOffset(element);
 * 
 * // Log the top
 * console.log(offset.top); 
 */
export const getOffset = (element) => {
    // Get the offset
    const rect = element.getBoundingClientRect();
    
    // Return the offset
    return {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset,
        right: rect.right + window.pageXOffset,
        bottom: rect.bottom + window.pageYOffset
    };
};