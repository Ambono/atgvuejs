import store from "../../../store/store";
import axios from "../../../../config/axios";
import { settings as appSettings } from "../../../../config/config";
import { releaseOfferApiPath } from "./helpers/apiPaths";

export const releaseOffer = (apiEventBus) => {

    apiEventBus.$on("releaseSeatOffers", ({data, callback}) => {

        if(!data) {
            callback();
            return;
        }

        // Create the requests
        const request = Promise.all([...data.map((currentGroup) => {
            return (() => {

                const firstSeatId = currentGroup.firstSeatIndex;
                if (firstSeatId > currentGroup.lastSeatIndex) {
                    
                    currentGroup.firstSeatIndex = currentGroup.lastSeatIndex;
                    currentGroup.lastSeatIndex = firstSeatId;
                }

				return axios.post(releaseOfferApiPath(appSettings.core.client), currentGroup);
				
            })();
        })]);

        request.then((response) => {
            callback();
        });

        request.catch((error) => {
            console.log("error", error);
        });
    });

}