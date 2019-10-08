<template>
<!-- Seat Selection -->
<div class="seat-selection" data-seat-selection>

    <error-messages v-if="errors.length > 0" :errors="errors"></error-messages>

    <!-- Content -->
    <div class="seat-selection__content">
        
    <div v-if="isMobile()" class="price-filters">
     <h3 class="error-messages__title" v-if="(numOfTicketsPicked.num === 10) && errors.length === 0"> {{$t('views.seatSelection.error-messages__title-max-seats-selected') }}</h3>
     <h3 class="error-messages__title" v-else-if="(chosenSeats.length < numOfTicketsPicked.num) && errors.length === 0"> {{ $t('views.seatSelection.error-messages__title-other', {seatsLeft : (this.numOfTicketsPicked.num - this.chosenSeats.length)}) }}</h3>
       <br>
        
    </div>
        <!-- Filters -->
        <div v-if="!isMobile()" class="price-filters">
           <h3 class="error-messages__title" v-if="(numOfTicketsPicked.num === 10) && errors.length === 0"> {{$t('views.seatSelection.error-messages__title-max-seats-selected') }}</h3>
            <h3 class="error-messages__title" v-else-if="(chosenSeats.length < numOfTicketsPicked.num) && errors.length === 0"> {{ $t('views.seatSelection.error-messages__title-other', {seatsLeft : (this.numOfTicketsPicked.num - this.chosenSeats.length)}) }}</h3>
            <br>
            <h3 class="price-filters__title">{{ $t('views.seatSelection.price-filters__title') }}</h3>
            <!-- Container -->
            <div  class="price-filters__container">
                <!-- Items -->
                <div class="price-filters__items" data-price-filters>
                    <!-- Generated Via JS -->
                </div>
                <!-- / Items -->
                <!-- Key -->
                <ul  class="price-filters__key">
                   <li class="price-filters__key-item price-filters__key-item--unavailable">{{ $t('views.seatSelection.price-filters__key-item--unavailable') }}</li>
                    <li class="price-filters__key-item price-filters__key-item--selected">{{ $t('views.seatSelection.price-filters__key-item--selected') }}</li>
                    <li class="price-filters__key-item price-filters__key-item--non-standard">{{ $t('views.seatSelection.price-filters__key-item--non-standard') }}</li>
                    <li class="price-filters__key-item price-filters__key-item--disabled">{{ $t('views.seatSelection.price-filters__key-item--disabled') }}</li>
                </ul>
                <!-- / Key -->
            </div>
            <!-- / Container -->
        </div>
        <!-- / Filters -->

        <!-- Area Selection -->
        <div class="area-selection" data-area-selection>
            <!-- Added In JS -->
        </div>
        <!-- / Area Selection -->

        <!-- Seat Map -->
        <div class="seat-map">
            <!-- Controls -->
            <div class="seat-map__controls" data-seat-map-controls>
                <button class="seat-map__controls-btn" data-zoom-in>
                    <svg xmlns="http://www.w3.org/2000/svg" class="seat-map__controls-btn-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-in"></use>    
                    </svg>
                </button>
                <button class="seat-map__controls-btn" data-zoom-reset>
                    <svg xmlns="http://www.w3.org/2000/svg" class="seat-map__controls-btn-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#refresh"></use>    
                    </svg>
                </button>
                <button class="seat-map__controls-btn" data-zoom-out>
                    <svg xmlns="http://www.w3.org/2000/svg" class="seat-map__controls-btn-icon">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-out"></use>    
                    </svg>
                </button>
            </div>
            <!-- / Controls -->

            <!-- Container --> 
            <div class="seat-map__container" data-seat-map-container data-active-filters>
                <!-- Map Rendered Within JS -->
            </div>
            <!-- / Container -->

            <!-- Limit Reached Warning -->
            <!--<transition v-on:before-enter="prepareAnimation" v-on:enter="animateInWarning" v-on:leave="animateOut" mode="out-in">
            <div class="seat-map__limit" v-if="limitReached">
                <div class="seat-map__limit-content">
                    <h3 class="seat-map__limit-reached-title">
                        Maximum Selection Made
                    </h3>
                    <p class="seat-map__limit-reached-text">
                        {{(handleAny) ? "Please create a new session to book more tickets." : "You have selected " + numOfTicketsPicked.num + "/" + numOfTicketsPicked.num + " tickets."}}
                    </p>
                </div>
            </div>
            </transition>-->
            <!-- / Limit Reached Warning -->

            <!-- Attempt to Make an Illegal Seat Selection Message -->				
            <transition v-on:before-enter="prepareAnimation" v-on:enter="animateInWarning" v-on:leave="animateOut" mode="out-in">
            <div class="seat-map__limit" v-if="enableIllegalSeatSelection">
                <div class="seat-map__limit-content">
                    <h3 class="seat-map__limit-reached-title">
                      {{ $t('views.seatSelection.seat-map__limit-reached-title') }}
                    </h3>
                    <p class="seat-map__limit-reached-text">
                        {{illegalSeatSelectionMessage}}
                    </p>
                </div>
            </div>
            </transition>
            <!-- / Attempt to Make an Illegal Seat Selection Message  -->

            <!-- Tool Tip Added In JS -->
        </div>
        <!-- / Seat Map -->
        <div  v-if="isMobile()" class="price-filters">
          
          <h3 class="price-filters__title">{{ $t('views.seatSelection.price-filters__title') }}</h3>
            <!-- Container -->
          <div class="price-filters__container">
              <!-- Items -->
              <div class="price-filters__items" data-price-filters>
                  <!-- Generated Via JS -->
              </div>
              <!-- / Items -->
              <ul class="price-filters__key">
                  <li class="price-filters__key-item price-filters__key-item--unavailable">{{ $t('views.seatSelection.price-filters__key-item--unavailable') }}</li>
                  <li class="price-filters__key-item price-filters__key-item--selected">{{ $t('views.seatSelection.price-filters__key-item--selected') }}</li>
                  <li class="price-filters__key-item price-filters__key-item--non-standard">{{ $t('views.seatSelection.price-filters__key-item--non-standard') }}</li>
                  <li class="price-filters__key-item price-filters__key-item--disabled">{{ $t('views.seatSelection.price-filters__key-item--disabled') }}</li>
              </ul>
              <!-- / Key -->
          </div>
            <!-- / Container -->
        </div>


    </div>
    <!-- / Content -->

    <!-- Side Bar -->
    <div class="seat-selection__side-bar">
        <seat-map-overview :chosenSeats="chosenSeats" :seatMap="seatMap" :errors="errors" @removeAllSeats="onRemoveAllSeats"></seat-map-overview>
    </div>
    <!-- / Side Bar -->

