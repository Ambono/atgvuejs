/* Dependencies */ 
import axios from "../../../../config/axios";
import store from "../../../store/store";
import { settings as appSettings } from "../../../../config/config";
import moment from "moment";
import { pricesForPerformanceApiPath, seatStatusForPerformanceApiPath, seatMapForPerformanceApiPath } from "./helpers/apiPaths";

/**
 * Function used to assign a filter class.
 * @function
 * @private
 */
const assignFilterClass = (filterIndex) => {
    const availableFilters = [
        "red","orange", "blue", "pink", "lightBlue", "lightGreen", "purple", "yellow", "green"
    ];

    return availableFilters[filterIndex];
}

/**
 * Function used to lookup the seat block icon name from the seat block ID.
 * @function
 * @private
 */
const lookupIconName = (seatBlockId) => {
	return appSettings.core.seatBlockIcons.hasOwnProperty(seatBlockId) ? appSettings.core.seatBlockIcons[seatBlockId] : undefined;
}

/**
 * Function used to update the seat status on the map.
 * @function
 * @param {*} seatMapData 
 * @param {*} seatStatus 
 * @private
 */
const updateSeatStatus = (seatMapData, seatStatus) => {
    // Return promise
    return new Promise((resolve) => {

        var numberOfContigousSeats = store.getters.getTicketAmount.num;

        if (store.getters.getTicketAmount.name === 'any') {
            numberOfContigousSeats = 1;
        }

        // Loop through seats
        seatMapData.seats.forEach((currentArea) => {
            // Available seats group
            const areaStats = seatStatus.filter((item) => item.seat_block_id === currentArea.area.id);
           
            if(areaStats.length > 0)
            {
                const availableSeats = areaStats[0].status_groups.filter((item) => appSettings.core.allowedSeatStatusValues.indexOf(item.status.id) !== -1);

                const seatsInPriceBands = areaStats[0].price_band_groups;

                const seatAttributeGroups = areaStats[0].seat_attribute_groups;

	            // Loop through rows
                currentArea.rows.forEach((currentRow) => {

                    var runOfContigousSeats = [];
                    var lastSeat;

	                // Loop through seats
	                currentRow.seats.forEach((currentSeat) => {
	                    // Set defautl seat availability
	                    let seatStatus = false;

                        

	                    // If there is any available seats
	                    if(availableSeats.length > 0) {
	                        // Loop throug seat status
	                        availableSeats.forEach((currentStatusGroup) => {
	                            // If seat is found
	                            if(currentStatusGroup.seat_names.filter((item) => item === currentSeat.name).length > 0) {
                                    // Set to available
                                    seatStatus = true;

                                    seatAttributeGroups.forEach((group) => {
                                        const groupThatHoldsSeat = group.seat_names.filter((item) => item === currentSeat.name).shift();

                                        if (groupThatHoldsSeat) {
                                            const seatAttribute = group.seat_attribute;
                                            currentSeat.isDisabled = seatAttribute.is_disabled;
                                            currentSeat.isNonStandard = seatAttribute.is_non_standard;
                                            currentSeat.seatInformation = seatAttribute.description ? seatAttribute.description : "Clear View";
                                        }

                                    }
                                    );

                                    if (currentSeat.isDisabled && !appSettings.core.enableAccessibilitySeating) {
	                                    seatStatus = false;
                                    }


                                    seatsInPriceBands.forEach((priceBand) => {
                                        const priceBandThatHoldsSeat = priceBand.seat_names.filter((item) => item === currentSeat.name).shift();

                                        if (priceBandThatHoldsSeat) {
                                            currentSeat.priceId = priceBand.price.price_id;
                                            currentSeat.filterID = priceBand.price.price_id;
                                        }
                                       
                                    });

                                    //const price_id = cur
                                }


	                        });
	                    }
	
	                    // Update the current seat
	                    currentSeat.available = seatStatus;
	                    if(!seatStatus) {
	                        currentSeat.filterClass = "unavailable";
                        } 

                        var seatNext = true;
                        if (!lastSeat) {
                            lastSeat = currentSeat;
                        }
                        else{
                            seatNext = currentSeat.id === lastSeat.id + 1 || currentSeat.Id === lastSeat - 1;
                            lastSeat = currentSeat;
                        }
                            
                        
                        if (!currentSeat.available || !seatNext) {
                            if (runOfContigousSeats.length < numberOfContigousSeats) {
                                runOfContigousSeats.forEach(x => {
                                    x.available = false;
                                    x.filterClass = "unavailable";
                                });
                            }  

                            runOfContigousSeats = [];
                            if (currentSeat.available) {
                                runOfContigousSeats.push(currentSeat);
                            }
                        }
                        else {
                            if (currentSeat.available) {
                                runOfContigousSeats.push(currentSeat);
                            }
                        }

                    });

                    if (runOfContigousSeats.length < numberOfContigousSeats) {
                        runOfContigousSeats.forEach(x => {
                            x.available = false;
                            x.filterClass = "unavailable";
                        });
                    }
	            });
	        }

        });

        // Finish execution
        resolve();
    });

}

