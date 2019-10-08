<template>
    <ul class="order-summary__extras">
        <li class="order-summary__extra" v-for="(item) in addedInsurance" :key="'i' + item.id">
            <!-- Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="order-summary__extra-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#add-on"></use>
            </svg>
            <!-- /Icon -->
            <h4 class="order-summary__extra-title">{{ item.titleClean }}</h4>
            <h5 class="order-summary__extra-quantity">{{ $t('components.shared.orderSummary.modules.ticketInsurance.order-summary__extra-quantity', { price : item.price.toFixed(2)}) }}</h5>
        </li>
    </ul>
</template>

<script>
import anime from "animejs";
export default {
    computed: {
        // Get insurance from state
        addedInsurance() {
            return this.$store.getters.getBasketTicketInsurance;
        }
    }
}
</script>
