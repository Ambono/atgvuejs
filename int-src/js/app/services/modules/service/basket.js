/* Dependencies */ 
import moment from "moment";
import store from "../../../store/store";
import apiEventBus from "../../apiEventBus";
import { router } from "../../../../main";
import { Modal } from "../../../../core/objects/Modal";
import { trapFocus } from "../../../../core/helpers/trapFocus";
import { settings as appSettings } from "../../../../config/config";
import  i18n  from '../../../../i18n-setup'; 

/**
 * Service used to handle basket interaction. 
 * @function
 * @ignore
 * @param {Object} serviceBus - The service bus to be bound to.
 */
export const basket = (serviceBus) => {

    // Additional Items
    serviceBus.$on("basketSetDeliveryMethod", ({item}) => {
        store.commit("updateBasketDeliveryMethod", {item, callback: () => {
           serviceBus.$emit("calculateBasketTotal");
        }});
    });

    serviceBus.$on("basketSetDefaultDeliveryMethod", ({item}) => {
        store.commit("setDefaultDeliveryMethod", {item, callback: () => {
            serviceBus.$emit("calculateBasketTotal");
         }});
    });
    
    serviceBus.$on("basketSetTicketInsurance", ({item}) => {
        store.commit("updateBasketTicketInsurance", {item, callback: () => {
           serviceBus.$emit("calculateBasketTotal");
        }});
    });

    // Timeout
    serviceBus.$on("basketSetTimeout", (timeout) => {
        // Set the timeout
        store.commit("basketSetTimeout", moment().add(20, "Minutes"));
    });

    serviceBus.$on("basketRemoveTimeout", () => {
        // Remove the timeout
        store.commit("basketRemoveTimeout");
    });



    // Remove existing offered seats
    serviceBus.$on("releaseSeatOffers", (callback) => {
        
        const offeredSeats = store.getters.getOfferedSeatsCache;

        apiEventBus.$emit("releaseSeatOffers", ({ 
            data: offeredSeats, 
            callback: () => { 
                // clear row id
                store.commit("removeOfferedSeatsCache");  
                callback();
            }
        }));
    });


    serviceBus.$on("basketAddSeats", ({seats, callback}) => {

        store.commit("setSeats", seats);

        const performanceId = store.getters.getChosenPerformanceID;

        const groups = seats.map((currentItem) => {
            const format = currentItem.name.match(/[a-zA-Z]+|[0-9]+/g);
            return {
                rowId: format[0],
                seatId: currentItem.id,
                rowNum: currentItem.rowId,
                name: currentItem.name,
                area: currentItem.areaID,
                id: currentItem.id,
                dc: currentItem.dc,
                dgc: currentItem.dgc,
                priceBand: currentItem.priceId,
                seatInformation: currentItem.seatInformation
            };
        });

        const rowGroups = [];
        groups.forEach((currentItem) => {
            const findRow = rowGroups.filter((currentRowGroup) => currentItem.rowId === currentRowGroup.id);

            if(findRow.length > 0) {
                findRow[0].items.push(currentItem);
            }
            else {
                rowGroups.push({
                    id: currentItem.rowId,
                    items: [currentItem]
                })
            }
        });

        const seatGroups = [];
        rowGroups.forEach((currentRowGroup) => {
            // Find number next to each other
            const group = currentRowGroup.items.reduce((r, n) => {
                const lastSubArray = r[r.length - 1];

                if (!lastSubArray || parseInt(lastSubArray[lastSubArray.length - 1].seatId) !== n.seatId + 1 && parseInt(lastSubArray[lastSubArray.length - 1].seatId) !== n.seatId - 1 || lastSubArray[lastSubArray.length - 1].priceBand !== n.priceBand || lastSubArray[lastSubArray.length - 1].seatInformation !== n.seatInformation) {
                    r.push([]);
                } 

                r[r.length - 1].push(n);
          
                return r; 
            }, []);

            seatGroups.push(group.sort((item1, item2) => {
                return item1.seatId - item2.seatId;
            }));
        });

        


        // Form the data
        const groupsData = [];
        seatGroups.forEach((currentSeatGroup) => {
            currentSeatGroup.forEach((currentSeatGroupItem) => {

                // Get min and max 
                const values = currentSeatGroupItem.map((currentItem) => currentItem.seatId);
                const firstSeat = Math.min(...values);
                const lastSeat = Math.max(...values);

                const discountQuantities = [];

                currentSeatGroupItem.forEach((seat) => {

                    const discount = discountQuantities.find(item => item.discount_group_code === seat.dgc && item.discount_code === seat.dc);

                    if (!discount) {
                        discountQuantities.push({ discount_code: seat.dc, discount_group_code: seat.dgc, discount_element: 1, quantity : 1 });
                    }
                    else {
                        discount.quantity++;
                    }
                });

                groupsData.push({
                    "seat_block_id": currentSeatGroupItem[0].area,
                    "row_id": currentSeatGroupItem[0].rowNum,
                    "first_seat_id": firstSeat, 
                    "last_seat_id": lastSeat,
                    "discount_quantities": discountQuantities
                    //"discount_quantities": [
                    //    {
                    //        "quantity": currentSeatGroupItem.length,
                    //        "discount_group_code": appSettings.core.discountGroup,
                    //        "discount_code": appSettings.core.discountCode,
                    //        "discount_element": 1
                    //    }
                    //]
                });
            });
        });

        const seatData = {
            client: appSettings.core.client,
            groups: groupsData,
            performance_id: performanceId
        }
		 
         // Always release seat any existing offers before requesting new offers;
		 // This covers hold best seat where the best offer may have been rejected
		 // by the user selecting alterntaives and odd scenarios that arose during 
		 // testing where the user itterates back and forth but details of offered 
		 // seats fail to be recorded in the local store.
		 serviceBus.$emit("releaseSeatOffers", () => {
			serviceBus.$emit("basketOfferSeats", ({seatData, callback }));
		 });
    });

    // Offer the seats 
    serviceBus.$on("basketOfferSeats", ({ seatData, callback }) => {
        apiEventBus.$emit("offerSeats", {data: seatData, callback: ({error, offers}) => {

            if(error) {
                serviceBus.$emit("basketWipeSeats");
                callback({error});
                return;
            }
        
            store.commit("setOfferedSeatsCache", offers.map((currentOffer) => {
                return {
                    client: appSettings.core.client,
                    performanceId: currentOffer.performance_id,
                    seatBlockId: currentOffer.seat_block_id,
                    seatRowId: currentOffer.row_id,
                    firstSeatIndex: parseInt(currentOffer.first_seat_id),
                    lastSeatIndex: parseInt(currentOffer.last_seat_id),
                    dc: currentOffer.discount_code,
                    dgc: currentOffer.discount_group_code
                };
             }));

            serviceBus.$emit("basketSetTimeout");

            if (router.history.current.name === "checkout") {
                return;
            };

            // Navigate to extras
            router.push({ name: "additionalExtras" })
        }});
    });

    // Wipes the local selected seats
    serviceBus.$on("basketWipeSeats", () => {
        store.commit("basketWipeSeats");
    });            

    // Warnings
    serviceBus.$on("basketResetWarning", ({routeName}) => {
        // Get the content
        const modalTarget = document.querySelector("[data-basket-clear-modal]");
        // Create a new modal
        const modal = new Modal(modalTarget, {
            contentEvents: function(modal)  {
                // Get the actions
                const acceptBTN = modal.elements.modalContainer.querySelector("[data-accept]");
                const denyBTN = modal.elements.modalContainer.querySelector("[data-deny]");                     
                const title =  modal.elements.modalContainer.querySelector("[user-message__info-title]");           
                const desc =  modal.elements.modalContainer.querySelector("[user-info-text]");

                desc.innerHTML = i18n.t('modals.basket.basketChangeWarning');
                title.innerHTML = i18n.t('modals.basket.usermessageinfotitle') ;
                denyBTN.innerHTML =i18n.t('modals.basket.datadeny') ;
                acceptBTN.innerHTML = i18n.t('modals.basket.dataaccept');
   
                acceptBTN.addEventListener("click", (event) => {
                    // Prevent default
                    event.preventDefault();

                    serviceBus.$emit("releaseSeatOffers", () => {
                        serviceBus.$emit("basketWipeSeats");
                        serviceBus.$emit("wipeExtras");

                        store.commit("setChosenDate", null);
                        store.commit("basketRemoveTimeout");
                        
                        modal.close();

                        (!routeName) ? routeName === "ticketSelect": "";
                        
                        router.push({"name": routeName });
                    });
                });

                denyBTN.addEventListener("click", (event) => {
                    modal.close();
                });

                trapFocus(modal.elements.modalContainer)
            }
        });

        modal.open();
    });

    // Update end point
    serviceBus.$on("offerExtras", (callback) => {
        // Release current offers
        apiEventBus.$emit("releaseExtras", () => {
             // Send Extras
            apiEventBus.$emit("offerExtras", () => {
                callback();
            });
        });
    });


    

    serviceBus.$on("retrieveBasketAndSaveDeliveryMethods", (callback) => {
        apiEventBus.$emit("retrieveBasket", ({ seats, seatGroups, extraGroups, orderDetails, gdprQuestions, deliveryMethods }) => {
            store.commit("setBasketSeats", seats);
            store.commit("setBasketSeatGroups", seatGroups);
            store.commit("setCheckoutGDPR", gdprQuestions);
            store.commit("setBasketExtras", extraGroups);
            store.commit("setBasketTotal", orderDetails.total);

            //
            // Set the default delivery method according to the following rules:
            //   If Print@Home is available  (code H) this should be the detault. =>default
            //   Otherwise if there are less than 8 days to the performance, the default should be Care-of-Box-Office (code C).
            //   Otherwise the default should be UK standard mail (code M).
            //
            if(deliveryMethods.length!=0) {
                store.commit("setDeliveryMethods", deliveryMethods);
                let defaultDeliveryMethod = deliveryMethods.find(x => x.value==='H');
                if (defaultDeliveryMethod === undefined)
                {
                    let performanceDate = moment(store.getters.getChosenDate.short, 'DD/MM/YYYY - kk:mma');
                    let daysToShow = performanceDate.startOf('day').diff(moment().startOf('day'),"days");
                    if (daysToShow < 8) {
                        defaultDeliveryMethod = deliveryMethods.find(x => x.value==='C');
                    } else {
                        defaultDeliveryMethod = deliveryMethods.find(x => x.value==='M');
                    }
                    if (defaultDeliveryMethod === undefined) {
                        defaultDeliveryMethod = deliveryMethods[0];
                    }
                }
                if (defaultDeliveryMethod !== undefined) {
                    serviceBus.$emit("basketSetDeliveryMethod", { defaultDeliveryMethod });
                    serviceBus.$emit("basketSetDefaultDeliveryMethod", {item: defaultDeliveryMethod});
                }
            }             
            callback();
        });
    });

    serviceBus.$on("retrieveBasket", (callback) => {
        apiEventBus.$emit("retrieveBasket", ({ seats, seatGroups, extraGroups, orderDetails, gdprQuestions, deliveryMethods }) => {
            store.commit("setBasketSeats", seats);
            store.commit("setBasketSeatGroups", seatGroups);
            store.commit("setCheckoutGDPR", gdprQuestions);
            store.commit("setBasketExtras", extraGroups);
            store.commit("setBasketTotal", orderDetails.total);           
            callback();
        });
    });


    serviceBus.$on("calculateBasketTotal", () => {
        // Calculate total from local basket
        const basketSeats = store.getters.getBasketSeats;
        const extras = store.getters.getActiveExtras;
        const deliveryMethod = store.getters.getBasketDeliveryMethod;
        const ticketInsurance = store.getters.getBasketTicketInsurance;

        let total = 0;

        basketSeats.forEach((currentItem) => total += currentItem.price.price);

        if(extras) {
            extras.forEach((currentItem) => { 
                total += currentItem.prices[0].unit_price * currentItem.quantity;
            });
        }


        if(deliveryMethod) {
            total += deliveryMethod.price;
        }

        if(ticketInsurance) {
            ticketInsurance.forEach((currentItem) => total += currentItem.price);
        }

        store.commit("setBasketTotal", total);
    });
}