import store from "../../../store/store";
import axios from "../../../../config/axios";
import { settings as appSettings } from "../../../../config/config";
import { postCheckOutStage1ApiPath } from "./helpers/apiPaths";
import { PhoneNumber } from "../../../../core/objects/PhoneNumber";
import { Encrypt } from "../../../../core/objects/Encryption";
import * as Sentry from '@sentry/browser';
import CryptoJS from "crypto-js";
import  i18n  from '../../../../i18n-setup';



export const postCheckOutStage1 = (apiEventBus) => {
    
    apiEventBus.$on("postCheckoutCardPaymentStage1", (callback) => {
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
        
        const request = axios.post(postCheckOutStage1ApiPath(appSettings.core.client), requestData);
        var errormsg = i18n.t('service.modules.api.postCheckoutStage1.errmsg')

        request.then((response) => {
           // response.data.errorCode = 10;
           
            // Check if it was successfull
            if(response.data.errorCode !== 0) {
                console.log("error: ", response.data.errorText);
                Sentry.captureException(new Error(response.data.errorText));
                const errmsg = errormsg + response.data.errorText;
                callback({ status: false, bookingRef: response.data.booking_references_no, errorText: errmsg, enableButton: false });
                return;
            }
            
            callback({status: true, bookingRef: response.data.booking_references_no,responsedata:response.data });
        });

        request.catch((error) => {
            console.log(error);
            const errmsg = errormsg + error;
            Sentry.captureException(new Error(errmsg));
            callback({ status: false, errorText: errmsg, enableButton: false });
        });
    });
}