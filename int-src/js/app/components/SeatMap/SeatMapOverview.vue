<template>
    <!-- Selected Seats -->
    <div class="selected-seats">
        <!-- intro -->
        <div class="selected-seats__intro">
            <h3 class="price-filters__title">{{$t('components.seatMap.seatMapOverview.price-filters__title')}}</h3>
        </div>
        <!-- / intro -->
        <!-- container -->
        <div class="selected-seats__container">

            <div class="selected-seats__overview">
                <h4 class="selected-seats__overview-title">{{$t('components.seatMap.seatMapOverview.selected-seats__overview-title')}}</h4>
                <!-- Seats -->
                <ul class="selected-seats__overview-list" v-if="!handleAny">
                    <li class="selected-seats__seat" v-for="(seat, index) in chosenSeats" :key="index">
                        <!-- {{seat}} -->
                        <div class="selected-seats__seat-type" :class="'seat--' + seat.overview.filterClass"></div>
                         <p class="selected-seats__seat-location">{{seat.areaName}}</p>
                         <p class="selected-seats__seat-number">{{seat.name}}</p>
                        <p class="selected-seats__seat-information" id="data">{{seat.seatInformation}}</p>
                        <p class="selected-seats__seat-price">{{$t('components.seatMap.seatMapOverview.selected-seats__seat-price', { price : seat.overview.unitprice.toFixed(2) }) }}</p>
                        <a class="selected-seats__remove-btn" href="#" @click="removeItem(seat, $event)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="selected-seats__remove-btn-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#trash"></use>
                            </svg>
                        </a>
                    </li>

                    <li class="selected-seats__placeholder" v-for="index in numToPick" :key="'n' + index">
                        <svg xmlns="http://www.w3.org/2000/svg" class="selected-seats__placeholder-icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#seat"></use>
                        </svg>
                        <p class="selected-seats__seat-location">{{$t('components.seatMap.seatMapOverview.selected-seats__seat-location')}}</p>
                    </li>
                </ul>
                <!-- / Seats -->

                <ul class="selected-seats__overview-list" v-if="handleAny">
                    <li class="selected-seats__seat" v-for="(seat, index) in chosenSeats" :key="index">
                        <!-- {{seat}} -->
                        <div class="selected-seats__seat-type" :class="'seat--' + seat.overview.filterClass"></div>
                          <p class="selected-seats__seat-location">{{seat.areaName}}</p>  
                          <p class="selected-seats__seat-number">{{seat.name}}</p>
                          <p class="selected-seats__seat-information" id="data">{{seat.seatInformation}}</p>
                        <p class="selected-seats__seat-price">{{$t('components.seatMap.seatMapOverview.selected-seats__seat-price', {price : seat.overview.price.toFixed(2)})}}</p>
                        <a class="selected-seats__remove-btn" href="#" @click="removeItem(seat, $event)">
                            <svg xmlns="http://www.w3.org/2000/svg" class="selected-seats__remove-btn-icon">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#trash"></use>
                            </svg>
                        </a>
                    </li>

                    <li class="selected-seats__placeholder" v-if="chosenSeats.length < numOfTicketsPicked.num">
                        <svg xmlns="http://www.w3.org/2000/svg" class="selected-seats__placeholder-icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#seat"></use>
                        </svg>
                        <p class="selected-seats__seat-location">{{$t('components.seatMap.seatMapOverview.selected-seats__seat-location')}}</p>
                    </li>
                </ul>
                <!-- / Seats -->
            </div>

            <div class="selected-seats__system">
                <a href="#" class="selected-seats__system-link" @click="bestSeatSeleection" v-if="chosenSeats.length < numOfTicketsPicked.num && !handleAny">{{(!chosenArea || chosenArea.id === "ALL") ? $t('components.seatMap.seatMapOverview.selectBestSeats') : $t('components.seatMap.seatMapOverview.selectBestSeatsInArea', { area : chosenArea.name})}}</a>
            </div>

            <div class="selected-seats__system">
                <a href="#" class="selected-seats__remove_all-link" @click="removeAllSeats" v-if="chosenSeats.length > 0">{{$t('components.seatMap.seatMapOverview.selected-seats__remove_all-link')}}</a>
            </div>

            <!-- Line Break -->
            <hr class="selected-seats__separator" v-if="enableConcessions()"/>
            <!-- / Line Break -->

            <concessions :chosenSeats="chosenSeats" :seatMap="seatMap" @priceUpdate="onPriceUpdate" v-if="enableConcessions()"></concessions>

            <!-- Line Break -->
            <hr class="selected-seats__separator" />
            <!-- / Line Break -->

            <!-- Total -->
            <footer class="selected-seats__total">
                <p class="selected-seats__total-title">{{$t('components.seatMap.seatMapOverview.selected-seats__total-title')}}</p>
                <p class="selected-seats__total-price">{{$t('components.seatMap.seatMapOverview.selected-seats__total-price', { price : totalPrice.toFixed(2)})}}</p>

                <button class="btn--medium selected-seats__btn" @click="nextStep()" :disabled="(chosenSeats.length < numOfTicketsPicked.num)" v-if="numOfTicketsPicked && !handleAny">
                    {{ (chosenSeats.length >= numOfTicketsPicked.num) ? $t('components.seatMap.seatMapOverview.next') :  $t('components.seatMap.seatMapOverview.selectNumberSeats', {number : numOfTicketsPicked.num - chosenSeats.length}) }}
                </button>

                <button class="btn--medium selected-seats__btn" @click="nextStep()" :disabled="(chosenSeats.length < 1)" v-if="numOfTicketsPicked && handleAny">
                    {{ (chosenSeats.length > 0) ? $t('components.seatMap.seatMapOverview.next') :  $t('components.seatMap.seatMapOverview.selectASeat') }}
                </button>

                <div class="selected__seats-re-select">
                    <a href="#" class="selected__seats-re-select-link" @click="changeSelection">{{ $t('components.seatMap.seatMapOverview.selected__seats-re-select-link') }}</a>
                </div>
            </footer>
            <!-- / Total -->
        </div>
        <!-- / container -->
    </div>
    <!-- / Selected Seats -->
