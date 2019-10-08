/* Dependencies */ 
import axios from "axios";

/**
 * Axios HTTP Client module configuration.
 * @ignore
 */
import {settings as appSettings} from "./config";
import store from "../app/store/store";

// Create an instance of axios
const http = axios.create();

// AD API Details
// http.defaults.baseURL = window.location.protocol + "//" + window.location.host;
// http.defaults.baseURL = "http://staging-best-union.wearead.io";
// http.defaults.headers.common['Authorization'] = "Basic" + " " + btoa('ad' + ":" + 'weloveit');
// http.defaults.headers.common['Content-Type'] = "application/json";

// VT API Details
http.defaults.baseURL = appSettings.core.apiUrl;
http.defaults.headers.post['Content-Type'] = "application/json-patch+json";
http.defaults.headers.post['ACCEPT'] = "application/json-patch+json";


// Add interceptor
/**
 * Interceptor used to bind excID & excToken to API calls
 * More details: https://github.com/axios/axios#interceptors
 */
http.interceptors.request.use((config) => {
    const sessionData = store.getters.getSession;
    if(sessionData) {
        config.headers.ecxId = sessionData.ecxId;
        config.headers.ecxToken = sessionData.ecxToken;

        return config;
    }
    else {
        return config;
    }
});

export default http;