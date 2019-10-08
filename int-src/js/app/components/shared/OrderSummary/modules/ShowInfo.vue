<template>
    <!-- Show Info -->
    <div class="order-summary__show">
        <h3 class="order-summary__show-title">{{$t('components.forms.modules.showInfo.showtitle',{showtitle : eventData.title })  }}</h3>
        <!-- <h4 class="order-summary__show-location">{{$t('components.forms.modules.showInfo.location',{location : eventData.venue.name})  }}<a href="#" class="order-summary__show-map">View map</a></h4> -->
        <!-- Date -->
        <div class="order-summary__date-container">
            <!-- Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="order-summary__date-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#calendar"></use>
            </svg>
            <!-- /Icon -->
            <p class="order-summary__date" v-if="dateSelected">{{$t('components.forms.modules.showInfo.date-selected',{  dateselected : dateSelected.long})  }}</p>
        </div>
        <!-- / Date -->
    </div>
    <!-- / Show Info -->
</template>

<script>
export default {
    computed: {
        // Computed property to return the event data.
        eventData() {
            return this.$store.getters.getEventData;
        },
        
        // Computed property to return the time and date chosen.
        dateSelected() {
            // Retrieve the time and date chosen
            return this.$store.getters.getChosenDate;
        }
    }
}
</script>