</template>

<script>

import serviceBus from '../../services/serviceBus';
import concessions from "./Concessions.vue";
import { settings as appSettings } from "../../../config/config";
  

export default {

        components: {
            concessions
        },

    data() {
        return {
            totalPrice: 0,
            numToPick: 0
        }
    },

    props: ["chosenSeats", "seatMap", "errors"],

    methods: {
        // Remove seat
        removeItem(item, event) {
            event.preventDefault();
            this.seatMap.removeSeat(item)
        },

        onPriceUpdate(price) {
           
            this.totalPrice = price;
            
        },

        // EnableConcessions
        enableConcessions() {
            return appSettings.core.enableConcessions;
        },

        // Remove all seats
        removeAllSeats(event) {
            event.preventDefault();
            this.chosenSeats.forEach((seat) => this.removeItem(seat, event));

            
                 this.$emit('removeAllSeats');
           
        },

        // Progress to next step in purchase path
        nextStep() {
            const vm = this;

            // Handle any seats option
            if(this.handleAny) {
                if(this.chosenSeats.length < 1) {
                    return;
                }
            }
            else if(this.chosenSeats.length < this.numOfTicketsPicked.num) {
                return;
            }

            // Add the seats to the basket
            serviceBus.$emit("basketAddSeats", {
                seats: this.chosenSeats, 
                callback: ({error}) => {
                   vm.errors.push(error); 
                }
            });
        },

        // Best seat selection
        bestSeatSeleection(event) {
            event.preventDefault();
            this.seatMap._bestSeatSelection();

        },
        
        // Handle changing selection
        changeSelection(event) {
            event.preventDefault();
            serviceBus.$emit("basketResetWarning", {routeName: "ticketSelect"});
        }
    
    },

    computed: {
        // Number of tickets picked & num still to pick
        numOfTicketsPicked() {
            this.numToPick = (this.$store.getters.getTicketAmount) ? this.$store.getters.getTicketAmount.num : undefined;
            // Retrieve the number of tickets chosen
            return this.$store.getters.getTicketAmount;
        },
        
        // User defined chosen area within state
        chosenArea() {
            return this.$store.getters.getChosenArea;
        },

        // Any tickets handling
        handleAny() {
            return this.$store.getters.getTicketAmount.name === "any";
        }
       
    },

    watch: {
        // Watch for change in chosen seats and update number to pick
         chosenSeats() {
            this.totalPrice = 0;
            this.chosenSeats.forEach((item) => {
                this.totalPrice += item.overview.price;
            });

         
            this.numToPick = this.numOfTicketsPicked.num - this.chosenSeats.length;
        }
    }
}


</script>
