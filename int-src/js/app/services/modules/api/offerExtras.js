import store from "../../../store/store";
import axios from "../../../../config/axios";
import { settings as appSettings } from "../../../../config/config";
import { offerExtrasApiPath } from "./helpers/apiPaths";

export const offerExtras = (apiEventBus) => {

    apiEventBus.$on("offerExtras", (callback) => {
        // Current Extras
        const activeExtras = store.getters.getActiveExtras;

        if(activeExtras.length < 1) {
            callback();
            return;
        }

        const request = axios.post(offerExtrasApiPath(appSettings.core.client),
            {
            client: appSettings.core.client,
            extras: activeExtras.map((currentExtra) => {
                return {
                    id: currentExtra.id,
                    description: currentExtra.description,
                    discount_group_code: currentExtra.prices[0].discount_group_code,
                    discount_code: currentExtra.prices[0].code,
                    quantity: currentExtra.quantity
                }
            })
        });

        request.then((response) => {
            if(response.data.offer_extras_results.filter((currentItem) => currentItem.error_code !== 0).length > 0) {
                console.log("AN Error Occured On Extras");
                return;
            }

            callback();
        });
        
        request.catch((error) => {
            // Add Error Handling
        });
    });
    


};