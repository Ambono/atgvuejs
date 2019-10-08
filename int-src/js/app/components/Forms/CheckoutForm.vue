<template>
    <!-- Form -->
    <form action="#" method="POST" class="form">

        <!-- Error Messages -->
        <error-messages :vv="$v" :showErrorHighlight="showErrorHighlight" :gdprError="gdprError" v-if="(showErrorHighlight || gdprError)"></error-messages>
        <!-- / Error Messages -->

        <!-- Method -->
        <payment-method :vv="$v" :formData="formData" :resetFormValidation="resetFormValidation"></payment-method>
        <!-- / Method -->

        <!-- Details -->
        <billing-details :vv="$v" :formData="formData"></billing-details>
        <!-- / Details -->

        <!-- Billing Address -->
        <billing-address :vv="$v" :formData="formData"></billing-address>
        <!-- / Billing Address -->

        <!-- Delivery -->
        <delivery :vv="$v" :formData="formData"></delivery>
        <!-- / Delivery -->

        <!-- Insurance -->
       <!-- <ticket-insurance :vv="$v" :formData="formData"></ticket-insurance> -->
        <!-- / Insurance -->

        <!-- Card Details -->
        <card-details :vv="$v" :formData="formData"></card-details>
        <!-- / Card Details -->

        <!-- Terms & Submit -->
        <terms :vv="$v" :formData="formData" :gdprOptions="gdprOptions" :validate="validate"></terms>
        <!-- / Terms & Submit -->
        
        <!-- Paypal Overlay -->
        <div class="paypal-overlay" v-if="showPaypalOverlay">
            <div class="paypal-overlay__content">
                <img src="/assets/images/svg/icons/paypal-white.svg" alt="Paypal logo" class="paypal-overlay__logo">
                <p class="paypal-overlay__text">{{$t('components.forms.checkoutForm.paypal-overlay__text')}}</p>
            </div>
        </div>
        <!-- / Paypal Overlay -->

       <!-- 3d Overlay-->

          <div v-if="show3Doverlay">  
          <three-d-payment-popup :ThreedCheckout="ThreedCheckout"   v-if="dialog" :dialog.sync="dialog"></three-d-payment-popup>
          </div>


        <!-- / 3d Overlay -->



    </form>
    <!-- / Form -->
</template>

<script>
/* Dependencies */ 
import braintreeClient from "braintree-web/client";
import braintreePaypal from "braintree-web/paypal";
import { requiredIf, sameAs } from 'vuelidate/lib/validators';
import { settings as appSettings } from "../../../config/config";
import serviceBus from '../../services/serviceBus';
import vuetify from 'vuetify';
import ErrorMessages from "./modules/ErrorMessages.vue";
import PaymentMethod from "./modules/PaymentMethod.vue";
import BillingDetails from "./modules/BillingDetails.vue";
import BillingAddress from "./modules/BillingAddress.vue";
import Delivery from "./modules/Delivery.vue";
import TicketInsurance from "./modules/TicketInsurance.vue";
import CardDetails from "./modules/CardDetails.vue";
import Terms from "./modules/Terms.vue";
import { Loading } from '../../../core/objects/Loading.js';
import { scrollTo } from '../../../core/helpers/scrollTo';
import { checkCache } from "../../../core/helpers/checkCache";
import ThreeDPaymentPopup from "./modules/ThreeDPaymentPopup.vue";
import { Modal } from "../../../core/objects/Modal";
import axios from "../../../config/axios";
import { router } from "../../../main";
import store from "../../store/store";
import { PhoneNumber } from "../../../core/objects/PhoneNumber";

// Create a paypal watcher
const validation = appSettings.config.validation;

/* Define custom validations */
validation._custom = {
    /**
     * Function used to validate paypal
     * @function
     * @ignore
     * @returns {Boolean} - If paypal is the chosen payment method.
     */
    notPayPal: function() {
        return this.formData.paymentMethod !== "payPal";
    },
    /**
     * Function used to validate standard delivery
     * @function
     * @ignore
     * @returns {Boolean} - If standard devlivery has been chosen.
     */
    standardDelivery: function() {
        return this.chosenDeliveryMethod.delivery_address_required;
    },

    validateDelivery: function() {
        return this.chosenDeliveryMethod.delivery_address_required && this.formData.paymentMethod !== "payPal";
    }
};

