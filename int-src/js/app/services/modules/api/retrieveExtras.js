/* Dependencies */ 
import axios from "../../../../config/axios";
import { settings as appSettings } from "../../../../config/config";
import { listExtrasApiPath } from "./helpers/apiPaths";

/**
 * Function used to format the extras data.
 * @function
 * @ignore
 */
const formatExtrasData = (data) => {
    return new Promise((resolve) => {
        // Store the data
        const formattedData = data.extras.filter(extra => appSettings.core.blockExtrasIDs.indexOf(extra.id) === -1);

        // Loop through each item
        formattedData.forEach((extraItem) => {

            extraItem.title = extraItem.description;

            // Add quantity property
            extraItem.quantity = 0;

            // Get the layout
            const layout = extraItem.attributes.filter((item) => item.type === "layout");
        
            // Get the quantity limit
            const quantityLimit = extraItem.attributes.filter((item) => item.type === "max_quantity");

            /** Create the options
             * Layout - The layout type (full, half, horizontal).
             * MaxQuantity - The max number of items thta can be added.
             */
            extraItem.options = {
                layout: (layout.length > 0) ? layout[0].value : undefined,
                maxQuantity: (quantityLimit.length > 0) ? quantityLimit[0].value : appSettings.extraItems.maximumExtraItems  
            }
        });

        // Filter out invalid items
        const filteredResults = formattedData.filter((currentFilter) => currentFilter.prices.length > 0 && currentFilter.prices[0].unit_price);

        resolve(filteredResults);
    });
};

/**
 * Service used to retrieve extras information.
 * @function
 * @ignore
 * @param {Object} apiEventBus - The service bus to be bound to.
 */
export const retreiveExtras = (apiEventBus) => {


    apiEventBus.$on("retrieveExtras", (callback) => {
        // Form the request
        const request = axios.get(listExtrasApiPath(appSettings.core.client));
        
        request.then((data) => {
            // Format the data
            formatExtrasData(data.data)
            .then((formattedData) => {
                callback(formattedData);
            });
        });

        request.catch((error) => {
            // Add Error Handling
        });
    });
}