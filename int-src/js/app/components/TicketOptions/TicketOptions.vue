<template>
    <!-- Options -->
    <div class="ticket-selection__options">
        <ticket-option v-for="ticket in ticketAmounts" :key="ticket.num" :ticket="ticket"></ticket-option>
    </div>
    <!-- / Options -->
</template>

<script>
/* Dependencies */
import TicketOption from "./TicketOption.vue";

export default {
    props: ["ticketAmounts"],
    
    components: {
        TicketOption
    }
}
</script>
