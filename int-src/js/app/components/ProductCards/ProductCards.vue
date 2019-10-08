<template>
    <!-- Product Cards -->
    <div class="product-cards">        
        <product-card v-for="(item, index) in extrasItems" :key="index" :item="item"></product-card>
    </div>
    <!-- / Product Cards -->
</template>

<script>
/* Dependencies */
import ProductCard from "./ProductCard.vue";
import { checkCache } from '../../../core/helpers/checkCache';
import { FixedOnScroll } from "../../../core/objects/FixedOnScroll.js";
import { Loading } from "../../../core/objects/Loading";
import serviceBus from '../../services/serviceBus';

// Placeholder for loader
let loader;


export default {

    data() {
        return {
            fixedOnScroll: undefined,
            items: undefined,
            extrasItems: []
        }
    },

    mounted() {

        // Display Loading screen
        // Create a new loader
        loader = new Loading(this.$el.parentNode.parentNode.parentNode, {
            title: this.$t('components.productCards.productCards.loader.title'),
            icon: "add-on"
        });

        // Insert the loader 
        loader.insert();

        // Get the  basket
             serviceBus.$emit("retrieveBasketAndSaveDeliveryMethods", (() => {
            
            // No Need to reload the items as cache is valid till checkout expires
            if(!this.$store.getters.getExtras) {
                
                // Remove the existing items
                serviceBus.$emit("removeExtras");

                // Fetch the additional extras
               serviceBus.$emit("retrieveExtras", (extras) => {
                    serviceBus.$emit("calculateBasketTotal");   
                    this.extrasItems = extras;
                    this.initiateStaticScroll();
                    loader.remove();
                });
            }
            else {
                // Calculate total and load content
                serviceBus.$emit("calculateBasketTotal");
                this.extrasItems = this.$store.getters.getExtras;
                this.initiateStaticScroll();
                loader.remove();
            }
        }));
        
    },

    methods: {
        // create a static summary component.
        initiateStaticScroll() {
            // If the order summary is not fixed
            if(!this.fixedOnScroll) {
                const container = document.querySelector("[data-summary-container]");
                const summaryComponent = container.querySelector(".order-summary");
                
                // Create a Static Summary instance
                this.fixedOnScroll = new FixedOnScroll(summaryComponent, container);
            }
        }
    },

    components: {
        ProductCard
    },    

    beforeDestroy() {
        // Unbind the window events
        this.fixedOnScroll.destroy();
    }
}
</script>