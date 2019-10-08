import store from "../../../store/store";
import axios from "../../../../config/axios";
import { settings as appSettings } from "../../../../config/config";
import { postCheckOutApiPath } from "./helpers/apiPaths";
import { PhoneNumber } from "../../../../core/objects/PhoneNumber";
import * as Sentry from '@sentry/browser';
import  i18n  from '../../../../i18n-setup'; 

export const postCheckOut = (apiEventBus) => {   
  
    var errormessage={
         errmsgpart1:i18n.t('service.modules.api.postCheckout.errmsgpart1'),
         errmsgpart2:i18n.t('service.modules.api.postCheckout.errmsgpart2') 
        };  

    apiEventBus.$on("postCheckoutCardPayment", (callback) => {
        const checkoutDetails = store.getters.getCheckoutFormData;
        const gdprQuestions = store.getters.getCheckoutGDPR;
        const deliveryMethod = store.getters.getBasketDeliveryMethod;
        const ticketInsurance = store.getters.getBasketTicketInsurance;
        const basketTotal = store.getters.getBasketTotal;
        const phoneNumber = new PhoneNumber(checkoutDetails.details.phoneNumber, checkoutDetails.details.phoneNumberCountry);

        const requestData = {
            "client": appSettings.core.client,
            "customer_ui_model": {
                "first_name": checkoutDetails.details.firstName,
                "last_name": checkoutDetails.details.lastName,
                "phone": phoneNumber.internationalPhoneNumber,
                "billing_address": {
                    "street1": checkoutDetails.billing.addressLine2 === '' ? checkoutDetails.billing.addressLine1 : checkoutDetails.billing.addressLine1 + "\r\n" + checkoutDetails.billing.addressLine2,
                    "city": checkoutDetails.billing.townCity,
                    "state": checkoutDetails.billing.county,
                    "postcode": checkoutDetails.billing.postcode,
                    "country": checkoutDetails.billing.country
                },
                "email": checkoutDetails.details.emailAddress
            },
            "gdpr_question_answers": gdprQuestions.map((currentQuestion) => {
                return {
                    id: currentQuestion.id,
                    answer: currentQuestion.checked
                }
            }),
            "dispatch_method_id": deliveryMethod.value,
            "cardDetailsModel": {
                "name_of_card": checkoutDetails.cardDetails.cardName,
                "payment_amount": basketTotal,
                "card_number": checkoutDetails.cardDetails.cardNumber,
                "expiry_date": `${checkoutDetails.cardDetails.edMonth}${checkoutDetails.cardDetails.edYear}`,
                "card_security_code": checkoutDetails.cardDetails.securityCode
            }
        };

        if(deliveryMethod.delivery_address_required) {
            requestData.customer_ui_model.delivery_address = {
                "street1": checkoutDetails.delivery.addressLine2 === '' ? checkoutDetails.delivery.addressLine1 : checkoutDetails.delivery.addressLine1 + "\r\n" + checkoutDetails.delivery.addressLine2,
                "city": checkoutDetails.delivery.townCity,
                "state": checkoutDetails.delivery.county,
                "postcode": checkoutDetails.delivery.postcode,
                "country": checkoutDetails.delivery.country
            };
        }
        
        const request = axios.post(postCheckOutApiPath(appSettings.core.client), requestData);

        request.then((response) => {

       
            // Check if it was successfull
            if(response.data.errorCode !== 0) {
                console.log("error: ", response.data.errorText);
                Sentry.captureException(new Error(response.data.errorText));
                const errmsg = this.errormessage.errmsgpart1 + appSettings.core.phoneNumber + this.errormessage.errmsgpart2 + response.data.booking_references_no;
                callback({ status: false, bookingRef: response.data.booking_references_no, errorText: errmsg });
                return;
            }
            
            callback({status: true, bookingRef: response.data.booking_references_no});
        });

        request.catch((error) => {
            console.log(error);
        });
    });
}