/* Depenedency */ 
import { settings as appSettings } from "../../../config/config";
/**
 * Function used to create a range item
 * @function
 * @ignore
 * @param {Object} data - The information to be used within the range item.
 * @param {String} data.fullName - The fullname of the month (August).
 * @param {Number} data.year - The year (2018).
 * @param {String} data.name - The short version of the month name (Aug).
 * @param {Number} data.fromPrice - The From price for the month item (£30.50).
 * @returns {HTMLElement} - The Created range item.
 * 
 * @example
 * // Set Data
 * const data = {
 *     fullName: "August",
 *     name: "Aug",
 *     year: 2018,
 *     fromPrice: 30.50
 * };
 * 
 * // Create a range item
 * const item = createRangeItem(data);
 */
function createRangeItem(data) {
    // Create element
    const rangeElement = document.createElement("li");
    rangeElement.classList.add("calendar__range-item");
    const rangeElementContents = `
    <a href="#" class="calendar__range-anchor" aria-label="Update Calendar to show events for ${data.fullName} ${data.year}.">
        <span class="calendar__range-title">${data.name} ${data.year}</span>
        <span class="calendar__range-price">from ${appSettings.format.currency}${data.fromPrice}</span>
    </a>
    `;

    // Insert the contents
    rangeElement.insertAdjacentHTML("beforeend", rangeElementContents);

    // Return the element
    return rangeElement;
}

/**
 * Used to create the range of months.
 * @function 
 * @param {Object} options - The bound options.
 * @param {HTMLElement} options.container - The container for the range items to be inserted within.
 * @param {Object} options.calendar - The data bound to the carousel (calendar.calendarData).
 * @param {Function} options.clickFunction - The Function to be fired when the item is clicked.
 * @param {Function} callback - Optional callback function (Will be passed the rangeItems array).
 * 
 * @example
 * // Get the range element
 * const element = document.querySelector("[data-range-container]");
 * 
 * // Create the range
 * createRange(
 *     {
 *         container: element,  
 *         data: this.calendarData, // Data bound to the calendar 
 *         clickFunction: (item) => {
 *             // Log the item
 *             console.log("Selected Month", item);
 *         }
 *     },
 *     (rangeItems) => {
 *         // Log the range items
 *         console.log("Range Defined", rangeItems);                 
 *     }
 * );
 */
export const createRange = (options, callback) => {
    // Empty the container
    options.container.innerHTML = "";

    // Set the data
    const data = options.data;

    // Create an array to store the range items
    const rangeItems = [];

    // Loop through the past in data's years
    data.years.forEach((currentYear) => {
        
        // Get the valid months
        const months = Object.keys(data.performances[currentYear]);

        // Loop through the current years months
        months.forEach((currentMonth) => {
            // Get the month details
            const monthDetails = data.performances[currentYear][currentMonth].monthDetails;
            
            // Create the range item
            const rangeItem = { 
                details: monthDetails,
                element: createRangeItem(monthDetails),
            };

            // Bind click event to range item
            rangeItem.element.addEventListener("click", (event) => {
                // Prevent Default
                event.preventDefault();

                // Activate the click function and pass the current item through
                options.clickFunction(rangeItem);
            });

            // Add the element to the DOM
            options.container.appendChild(rangeItem.element);

            // Push to the range items array
            rangeItems.push(rangeItem);
        })
    });

    // Fire callback and return items
    callback(rangeItems)
}