/* Dependencies */ 
import axios from "../../../../config/axios";
import moment from "moment";
import { settings as appSettings } from "../../../../config/config";
import { ErrorHandler } from "../../../../core/objects/ErrorHandler";
import { profileApiPath, profileOpenUserSessionApiPath, getAllLocationsApiPath } from "./helpers/apiPaths";
import store from "../../../store/store";

const errorHandler = new ErrorHandler();

/**
 * Service used to retrieve profile information.
 * @function
 * @ignore
 * @param {Object} apiEventBus - The service bus to be bound to.
 */
export const retriveProfile = (apiEventBus) => {

    apiEventBus.$on("retrieveProfile", (callback) => {

        const requestData = {
            "client": appSettings.core.client
        };

        const request = axios.post(profileApiPath(appSettings.core.client), requestData);

        request.then((response) => {
            callback({
                ecxId: response.data.ecxId,
                ecxToken: response.data.ecxToken,
                timeStamp: moment().format()
            });
        });

        request.catch((error) => {
            // Add Error Handling
            console.log("Error Type", error.response);
            // errorHandler.sendToErrorPage({
            //     message: response.error, 
            //     type: 
            // })
            
            return;
        });
    });


    apiEventBus.$on("extendProfileSession", (callback) => {
        const request = axios.get(getAllLocationsApiPath(appSettings.core.client, store.getters.getShowID));

        request.then((response) => {
           callback();
        });

        request.catch((error) => {
            console.log(error);
        });
    });
}