/* Dependencies */ 
import { CookieWarning } from "../../objects/CookieWarning";
import { animateIn, animateOut } from "../../helpers/cookieWarning/cookieWarning";
import i18n from "../../../i18n-setup";

/**
 * Function used to initiate the cookie warning.
 * @function
 */
export const initCookieWarning = function() {
    // Lookup the cookie warning
    const cookieWarningElement = document.querySelector("[data-cookie-warning]");
    const acceptBTN=  i18n.t('modals.cookies.data-accept');
    const cookietitle = i18n.t('modals.cookies.cookiewarningtitle');
    const warningtext = i18n.t('modals.cookies.cookiewarningtext');
    // If the warning exists
    if(cookieWarningElement) {
        // Create a new cookie warning instance
        document.querySelector("[cookie-warning__text]").innerHTML = warningtext
        document.querySelector("[cookie-warning__title]").innerHTML = cookietitle
        document.querySelector("[data-accept]").innerHTML = acceptBTN

        const cookieWarning = new CookieWarning(cookieWarningElement, {
            animateIn,
            animateOut
        });

        // Check if cookies have not been accepted
        if(!cookieWarning.checkStatus()) {
            // Show the cookie warning
            cookieWarning.showCookieWarning();
        }
    }
};