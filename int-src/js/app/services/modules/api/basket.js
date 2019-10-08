import { router } from "../../../../main";
import axios from "../../../../config/axios";
import store from "../../../store/store";
import { groupSeats, groupExtras, formatOffers, applyFees } from "./helpers/basket";
import { settings as appSettings } from "../../../../config/config";
import { getCheckOutApiPath } from "./helpers/apiPaths";

export const basket = (apiEventBus) => {

    apiEventBus.$on("retrieveBasket", (callback) => {
        const request = axios.get(getCheckOutApiPath(appSettings.core.client));
        const seatData = store.getters.getSeatData;

        request.then((response) => {
            const formattedOffers = formatOffers(response.data.offers);
            const seats = formattedOffers.seats;
            const extras = formattedOffers.extras;
            
            applyFees(seats, response.data.order.fees);


            // Group seats and extras
            const seatGroups = groupSeats(seats, seatData);
            const extraGroups = groupExtras(extras);
            
            // Get totals
            const orderDetails = { 
                total:  response.data.order.total,
                subTotal: response.data.order.sub_total
            }            

            // GDPR
            const gdprQuestions = response.data.gdpr_questions.map((currentItem) => {
                return {
                    id: currentItem.id,
                    name: `${currentItem.id}gdprQuestion`,
                    title: currentItem.description,
                    required: "true",
                    checked: false,
                    showError: false
                }
            });

            const deliveryMethods = response.data.dispatch_Methods;

            callback({seats, seatGroups, extraGroups, orderDetails, gdprQuestions, deliveryMethods });
        });

        request.catch((error) => {
            console.log(error);
        });
    });

};