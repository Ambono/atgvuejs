/* Dependencies */
import TicketSelect from '../../views/TicketSelect.vue';
import ShowSelect from "../../views/ShowSelect.vue";
import SeatSelection from "../../views/SeatSelection.vue";
import AdditionalExtras from "../../views/AdditionalExtras.vue";
import Checkout from "../../views/Checkout.vue";
import Confirmation from "../../views/Confirmation.vue";
import ErrorPage from "../../views/Error.vue";
import Main from "../../views/Main.vue";

// Define Routes
export const routes = [
    
    // Catch case
    {
        path: "*",
        redirect: "/error/404"
    },

    // Error page
    {
        name: "error",
        path: "/error/:type",
        component: ErrorPage,
        props: true
    },

    // Main Route
    {
        path: "/",
        name: "book",
        component: Main,
        redirect: "/ticket-select",
        props: true,
        children: [

            // Ticket Selection
            {
                name: "ticketSelect",
                path: "ticket-select",
                components: {
                    TicketSelect
                }
            },
 
            // Show Selection
            {
                name: "showSelect",
                path: "show-select",
                components: {
                    ShowSelect
                }
            },

            // Seat Selection
            {
                name: "seatSelect",
                path: "seat-select",
                components: {
                    SeatSelection
                }
            },

            // Additional Extras
            {
                name: "additionalExtras",
                path: "extras",
                components: {
                     AdditionalExtras
                }
            },

            // Checkout
            {
                name: "checkout",
                path: "checkout",
                components: { 
                    Checkout
                }
            }

        ]
    },

    // Confirmation
    {
        name: "confirmation",
        path: "/confirmation",
        component: Confirmation
    }    
];
