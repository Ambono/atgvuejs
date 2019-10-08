/**
 * Function used to return a floored percentage based on availability and total amount.
 * @function
 * @param {Number} numAvailable - The number available.
 * @param {Number} totalNum - The number in total.
 * @returns {Number} - Floored percentage.
 * @example
 * // Call the function
 * const percent = calculatePercentage(20, 100);
 * 
 * // Expect 20 (%)
 * console.log(percent);
 */
export const calculatePercentage = (numAvailable, totalNum) => {
    return Math.floor(numAvailable / totalNum * 100);
};

/**
 * Function used to return a color based class name based on a percentage value.
 * @function
 * @param {Number} percent - The percentage to be used.
 * @returns {String} - The class colour name.
 * @example
 * // Set test percentage
 * const percent = 75;
 * 
 * // Get the colour class name
 * const colorClass = definePercentageClass(percent);
 * 
 * // Expect "green"
 * console.log(colorClass);
 */
export const definePercentageClass = (percent) => {
    // Placeholder for class color
    let classColor;

    // Work out the class
    (percent >= 75) ? classColor = "green" : (percent >= 50) ? classColor = "orange" : (percent >= 1) ? classColor = "red" : classColor = "grey";

    // return the base class
    return classColor;
};