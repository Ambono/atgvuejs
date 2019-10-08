// Dependencies
import moment from "moment";

import  i18n  from '../../../i18n-setup'; 

// Config

/**
 * Days Config
 * @ignore
 * 
 * @property {Array} days - An array of numeric values to identify the weekdays.
 * @property {String} days.text - The short text version of the day name (Mon).
 * @property {String} days.long - The long text version of the day name (Monday).
 * @property {Number} days.id - The id of the day, Used for optional unique identifier.
 * 
 * @example
 * // Log out the text (Mon)
 * console.log(days[0].text);
 * 
 * // Log out the long name (Monday)
 * console.log(days[0].long);
 * 
 * // Log out the id (1)
 * console.log(days[0].id);
 */
export const days = [
    {
        text: i18n.t('core.helpers.calendar.calendar.days.Monday.text'),
        long: i18n.t('core.helpers.calendar.calendar.days.Monday.long'),
        id: 1
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.days.Tuesday.text'),
        long: i18n.t('core.helpers.calendar.calendar.days.Tuesday.long'),
        id: 2
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.days.Wednesday.text'),
        long: i18n.t('core.helpers.calendar.calendar.days.Wednesday.long'),
        id: 3
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.days.Thursday.text'),
        long: i18n.t('core.helpers.calendar.calendar.days.Thursday.long'),
        id: 4
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.days.Friday.text'),
        long: i18n.t('core.helpers.calendar.calendar.days.Friday.long'),
        id: 5
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.days.Saturday.text'),
        long: i18n.t('core.helpers.calendar.calendar.days.Saturday.long'),
        id: 6
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.days.Sunday.text'),
        long: i18n.t('core.helpers.calendar.calendar.days.Sunday.long'),
        id: 7
    }
];



 /**
 * Months Config
 * @ignore
 * 
 * @property {Array} months - An array of opbjects to identify each month of the year.
 * @property {String} months.text - The long version of the month name (January).
 * @property {String} months.short - The short version of the month name (Jan).
 * @property {Number} months.daysInMonth - The number of days in the month (31).
 * @property {Number} months.id - The identifier for the month object.
 * 
 * @example
 * // Log out the text (January)
 * console.log(months[0].text);
 * 
 * // Log out the short (Jan)
 * console.log(months[0].short);
 * 
 * // Log out the days in the month (31)
 * console.log(months[0].daysInMonth);
 * 
 * // Log out the id (1) 
 * console.log(months[0].id);
 */
export const months = [
    {
        text: i18n.t('core.helpers.calendar.calendar.months.January.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.January.short'),
        daysInMonth: 31,
        id: 1
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.February.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.February.short'),
        daysInMonth: 28,
        id: 2
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.March.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.March.short'),
        daysInMonth: 31,
        id: 3
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.April.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.April.short'),
        daysInMonth: 30,
        id: 4
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.June.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.June.short'),
        daysInMonth: 31,
        id: 5
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.July.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.July.short'),
        daysInMonth: 30,
        id: 6
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.August.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.August.short'),
        daysInMonth: 31,
        id: 7
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.September.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.September.short'),
        daysInMonth: 31,
        id: 8
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.October.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.October.short'),
        daysInMonth: 30,
        id: 9
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.November.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.November.short'),
        daysInMonth: 31,
        id: 10
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.December.text'),
        short: i18n.t('core.helpers.calendar.calendar.months.December.short'),
        daysInMonth: 30,
        id: 11
    },
    {
        text: i18n.t('core.helpers.calendar.calendar.months.April.short'),
        short: i18n.t('core.helpers.calendar.calendar.months.April.short'),
        daysInMonth: 31,
        id: 12
    }
];


// Functions

/**
 * Function used to parse the first date of the month and return the first monday in relevance.
 * @param {Date} firstDate - The first date of the month
 * @returns {Date} - The date of the first monday.
 * @example
 * // Set a test date
 * const testDate = "Sun Jul 01 2018 00:00:00 GMT+0100 (British Summer Time)"
 * 
 * // Get the First monday
 * const firstMonday = getFirstMonday(testDate);
 * 
 * // Log the first monday 
 * // Expect Mon Jun 25 2018 00:00:00 GMT+0100 (British Summer Time)
 * console.log(firstMonday);
 */
export const getFirstMonday = (firstDate) => {
    // Work out the offset of the first day
    // - Offset (Day - 1): (Monday = 2) - 1
    let offset = firstDate.getDay() - (2 - 1);
    
    // If the offset is less than 0
    if(offset < 0) {
        // Add 7 to the offset
        offset += 7;
    }

    // Create a new date from the first date
    let firstMonday = new Date(firstDate);

    // Set the new date minus the offset
    firstMonday.setDate(firstDate.getDate() - offset);
    
    // return the new date
    return firstMonday;
};

/**
 * Function used to parse the last date of the month and return the last Sunday in relevance.
 * @param {Date} lastDate - The last date of the month.
 * @returns {Date} - The date of the last sunday.
 * @example 
 * // Set the test date
 * const testDate = "Tue Jul 31 2018 00:00:00 GMT+0100 (British Summer Time)";
 * 
 * // Get the last sunday
 * const lastSunday = getLastSunday(testDate);
 * 
 * // Log the last sunday
 * // Expect Sun Aug 05 2018 00:00:00 GMT+0100 (British Summer Time)
 * console.log(lastSunday);
 */