/**
 * Service used to retrieve seat map information.
 * @function
 * @ignore
 * @param {Object} apiEventBus - The service bus to be bound to.
 */
export const retrieveSeatMap = (apiEventBus) => {
    apiEventBus.$on("retrieveSeatMap", (callback) => {
        
        // Get Perfomance id
        const eventData = store.getters.getEventData;
        const performanceId = store.getters.getChosenPerformanceID;
		const venueID = eventData.venue.id;
        const showID = store.getters.getShowID;
        const layoutID = store.getters.getLayoutID;

        // Create the requests
        const request = Promise.all([
			(() => { return axios.get(pricesForPerformanceApiPath(appSettings.core.client, performanceId)) })(),
            (() => { return axios.get(seatStatusForPerformanceApiPath(appSettings.core.client, performanceId)) })(),
            (() => { return axios.get(seatMapForPerformanceApiPath(appSettings.core.client, showID, layoutID, venueID, performanceId)) })()
        ]);

        // Handle the response
        request.then(([seatPrices, seatStatus, seatMap]) => {
       
            // Create new Data structure
            const seatMapData = {
                timestamp: moment().format(),
                stagePosition: "top",
                filters: seatPrices.data.prices.map((currentPriceItem, index) => {

                    let defaultDiscountGroup = appSettings.core.discountGroup;
                    let defaultDiscountCode = appSettings.core.discountCode;

                    let dcs = currentPriceItem.discount_codes.filter((el) => el.discount_group_code === defaultDiscountGroup && el.code === defaultDiscountCode);

                    return {
                        id: currentPriceItem.id,
                        description: currentPriceItem.description,
                        price: dcs[0].unit_price,
                        available: currentPriceItem.available,
                        filterClass: assignFilterClass(index),
                        dcs: currentPriceItem.discount_codes
                    };
                }),
                areas: [

                   
                        {
                            id: "ALL",
                            name: "All",
                            title: "All",
                            iconName: "seats-all",
                                active: true
                         },
                        
                    ...seatMap.data.layout.seat_block_positions.map((currentSeatMapItem, index) => {

                        let name = currentSeatMapItem.description;
                        let title = currentSeatMapItem.description;

                        if (!currentSeatMapItem.display_description) {
                            name = '';
                            title = '';
                        }


                        return {
                            id: currentSeatMapItem.id,
                            name: name,
                            title: title,
                            // available: "",
                            iconName: lookupIconName(currentSeatMapItem.id),
                            size: {
                                width: currentSeatMapItem.width,
                                height: currentSeatMapItem.height
                            },
                            offset: {
                                top: currentSeatMapItem.top,
                                left: currentSeatMapItem.left
                            }
                        }
                    })
                ],
                seats: seatMap.data.seat_blocks.map((currentSeatMapItem) => {

                    return { 
                        area: {
                            id: currentSeatMapItem.id,
                            name: currentSeatMapItem.name
                        },
                        rows: currentSeatMapItem.rows.map((currentRow) => {
                            return {
                                id: currentRow.id, 
                                name: currentRow.name,
                                seats: currentRow.seats.map((currentSeat) => {
                                    return {
                                        id: currentSeat.id,
                                        rowId: currentSeat.row_number,
                                        name: currentSeat.seat_name,
                                        priceId: currentSeat.price_id,
                                        available: "",
                                        coordinates: {
                                            x: currentSeat.xpos,
                                            y: currentSeat.ypos
                                        },
                                        filterID: currentSeat.price_id,
                                        areaName: currentSeatMapItem.name,
                                        areaID: currentSeatMapItem.id,
                                        isDisabled: currentSeat.is_disabled,
                                        isNonStandard: currentSeat.is_non_standard,
                                        seatInformation: currentSeat.seat_information ? currentSeat.seat_information : "Clear View"
                                        //discountCode: currentSeat.discount_code,
                                        //discountGroupCode: currentSeat.discount_group_code
                                    }
                                })
                            }
                        })
                    }
                }),
            };

            //if (!appSettings.core.showAllSeatMapArea) {
            //    seatMapData.areas.shift();
            //}

            // Add Available status.
            updateSeatStatus(seatMapData, seatStatus.data.seat_blocks)
            .then(() => {
                // Return the data
                callback(seatMapData)
            });
        });

        // If there is an error
        request.catch((error) => {
            // Log The Error
            console.log(error);
        });
        
    });


    apiEventBus.$on("retieveUpdatedMap", (callback) => {
        
        const performanceId = store.getters.getChosenPerformanceID;
        const seatMapData = store.getters.getSeatData;

        const configheaders = {
            headers: {
                'Accept-Encoding': 'br'
            }
        }

        const request = axios.get(seatStatusForPerformanceApiPath(appSettings.core.client, performanceId), configheaders);

        // Handle the response
        request.then((seatStatus) => {

            // Add Available status.
            updateSeatStatus(seatMapData, seatStatus.data.seat_blocks)
            .then(() => {
                // Return the data
                callback(seatMapData)
            });
        });

        // If there is an error
        request.catch((error) => {
            // Log The Error
            console.log(error);
        });

    });
}