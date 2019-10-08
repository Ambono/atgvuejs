import store from "../../../store/store";
import axios from "../../../../config/axios";
import { errorCheck } from "./helpers/errorCheck";
import { settings as appSettings } from "../../../../config/config";
import { offerSeatsApiPath } from "./helpers/apiPaths";
import  i18n  from '../../../../i18n-setup';

export const offerSeats = (apiEventBus) => {

    var erromsg={       
        novalidoffer:i18n.t('service.modules.api.offerSeats.novalidoffer'), 
        erroroccured:i18n.t('service.modules.api.offerSeats.erroroccured') 
        }; 
    apiEventBus.$on("offerSeats", ({data, callback}) => {
        apiEventBus.$emit("extendProfileSession", () => {
            // Reset the session time
            store.commit("resetSesssionTime");

            const request = axios.post(offerSeatsApiPath(appSettings.core.client), data);

            request.then((response) => {
                const isError = errorCheck(response);
                if(!isError) {
                    const validOffers  = response.data.offers.filter((currentItem) => currentItem.id === 0);
                    if(validOffers.length > 0) {
                        callback({ offers: validOffers });
                    }
                    else {                     
                        callback({ error: erromsg.novalidoffer });
                    }
                    return;
                }

            callback({ error:erromsg.erroroccured });

               
            });
            
            request.catch((error) => {
                // Add Error Handling              
                callback({ error: erromsg.erroroccured });
            });
        });
    });

};