export default {

    data() {
        return {
            appSettings,
            paypalInstance: null,
            brainTreeInstance: null,
            paypalClientToken: null,
            showPaypalOverlay: false,
            popuploaded:false,
            show3Doverlay:false,
            dialog: false
        }
    },

    props: ["handleError"],

    components: {
        ErrorMessages,
        PaymentMethod,
        BillingDetails,
        BillingAddress,
        Delivery,
        TicketInsurance,
        CardDetails,
        Terms,
        ThreeDPaymentPopup
    },

    created() {
        const vm = this;
        
        // Create braintree client
         serviceBus.$emit("GetPaypalClientToken", ({error, data}) => {
            if(error) {
                vm.handleError({error: error, hardReset: true});
                return;
            }
            vm.paypalClientToken = data.client_token;
            vm.initBrainTree();
        });
    },

    computed: {
        
        // User delivery method in the basket
        chosenDeliveryMethod() {
            return this.$store.getters.getBasketDeliveryMethod;
        },

        // Computed property to return the form data within state.
        formData() {
            return this.$store.getters.getCheckoutFormData;
        },

        
        // Computed property to return any checkout errors from the API.
        formError() {
            return this.$store.getters.getCheckoutFormError;
        },

        // Computed property to track if error highlights should be shown.
        showErrorHighlight() {
            return ((this.$v.formData.$anyError && this.$v.formData.$error) || this.formError !== null);
        },

        // Computed property to allow usage of config error messages.
        errorMessages() {
            return appSettings.config.errorMessages;
        },

        // GDPR Options
        gdprOptions() {
            return this.$store.getters.getCheckoutGDPR;
        },

        gdprError() {
            return this.gdprOptions.filter((currentItem) => currentItem.showError).length > 0;
        },

        ThreedCheckout(){
                 return  this.$store.getters.get3dCheckout;
        }
    },

    // Mounted function used to initiate features on component mount.
    mounted() {
  let isthreed=appSettings.core.IsThreeD;
  if(isthreed){
 this.interval = setInterval(() => {
     if(this.show3Doverlay && this.dialog){
      axios({
              method: 'post',
              url:'/Booking/PostCheckOut_3Dstatus',
             params: { client: appSettings.core.client }
            }).then(response => {

             
              if(response.data.errorCode === 0 && response.data.paymentstatus =="Success")
              {
                  //console.log("paymentstatus :",response.data.paymentstatus);
                  this.show3Doverlay=false;
                  this.dialog=false;
                  store.commit("setCheckoutSuccess");
                  serviceBus.$emit("basketRemoveTimeout");
                router.push({ name: "confirmation" });
              }
              else if(response.data.errorCode !== 0)
              {
                  this.show3Doverlay=false;
                  this.dialog=false;
                  this.handleError({error: error, hardReset: true});
                  return;
              }
             
            })
              .catch(e => {
               console.log("Popup failed");
                             
              })
    }

    }, 1000 );
 
    }
    },

    methods: {

        resetFormValidation() {
            this.$v.$reset();
            this.gdprOptions.forEach((item) => item.showError = false);

             this.formData.billing.postcode = '';
                this.formData.delivery.postcode = '';
                this.formData.details.phoneNumber = '';
                this.formData.details.emailAddress = '';
                this.formData.details.emailAddressConfirmation = '';
        },

        // Initiate Brain tree Instance
        initBrainTree() {
            const vm = this;

            // Create instance of braintree
            braintreeClient.create({
                authorization: vm.paypalClientToken,
            }, (error, instance) => {
                if(error) {
                    vm.handleError({error: error, hardReset: true});
                    return;
                }
                vm.brainTreeInstance = instance;
                vm.initPayPal();
            });
        },

        // Initiate braintree's Paypal Instance
        initPayPal() {
            const vm = this;

            // Create paypal instance
            braintreePaypal.create({
                client: vm.brainTreeInstance
            }, (error, instance) => {
                if(error) {
                    vm.handleError({error: error, hardReset: true});
                    return;
                }
                this.paypalInstance = instance;
            });
        },

        // Handle form submission & validation
        validate($event) {
            const vm = this;

            // Validate the full form
            if (this.formData.paymentMethod === "payPal") {
                //
                // If the payment method is PayPal, delivery and billing post codes 
                // are set to valid values as are the email address and its confirmation.  
                // This avoids validation errors that result from the common methods used 
                // for the validation of these items.
                //
                this.formData.billing.postcode = appSettings.core.postCode;
                this.formData.delivery.postcode = this.formData.billing.postcode;
                this.formData.details.emailAddress = appSettings.core.email;
                this.formData.details.emailAddressConfirmation = this.formData.details.emailAddress;
            } else if (this.chosenDeliveryMethod.delivery_address_required === false) {
                //
                // Otherwise, if the delivery is not required, the delivery postcode and
                // country are set to valid values to avoid validation errors.
                //
                this.formData.delivery.postcode = appSettings.core.postCode;
                this.formData.delivery.country = appSettings.core.defaultCountryCode;
            } else if ( (this.chosenDeliveryMethod.delivery_address_required === true) && !appSettings.core.enableSeperateDeliveryAddress) {
                //
                // Otherwise, if the delivery is required and specifying a seperate delivery address 
                // is not enabled, then copy the billing address to the delievry address.
                //
                this.formData.delivery.addressLine1 = this.formData.billing.addressLine1;
                this.formData.delivery.addressLine2 = this.formData.billing.addressLine2;
                this.formData.delivery.townCity = this.formData.billing.townCity;
                this.formData.delivery.county = this.formData.billing.county;
                this.formData.delivery.postcode = this.formData.billing.postcode;
                this.formData.delivery.country = this.formData.billing.country;
            } 
            this.$v.formData.$touch();
            
            // Check the gdpr
            let gdprValid = true;
            //this.gdprOptions.forEach((currentItem) => {
            //    if(!currentItem.checked) {
            //        currentItem.showError = true;
            //        gdprValid = false;
            //        return;
            //    }
            //    else {
            //        currentItem.showError = false;
            //    }
            //});

            // Check for errors
            if(this.$v.formData.$error || !gdprValid) {
                return;
            }

            // Disable Button
            if($event) {
                $event.target.setAttribute("disabled", "disabled");
            }
            
            // Handle Paypal Checkout
            if(this.formData.paymentMethod === "payPal") {
                serviceBus.$emit("preparePaypalData", (data) => {
                    
                    // Show paypal overlay component
                    vm.showPaypalOverlay = true;
                    
                    // Initialise paypal
                    vm.paypalInstance.tokenize(data, (error, payload) => {
                        if(error) {
                            let errorMessage;

                            switch (error.code) {
                                case 'PAYPAL_POPUP_CLOSED':
                                    // DO NOT ERROR REPORT, Valid User Action
                                    break;
                                case 'PAYPAL_ACCOUNT_TOKENIZATION_FAILED':
                                    errorMessage = this.$t('components.forms.checkoutForm.paypal_account_tokenization_failed', { details: error.details });
                                    break;
                                case 'PAYPAL_FLOW_FAILED':
                                    errorMessage = this.$t('components.forms.checkoutForm.paypal_flow_failed', {details : error.details});
                                    break;
                                default:
                                    errorMessage = this.$t('components.forms.checkoutForm.paypal_default_error_message', { message : error.message });
                            }

                            vm.showPaypalOverlay = false;

                             // Remove disabled Button
                            if($event) {
                                $event.target.removeAttribute("disabled");
                            }
                            
                            if(errorMessage) {
                                vm.handleError({error: errorMessage, hardReset: true});
                            }

                            return;
                        }

                        vm.showPaypalOverlay = false;

                        //$event.target.innerHTML = "Processing..."
                        const loader = new Loading(this.$el.parentNode, {
                            title: this.$t('components.forms.checkoutForm.loader.title'),
                            icon: "ticket"
                        });
                        loader.insert();

                       
                        // Submit to Save Patron
                        const phoneNumber = new PhoneNumber(this.formData.details.phoneNumber, this.formData.details.phoneNumberCountry);
                        payload.details.phone = phoneNumber.internationalPhoneNumber; 
                        serviceBus.$emit("savePatronAndMakePayment", { 
                            data: payload,
                            callback: ({error}) => {
                                if (error) {
                                    loader.remove();
                                    vm.handleError({error: error, hardReset: true});
                                    return;
                                }
                            }
                        });
                        

                    });
                });
            }

            // Handle Credit Card Checkout
            else {
                //$event.target.innerHTML = "Processing..."

                 // Show Loader
                const loader = new Loading(this.$el.parentNode, {
                    title: this.$t('components.forms.checkoutForm.loader.title'),
                    icon: "ticket"
                });
                loader.insert();

                let checkout = document.querySelector(".booking-app__step--active");
                scrollTo(checkout); 
               serviceBus.$emit("checkoutCard", {
                    formData: this.formData,
                    callback: ({ msg,error, enableButton }) => {
                        if(msg==="Processing 3D payment"){
                            vm.show3Doverlay=true;
                            vm.dialog=true;
                        }
                        loader.remove();
                        $event.target.innerHTML = "Buy Tickets Disabled";
                        if (enableButton) {
                            $event.target.removeAttribute("disabled");
                            $event.target.innerHTML = this.$t('components.forms.checkoutForm.buyTickets');
                        }
                       
                         if(error) {
                            vm.handleError({error: error, hardReset: true});
                            return;
                        }
                    }
                });
            }
            
        }
    },

    /**
     * Vuelidation conditions
     * Properties match state to allow for validation.
     */
    validations: function() { 
        return {
        formData: {
        
            paymentMethod: validation.payment.paymentMethod,

            details: {
                firstName: {
                    ...validation.user.firstName,
                    required: requiredIf(validation._custom.notPayPal)
                },
                lastName: { 
                    ...validation.user.lastName,
                    required: requiredIf(validation._custom.notPayPal)
                },
                phoneNumber: { 
                    ...validation.user.phoneNumber
                },
                emailAddress: {
                    ...validation.user.emailAddress,
                    required: requiredIf(validation._custom.notPayPal)
                },
                emailAddressConfirmation: {
                    ...validation.user.emailAddressConfirmation,
                    required: requiredIf(validation._custom.notPayPal),
                    sameAsEmailAddress: sameAs('emailAddress')
                }
            },

            billing: {
                addressLine1: {
                    ...validation.address.addressLine1,
                    required: requiredIf(validation._custom.notPayPal)
                },
                addressLine2: {
                    ...validation.address.addressLine2
                },
                townCity: {
                    ...validation.address.townCity,
                    required: requiredIf(validation._custom.notPayPal)
                },
                county: {
                    ...validation.address.county
                },
                postcode: { 
                    ...validation.address.postcode,
                    required: requiredIf(validation._custom.notPayPal)
                },
                country: {
                    ...validation.address.country,
                    required: requiredIf(validation._custom.notPayPal)
                }
            },
            
            delivery: {
                addressLine1: {
                    ...validation.address.addressLine1,
                    required: requiredIf(validation._custom.validateDelivery)
                },
                addressLine2: {
                    ...validation.address.addressLine2
                },
                townCity: {
                    ...validation.address.townCity,
                    required: requiredIf(validation._custom.validateDelivery)
                },
                county: {
                    ...validation.address.county
                },
                postcode: {
                    ...validation.address.postcode,
                    required: requiredIf(validation._custom.validateDelivery)
                },
                country: {
                    ...validation.deliveryAddress.country,
                    required: requiredIf(validation._custom.validateDelivery)
                }
            },

            // ticketInsurance: validation.insurance.ticketInsurance,

            cardDetails: {
                cardName: {
                    ...validation.payment.cardName,
                    required: requiredIf(validation._custom.notPayPal)
                },
                cardNumber: {
                    ...validation.payment.cardNumber,
                    required: requiredIf(validation._custom.notPayPal)
                },
                securityCode: { 
                    ...validation.payment.securityCode,
                    required: requiredIf(validation._custom.notPayPal)
                },
                edMonth: {
                    ...validation.payment.edMonth,
                    required: requiredIf(validation._custom.notPayPal)

                },
                edYear: {
                    ...validation.payment.edMonth,
                    required: requiredIf(validation._custom.notPayPal)
                }
            },
        }
    }
}
}
</script>
