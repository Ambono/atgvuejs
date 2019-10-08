<template>
    <!-- Header -->
    <header class="header">
    
        <!-- Container -->
        <div class="header__container">         
         <!-- Show Details -->
            <div class="header__show-details" v-if="eventData">
                <h1 class="header__show-details-title">{{eventData.title}}</h1>
                <h4 class="header__show-details-location">{{eventData.venue.name}} <!-- <a :href="eventData.venue.mapURL" target="_blank">View on map</a> --></h4>
            </div>
            <!-- / Show Details -->
             <div class="spacer__div"><!--add space betwen divs--> </div>
            <!-- Logo -->
            <div class="header__logo">
                <img src="/assets/images/svg/logo.svg" alt="Best Union Logo" class="header__logo-image"><!--@click="sessionExpired"-->
            </div>
            <!-- / Logo -->  
                
            <!-- Timer -->
            <div class="header__timer" data-timer>
                <h4 class="header__timer-text">{{$t('components.shared.header.header.header__timer-text')}}<span data-time></span></h4>
            </div>
            <!-- / Timer -->

       

        </div>
        <!-- / Container -->
    </header>
    <!-- / Header -->
</template>

<script>
/* Dependencies */
import moment from "moment";
import serviceBus from "../../../services/serviceBus";

export default {
    
    computed: {
        // Computed property to retrieve the event data stored in state.
        eventData() {
            return this.$store.getters.getEventData;
        },

        // Load timeout value from state
        timeout() {
            return this.$store.getters.getBasketTimeOut;
        }
    },

    mounted() {
        
        // If there is no timeout return
        if(!this.timeout) {
            return;
        }
        
        // Check session has not expired
        // Prevents double modal firing
        serviceBus.$emit("checkSession", (sessionStatus) => {
            if(sessionStatus) {
                this.timeRemaining();
            }
        });
    },
    
    methods: {
        // Handle updating time remaining
        timeRemaining() {
            
            if(!this.timeout) {
                return;
            }

            // Activate timer
            const timer = this.$el.querySelector("[data-timer]");
            timer.setAttribute("data-active", "");

            // Update timer every 1 second
            this.intervalTimer = setInterval(() => {
                // Calulate the time left
                const timeleft = moment(this.timeout).diff(moment(), "mm:ss");                
                
                // Expire Session
                if(timeleft <= 0) {
                    clearInterval(this.intervalTimer);
                    this.sessionExpired();
                }

                // Update the time
                timer.querySelector("[data-time]").innerHTML = moment(timeleft).format("mm:ss");
            }, 1000);

        },

        // Expire the user session on timeout
        sessionExpired() {
            serviceBus.$emit("clearSession");
        }
    },
    watch: {
        // Wait for timeout to be defined
        timeout() {
            //If the timeout is not undefined
            if(this.timeout !== null) {
                // Call time remaining to start countdown.
                this.timeRemaining();
            }
            else {
                // Clear the interval timer
                clearInterval(this.intervalTimer);
                // Remove the timer
                const timer = this.$el.querySelector("[data-timer]");
                timer.removeAttribute("data-active");
            }
        }
    }
}
</script>