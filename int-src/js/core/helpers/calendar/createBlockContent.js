// Dependancies
import moment from "moment";
import { calculatePercentage, definePercentageClass } from "../../helpers/availability";
import { settings as appSettings } from "../../../config/config";
import  i18n  from '../../../i18n-setup';
/**
 * Function used to create a content block element.
 * @param {Object} date - The date object to be used.
 * @param {Object} calendar - Calendar instance for method availability.
 * @returns {HTMLElement} - The generated content element.
 * @example
 * // Pass function calendar & date
 * const contentElement = createBlockContent(date, calendar);
 * 
 * // Append the element to the page
 * document.body.appendChild(contentElement);
 * 
 * // Element is now visible within the DOM.
 */
export const createBlockContent = (date, calendar) => {

    // Store the calendar data 
    const calendarData = calendar.calendarData;

    // Check there is data available for the supplied year and month
    if(!calendarData.performances[date.year] || !calendarData.performances[date.year][date.month]) {
        // If not return and cancel code execution
        return false;
    }

    // Find all events for the current month
    const monthEvents = calendarData.performances[date.year][date.month].performances;

    // Get the events for the desired date
    const events = monthEvents.filter((currentEvent) => currentEvent.date.day === date.day).sort(function (a, b) {
        var dateA = new Date(a.datetime);
        var dateB = new Date(b.datetime);
        return dateA - dateB;
    }
    );

    

    // If there is no events
    if(events.length < 1) {
        return undefined;
    }
    
    // Create the wrapper class
    const element = document.createElement("div");
    element.addClass("show-block");

    // Loop through the discovered events
    events.forEach((currentEvent) => {
        // Create event item & Add required class
        const eventItem = document.createElement("a");
        eventItem.addClass("show-block__item");

        // Calculate the percentage left
        // const percentateLeft = calculatePercentage(currentEvent.current_availability, currentEvent.total_availability);
        
        // Check if the tickets are sold out
        const isSoldOut = (currentEvent.current_availability < 1) ? true : false;

        // If the item is sold out
        if(isSoldOut) {
            eventItem.addClass("show-block__item--sold-out");
        }

        // Create an anchor element
        const anchor = document.createElement("a");
        anchor.addClass("show-block__item-link");
        anchor.setAttribute("href", "#");

        const soldOut= i18n.t('core.helpers.createBlockContent.soldOut');
        const onSale = i18n.t('core.helpers.createBlockContent.onSale');
        const from =  i18n.t('core.helpers.createBlockContent.from');
        const unavailable = i18n.t('core.helpers.createBlockContent.unavailable');
        // Add aria labeling
        // Format
        // 2 September 2018
        // 13:00 from £36.00
        // On Sale Or Sold Out
        anchor.setAttribute("aria-label", `
            ${date.day} ${moment().month(date.month - 1).format("MMMM")} ${date.year}. 
            ${moment(currentEvent.datetime).format("HH:mm")}, from ${appSettings.format.currency}${currentEvent.min_price.toFixed(2)}.
            ${(isSoldOut ? soldOut : onSale)}
        `);

        // Define the contents
        let contents = `
            <span class="show-block__item-text">
                <strong>${moment(currentEvent.datetime).format("HH:mm")}</strong>`;

            if(isSoldOut) {
                contents += `
                <span class="show-block__item-percentage show-block__item-percentage--grey">
                ${unavailable}
                </span>
            `;
            }
            else {
                contents += `
                    <span>${from} ${appSettings.format.currency}${currentEvent.min_price.toFixed(2)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="show-block__item-arrow">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#chevron-right"></use>
                    </svg>
                `
            }
            contents += `
            </span>
        `;

        // Add the content to the anchor
        anchor.insertAdjacentHTML("beforeend", contents);

        // If the item is not sold out
        if(!isSoldOut) {
            // Bind click event to the anchor
            anchor.addEventListener("click", (event) => {
                // Prevent default
                event.preventDefault();
                
                // Call the calendar select event passing in the selected event
                calendar.selectCalendarItem(currentEvent);
            });
        }

        // Add the anchor to the element
        eventItem.appendChild(anchor);

        // Append to the element
        element.appendChild(eventItem);
    });

    // Return the created element
    return element;
};