</div>
<!-- / Seat Selection -->
</template>

<script>
import anime from "animejs";
import SeatMapOverview from "../components/SeatMap/SeatMapOverview.vue";
import ErrorMessages from "../components/shared/ErrorMessages/ErrorMessages.vue";
import apiEventBus from '../services/apiEventBus';
import serviceBus from '../services/serviceBus';
import { SeatMap } from "../../core/objects/SeatMap";
import { SeatMapAreas } from "../../core/objects/SeatMapAreas";
import { SeatMapFilters } from "../../core/objects/SeatMapFilters";
import { SeatMapToolTip } from "../../core/objects/SeatMapToolTip";
import { Loading } from "../../core/objects/Loading";
import { findSeatOrigin, createCheckMarkSVG } from "../../core/helpers/seatMap/seatMap";
import { VTSeatRules } from "../../core/objects/VTSeatRules";
import { settings as appSettings } from "../../config/config";
import { scrollTo } from "../../core/helpers/scrollTo";
import  i18n  from '../../i18n-setup';

// Placeholder for loader
let loader;

    export default {
        data() {
            return {
                chosenSeats: [],
                seatMap: undefined,
                limitReached: false,
                enableIllegalSeatSelection: false,
                illegalSeatSelectionMessage: '',
                errors: []
            }
        },

        components: {
            SeatMapOverview,
            ErrorMessages
        },

        computed: {
            // Retrieve the number of tickets chosen & update num to pick
            numOfTicketsPicked() {
                this.numToPick = (this.$store.getters.getTicketAmount) ? this.$store.getters.getTicketAmount.num : undefined;
                return this.$store.getters.getTicketAmount;
            },

			// Any tickets handling
			handleAny() {
				return this.$store.getters.getTicketAmount.name === "any";
			},
        },
        
        mounted() {
            const vm = this;
		
			// Send event notification to Google Analytics.
			this.$ga.event({eventCategory: 'btcFlowTracking',eventAction: 'select-seat'});

            this.$store.dispatch("setCurrentStep", "seatSelect");

            // Create a new loader
            loader = new Loading(this.$el.parentNode, {
               // title: "Loading seat map",
                title: i18n.t('components.seatMap.seatSelection.loader.title'),
                icon: "ticket"
            });
            loader.insert();

            // Get the seats within the basket
            const basketSeats = this.$store.getters.getBasketSeats;

            // fetch the seat data
            serviceBus.$emit("seatMapFetchData", (seatData) => {
                
                // Create a new seat map
                vm.seatMap = new SeatMap({
                    wrapper: this.$el.querySelector(".seat-map"),
                    container: this.$el.querySelector("[data-seat-map-container]"),
                    seatData,
                    controls: this.$el.querySelector("[data-seat-map-controls]"),
                    onMapReady: function() {
                        const seatMap = this;
                        // Add Areas Extension
                        seatMap._areas = new SeatMapAreas({seatMap: this, container: vm.$el.querySelector("[data-area-selection]"), vue : vm, onSelect: (area) => {
                            serviceBus.$emit("seatMapSetArea", area);
                        }});

                        // Add Filters Extension
                        seatMap._filters = new SeatMapFilters({seatMap: this, container: vm.$el.querySelector("[data-price-filters]"), vue : vm});
                        
                        // Add Tooltip Extension                        
                        seatMap._toolTip = new SeatMapToolTip({
                            seatMap: this, 
                            container: vm.$el.querySelector(".seat-map"), 
                            beforeOpen: function(target) {
                                // Prevent filtered items from showing tool tip
                                if(seatMap._filters.active.filter((currentFilter) => currentFilter === target.filterClass).length === 0) {
                                    return false;
                                }
                                return true;
                            }
                        });

                        // Add Rules Extension
                        seatMap._rules = new VTSeatRules([1], vm);

                        // Handle seats within basket
                        if(basketSeats && basketSeats.length > 0) {
                            // // Locate Seats within data                       
                            basketSeats.forEach((currentSeat) => {
                                // Locate item
                                seatMap.selectSeat(findSeatOrigin(this.seatData, currentSeat), true);
                            });
                        }

                        // Remove loader
                        loader.remove();
                    },
                    selectSeat: function(item, isFromBasket, successCallback) {
                        

                        // If limit is reached 
                        if (vm.handleAny === false && vm.chosenSeats.length === vm.numOfTicketsPicked.num) {
                            vm.limitReached = true;
                            //this._toolTip.close();
                            //return;
                        }
                        else if (vm.numOfTicketsPicked.num === appSettings.core.maximumNumberOfSelectableSeatsForAny) {
                            vm.limitReached = true;
                        }

                        let remainingCount = vm.numOfTicketsPicked.num - vm.chosenSeats.length;

                        if (vm.handleAny) {
                            remainingCount = appSettings.core.maximumNumberOfSelectableSeatsForAny - vm.chosenSeats.length;
                        }
						if (remainingCount > 1) {
							remainingCount = vm.handleAny ? 1 : remainingCount;
						}

                        if (remainingCount === 0) {
                            remainingCount = vm.numOfTicketsPicked.num;
                        }

                        let autoSelect;
                        

                        if (isFromBasket) {
                            autoSelect = {
                                success: [item]
                            }
                        } else {
                            // Auto seat select
                            const originArea = vm.seatMap.seatData.seats.filter((currentArea) => currentArea.area.id === item.areaID);
                            if(originArea.length > 0) {
                                const originRow = originArea[0].rows.filter((currentRow) => currentRow.id === item.rowId);
                                // Determine if seats that are already selected 
                                // can be ignored.  For now this is only the case
                                // when the target number of seats have been selected
                                // and all of these seats are in the same row as the 
                                // target seat.
                                let ignoreSelecetedSeats = false;
                                if (vm.limitReached) {
                                    if (vm.chosenSeats) {
                                        if (vm.chosenSeats.length > 0) {
                                            if ( (item.areaID == vm.chosenSeats[0].areaID) && (item.rowId == vm.chosenSeats[0].rowId) ) {
                                                ignoreSelecetedSeats = true;
                                                vm.chosenSeats.forEach(seat => ignoreSelecetedSeats && (item.areaID == seat.areaID) && (item.rowId == seat.rowId) );
                                            }
                                        }
                                    }
                                }
                                autoSelect = vm.seatMap._rules.selectMaximum(originRow[0].seats, item, remainingCount, ignoreSelecetedSeats);
                                if(autoSelect.error || autoSelect.message) {
                                    // Enable the display of messages and return.
                                    vm.illegalSeatSelectionMessage = autoSelect.error ? autoSelect.error : autoSelect.message;
                                    vm.enableIllegalSeatSelection = true;
                                    return;
                                }
                            }
                            // Set default
                            else {
                                autoSelect = {
                                    success: [item]
                                }
                            }

                            if (vm.limitReached && autoSelect.success) {
                                if (autoSelect.success.length !== vm.numOfTicketsPicked.num ) {
                                    return;
                                }
                                vm.chosenSeats.forEach(seat => this.removeSeat(seat));
                            }
                        }

                        // Handle errors
                        if(autoSelect.error) {
                            vm.handleError({error: autoSelect.error, hardReset: true});
                            return;
                        }

                        // Select the seats
                        autoSelect.success.forEach((currentItem) => {
                            //clear existing error messages
                            if (vm.errors.length > 0) {
                                vm.errors = [];
                                
                            }

                            // Update the item status
                            currentItem.selected = true;
                            currentItem.checkMark = createCheckMarkSVG({
                                x: currentItem.element.getAttribute("cx"), 
                                y: currentItem.element.getAttribute("cy")
                            });
                            
                            // Append the SVG Checkmark
                            currentItem.element.parentNode.appendChild(currentItem.checkMark);

                            // Get the filter
                            const filter = vm.seatMap.seatData.filters.filter((currentFilter) => currentFilter.id === currentItem.priceId)[0];

                            
                            // Add additional info for seat overview
                            currentItem.overview = {
                                filterClass: filter.filterClass,
                                price: filter.price

                            };

                            if (!currentItem.dc) {
                                currentItem.dc = appSettings.core.discountCode;
                            }

                            if (!currentItem.dgc) {
                                currentItem.dgc = appSettings.core.discountGroup;
                            }

                            const discount = filter.dcs.find(dc => dc.code === currentItem.dc && dc.discount_group_code === currentItem.dgc);
                            currentItem.overview.unitprice = discount.unit_price;

                            currentItem.overview.discountDescription = discount.description;

                            //currentItem.dgc = appSettings.core.discountGroup;

                            // Add to chosen seats
                            vm.chosenSeats.push(currentItem);
                             if(vm.chosenSeats.length === vm.numOfTicketsPicked.num) {
                            this._toolTip.close();
                             }

                        });
                    
                        if (autoSelect.message) {
                            vm.errors.push(autoSelect.message);
                        }

                        (successCallback) ? successCallback() : "";
                    },
                    removeSeat: function(item) {

                        // Auto seat select
                        const originArea = vm.seatMap.seatData.seats.filter((currentArea) => currentArea.area.id === item.areaID);

                        const remainingCount = vm.numOfTicketsPicked.num - vm.chosenSeats.length;
                        
                        // Handle auto suggest removal
                        let seatsToRemove = [item];
                        if(originArea.length > 0) {
                            const originRow = originArea[0].rows.filter((currentRow) => currentRow.id === item.rowId);
                            
                            // Suggest seats to remove
                            const suggestedSeats = vm.seatMap._rules.deselectSeat(originRow[0].seats, item, vm.numOfTicketsPicked.num);
                            
                            if(seatsToRemove.error) {
                                vm.handleError({ error, hardReset: true});
                                return;
                            }

                            seatsToRemove = suggestedSeats.success;
                        }

                        const cache = vm.$store.getters.getOfferedSeatsCache;

                        seatsToRemove.forEach((currentSeat) => {
                            // Update Status
                            currentSeat.selected = false;

                            // Remove SVG Checkmark
                            currentSeat.checkMark.parentNode.removeChild(currentSeat.checkMark);
                            
                            // Remove chosen seat
                            vm.chosenSeats = vm.chosenSeats.filter((seat) => seat !== currentSeat);

                             if (cache != null && cache.filter((seat) => {
                            (seat.seatBlockId == currentSeat.areaID) &&
                                (seat.seatRowId == currentSeat.rowId) &&
                                (seat.firstSeatIndex <= currentSeat.id || seat.lastSeatIndex >= currentSeat.id)
                            }))
                            {
                                currentSeat.filterClass = currentSeat.overview.filterClass;
                                const seatElement = currentSeat.element;
                                seatElement.setAttribute("class", `seat seat--${currentSeat.filterClass}`);
                                currentSeat.available = true;
                                //seatElement.
                            }
                        });

                        vm.limitReached = false;
						vm.enableIllegalSeatSelection = false;

                    }
                });

                // Add extension for best seat selection
                vm.seatMap._bestSeatSelection = () => {

                    // Remove previous selection
                    this.chosenSeats.forEach((currentSeat) => vm.seatMap.removeSeat(currentSeat));
                    
                    // Get the best seats
                    serviceBus.$emit("systemChooseSeats", ({data, error}) => {
                        if(error) {
                            vm.handleError({error, hardReset: true});
                            return;
                        }
                        
                        data.forEach((currentSeat) => vm.seatMap.selectSeat(currentSeat, true));
                    });
                }
            });
        },

        computed: {
            // Number of tickets picked in state
            numOfTicketsPicked() {
                // Retrieve the number of tickets chosen
                return this.$store.getters.getTicketAmount;
            },

            // Check if exception for handle any
            handleAny() {
                return this.$store.getters.getTicketAmount.name === "any"
            },

            enableAccessibilitySeating() {
                return appSettings.core.enableAccessibilitySeating;
            }
        },

        methods: {
            // Handle any errors
            handleError({error, hardReset}) {
                if(hardReset) {
                    this.errors = [];
                }
                this.errors.push(error);
            },

            // Method used to handle navigation to the extras step.
            extras() {
                this.$router.push({ name: "additionalExtras" });
            },

            onRemoveAllSeats() {

                this.seatMap._toolTip.close();
                if (window.innerWidth < 450) {
                    scrollTo(this.$el);
                }
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
                        // Fire callback
                        done();
                    }
                });
            },

            // Animation for leaving warning
            animateInWarning(element, done) {
                const vm = this;
                // animate the element out of view
                const animation = anime({
                    begin: () => {
                        // Set the element to hidden
                        element.style.opacity = 0;
                        element.style.display = "block";
                    },
                    targets: element,
                    opacity: 1,
                    duration: 300,
                    delay: 100,
                    easing: "linear",
                    complete: () => {
                        setTimeout(() => {
                            // Reset to allow for new animation
                            vm.limitReached = false;
                            vm.enableIllegalSeatSelection = false;
                        }, 2000);
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
                        // Fire callback
                        done();
                    }
                });
            },

            // Method used to prepare the element for animation.
            prepareAnimation(element) {
                element.style.opacity = 0;
            },

            isMobile: function() {
    	var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
    }


        },

        beforeDestroy() {
            const vm = this;
            // Destroy the seat map
            vm.seatMap.destroy();
        }
    }
</script>