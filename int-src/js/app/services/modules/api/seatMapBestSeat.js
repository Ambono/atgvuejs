import axios from "../../../../config/axios";
import store from "../../../store/store";
import { errorCheck } from "./helpers/errorCheck";
import { settings as appSettings } from "../../../../config/config";
import { holdSeatApiPath } from "./helpers/apiPaths";
import  i18n  from '../../../../i18n-setup';

export const seatMapBestSeat = (apiEventBus) => {

    apiEventBus.$on("seatMapSystemBestSeats", (callback) => {

        // Retrieve Info
        const numOfSeats = store.getters.getTicketAmount.num;
        const performanceId = store.getters.getChosenPerformanceID;
        const area = store.getters.getChosenArea;

        // Get the current seat map data
        const seatMapData = store.getters.getSeatData;

        var arrayOfPriceBands = [];

        let maxSeats = 0;

        var dictionaryOfSeatBlocks = {};


        var maxContiguousSeatsInPriceBandInBlock = {};

        // MATTHEW filtering the price bands to one available on that seat block 
        seatMapData.seats.forEach((seat) => {

            if (area.id !== "ALL" && seat.area.id !== area.id) { return false; }

            seat.rows.forEach((row) => {

                maxSeats = 1;

                var pricePrev = '';

                row.seats.forEach((seatInfo) => {
                    if (seatInfo.available === true) {
                        arrayOfPriceBands.indexOf(seatInfo.priceId) === -1 ? arrayOfPriceBands.push(seatInfo.priceId) : null;

                        //if (area.id === "ALL") {
                        //if (maxSeats === 0) {
                        //    maxSeats = 1;

                        //}
                        if (pricePrev === seatInfo.priceId) {
                            maxSeats++;
                        }
                        else {
                            maxSeats = 1;
                        }


                        pricePrev = seatInfo.priceId;



                        if (maxContiguousSeatsInPriceBandInBlock.hasOwnProperty(seatInfo.priceId) === false) {
                            var obj = {};
                            maxContiguousSeatsInPriceBandInBlock[seatInfo.priceId] = obj;
                        }

                        var blocks = maxContiguousSeatsInPriceBandInBlock[seatInfo.priceId];

                        if (blocks.hasOwnProperty(seatInfo.areaID) === false) {
                            blocks[seatInfo.areaID] = maxSeats;
                        }

                        if (blocks[seatInfo.areaID] < maxSeats) {
                            blocks[seatInfo.areaID] = maxSeats;
                        }
                        //}
                    }
                    else {
                        maxSeats = 0;
                    }
                });
            });

        });
        let priceBand = "";

        var areaInSeatBlock = "";

        var filters = seatMapData.filters.slice().sort((a, b) => a.price - b.price).reverse();
        filters.some((filter) => {

            if (!filter.elements.input.checked) {
                return false;
            }

            var priceBandInDictionary = maxContiguousSeatsInPriceBandInBlock[filter.id];

            if (priceBandInDictionary === undefined) {
                return false;
            }

            if (area.id !== "ALL") {
                //if (arrayOfPriceBands.includes(filter.id)) {

                //    priceBand = filter.id;
                //    return true;

                //};

                if (priceBandInDictionary.hasOwnProperty(area.id)) {
                    if (priceBandInDictionary[area.id] >= numOfSeats) {
                        priceBand = filter.id;
                       
                        return true;
                    }
                }

            }
            else {
                

                if (priceBandInDictionary.hasOwnProperty("STA")) {
                    if (priceBandInDictionary["STA"] >= numOfSeats) {
                        priceBand = filter.id;
                        areaInSeatBlock = "STA";
                        return true;
                    }
                }

                if (priceBandInDictionary.hasOwnProperty("RCR")) {
                    if (priceBandInDictionary["RCR"] >= numOfSeats) {
                        priceBand = filter.id;
                        areaInSeatBlock = "RCR";
                        return true;
                    }
                }

                if (priceBandInDictionary.hasOwnProperty("GCR")) {
                    if (priceBandInDictionary["GCR"] >= numOfSeats) {
                        priceBand = filter.id;
                        areaInSeatBlock = "GCR";
                        return true;
                    }
                }
            }
        });


        const data = { 
            client: appSettings.core.client,
            performance_id: performanceId,
            price_band_id: priceBand,
            discount_group_id: appSettings.core.discountGroup,
            number_of_seats: numOfSeats,
            discount: appSettings.core.discountCode,
            code_for_discount_element: 1,
            prevent_bad_seats: true
        }

        if (area.id !== "ALL") {
            data.seat_block_id = area.id;
        }
        else {
            data.seat_block_id = areaInSeatBlock;
        }

        // Retieve the event data
        const request = axios.post(holdSeatApiPath(appSettings.core.client), data);

        request.then((response) => {             

            const isError = errorCheck(response);

            // Handle Success
            if(!isError) {
                callback({ offers: response.data.offers });
                return;
            }
            else {
                console.log("fired error");
                callback({error: isError.message});
            }
            
        });
var errormsg= i18n.t('service.modules.api.seatMapBestSeat.errmsg');
        request.catch((error) => {
            // Add Error Handling
            console.log(error.message);
            callback({error: errormsg});
        });
    });
}