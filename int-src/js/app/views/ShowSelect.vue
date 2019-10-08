<template >
    <!-- Show Selection -->
    <div class="show-selection">
        <calendar></calendar>
    </div>
    <!-- / Show Selection -->
</template>

<script>
/* Dependencies */
import Calendar from "../components/Calendar/Calendar.vue";

export default {

    components: {
        Calendar
    },

    mounted() {
        this.$store.dispatch("setCurrentStep", "showSelect");
		
		// Send event notification to Google Analytics.
		this.$ga.event({eventCategory: 'btcFlowTracking',eventAction: 'show-select'});
    }
}
</script>
