import apiEventBus from "../../apiEventBus";
import store from "../../../store/store";
import { checkCache } from "../../../../core/helpers/checkCache";
import { settings as appSettings } from "../../../../config/config";
import  i18n  from '../../../../i18n-setup';
const retrieveOfferRangeSeats = ({ offer, seatData }) => {
    const seatsToDisplay = [];

    // Get first and last seats 
    const firstSeat = offer.first_seat.match(/[a-zA-Z]+|[0-9]+/g);
    const lastSeat = offer.last_seat.match(/[a-zA-Z]+|[0-9]+/g);

    // Work out the range
    const seatRange = [];
	let minSeatIndex = parseInt(lastSeat[1]);
	let maxSeatIndex = parseInt(firstSeat[1]);
	if (minSeatIndex > maxSeatIndex) {
		let tempIndex = minSeatIndex;
		minSeatIndex = maxSeatIndex;
		maxSeatIndex = tempIndex;
	}
    for(let i = minSeatIndex; i <= maxSeatIndex; i++) {
        seatRange.push(`${firstSeat[0]}${i}`);
    }

    seatRange.forEach((rangeItem) => {
        const seatBlock = seatData.seats.filter((item) => item.area.id === offer.seat_block_code)[0];
            const seatRow = seatBlock.rows.filter((item) => item.name === firstSeat[0]);
            const seatItems = [];
                    
            seatRow.forEach((currentRow) => {
                const foundSets = currentRow.seats.filter((item) => item.name === rangeItem);
                if(foundSets.length > 0) {  
                    seatItems.push(foundSets[0]);
                }
            });

            seatsToDisplay.push(...seatItems);                   
    });

    return seatsToDisplay;
}

export const seatMap = (serviceBus) => {
    

    serviceBus.$on("seatMapFetchData", (callback) => {

        // Get the current seat map data
        const seatMapData = store.getters.getSeatData;
        
        // Check Cache
        if(seatMapData && checkCache(seatMapData.timestamp, 5)) {
            apiEventBus.$emit("retieveUpdatedMap", (seatData) => {
                store.commit("setSeatData", seatData);
                callback(seatData);
            });
        }
        else {
            apiEventBus.$emit("retrieveSeatMap", (seatData) => {
                store.commit("setSeatData", seatData);
                callback(seatData);
            });
        }
        
    });

    // Best Seats
    serviceBus.$on("systemChooseSeats", (callback) => {

        // Get the cache
        const cache = store.getters.getOfferedSeatsCache;

        // Get the best seats
        if(!cache) {
            serviceBus.$emit("retrieveBestSeats", ({data, error}) => {
                if(error) {
                    callback({error});
                    return;
                }

                callback({data});
            }); 
        }
        // Release then retrieve the new best seats
        else {
            serviceBus.$emit("releaseSeatOffers", () => {
                serviceBus.$emit("retrieveBestSeats", ({data, error}) => {
                    if(error) {
                        callback({error});
                        return;
                    }
                    callback({data});
                }); 
            });
        }
    });
    
    serviceBus.$on("retrieveBestSeats", (callback) => {
        
        apiEventBus.$emit("seatMapSystemBestSeats", ({offers, error}) => {
            
            if(error) {
                callback({error});
                return;
            }
            const offer = offers[0];

            // Get the seat data
            const seatData = store.getters.getSeatData;
            var errormsg= i18n.t('service.modules.api.seatMapBestSeat.errmsg');
            if(offer.first_seat == null) {
                callback({error: errormsg});
                return;
            }

            const seats = retrieveOfferRangeSeats({ offer,  seatData });

            store.commit("setOfferedSeatsCache", [{
                client: appSettings.core.client,
                performanceId: offers[0].performance_id,
                seatBlockId: offers[0].seat_block_code,
                seatRowId: offers[0].row_id,
                firstSeatIndex: seats[0].id,
                lastSeatIndex: seats[seats.length - 1].id
            }]);

            callback({data: seats});
        }); 

    });
    

    serviceBus.$on("seatMapSetArea", (area) => {
        store.commit("setChosenArea", area);
    });

    serviceBus.$on("seatMapClearCache", () => {
        store.commit("clearSeatData");
        store.commit("clearSeats");
    }); 

}