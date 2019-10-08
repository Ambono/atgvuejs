<template>
    <ul class="order-summary__extras" v-if="deliveryMethod.delivery_address_required === true">
        <li class="order-summary__extra">
            <!-- Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="order-summary__extra-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#geo"></use>
            </svg>
            <!-- /Icon -->
            <h4 class="order-summary__extra-title">{{ $t('components.shared.orderSummary.modules.addressDetails.order-summary__extra-title')}}</h4>
            <address class="order-summary__address">
                <span v-if="deliveryAddress.addressLine1">{{ deliveryAddress.addressLine1 }} <br></span>
                <span v-if="deliveryAddress.addressLine2">{{ deliveryAddress.addressLine2 }} <br></span>
                <span v-if="deliveryAddress.townCity">{{ deliveryAddress.townCity }} <br></span>
                <span v-if="deliveryAddress.county">{{ deliveryAddress.county }} <br></span>
                <span v-if="deliveryAddress.postcode">{{ deliveryAddress.postcode }} <br></span>
                <span v-if="deliveryAddress.country">{{ deliveryAddress.country }} <br></span>
            </address>
        </li>
    </ul>
</template>

<script>
export default {
    
    computed: {
        deliveryMethod() {
            return this.$store.getters.getBasketDeliveryMethod;
        },
        deliveryAddress() {
            return this.$store.getters.getDeliveryAddress;
        }
    }
}
</script>
