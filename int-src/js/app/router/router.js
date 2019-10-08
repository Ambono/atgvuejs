/* Dependencies */ 
import VueRouter from "vue-router";
import { routes } from "./routes/routes";
import serviceBus from "../services/serviceBus";
import store from "../store/store";

/**
 * Function used to create a new router.
 * @function
 * @returns {Object} - A router instance.
 */
export const createRouter = () => {

    /* Create new router */
    const router = new VueRouter({
        mode: "history",
        routes: routes
    });

    // Route Guard
    // Used to protect routes
    // Description: Enhancements to handle application security
    router.beforeEach((to, from, next) => {

        // Check if the error page is requested
        if(to.name === "Error") {
            next();
            return;
        } 

        // Clear event stack to allow store to initialise before router
        setTimeout(() => {
            /**
            * Route Guards to Ensure Data is set prior to navigation.
            */
            serviceBus.$emit("checkSession", (sessionStatus) => {
                
				// No session, that is, the first visit.
				if (typeof sessionStatus === 'undefined')  {					
					store.dispatch("resetState")
                        .then(() => {
                            //var str = JSON.stringify(to, null, 4); 
                            //Console.log(str);
                            const showID = to.query.showID;
                            
                            const venueID = to.query.venueID;

                            const layoutID = to.query.layoutID;

                            const options = { showID, venueID, layoutID };

                            serviceBus.$emit("setQueryStringConfig", options);
                            serviceBus.$emit("createNewSession");
                       
					});
					
					return;
				}
                // If session has expired
                if(!sessionStatus) {
                    console.log("SESSION EXPIRED");
                    // Create new session
                    serviceBus.$emit("clearSession");
                    
                    return;
                }

                if((to.name === "showSelect" || to.name === "ticketSelect") && store.getters.getOfferedSeatsCache && !store.getters.getCheckoutStatus) {
                    serviceBus.$emit("basketResetWarning", {routeName: to.name});
                    return;
                }

                else if(to.name === "confirmation" && store.getters.getCheckoutStatus) {
                    serviceBus.$emit("clearSession", {
                        suppress: true
                    });
                    return;
                }

                else if(to.name === "ticketSelect") {
                    next();
                }

                // If checkout is complete hit the confirmation page till user requests the root
                else if(to.name !== "confirmation" && (store.getters.getCheckoutCompleteStatus === true)) {
                    router.push({ name: "confirmation"});                
                }

                // If show select and no ticket amount is selected
                else if(to.name === "showSelect" && (!store.getters.getTicketAmount)) {
                    console.log("Hit issue - Tickets not selected");
                    router.push({name: "ticketSelect"});
                }

                // If seat select and no show selected
                else if(to.name === "seatSelect" && (!store.getters.getChosenDate)) {
                    console.log("Hit Issue - Show not selected");
                    router.push({name: "showSelect"});
                }

                // If Add extras and no seat selected
                else if(to.name === "additionalExtras" && !store.getters.getOfferedSeatsCache) {
                    console.log("Hit issues - Seats not selected");
                    router.push({ name: "seatSelect"});
                }

                // If checkout and no seats selected
                else if(to.name === "checkout" && !store.getters.getOfferedSeatsCache) {
                    console.log("Hit issues - Seats not selected");
                    router.push({ name: "additionalExtras"});
                }

                // If confirmation and purchase is not completed
                else if(to.name === "confirmation" && !store.getters.getCheckoutCompleteStatus) {
                    console.log("Hit issue - Checkout is not complete");
                    router.push({ name: "checkout"});
                }

                // If route is valid
                else {
                    // Allow the route
                    next();
                }
            
            });
        }, 0);
            
    });


    return router;
}