export const getLastSunday = (lastDate) => {
    // Work out the offset
    const offset = 7 - lastDate.getDay();
    
    // Set a new date
    let lastSunday = new Date(lastDate);

    // Set the date to the last sunday
    lastSunday.setDate(lastDate.getDate() + offset);

    // Return the last sunday
    return lastSunday;
};

/**
 * Function used to take an array of days and attach an element (li) to each.
 * @param {Array} daysArr - Array of days
 * @return {Array} - The passed in array with the new data bound.
 * @example
 * // Define days
 * let days = [
 *     {
 *         text: "Mon",
 *         long: "Monday",
 *         id: 1
 *     },
 *     {
 *         text: "Tue",
 *         long: "Tuesday",
 *         id: 2
 *     },
 *     { 
 *         text: "Wed",
 *         long: "Wednesday",
 *         id: 3
 *     }];
 * 
 * // Create the days
 * days = createDays(days);
 * 
 * // Log out the new days
 * // Expect
 * let days = [
 *     {
 *         text: "Mon",
 *         long: "Monday",
 *         id: 1,
 *         element: HTMLElement
 *     },
 *     {
 *         text: "Tue",
 *         long: "Tuesday",
 *         id: 2
 *         element: HTMLElement 
 *     },
 *     { 
 *         text: "Wed",
 *         long: "Wednesday",
 *         id: 3
 *         element: HTMLElement 
 *     }];
 * 
 * console.log(days);
 */
export const createDays = (daysArr) => {
    
    // Loop through each day
    daysArr.forEach((currentDay) => {

        // Define the day item
        const item = document.createElement("li");
        // Add class definition
        item.classList.add("calendar__days-item");
//i18n.t('core.helpers.calendar.calendar.days.currentday.text'),
        // Create the child elements
        
        const children = `
            <p class="calendar__days-title">${currentDay.text}</p>
        `;
        
   /*
        const children = `
        <p class="calendar__days-title">${i18n.t('core.helpers.calendar.calendar.days.currentday', {currentday: currentDay.text})}</p>
    `;
*/
        // Append the child elements to the created item
        item.insertAdjacentHTML("beforeend", children);

        // Add the element to the current day
        currentDay.element = item;
    });


    // Return the days array
    return daysArr;
};

/**
 * Function used to create a div for the desired calendar day. 
 * (Creates day block for calendar)
 * @param {Object} blockData - The Data required to build the block.
 * @param {Object} blockData.date - Object containing information about the date.
 * @param {String} blockData.date.dateString - The date string for the block.
 * @param {Number} blockData.date.day - The Numeric value for the day.
 * @param {Object} blockData.date.month - The Month details
 * @param {String} blockData.date.month.text - The long version of the month title.
 * @param {String} blockData.date.month.short - The short version of the month title.
 * @param {Number} blockDate.date.month.daysInMonth - The Number of days in the month.
 * @param {Number} blockData.date.month.id - The Id for the block item.
 * @param {Number} blockData.date.year - The Year.
 * @param {Boolean} blockData.lastMonth - If the block day is in the previous month.
 * @param {Boolean} blockData.nextMonth - If the block day is in the next month. 
 * @returns {HTMLElement} - The Created HTML Element for the block. 
 * @example 
 * // Define block data
 * const blockData = {
 *     date: {
 *         dateString: "2018-07-17T23:00:00.000Z",
 *         day: 18,
 *         month: {
 *             text: "July",
 *             short: "Jul",
 *             daysInMonth: 31,
 *             id: 7
 *         },
 *         year: 2018
 *     }
 *     lastMonth: false,
 *     nextMonth: false
 * };
 * 
 * // Create the calendar block
 * // Expect a HTML Element
 * const element = createCalendarBlock(blockData);
 */
export const createCalendarBlock = (blockData) => {
    // Create Base wrapper
    const calendarBlock = document.createElement("div");

    // Add class identifier
    calendarBlock.classList.add("calendar__block");

    // Check if the date is today
    const isToday = moment(blockData.date.dateString).isSame(new Date(), 'day');
    
    // If the block is today
    if(isToday) {
        // Add a modifier class
        calendarBlock.classList.add("calendar__block--today");
    }

    // Check if the block is in the previous month
    if(blockData.lastMonth) {
        // Add a modifier class
        calendarBlock.classList.add("calendar__block--prev");
    }

    // Check if the block is in the next month
    if(blockData.nextMonth) {
        // Add a modifier class
        calendarBlock.classList.add("calendar__block--next");
    }
//${i18n.t('core.helpers.calendar.calendar.days.currentday', {currentday: currentDay.text})}
    // Define the block contents
    const calendarBlockContent = `
        <!-- Top -->
        <div class="calendar__block-top">
        <!--
        <span class="calendar__block-day">${i18n.t('core.helpers.calendar.calendar.days.currentday', {currentday: blockData.date.day})}</span>
        <span class="calendar__block-weekday">${blockData.date.dayString}</span>
        -->
            <span class="calendar__block-day">${blockData.date.day}</span>
            <span class="calendar__block-weekday">${i18n.t('core.helpers.calendar.calendar.days.currentday', {currentday: blockData.date.dayString})}</span>
       
        </div>
        <!-- / Top -->
        <!-- Block Content -->
        <div class="calendar__block-content">
            <!-- Content Added By JS -->
        </div>
        <!-- / Block Content -->
    `;

    // Insert the contents into the block
    calendarBlock.insertAdjacentHTML("beforeend", calendarBlockContent);

    // Return the calendar block element
    return calendarBlock;
};