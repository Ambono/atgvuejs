/**
 * Converts node list into array of objects.
 * @function
 * @param {Object} obj - The nodelist
 * @returns {Array} - Array of objects
 * @example
 * // Look up all p tags
 * let paragraphs = document.querySelectorAll("p");
 * 
 * // Convert from nodelist to array
 * paragraphs = toArray(paragraphs);
 * 
 * // Usually Written as one line
 * let paragraphs = toArray(document.querySelectorAll("p"));
 */
export const toArray = function(obj) {
    // Check If Object Is Present
    if (obj) {
        // Convert To Array
        return Array.prototype.slice.call(obj);
    }
    else{
        return false;
    }
}
