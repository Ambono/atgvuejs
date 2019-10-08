<template>
    <!-- Concessions -->
   
       
        <!-- container -->
        <div class="concessions__container">

            <div class="concessions__overview">
                <div class="concessions__title">
                    <a @click="showConcessions = !showConcessions" class="concessions__link" >{{ $t('components.seatMap.concessions.title')}}</a>
                </div>

                <!-- Seats -->
                <ul class="concessions__priceband-list" v-if="showConcessions">
                    <li class="concessions__priceband-item" v-for="(priceBand, index) in chosenSeatsByPriceBand" v-bind:key="priceBand">

                        <p class="concessions__priceband-price">{{ $t('components.seatMap.concessions.priceband-price', { seatPrice : priceBand.price.toFixed(2) }) }}</p>

                        <div class="concessions__priceband-discounts">
                            <ul class="concessions__discounts-list">
                                <li v-for="(dc, index2) in priceBand.dcs" class="concessions__discount" v-bind:key="index2" >

                                    <!-- Seat -->
                                    <div class="concessions__seat-type" :class="'seat--' + priceBand.filterClass"></div>
                                    <p class="concessions__discount-description">{{dc.description}}</p>
                                    <div class="concessions__quantity-select">
                                        <button class="btn btn--medium concessions__btn" data-product-arrow-prev @click="removeSeatFromDiscountCode(index, dc)"
                                                v-if="index2 >= 1" :disabled="dc.numberOfSeats === 0">
                                     
                                       
                                            <svg xmlns="http://www.w3.org/2000/svg" class="product-card__btn-icon">
                                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-out"></use>
                                            </svg>
                                        </button>
                                        
                                        <input type="text" min="0" class="concessions__discount-quantity-input" 
                                               v-model="dc.numberOfSeats" value="0" disabled>
                                        <button class="btn btn--medium concessions__btn" data-product-arrow-next @click="addSeatToDiscountCode(index,dc)"
                                                v-if="index2 >= 1" :disabled="priceBand.numberOfSeats <= dc.numberOfSeats || numberOfSeatsPickedInPriceBand(priceBand) === 0">

                                            <svg xmlns="http://www.w3.org/2000/svg" class="product-card__btn-icon">
                                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-in"></use>
                                            </svg>
                                        </button>
                                    </div>

                                    <p class="concessions__discount-times-sign">x</p>
                                    <p class="concessions__seat-price">{{ $t('components.seatMap.concessions.seat-price', { currency: currency, seatPrice : dc.unit_price.toFixed(2) }) }}</p>
                                    <!-- / Seat -->


                                </li>
                            </ul>
                        </div>
                        

                    </li>

                   
                </ul>
                <!-- / Seats -->

            </div>

        </div>
        <!-- / container -->
    
    <!-- / Selected Seats -->
</template>

<script>
    import serviceBus from '../../services/serviceBus';
    import { settings as appSettings } from "../../../config/config";


    export default {

        data() {
            return {
                totalPrice: 0,
                numToPick: 0,
                chosenSeatsByPriceBand: {},
                showConcessions: false,

            }
        },



        props: ["chosenSeats", "errors", "seatMap"],

        methods: {

            mounted() {


            },

            addSeatToDiscountCode(index, discountCode) {

                const vm = this;

                const defaultDc = appSettings.core.discountCode;

                if (defaultDc === discountCode.code) {
                    return;
                }

                let selectedDc = this.chosenSeatsByPriceBand[index].dcs.find(dc => dc.code == defaultDc);
                let seat = selectedDc.listOfSeats.pop();

                seat.dc = discountCode.code;
                seat.dgc = discountCode.discount_group_code;

                vm.updateui();

            },

            removeSeatFromDiscountCode(index, discountCode) {
                const defaultDc = appSettings.core.discountCode;
                const defaultDiscountGroupCode = appSettings.core.discountGroup;

                if (discountCode.code == defaultDc) {
                    return;
                }


                let dc = this.chosenSeatsByPriceBand[index].dcs.find(dc => dc.code == discountCode.code);
                let seat = dc.listOfSeats.pop();

                seat.dc = defaultDc;
                seat.dgc = defaultDiscountGroupCode;

                this.updateui();

            },

            updateui() {

                var vm = this;
                var seatMapData = vm.seatMap.seatData;

                const defaultDiscountCode = appSettings.core.discountCode;
               
                const defaultDiscountGroup = appSettings.core.discountGroup;

                var dictionary = {};


                this.chosenSeats.forEach((seat) => {

                    const priceBand = seat.priceId;

                    if (dictionary.hasOwnProperty(priceBand) === false) {
                        var list = [];
                        dictionary[priceBand] = {};

                    };

                    var priceBandInChosenSeats = dictionary[priceBand];

                    if (!priceBandInChosenSeats.numberOfSeats) {
                       priceBandInChosenSeats.numberOfSeats = 1;
                    }
                    else {
                        priceBandInChosenSeats.numberOfSeats++;
                    }

                    if (!priceBandInChosenSeats.dcs) {
                        let selectedFilter = JSON.parse(JSON.stringify(seatMapData.filters.find(filter => filter.id === priceBand)));
                        priceBandInChosenSeats.price = selectedFilter.price;
                        priceBandInChosenSeats.dcs = selectedFilter.dcs.filter(dc => dc.discount_group_code === defaultDiscountGroup);
                        priceBandInChosenSeats.filterClass = selectedFilter.filterClass;

                        selectedFilter.dcs.forEach(dc => dc.numberOfSeats = 0);

                    }

                    let selectedDc = priceBandInChosenSeats.dcs.find(dc => dc.code === seat.dc);

                    if (selectedDc.numberOfSeats) {
                        selectedDc.numberOfSeats++;
                    }
                    else {
                        selectedDc.numberOfSeats = 1;
                    }

                    let listOfSeats = [];
                    if (selectedDc.listOfSeats == null) {
                        selectedDc.listOfSeats = listOfSeats;
                    }


                    seat.overview.unitprice = selectedDc.unit_price;

                    selectedDc.listOfSeats.push(seat);



                });
                this.chosenSeatsByPriceBand = dictionary;
                this.totalPrice = 0;
                this.chosenSeats.forEach((item) => {
                    this.totalPrice += item.overview.unitprice;
                });
                this.$emit('priceUpdate', this.totalPrice);

            },
            numberOfSeatsPickedInPriceBand(priceband) {
                var discountCode = appSettings.core.discountCode;
                var defaultDiscountCodeInPriceBand = priceband.dcs.find(dc => dc.code === discountCode)
                return defaultDiscountCodeInPriceBand.numberOfSeats;
            },

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
            },
            currency() {
                return appSettings.format.currency;
            }
        },

        watch: {
            // Watch for change in chosen seats and update number to pick
            chosenSeats() {
                this.updateui();

            }
        }
    }


</script>
