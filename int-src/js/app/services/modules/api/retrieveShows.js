/* Dependencies */ 
import moment from "moment";
import axios from "../../../../config/axios";
import { settings as appSettings } from "../../../../config/config";
import store from "../../../store/store";
import { showSummaryApiPath, calendarApiPath } from "./helpers/apiPaths";


/**
 * Function used to format the calendar data.
 * @function
 * @ignore 
 */
const formatCalendarData = (results) => {
    return new Promise((resolve) => {
        // Store the data
        const data = results;

        /*
            // Format the data to the below format
            {
                timestamp: ,
                years: ["2018", "2019"],
                performances: {
                    2018: {
                        6: {
                            // June
                            monthDetails: {
                                name: "Jun",
                                year: 2018,
                                month: 6,
                                fromPrice: 30.5
                            },
                            performances: []
                        }, 
                        7: {
                            // July
                            monthDetails: {
                                name: "Jul",
                                year: 2018,
                                month: 7,
                                fromPrice: 30.5
                            },
                            performances: []
                        }
                    },
                    6: {
                            // June
                            monthDetails: {
                                name: "Jun",
                                year: 2018,
                                month: 6,
                                fromPrice: 30.5
                            },
                            performances: []
                        }, 
                        7: {
                            // July
                            monthDetails: {
                                name: "Jul",
                                year: 2018,
                                month: 7,
                                fromPrice: 30.5
                            },
                            performances: []
                        }
                }
            }
        */

        // Set base object to store formatted results
        const formattedData = {
            timestamp: moment().format(),
            years: [],
            performances: {}
        };

        // Loop through the performances & Create years array
        data.performances.forEach((currentItem) => {
            
            // Format Date & Get year
            const date = moment(currentItem.datetime).toDate();
            const year = date.getFullYear();
            
            // Add a new date property to the item
            currentItem.date = {
                year,
                month: date.getMonth() + 1,
                day: date.getDate()
            };

            // Check if year is not already present
            if(formattedData.years.indexOf(year) == -1) {
                // Add year to the years array
                formattedData.years.push(year);
                // Create a property object for the year within performanes
                formattedData.performances[year] = {};
            } 
        });

        // Loop through each year and format the data
        formattedData.years.forEach((currentYear) => {
            
            // Filter out items relevant to the year
            const yearItems = data.performances.filter((currentPerformace) => currentPerformace.date.year === currentYear);

            // Store months
            const months = [];

            // Loop through each year item
            yearItems.forEach((currentItem) => {                

                // Check if the year has not got a month property defined
                if(!formattedData.performances[currentYear][currentItem.date.month]) {
                    // Create the month property
                    formattedData.performances[currentYear][currentItem.date.month] = {};
                    // Create the perfromances property for each item to be added to
                    formattedData.performances[currentYear][currentItem.date.month].performances = [];
                    // Store the month
                    months.push(currentItem.date.month);
                }

                // Push the item to the month array
                formattedData.performances[currentYear][currentItem.date.month].performances.push(currentItem);
            });

            // Loop through the months
            months.forEach((currentMonth) => {
                // Filter the lowest from price
                const fromPrice = formattedData.performances[currentYear][currentMonth].performances.reduce((item1, item2) => item1.min_price < item2.min_price ? item1 : item2);
                
                // Form the month details object
                const monthDetails = {
                    name: moment.monthsShort(currentMonth - 1),
                    fullName: moment().month(currentMonth - 1).format("MMMM"),
                    year: currentYear,
                    month: currentMonth,
                    fromPrice: fromPrice.min_price.toFixed(2)
                }

                // Store the months detaails to the original array
                formattedData.performances[currentYear][currentMonth].monthDetails = monthDetails;
            });
        });

        resolve(formattedData);

    })
    
};

/**
 * Service used to retrieve show information.
 * @function
 * @ignore
 * @param {Object} apiEventBus - The service bus to be bound to.
 */
export const retrieveShows = (apiEventBus) => {

    apiEventBus.$on("retrieveShows", ({ callback }) => {

        const numOfSeats = store.getters.getTicketAmount;

        const startDate = moment().format("YYYY-MM-DD");
        const endDate = moment().add(2, 'years').format("YYYY-MM-DD");

        const showID = store.getters.getShowID; 

        const request = axios.get(calendarApiPath(appSettings.core.client, showID, startDate, endDate, numOfSeats));


        request
            .then((response) => {
            formatCalendarData(response.data)
            .then((calendarData) => callback(calendarData));
            })
            .catch(function (error) {
                if (error.response) {
                    if (error.response.status === 500) {
                        callback(null, error);
                    }
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

    });
}