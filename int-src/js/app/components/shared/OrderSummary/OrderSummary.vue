<template>
    <!-- Order Summary -->
    <div class="order-summary">
        <div class="order-summary__container">
            <!-- Top -->
            <header class="order-summary__intro">
                <h2 class="order-summary__intro-title">{{$t('components.shared.orderSummary.orderSummary.order-summary__intro-title')}}</h2>
                <!-- <a href="#" class="order-summary__intro-amend" aria-label="Click to amend the order details." v-if="showAmends" @click="toggleAmend">Edit</a> -->
            </header>
            <!-- / Top -->

            <!-- Show Info -->
            <show-info></show-info>
            <!-- / Show Info -->

            <!-- Tickets -->
           <tickets :amend="amend"></tickets>
            <!-- / Tickets -->
            
            <!-- Local Extras -->
            <local-extras v-if="showLocalExtras"></local-extras>
            <!-- / Local Extras -->
            
            <!-- Basket Extras -->
            <basket-extras v-if="!showLocalExtras" :amend="amend"></basket-extras>
            <!-- / Basket Extras -->

            <!-- Ticket Insurance -->
            <!-- <ticket-insurance></ticket-insurance> -->
            <!-- / Ticket Insurance -->

            <!-- Delivery Method -->
            <delivery-method></delivery-method>
            <!-- / Delivery Method -->

            <!-- Address -->
            <address-details v-if="this.activeStep === 'confirmation'"></address-details>
            <!-- / Address -->

            <!-- Line Break -->
            <hr class="order-summary__separator" />
            <!-- / Line Break -->

            <!-- Total -->
            <footer class="order-summary__total">
                <p class="order-summary__total-title">{{$t('components.shared.orderSummary.orderSummary.order-summary__total-title')}}</p>
                <p class="order-summary__total-price">{{ $t('components.shared.orderSummary.orderSummary.order-summary__total-price', { basketTotal : basketTotal.toFixed(2)}) }}</p>
                <button class="btn--medium order-summary__btn" @click="goToCheckout" v-if="showNext">{{$t('components.shared.orderSummary.orderSummary.next')}}</button>
            </footer>
            <!-- / Total -->
        </div>
    </div>
    <!-- Order Sumamry -->
</template>

<script>
/* Dependencies */
import anime from "animejs";
import serviceBus from '../../../services/serviceBus';
import BasketExtras from "./modules/BasketExtras.vue";
import LocalExtras from "./modules/LocalExtras.vue";
import Tickets from "./modules/Tickets.vue";
import ShowInfo from "./modules/ShowInfo.vue";
import TicketInsurance from "./modules/TicketInsurance.vue";
import DeliveryMethod from "./modules/DeliveryMethod.vue";
import AddressDetails from "./modules/AddressDetails.vue";

export default {
    data() {
        return {
            staticOnScroll: undefined,
            amend: false
        }
    },

    components: {
        BasketExtras,
        LocalExtras,
        Tickets,
        ShowInfo,
        TicketInsurance,
        DeliveryMethod,
        AddressDetails
    },

    computed: {
        
        // Computed property to return the active step
        activeStep() {
            return this.$store.getters.getActiveStep;
        },

        // Computed property to return if amend should be shown.
        showAmends() {
            return (this.activeStep === "checkout");
        },
        
        // Return local extras setting from state
        showLocalExtras() {
            return (this.activeStep === "additionalExtras") ? true : false;
        },

        // Computed property to return if the checkout button should be shown.
        showNext() {
            return (this.activeStep !== 'checkout' && this.activeStep !== 'confirmation');
        },

        // Get the basket total from state
        basketTotal() {
            return this.$store.getters.getBasketTotal;
        }
    },

    methods: {
    
        // Method used to prepare the element for animation.
        prepareAnimation(element) {
            element.style.opacity = 0;
        },

        // Method used to animate the element into view.
        animateIn(element, done) {
            // animate the element in to view
            const animation = anime({
                begin: () => {
                    // Set the element to hidden
                    element.style.opacity = 0;
                },
                targets: element,
                opacity: 1,
                duration: 300,
                delay: 100,
                easing: "linear",
                complete: () => {
                    done();
                }
            });
        },

        // Animate in with delay
        animateInDelay(element, done) {
            // animate the element in to view
            const animation = anime({
                begin: () => {
                    // Set the element to hidden
                    element.style.opacity = 0;
                },
                targets: element,
                opacity: 1,
                duration: 300,
                delay: 400,
                easing: "linear",
                complete: () => {
                    done();
                }
            });
        },

        // Method used to animate the element out of view.
        animateOut(element, done) {
            // animate the element out of view
            const animation = anime({
                targets: element,
                opacity: 0,
                duration: 300,
                easing: "linear",
                complete: () => {
                    done();
                }
            });
        },

        // Method used to handle the checkout button click.
        goToCheckout() {
            serviceBus.$emit("offerExtras", () => {
                this.$router.push({name: 'checkout'});
            });
        },

        // Allow / disallow amends
        toggleAmend(event) {
            // Prevent default
            event.preventDefault();

            // Toggle
            this.$data.amend =! this.$data.amend;
            
            if(!this.$data.amend) {
                event.target.innerHTML = "Edit";
            }
            else {
                event.target.innerHTML = "Done";
            }
        }
              
    }
}    
</script>