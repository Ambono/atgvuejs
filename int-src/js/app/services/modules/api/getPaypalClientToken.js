import store from "../../../store/store";
import axios from "../../../../config/axios";
import { errorCheck } from "./helpers/errorCheck";
import { settings as appSettings } from "../../../../config/config";
import { getPaypalClientTokenApiPath } from "./helpers/apiPaths";
import  i18n  from '../../../../i18n-setup'; 

export const getPaypalClientToken = (apiEventBus) => {
    
    var errormessage={
        generrormsg:i18n.t('service.modules.api.paypalClienToken.generrormsg'), 
        }; 
        
    apiEventBus.$on("GetPaypalClientToken", (callback) => {
        // GetPaypalClientToken
        const request = axios.get(getPaypalClientTokenApiPath(appSettings.core.client));
    
        request.then((response) => {
            if(parseInt(response.data.errorCode) !== 0) {
                callback({ error: this.errormessage.generrormsg});
                return;
            }

            callback({ data: response.data});
        });

        request.catch((error) => {
            callback({ error: error.message });
        });
    });   
}