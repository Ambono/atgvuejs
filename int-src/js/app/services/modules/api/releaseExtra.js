import store from "../../../store/store";
import axios from "../../../../config/axios";
import { settings as appSettings } from "../../../../config/config";
import { releaseExtraApiPath, releaseExtrasApiPath } from "./helpers/apiPaths";

export const releaseExtras = (apiEventBus) => {

    apiEventBus.$on("releaseExtra", ({id, stockId, callback}) => {

        // Create the requests
        const request = axios.post(releaseExtraApiPath(appSettings.core.client), {
            client: appSettings.core.client,
            offer_id: id,
            offered_stock_sequence_number: stockId
        });

        request.then((response) => {
            callback();
        });

        request.catch((error) => {
            console.log("error", error);
        });
    });


    apiEventBus.$on("releaseExtras", (callback) => {
        const basketExtras = store.getters.getBasketExtras;
        
        if(!basketExtras) {
            callback();
            return;
        }

        const request = axios.post(releaseExtrasApiPath(appSettings.core.client), {
            client: appSettings.core.client,
            freeExtraOffersInputs: basketExtras.map((currentExtra) => {
                return {
                    offer_id: currentExtra.offerId,
                    offered_stock_sequence_number: currentExtra.stockId,
                    client: appSettings.core.client
                }
            })
            
        });

        request.then((response) => {
            callback();
        });

        request.catch((error) => {
            console.log(error);
        });
    });
}