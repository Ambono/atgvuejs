import store from "../../../store/store";
import apiEventBus from "../../apiEventBus";
import { router } from "../../../../main";
import {PayPal} from "../../../../core/objects/PayPal";
import { settings as appSettings } from "../../../../config/config";
import  i18n  from '../../../../i18n-setup'; 

/**
 * Service used to handle checkout interaction. 
 * @function
 * @ignore
 * @param {Object} serviceBus - The service bus to be bound to.
 */

export const checkout = (serviceBus) => {    
  
       var basketerrmsg = i18n.t('service.modules.service.checkout.basketerrmsg');
       var generrormsg = i18n.t('service.modules.service.checkout.generrormsg');        
       var tdseccallbackerrmsg = i18n.t('service.modules.service.checkout.tdseccallbackerrmsg')
       
       
    serviceBus.$on("preparePaypalData", (callback) => {
        const Ticketsto= i18n.t('service.modules.service.checkout.Ticketsto');
        const ExtrasPackages = i18n.t('service.modules.service.checkout.ExtrasPackages');
        // Get the form data
        // const formData = store.getters.getCheckoutFormData;
        const basketTotal = store.getters.getBasketTotal;
        const basketExtras = store.getters.getBasketExtras;
        const basketSeats = store.getters.getBasketSeats;
        const eventData = store.getters.getEventData;
       
        callback({
            flow: "vault",
            amount: basketTotal.toFixed(2),
            currency: 'GBP',
            enableShippingAddress: true,
            billingAgreementDescription: `
                ${basketSeats.length} x ${Ticketsto} ${eventData.title},
                \n${basketExtras.length} x ${ExtrasPackages}.
            `
        });

    });

    serviceBus.$on("GetPaypalClientToken", (callback) => {
        apiEventBus.$emit("GetPaypalClientToken", callback);
    });

    serviceBus.$on("savePatronAndMakePayment", ({data, callback}) => {
        apiEventBus.$emit("savePatronAndMakePayment", { data, callback: ({error, bookingRef}) => {
            if(error) {
                callback({error});
                return;
            }

            // set address in state from returned data
            store.commit("setDeliveryAddress", {
                addressLine1: data.details.shippingAddress.line1,
                addressLine2: "",
                townCity: data.details.shippingAddress.city,
                county: data.details.shippingAddress.state, 
                postcode: data.details.shippingAddress.postalCode,
                country: data.details.shippingAddress.countryCode
            });
            
            // Commit booking ref and mark as success.
            store.commit("basketSetBookingRef", bookingRef);
            store.commit("setCheckoutSuccess");
            // Reset the session time
            store.commit("resetSesssionTime");
            serviceBus.$emit("basketRemoveTimeout");

            // Push to confirmation view.
            router.push({ name: "confirmation" });
        }});
    });

  

    serviceBus.$on("checkoutCard", ({ formData, callback }) => {

        store.commit("setCheckoutFormData", formData);
        let basketSeatvalues = store.getters.getBasketSeats;

        if (basketSeatvalues.length === 0) {
            console.log("basketSeatvalues", basketSeatvalues);                  
            callback({ error: generrormsg + basketerrmsg });
            return;
        }
        
        let isthreed=appSettings.core.IsThreeD;
      
        if(isthreed)   {
         
            apiEventBus.$emit("postCheckOut3D", ({ status, bookingRef, errorText, enableButton,responsedata }) => {
                if (status === true) {
                    store.commit("set3dCheckout",responsedata);
                    if(responsedata.iccData.length === 0 && responsedata.errorCode === 0 ){
                        store.commit("basketSetBookingRef", bookingRef);
                        // Reset the session time
                        store.commit("resetSesssionTime");
                        store.commit("setCheckoutSuccess");
                        serviceBus.$emit("basketRemoveTimeout");
                        router.push({ name: "confirmation" }); 
                    }
                    else{
                        callback({msg:tdseccallbackerrmsg ,error: "",enableButton});                     
                    }
    
    
                    store.commit("basketSetBookingRef", bookingRef);
                    // Reset the session time
                    store.commit("resetSesssionTime");
 
                }
                else {                  
                    callback({ error: generrormsg  + errorText, enableButton });
                }
    
            });
    
            }
            else {

                apiEventBus.$emit("postCheckoutCardPaymentStage1", ({ status, bookingRef, errorText, enableButton }) => {
 

                    if (status === true) {
                        store.commit("basketSetBookingRef", bookingRef);
                        // Reset the session time
                        store.commit("resetSesssionTime");
                        //store.commit("setCheckoutSuccess");
                        //serviceBus.$emit("basketRemoveTimeout");
        
                        //router.push({ name: "confirmation" });
        
                        apiEventBus.$emit("postCheckoutCardPaymentStage2", ({ status, errorText }) => {
        
                            if (status === true) {
                                store.commit("setCheckoutSuccess");
                                serviceBus.$emit("basketRemoveTimeout");
        
                                router.push({ name: "confirmation" });
                            }
                            else {                             
                                callback({ error: generrormsg   + errorText });
                            }
        
                        });
        
        
                    }
                    else {                     
                        callback({ error:generrormsg   + errorText, enableButton });
                    }
        
                });
            }
       



    });

    serviceBus.$on("retrieveConfirmation", (callback) => {
        apiEventBus.$emit("retrieveConfirmation", ({orderNumber, deliveryMethod, seats, seatGroups, extraGroups, orderDetails}) => {

            store.commit("setBasketSeats", seats);
            store.commit("setBasketSeatGroups", seatGroups);
            
            store.commit("setBasketExtras", extraGroups);
            store.commit("setBasketTotal", orderDetails.total);
            
            store.commit("basketSetBookingRef", orderNumber);

            callback();
        }); 
    });

    serviceBus.$on("setCheckoutComplete", (value) => {
        store.commit("setCheckoutStatus", value);
    });

    serviceBus.$on("setCheckoutFormError", (error) => {
        store.commit("setCheckoutFormError", error);
    });
    
}