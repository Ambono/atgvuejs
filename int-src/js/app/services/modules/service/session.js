/* Dependencies */ 
import store from "../../../store/store";
import { router } from "../../../../main";
import { Loading } from "../../../../core/objects/Loading";
import { sessionTimeout } from "../../../../core/implementation/sessionTimeout/sessionTimeout";
import apiEventBus from "../../apiEventBus";
import { checkCache } from "../../../../core/helpers/checkCache";
import  i18n  from '../../../../i18n-setup'; 
// Placeholder for loader
let loader;

/**
 * Service used to clear the session.
 * @function
 * @ignore
 * @param {Object} serviceBus - The service bus to be bound to.
 */
export const session = (serviceBus) => {
    
    // Clear 
    serviceBus.$on("clearSession", (options) => {

        
        const sessionExpiredElement = document.querySelector("[data-session-expired]");
        
        // Assign the session timeout instance to the view.
        const modal = sessionTimeout(sessionExpiredElement);
    
        modal.handleClick = () => {
            store.dispatch("resetState")
            .then(() => {
                serviceBus.$emit("createNewSession");
            });
        };
        
        // Bypass modal
        if(options && options.suppress === true) {
            modal.handleClick();
        }
        else {
            modal.open();
        }
    });

    serviceBus.$on("createNewSession", (options) => {
        console.log("NEW SESSION");
        // Create a new loader
        loader = new Loading(document.querySelector("body"), {
            title: i18n.t('modals.session.createsession'),
            icon: "ticket"
        });

        // Insert the loader 
        loader.insert();

        // Create the requests
        const createSession = Promise.all([
            (() => { 
                return new Promise((resolve) => {
                    // Create Profile
                    apiEventBus.$emit("retrieveProfile", ((session) => {
                        store.commit("updateSession", session);
                        resolve();
                    }));
                })
                .then(() => {
                    return new Promise((resolve) => {
                        // Retrieve Event Data
                        apiEventBus.$emit("retrieveEventData", (eventData) => {
                            store.commit("setEventDetails", eventData);
                            resolve();
                        });
                    });
                })
            })()
        ]);
        
        createSession.then(() => {
            // Navigate to the ticket select step
            router.push({ name: "ticketSelect"});
            
            // Remove the loader
            loader.remove();
        });
        
    });

    serviceBus.$on("checkSession", (callback) => {
        const session = store.getters.getSession;
        // Valid 1 hour
        const sessionStatus =  (session) ? checkCache(session.timeStamp, 20) : undefined;
        
        callback(sessionStatus);
    });

    serviceBus.$on("setQueryStringConfig", (options) => {
        const showID = options.showID;
        const layoutID = options.layoutID;
        const venueID = options.venueID;

        if (showID) {
            store.commit("setShowID", showID);
            store.commit("setLayoutID", layoutID);
            store.commit("setVenueID", venueID);
        }
    });
}