/* Dependencies */ 
import axios from "../../../../config/axios";
import moment from "moment";
import { settings as appSettings } from "../../../../config/config";
import { showApiPath } from "./helpers/apiPaths";
import store from "../../../store/store";

/**
 * Service used to retrieve profile information.
 * @function
 * @ignore
 * @param {Object} apiEventBus - The service bus to be bound to.
 */
export const retrieveEventData = (apiEventBus) => {

    apiEventBus.$on("retrieveEventData", (callback) => {
        // Retieve the event data
		const request = axios.get(showApiPath(appSettings.core.client, store.getters.getShowID));

        // Success
        request.then((response) => {
            const eventData = response.data;
            callback({
                showId: eventData.show_id,
                title: eventData.title,
                venue: {
                    ...eventData.venue,
                    mapURL: `http://maps.google.com/?q=${encodeURIComponent(eventData.venue.address)}`
                }
            });
        });

        request.catch((error) => {
            // Add Error Handling
            console.log(error);
        });
    });
}