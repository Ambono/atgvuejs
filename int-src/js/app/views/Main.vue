<template>
    <!-- Booking App -->
    <div class="booking-app">
        <!-- Step -->
        <section class="booking-app__step" :class="(activeStep === 'ticketSelect') ? 'booking-app__step--active' : ''">
            <!-- Full Section Link -->
            <router-link :to="{name: 'ticketSelect'}" class="booking-app__step-full-link" v-if="numOfTicketsPicked" aria-label="Click to re-select the amount of tickets you require."></router-link>
            <!-- / Full Section Link -->
            <!-- Intro -->
            <div class="booking-app__step-intro">
                <h3 class="booking-app__step-title">{{ $t('views.main.booking__app-title') }}</h3>
                <!-- Edit -->
                <router-link :to="{name: 'ticketSelect'}" class="booking-app__step-edit" v-if="numOfTicketsPicked" aria-label="Click to re-select the amount of tickets you require.">
                    {{ (numOfTicketsPicked.name !== "any") ? numOfTicketsPicked.num +  $t('components.forms.modules.main.ticket') : $t('components.forms.modules.main.any') + numOfTicketsPicked.num + ")" }}
                    <svg xmlns="http://www.w3.org/2000/svg" class="booking-app__edit-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#edit"></use>
                    </svg>
                </router-link>
                <!-- / Edit -->
            </div>
            <!-- / Intro -->
            <!-- Content -->
            <div class="booking-app__step-content">   
                <!-- Container -->
                <div class="booking-app__step-container">
                    <transition name="acordionStep" v-on:leave="animateStepOut" v-on:enter="animateStepIn" mode="out-in">
                        <router-view name="TicketSelect"></router-view>
                    </transition>
                </div>
                <!-- Container -->       
            </div>
            <!-- / Content -->
        </section>
        <!-- / Step -->

        <!-- Step -->
        <section class="booking-app__step booking-app__step--full" :class="(activeStep === 'showSelect') ? 'booking-app__step--active' : ''">
             <!-- Full Section Link -->
            <router-link :to="{name: 'showSelect'}" class="booking-app__step-full-link" v-if="numOfTicketsPicked" aria-label="$t('components.forms.modules.main.aria-label')"
            <!-- Intro -->
            <div class="booking-app__step-intro">
                <h3 class="booking-app__step-title">{{ $t('views.main.showSelect__step-title') }}</h3>
                <!-- Edit -->
                <router-link :to="{name: 'showSelect'}" class="booking-app__step-edit" v-if="dateSelected" aria-label="$t('components.forms.modules.main.aria-label')">
                    <span class="booking__app__step-edit--long">{{$t('components.forms.modules.main.date-selected',{  dateselected : dateSelected.long})  }}</span>
                    <span class="booking__app__step-edit--short">{{$t('components.forms.modules.main.date-selected',{  dateselected : dateSelected.short}) }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="booking-app__edit-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#edit"></use>
                    </svg>
                </router-link>
                <!-- / Edit -->
            </div>
            <!-- / Intro -->
            <!-- Content -->
            <div class="booking-app__step-content">
                <!-- Container -->
                <div class="booking-app__step-container">
                    <transition name="acordionStep" v-on:leave="animateStepOut" v-on:enter="animateStepIn" mode="out-in">
                        <router-view name="ShowSelect"></router-view>
                    </transition>
                </div>
                <!-- Container -->
            </div>
            <!-- / Content -->
        </section>
        <!-- / Step -->

        <!-- Step -->
        <section class="booking-app__step" :class="(activeStep === 'seatSelect') ? 'booking-app__step--active' : ''">
             <!-- Full Section Link -->
            <router-link :to="{name: 'seatSelect'}" class="booking-app__step-full-link" v-if="numOfSeats > 0" :aria-label="$t('views.main.booking-app__step-full-link')"></router-link>
            <!-- / Full Section Link -->
            <!-- Intro -->
            <div class="booking-app__step-intro">
                <h3 class="booking-app__step-title">{{ $t('views.main.selectSeat__step-title') }}</h3>
                <!-- Edit -->
                <router-link :to="{name: 'seatSelect'}" class="booking-app__step-edit" v-if="numOfSeats > 0" :aria-label="$t('views.main.booking-app__step-edit')">
                    {{numOfSeats}} {{$t('views.main.selectSeat-seats')}}
                    <svg xmlns="http://www.w3.org/2000/svg" class="booking-app__edit-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#edit"></use>
                    </svg>
                </router-link>
                <!-- / Edit -->
            </div>
            <!-- / Intro -->
            <!-- Content -->
            <div class="booking-app__step-content">
                <!-- Container -->
                <div class="booking-app__step-container">
                    <transition name="acordionStep" v-on:leave="animateStepOut" v-on:enter="animateStepIn" mode="out-in">
                        <router-view name="SeatSelection"></router-view>
                    </transition>
                </div>
                <!-- Container -->
            </div>
            <!-- / Content -->
        </section>
        <!-- / Step -->

        <!-- Step -->
        <section class="booking-app__step" :class="(activeStep === 'additionalExtras') ? 'booking-app__step--active' : ''">
            <!-- Full Section Link -->
            <router-link :to="{name: 'additionalExtras'}" class="booking-app__step-full-link" v-if="extrasAdded" :aria-label="$t('views.main.booking-app__step-full-link-extras')"></router-link>
            <!-- / Full Section Link -->
            <!-- Intro -->
            <div class="booking-app__step-intro">
                <h3 class="booking-app__step-title">{{ $t('views.main.additionalExtras__step-title') }}</h3>
                <!-- Edit -->
                 <router-link :to="{name: 'additionalExtras'}" class="booking-app__step-edit" v-if="extrasAdded || showExtrasTitle" :aria-label="$t('views.main.booking-app__step-edit-extras')">
                    {{(extrasAdded) ?  $t('views.main.extras_added')  : $t('views.main.no_extra_added')}}
                    <svg xmlns="http://www.w3.org/2000/svg" class="booking-app__edit-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#edit"></use>
                    </svg>
                </router-link>
                <!-- / Edit -->
            </div>
            <!-- / Intro -->
            <!-- Content -->
            <div class="booking-app__step-content">
                <!-- Container -->
                <div class="booking-app__step-container">
                    <transition name="acordionStep" v-on:leave="animateStepOut" v-on:enter="animateStepIn" mode="out-in">
                        <router-view name="AdditionalExtras"></router-view>
                    </transition>
                </div>
                <!-- Container -->
            </div>
            <!-- / Content -->
        </section>
        <!-- / Step -->

        <!-- Step -->
        <section class="booking-app__step" :class="(activeStep === 'checkout') ? 'booking-app__step--active' : ''">
            <!-- Intro -->
            <div class="booking-app__step-intro">
                <h3 class="booking-app__step-title">{{ $t('views.main.checkout__step-title') }}</h3>
            </div>
            <!-- / Intro -->
            <!-- Content -->
            <div class="booking-app__step-content">
                <!-- Container -->
                <div class="booking-app__step-container">
                    <transition name="acordionStep" v-on:leave="animateStepOut" v-on:enter="animateStepIn" mode="out-in">
                        <router-view name="Checkout"></router-view>
                    </transition>
                </div>
                <!-- Container -->
            </div>
            <!-- / Content -->
        </section>
        <!-- / Step -->
    </div>
    <!-- / Booking App -->
</template>


<script>
/* Dependencies */
import {toArray} from "../../core/helpers/toArray";
import anime from "animejs";
import serviceBus from '../services/serviceBus';
import { scrollTo } from '../../core/helpers/scrollTo';


export default {

    mounted() {
        
        // If required get event data
        if(!this.$store.getters.getEventData) {
            // Retrieve the event info
            serviceBus.$emit("createNewSession");
        }

        // Retireve the active step
        const activeStep = this.$store.getters.getActiveStep;

        // Handle the default path (default: ticket selection)
        if(activeStep === undefined) {
            // Push the route
            this.$router.push({name: "ticketSelect"});
        }
        else {
            // Push the active step
            this.$router.push({name: activeStep});
        }

    },

    computed: {
        // Computed property used to return the active step.
        activeStep() {
            return this.$store.getters.getActiveStep;
        },

        // Get extras title from state
        showExtrasTitle() {
            return (this.activeStep === "checkout" || this.activeStep === "confirmation");
        },
        
        // Computed property used to return the number of tickets chosen.
        numOfTicketsPicked() {
            return this.$store.getters.getTicketAmount;
        },
        
        // Computed property used to return the time and date chosen.
        dateSelected() {
            return this.$store.getters.getChosenDate;
        },

        // Computed property used to return the extras added.
        extrasAdded() {
            return (this.$store.getters.getActiveExtras) ? this.$store.getters.getActiveExtras.length > 0 : false;
        },

        // Return the number of chosen seats from state.
        numOfSeats() {
            return this.$store.getters.getBasketSeatsNum;
        }
    },

    methods: {
        // Handle step in animation
        animateStepIn(element, done) {
            const activeElement = element;
            const contentContainer = activeElement.parentNode;
            const contentSize = contentContainer.clientHeight;

            anime({
                targets: contentContainer.parentNode,
                height: [0, contentSize],
                duration: 350,
                delay: 420,
                easing: "linear",
                complete: () => {
                    scrollTo(document.querySelector(".booking-app__step--active"));
                    contentContainer.parentNode.style.height = "auto";
                    done();
                }
            });
        },

        // Handle animating step out
        animateStepOut(element, done) {
            const activeElement = element;
            const contentContainer = activeElement.parentNode;
            const contentSize = contentContainer.clientHeight;
        
            //  Add attribute to handle overiide of styles when animating out
            document.body.setAttribute("data-animate-out", "");

             anime({
                targets: contentContainer.parentNode,
                height: [contentSize, 0], 
                duration: 400,
                delay: 100,
                easing: "linear",
                complete: () => {     
                    setTimeout(() => {
                        document.body.removeAttribute("data-animate-out", "");
                    done();
                    }, 200); 
                }
            });
        }
    }
}
</script>
