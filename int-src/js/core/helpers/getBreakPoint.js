/**
 * Returns the current active breakpoint (Uses get computed style on body :after).
 * @function
 * @returns {String} - breakPoint
 * @example
 * // Get the current active break point
 * let breakPoint = getBreakPoint();
 */
export const getBreakPoint = function() {
    
    // Get the breakpoint 
    let breakPoint = window.getComputedStyle(document.body, ':after').content;

    // Remove any quotes
    breakPoint = breakPoint.replace(/['"]+/g, '');

    // Return the breakpoint
    return breakPoint;
}
