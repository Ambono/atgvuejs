/* Dependencies */
import anime from "animejs";
import { days, months, getFirstMonday, getLastSunday, createDays, createCalendarBlock } from "../helpers/calendar/calendar";
import  i18n  from '../../i18n-setup'; 
/**
 * Constructor for creating a calendar instance
 * Requires the renderBlockContents & selectCalendarItem to be defined prior to calendar.create() call.
 * @constructor
 * @param {HTMLElement} container - The container element for the calendar to be inserted into.
 * 
 * @property {Object} elements - The elements to be used within the instance.
 * @property {HTMLElement} elements.container - The container element passed into the instance.
 * @property {HTMLElement} elements.calendarDays - The Container for the calendar days to be inserted into.
 * @property {HTMLElement} elements.calendarView - The Container for the calendar blocks to rendered within.
 * @property {Object} settings - The settings for the calendar.
 * @property {Array} settings.days - An array of numeric values to identify the weekdays.
 * @property {Array} settings.months - An array of opbjects to identify each month of the year.
 * @property {Function} renderBlockContents - Attachable function used to handle the render of a calendar blocks contents.
 * @property {Function} selectCalendarItem - Attachable function to handle item selection from the calendar.
 * @property {Array} activeCalendar - An Array containing the performance items for the desired month.
 * @example 
 * // Define function for rendering (this will be passed the day & calendar instance).
 * const renderFunc = (date, calendar) => {
 *     // Log the date
 *     console.log(date);
 *     
 *     // Log the calendar
 *     console.log(calendar);
 * 
 *     // Log the data
 *     console.log(calendar.calendarData);
 * };
 * 
 * // Get the element container
 * const element = document.querySelector("[data-calendar]");
 * 
 * // Created an instance of the calendar
 * const calendar = new Calendar(element)
 *
 * // Register the render content function
 * calendar.renderBlockContents = renderFunc;
 * 
 * // Register select function
 * calendar.selectCalendarItem = (item) => {
 *     console.log(item);
 * }; 
 * 
 * // One method to pass data to the render function is to bind it to the calender instance
 * // Bind the data to the calendar
 * calendar.calendarData = {
 *    years: [],
 *    performances: {
 *        2018: []
 *    }
 * };
 * 
 * // Get the first month to load in the calendar
 * const year = calendar.calendarData.years[0];
 * const month = Object.keys(calendar.calendarData.performances[year])[0];
 * 
 * // Render The Calendar
 * calendar.createCalendar(year, month);
 */
export const Calendar = function(container) {
    // Cache instance
    const calendar = this;

    // Set Properties
    
    calendar.elements = {
        container: container,
        calendarDays: container.querySelector("[data-calendar-days]"),
        calendarView: container.querySelector("[data-calendar-view]")
    };


/*
calendar.elements = {
    container: container,
    calendarDays: i18n.t('core.helpers.calendar.calendar.days.currentday', {currentday: container.querySelector("[data-calendar-days]")}),
    calendarView: container.querySelector("[data-calendar-view]")
};

*/
    calendar.settings = {
        days,
        months
    };

    calendar.renderBlockContents = undefined; // Sets attachable function for rendering the calendar
    calendar.selectCalendarItem = undefined;

    // Inititate
    calendar.init();
};

/**
 * Initiate the calendar instance
 * @memberof Calendar
 */
Calendar.prototype.init = function() {
    // Cache instance
    const calendar = this;

    // If days is defined
    if(calendar.settings.days) {
        // Render the days
        calendar.renderDays();
    }    
};

/**
 * Used to generate and render the days.
 * @memberof Calendar
 * @function
 */
Calendar.prototype.renderDays = function() {
    // Cache Instance
    const calendar = this;

    // Create days
    calendar.days = createDays(calendar.settings.days);

    // Loop through each day
    calendar.days.forEach((currentDay) => {
        // Render the element
        calendar.elements.calendarDays.appendChild(currentDay.element);
    });

};

/**
 * Used to update the UI with a calendar grid.
 * @memberof Calendar
 * @function
 * @param {Object} data - An object containing the desired date info.
 * @param {Number} data.year - The year to be set.
 * @param {Number} data.month - The Month to be set.
 * 
 * @example
 * // Create test data
 * const data = {
 *     year: 2018,
 *     month: 8
 * };
 * 
 * // Set the month
 * calendar.setMonth(data);
 */
