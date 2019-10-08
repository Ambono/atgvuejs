/* Dependencies */ 
import moment from "moment";

/**
 * Function used to check if a cache is valid.
 * @param {Date} timestamp - The timestamp to be checked.
 * @param {Number} validLength - The number in minutes the cache is valid for.
 */
export const checkCache = (timestamp, validLength) => {
    
    // Get the current timestamp
    const timeDiff = moment().diff(timestamp, "seconds");

    // If the data is more than 5 minutes out of sync
    if(timeDiff > (validLength * 60) || !timestamp) {
        // Return false
        return false;
    }

    // Return the cache is valid
    return true;
};