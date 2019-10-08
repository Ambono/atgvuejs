<template>
    <!-- Basket Extras -->
    <ul class="order-summary__extras" :class="{'order-summary--amend': amend }">
        <transition-group v-on:before-enter="prepareAnimation" v-on:enter="animateIn" v-on:leave="animateOut" mode="out-in">
           
            <li class="order-summary__extra" v-for="extra in basketExtras" :key="'e' + extra.id" :v-if="basketExtras">
                <!-- Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="order-summary__extra-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#add-on"></use>
                </svg>
                <!-- /Icon -->
              
                <h4 class="order-summary__extra-title">{{ extra.description }} </h4>
                <h5 class="order-summary__extra-quantity">{{ $t('components.shared.orderSummary.modules.basketExtras.order-summary__extra-quantity', {quantity :  extra.quantity , price : extra.price.price.toFixed(2) }) }} </h5>
                <!-- Remove -->
                <transition v-on:before-enter="prepareAnimation" v-on:enter="animateInDelay" v-on:leave="animateOut">
                    <div class="order-summary__remove" v-if="amend">
                        <button class="order-summary__remove-btn" @click="deleteExtra({extra})">
                            <svg xmlns="http://www.w3.org/2000/svg" class="order-summary__remove-btn-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#trash"></use>
                            </svg>
                        </button>
                    </div>
                </transition>
                <!-- / Remove -->
            </li>
        </transition-group>
    </ul>
    <!-- / Basket Extras -->
</template>
<script>
import anime from "animejs";
import serviceBus from '../../../../services/serviceBus';


export default {
    computed: {
        basketExtras(){
                
            return this.$store.getters.getBasketExtras;            
            // Return the extras stored within state
           // return this.$store.getters.getActiveExtras;
           
        }
    },

    props: ["amend"],

    methods: {

        // Method used to prepare the element for animation.
        prepareAnimation(element) {
            // Set the element to be hidden
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

        // Animate in with a delay
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

        // Delete an extra from the basket
        deleteExtra(item) {
            serviceBus.$emit("removeExtra", item.extra.id);
        }
    }
}
</script>
