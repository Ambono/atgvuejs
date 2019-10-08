import store from "../../../store/store";
import axios from "../../../../config/axios";
import serviceBus from "../../serviceBus";
import { settings as appSettings } from "../../../../config/config";
import { savePatronAndMakeBookingExternalPaymentApiPath } from "./helpers/apiPaths";
import * as Sentry from '@sentry/browser';
import  i18n  from '../../../../i18n-setup';

export const savePatron = (apiEventBus) => {

    var errormessage={
        errmsgpart1:i18n.t('service.modules.api.savePatron.errmsgpart1'), 
        errmsgpart2:i18n.t('service.modules.api.savePatron.errmsgpart2'), 
        errmsgpart3:i18n.t('service.modules.api.savePatron.errmsgpart3'), 
        };  

    apiEventBus.$on("savePatronAndMakePayment", ({data, callback}) => {
        // Get the original form data
        const gdprQuestions = store.getters.getCheckoutGDPR;
        const deliveryMethod = store.getters.getBasketDeliveryMethod;
        const basketTotal = store.getters.getBasketTotal;

        const request = axios.post(savePatronAndMakeBookingExternalPaymentApiPath(appSettings.core.client), {
            client: appSettings.core.client, 
            customer_ui_model: {
                first_name: data.details.firstName,
                last_name: data.details.lastName,
                delivery_address: {
                    street1: data.details.shippingAddress.line1,
                    city: data.details.shippingAddress.city,
                    state: data.details.shippingAddress.state,
                    postcode: data.details.shippingAddress.postalCode,
                    country: data.details.shippingAddress.countryCode
                },
                billing_address: {
                    street1: data.details.shippingAddress.line1,
                    city: data.details.shippingAddress.city,
                    state: data.details.shippingAddress.state,
                    postcode: data.details.shippingAddress.postalCode,
                    country: data.details.shippingAddress.countryCode
                },
                email: data.details.email,
                phone: data.details.phone
            },
            gdpr_question_answers: gdprQuestions.map((currentQuestion) => {
                return {
                    id: currentQuestion.id,
                    answer: currentQuestion.checked
                }
            }),
            dispatch_method_id: deliveryMethod.value,
            cardExternalPaymentModel: {
                nonce: data.nonce,
                payerId: data.details.payerId,
                payment_amount: basketTotal.toFixed(2)
            }
        });

        request.then((response) => {
            if (parseInt(response.data.errorCode) !== 0) {
                let errmsg='';
                Sentry.captureException(new Error(response.data.errorText));
                if( response.data.booking_references_no===0)
                 errmsg = this.errormessage.errmsgpart1 + response.data.errorText + this.errormessage.errmsgpart2 + appSettings.core.phoneNumber
                 else
                 errmsg = this.errormessage.errmsgpart1 + response.data.errorText + this.errormessage.errmsgpart2 + appSettings.core.phoneNumber + this.errormessage.errmsgpart3 + response.data.booking_references_no;
                 
                callback({ error: errmsg});
                return;
            }
            callback({success: true, bookingRef: response.data.booking_references_no});
        });

        request.catch((error) => {
            callback({ error: error.message });
        });

    });

};