Calendar.prototype.setMonth = function(data) {
    // Cache instance
    const calendar = this;
    // Create a new calendar
      calendar.createCalendar(data.year, data.month, () => {
        // Render The Calender
        calendar.renderCalendar();
    });
};

/**
 * Used to create a desired calendar view.
 * @memberof Calendar
 * @param {Number} year - The year to be used.
 * @param {Number} month - The month to be displayed.
 * @param {Function} callback - Optional callback.
 * 
 * @example
 * // Create the calendar
 * calendar.createCalendar(2018, 8, () => {
 *     // Provide message
 *     console.log("The Calendar Has Been Created");
 * });
 */
Calendar.prototype.createCalendar = function(year, month, callback) {
    // Cache instance 
    const calendar = this;

    // Create placeholder for the monthDays
    const monthDays = [];

    // Find the first and last days of the month
    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);

    // Calculate the first Monday and last Sunday
    const firstMonday = getFirstMonday(firstDate);
    const lastSunday = getLastSunday(lastDate);

    // iterate days starting from first sunday
    let iterator = new Date(firstMonday);

    // Loop until the last sunday
    while (iterator <= lastSunday) {

        // Create date
        const date = new Date(iterator)
        
        // Get current day of the week
        // Handles offset of starting on a monday
        let dayOfWeek = (date.getDay() === 0) ? 6 : date.getDay() - 1;

        // Create the day object
        monthDays.push({
            date: {
                dateString: date,
                day: date.getDate(),
                dayString: calendar.settings.days[dayOfWeek].text,
                month: calendar.settings.months[date.getMonth()],
                year: date.getFullYear()
            },
            lastMonth: iterator < firstDate, // Boolean - if day is before current month start.
            nextMonth: iterator > lastDate // Boolean - if day is after current month end.
        });

        // Set the iterator to the next day
        iterator.setDate(iterator.getDate() + 1);
    }

    // Store as active calendar events
    calendar.activeCalendar = monthDays;
    
    // Render the calendar
    calendar.renderCalendar();

    // If a callback is present
    if(callback) {
        // Fire the callback
        callback();
    }

};

/**
 * Used to render the calendar to the DOM. Animates Out / In
 * @memberof Calendar
 */
Calendar.prototype.renderCalendar = function() {
    // Cache Instance
    const calendar = this;

    // Create new promise
    const animateOutCalendar = new Promise((resolve, reject) => {
        
        // Animate Out Calendar
        anime({
            targets: calendar.elements.calendarView,
            opacity: 0,
            duration: 300,
            easing: "linear",
            complete: () => {
                // Resolve the promise
                resolve();
            }
        });

    });

    // Then once previous is animated out of view
    animateOutCalendar.then(() => {

        // Clear the current calendar view
        calendar.elements.calendarView.innerHTML = "";
        
        // Loop through each calendar item
        calendar.activeCalendar.forEach((currentDay) => {
            // Create the element
            const calendarBlock = createCalendarBlock(currentDay);

            // Get the content container
            const contentContainer = calendarBlock.querySelector('.calendar__block-content');

            // Create the content if function is defined (Fires render function);
            if(calendar.renderBlockContents) {

                // Render the blocks contents
                const calendarBlockContent = calendar.renderBlockContents(
                    {
                        day: currentDay.date.day,
                        month: String(currentDay.date.month.id),
                        year: String(currentDay.date.year)
                    },
                    calendar
                );

                // Check if there is any content returned
                if(calendarBlockContent) {
                    // Append the content to the contianer
                    contentContainer.appendChild(calendarBlockContent);
                }
                else {
                    // If no content, Add class for no events.
                    calendarBlock.addClass("calendar__block--no-events");
                }
            }

            // Append to the calender view container
            calendar.elements.calendarView.appendChild(calendarBlock);
        });

        // Animate the calendar in
        anime({
            targets: calendar.elements.calendarView,
            opacity: 1,
            duration: 300,
            easing: "linear"
        });
    });
};