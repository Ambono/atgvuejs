<template>
    <!-- Item -->
    <button class="ticket-selection__option" :class="ticketSelected" @click="makeSelection" :disabled="parseInt(ticket.percentage) === 0">
        <span class="ticket-selection__option-text">{{(ticket.name === "any") ? $t('components.ticketOptions.ticketoption.any'): $t('components.ticketOptions.ticketoption.numberTickets', {ticketNumber : ticket.num})}}</span>
        <span class="ticket-selection__option-percentage" v-if="ticket.percentage < 1" :class="percentClass(ticket.percentage)">
            Unavailable
        </span>
    </button>
    <!-- / Item -->
</template>

<script>
/* Dependencies */
import { definePercentageClass } from "../../../core/helpers/availability.js";
import serviceBus from '../../services/serviceBus.js';

export default {
    props: ["ticket"],
    
    computed: {
        // Computed property used to return the chosen ticket amount.
        ticketSelected() {
            if(this.ticket.selected) {
                return 'active';
            }
            
            // Cancel execution
            return false;
        }
    },

    methods: {
        // Method used to make the ticket selection
        makeSelection() {
            // Pass the user selection to the store
            this.$store.dispatch("setTicketAmount", this.ticket)
            .then(() => {
                // Delete the previous calendar data
                serviceBus.$emit("deleteCalendarCache", () => {
                    // Naviagte to the calendar
                    this.$router.push({ name: "showSelect" });
                });
            });
        },

        // Method used to determin if the item is sold out
        isDisabled(num) {
            // Return the status
            return (num === 0);
        }
    }
}
</script>
