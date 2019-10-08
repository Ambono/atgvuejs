<template>
    <!-- Seating Plan -->
    <div class="seating-plan" data-seating-plan>
        
        <div class="seating-plan__intro">
            <h2 class="seating-plan__intro-title">{{ $t('components.seatMap.seatMapModal.intro-title')}}</h2>
            <a href="#" class="seating-plan__close" data-close>
                <svg xmlns="http://www.w3.org/2000/svg" class="seating-plan__close-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-in"></use>
                </svg>
            </a>
            <hr>
        </div>

        <!-- Seat Map -->
        <div class="seat-map" data-seat-test>
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
            <div class="seat-map__container" data-seat-map-container data-active-filters="lightBlue,pink,blue,orange,red">
                <!-- Map Rendered Within JS -->
            </div>
            <!-- / Container -->

            <!-- Tool Tip Added In JS -->
        </div>
        <!-- / Seat Map -->

    </div>
    <!-- / Seating Plan -->
</template>

<script>
import { Modal } from "../../../core/objects/Modal";
import { SeatMap } from "../../../core/objects/SeatMap";
import { SeatMapToolTip } from "../../../core/objects/SeatMapToolTip";
import { findSeatOrigin, createCheckMarkSVG } from "../../../core/helpers/seatMap/seatMap";


export default {

    computed: {
        // Seat Data stored in state
        seatData() {
            return this.$store.getters.getSeatData;
        },
        // Chosen seats within state
        chosenSeats() {
            return this.$store.getters.getBasketSeats;
        }
    },

    mounted() {
        const vm = this;
        
        // Timeout to allow vue change,
        // This is required to ensure the data-map-modal element is on the page prior to loading the overlay.
        window.setTimeout(() => {
            const trigger = document.querySelector("[data-map-modal]");
            
            if(!trigger) {
                return
            }

            // Helper function to create seat map
            const createSeatMap = (container, seatData) => {
                const seatMap = new SeatMap({
                    wrapper: container.querySelector("[data-seating-plan]"),
                    container: container.querySelector("[data-seat-map-container]"),
                    seatData,
                    controls: container.querySelector("[data-seat-map-controls]"),
                    presentation: true,
                    onMapReady: function() {
                        new SeatMapToolTip({seatMap: this, container: container});
                        if(vm.chosenSeats) {
                            // Locate Seats within data
                            vm.chosenSeats.forEach((currentSeat) => {
                                // Locate item
                                this.selectSeat(findSeatOrigin(this.seatData, currentSeat), false);
                            });
                        }
                    },
                    selectSeat: function(item) {

                        // Update the item status
                        item.selected = true;
                        item.checkMark = createCheckMarkSVG({
                            x: item.element.getAttribute("cx"), 
                            y: item.element.getAttribute("cy")
                        });
                        
                        // Append the SVG Checkmark
                        item.element.parentNode.appendChild(item.checkMark);

                    },
                });

                return seatMap;
            }

            // Create modal instance and bind seat map instance
            const modal = new Modal( document.querySelector("[data-seating-plan]"), {
                contentEvents: function() {
                    vm.seatMap = createSeatMap(this.elements.content, vm.seatData);
                    // Handle close button
                    const closeBTN = this.elements.contentContainer.querySelector(".seating-plan__close");
                    closeBTN.addEventListener("click", (event) => {
                        event.preventDefault();
                        this.close();
                    });
                },
                closeEvents: function() {
                    vm.seatMap.destroy();
                },
                enableClose: true
            });

            // attach events
            trigger.addEventListener("click", (event) => {
                event.preventDefault();
                modal.open();
            }); 
        }, 750); 
    }
}
</script>

