/* Dependencies */ 
import store from "../../../store/store";
import apiEventBus from "../../apiEventBus";

// Placeholder for loader
let loader;

/**
 * Service used to clear the session.
 * @function
 * @ignore
 * @param {Object} serviceBus - The service bus to be bound to.
 */
export const shows = (serviceBus) => {
    
    // Clear 
    serviceBus.$on("deleteCalendarCache", (callback) => {
        // Delete the stored calendar cache
        store.commit("removeCalendarCache");
        if(callback) { callback() };
    });


    serviceBus.$on("fetchCalendar", () => {
        // Get Calendar
        apiEventBus.$emit("retrieveShows", ({
            callback: (calendarData, error) => {

                if (error) {
                    serviceBus.$emit("clearSession");
                }

            // Set the calendar
            store.commit("setCalenderData", calendarData);
        }}));
    });

    serviceBus.$on("showsSetChosenShow", ({item, callback}) => {
        // Set the chosen item
        store.commit("setChosenDate", item);
        store.commit("removeExtras");
        serviceBus.$emit("seatMapClearCache");
        callback();
    })

}