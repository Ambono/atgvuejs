<template>
     <!-- Tickets -->
    <ul class="order-summary__tickets" :class="{'order-summary--amend': amend}">
        <!-- Item -->
        <li class="order-summary__ticket" v-for="item in seatsGrouped" :key="'s'+item.price">
            <!-- Seat Overview -->
            <div class="order-summary__ticket-overview">
                <!-- Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="order-summary__ticket-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#ticket"></use>
                </svg>
                <!-- /Icon -->
                <h4 class="order-summary__ticket-title">{{$t('components.shared.orderSummary.modules.tickets.order-summary__ticket-title', {tickettitle :item.type}) }}<span class="order-summary__ticket-breakdown">{{ $t('components.shared.orderSummary.modules.tickets.order-summary__ticket-breakdown', { price : item.priceWithoutFee ? item.priceWithoutFee.toFixed(2) : item.price.toFixed(2), bookingFee : item.bookingFee ? item.bookingFee.toFixed(2) : 0, fee: $t('components.shared.orderSummary.modules.tickets.fee-text')} ) }}</span></h4>
                <h5 class="order-summary__ticket-quantity">{{ $t('components.shared.orderSummary.modules.tickets.order-summary__ticket-quantity', {length : item.seats.length,  price : item.price.toFixed(2)}) }}</h5>
                <!-- Remove -->
                <transition v-on:before-enter="prepareAnimation" v-on:enter="animateInDelay" v-on:leave="animateOut">
                <div class="order-summary__remove" v-if="amend || showEdit">
                    <button class="order-summary__remove-btn" @click="changeSeats">
                        <svg xmlns="http://www.w3.org/2000/svg" class="order-summary__remove-btn-icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#edit"></use>
                        </svg>
                    </button>
                </div>
                </transition>
                <!-- / Remove -->
            </div>
            <!-- / Seat Overview -->
            <!-- Seats -->
            <ul class="order-summary__seats">
                <li class="selected-seats__seat" v-for="(seat) in item.seats" :key="'ss' + seat.name + seat.id">
                    <div class="selected-seats__seat-type" :class="'seat--' + item.filter.class"></div>
                     <p class="selected-seats__seat-location">{{seat.area}}</p>
                     <p class="selected-seats__seat-number">{{seat.name}}</p>              
                </li>
            </ul>
            <!-- / Seats -->
        </li>
        <!-- / Item -->
        <!-- Seating Plan -->
        <!-- 
        <li class="order-summary__seat">
            <a href="#" class="order-summary__seat-plan" aria-label={{$t('components.shared.orderSummary.modules.tickets.aria-label')}}data-map-modal>{{$t('components.shared.orderSummary.modules.tickets.order-summary__seat-plan')}}</a>
            <seat-map-modal></seat-map-modal>
        </li>
         -->
        <!-- / Seating Plan -->
    </ul>
    <!-- / Tickets -->
</template>

<script>
import SeatMapModal from "../../../SeatMap/SeatMapModal.vue";
import anime from "animejs";

export default {
    computed: {
        // Pull grouped seats from state
        seatsGrouped() {
            return this.$store.getters.getBasketSeatsGrouped;
        },
        // Show the edit button
        showEdit() {
            return (this.activeStep === "checkout") ? true : false;
        },
        currency() {
            return appS
        }
    },
    props: ["amend"],
    components: {
        SeatMapModal
    }, 
    methods: {
        // Prepare the animation
        prepareAnimation(element) {
            element.style.opacity = 0;
        },

        // Handle change seats 
        changeSeats() {
            this.$router.push({"name" : "seatSelect" });
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

        // Animate in with delay
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
        ticketBreakDownText(seatGroup) {

            var bookingFee = 0;           
            if (item.bookingFee) {
                bookingFee = item.bookingFee;               
            }
                       
            return '(£{{item.priceWithoutFee.toFixed(2)}} + £{{bookingFee.toFixed(2)}} fee)'
        }
    }
}
</script>
