/* Dependencies */
import Vue from "vue";
import { retriveProfile } from "./modules/api/retrieveProfile";
import { retrieveEventData } from "./modules/api/retrieveEventData";
import { retrieveShows } from "./modules/api/retrieveShows";
import { retrieveSeatMap } from "./modules/api/retrieveSeatMap";
import { retreiveExtras } from "./modules/api/retrieveExtras";

import { offerExtras } from "./modules/api/offerExtras";
import { offerSeats } from "./modules/api/offerSeats";

import { postCheckOut } from "./modules/api/postCheckOut";
import { postCheckOutStage1 } from "./modules/api/postCheckOutStage1";
import { postCheckOutStage2 } from "./modules/api/postCheckOutStage2";
import { basket } from "./modules/api/basket";

import { postCheckOutThreeD } from "./modules/api/postCheckThreeD";

import { seatMapBestSeat } from "./modules/api/seatMapBestSeat";
import { releaseOffer } from "./modules/api/releaseOffer";
import { retrieveConfirmation } from "./modules/api/retrieveConfirmation";
import { releaseExtras } from "./modules/api/releaseExtra";

import { getPaypalClientToken } from "./modules/api/getPaypalClientToken";
import { savePatron } from "./modules/api/savePatron";
// Create the service bus
const apiEventBus = new Vue();

// Register services
retriveProfile(apiEventBus);
retrieveEventData(apiEventBus);
retrieveShows(apiEventBus);
retrieveSeatMap(apiEventBus);
retreiveExtras(apiEventBus);
basket(apiEventBus);
seatMapBestSeat(apiEventBus);
offerExtras(apiEventBus);
offerSeats(apiEventBus);
postCheckOut(apiEventBus);
postCheckOutStage1(apiEventBus);
postCheckOutStage2(apiEventBus);
releaseOffer(apiEventBus);
retrieveConfirmation(apiEventBus);
releaseExtras(apiEventBus);
getPaypalClientToken(apiEventBus);
savePatron(apiEventBus);
postCheckOutThreeD(apiEventBus);
// Export the service bus
export default apiEventBus;