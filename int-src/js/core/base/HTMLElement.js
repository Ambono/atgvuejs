/**
 * Function used to initialise the extension for the HTMLElement.
 * @function
 */
export const htmlElement = function() {
    /**
     * Adds a class to a HTMLElement
     * @function external:HTMLElement#addClass
     * @returns {HTMLElement}
     * @param {String} className - Class to be added to the element
     * @example
     * // Select Element
     * let element = document.querySelector('.example');
     * 
     * // Add The Class
     * element.addClass("example");
     */
    HTMLElement.prototype.addClass = function(className) {

        // Cache instance
        let element = this;

        // Check The Class Name Doesnt Exist 
        if (element.classList.contains(className) === false) {
            // Add the class
            element.classList.add(className);
        }

        return element;
    }

    /**
     * Removes a class from the HTMLElement
     * @function external:HTMLElement#removeClass
     * @returns {HTMLElement}
     * @param {String} className - Class to be removed from the element
     * @example
     * // Select Element
     * let element = document.querySelector('.example');
     * 
     * // Remove The Class
     * element.removeClass("example");
     */
    HTMLElement.prototype.removeClass = function(className) {

        // Cache instance
        let element = this;

        // Check If Class Name Exists 
        if (element.classList.contains(className) === true) {
            // Remove the class
            element.classList.remove(className);
        }

        return element;
    }

    /**
     * Check if the HTMLElement has a class
     * @function external:HTMLElement#hasClass
     * @returns {HTMLElement}
     * @param {String} className - Class to be checked
     * @example
     * // Select Element
     * let element = document.querySelector('.example');
     * 
     * // If element has the class
     * if(element.hasClass("example") === true) {
     *      // Code to execute
     * }
     */
    HTMLElement.prototype.hasClass = function(className) {
        
        // Cache instance
        let element = this;

        // Check if class is found
        let isFound = element.classList.contains(className);

        // Returns true if found or false if not
        return isFound;
    }
}();
