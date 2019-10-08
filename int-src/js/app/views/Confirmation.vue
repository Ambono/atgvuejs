<template>
    <!-- Confirmation -->
    <div class="order-confirmation">
        <!-- Container -->
        <div class="order-confirmation__container">
            <!-- Information -->
            <div class="order-confirmation__information">
                <h2 class="order-confirmation__title"> {{ $t('views.confirmation.order-confirmation__title') }}</h2>
                <h3 class="order-confirmation__ref">{{ $t('views.confirmation.order-confirmation__ref', {orderNumber : orderNumber}) }}</h3>

                <p class="order-confirmation__text">
                    {{ $t('views.confirmation.order-confirmation__text') }}
                </p>

                <!-- Actions -->
                <div class="order-confirmation__actions">
                    <a :href="afterConformationUrl" target="_blank" class="btn order-confirmation__btn">{{ $t('views.confirmation.order-confirmation__btn') }}</a>
                </div>
                <!-- / Actions -->
            </div>
            <!-- /Information -->
            <!-- Summary -->
            <div class="order-confirmation__summary">
                <order-summary></order-summary>
            </div>
            <!-- / Summary -->
        </div>
        <!-- / Container -->
    </div>
    <!-- / Confirmation -->
</template>

<script>
import OrderSummary from "../components/shared/OrderSummary/OrderSummary.vue";
import serviceBus from '../services/serviceBus';
import { Loading } from '../../core/objects/Loading.js';
import { settings as appSettings } from "../../config/config";

let loader;

export default {
    components: {
        OrderSummary
    },
    computed: {
        // Retrieve order number from the state.
        orderNumber() {
            return this.$store.getters.getBookingRef;
        },
        afterConformationUrl() {
            return appSettings.core.afterConfirmationUrl;
        }
    },
    mounted() {
		// Send event notification to Google Analytics.
		let orderTotal = this.$store.getters.getBasketTotal;
		this.$ga.event({eventCategory: 'btcFlowTracking',eventAction: 'confirmation', eventValue: orderTotal, eventLabel: appSettings.format.currencyCode});
		
        this.$store.dispatch("setCurrentStep", "confirmation");

        // Mark checkout as complete
        serviceBus.$emit("setCheckoutComplete", true);

        // Show Loader
        loader = new Loading(this.$el.parentNode, {
            title: this.$t('views.confirmation.loader.title'),
            icon: "ticket"
        });
        loader.insert();

        // Retrive the conformation data.
        serviceBus.$emit("retrieveConfirmation", () => {
            // Hide Loader
            loader.remove();
        });
    }
}
</script>
