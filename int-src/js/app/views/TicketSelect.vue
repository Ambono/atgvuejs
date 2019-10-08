<template>
    <!-- Ticket Selection -->
    <div class="ticket-selection" :data-show-all="showAll">   
      
        <!-- Intro -->
        <div class="ticket-selection__intro">
            <h2 class="ticket-selection__title">{{ $t('views.ticketSelect.ticket-selection__title') }}</h2>
            <p class="ticket-selection__text">{{ $t('views.ticketSelect.ticket-selection__text') }}</p>
        </div>
        <!-- / Intro -->
       
       <ticket-options :ticketAmounts="ticketAmounts"></ticket-options>
        
        <!-- Show More -->
       <a class="ticket-selection__load-more" href="#" @click.prevent="toggleShowAll">
           {{ (!showAll) ? $t('views.ticketSelect.showMoreTickets') : $t('views.ticketSelect.showLessTickets') }}
           <svg xmlns="http://www.w3.org/2000/svg" class="ticket-selection__load-more-icon">
               <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#arrow-drop-down"></use>
           </svg>
       </a>
        <!-- / Show More -->


    </div>
    <!-- / Ticket Selection -->

<!--/ language drop down -->  
</template>


<script>
/* Dependencies */ 
import TicketOptions from "../components/TicketOptions/TicketOptions.vue";
import serviceBus from '../services/serviceBus';

export default {
    data() {
        return {
            showAll: false
        }
    },

    components: {
        TicketOptions
    },

    computed: {
        // Computed property used to return the Ticket amount data from state.
        ticketAmounts() {
            return this.$store.getters.getTicketAmountData;
        }
    },

    methods: {
        // Method used to determin if all results should be shown (Show more).
        toggleShowAll() {
            (this.showAll) ? this.showAll = false : this.showAll = true
        }
    },
    
    mounted() {
        this.$store.dispatch("setCurrentStep", "ticketSelect");
		
		// Send event notification to Google Analytics.
		this.$ga.event({eventCategory: 'btcFlowTracking',eventAction: 'seat-count'});

        // Clear session if the checkout has been completed.
        if(this.$store.getters.getCheckoutCompleteStatus === true) {
            serviceBus.$emit("clearSession", { suppress: true })
            return;
        }
    }
}
</script>
