import store from "../../../store/store";
import axios from "../../../../config/axios";
import { groupSeats, groupExtras, formatOffersConfirmation, applyFees } from "./helpers/basket";
import { settings as appSettings } from "../../../../config/config";
import { confirmationApiPath } from "./helpers/apiPaths";


export const retrieveConfirmation = (apiEventBus) => {


    apiEventBus.$on("retrieveConfirmation", (callback) => {
        
        const bookingRef = store.getters.getBookingRef;
         // Get the seat data
         const seatData = store.getters.getSeatData;

        const request = axios.get(confirmationApiPath(appSettings.core.client), {
            params: {
                "bookingReferenceNumber": bookingRef
            }
        });

        request.then((response) => {
            const formattedOffers = formatOffersConfirmation(response.data.basket.lines);

            const seats = formattedOffers.seats;
            const extras = formattedOffers.extras;
            
            applyFees(seats, response.data.booking.fees);

            const seatGroups = groupSeats(seats, seatData);
            const extraGroups = groupExtras(extras);            

            // Get totals
            const orderDetails = { 
                total:  response.data.booking.total,
                subTotal: response.data.booking.sub_total
            }   

            const deliveryMethod = response.data.despatch_method;
            const orderNumber = response.data.order_no;

            callback({ orderNumber, deliveryMethod, seats, seatGroups, extraGroups, orderDetails });
            
        });

        request.catch((error) => {
            console.log(error);
        });
    });

}