<template>
<ul class="order-summary__extras" v-if="deliveryMethod">
    <li class="order-summary__extra">
        <!-- Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="order-summary__extra-icon">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#add-on"></use>
        </svg>
        <!-- /Icon -->
        <h4 class="order-summary__extra-title">{{ deliveryMethod.description }}</h4>
        <h5 class="order-summary__extra-quantity">{{ $t('components.shared.orderSummary.modules.deliveryMethod.order-summary__extra-quantity',  { price : deliveryMethod.price.toFixed(2) }) }}</h5>
    </li>
</ul>
</template>

<script>
import anime from "animejs";
export default {
    computed: {
        // Get delivery method from state
        deliveryMethod() {
            return this.$store.getters.getBasketDeliveryMethod;
        }
    }
}
</script>
