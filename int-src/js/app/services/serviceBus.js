/* Dependencies */ 
import Vue from "vue";
import { session } from "./modules/service/session";
import { checkout } from "./modules/service/checkout";
import { basket } from "./modules/service/basket";
import { seatMap } from "./modules/service/seatMap";
import {shows} from "./modules/service/shows";
import { extras } from "./modules/service/extras";
import {languageoption} from "./modules/service/languageoption";
// Create the service bus
const serviceBus = new Vue();

// Register services
session(serviceBus);
checkout(serviceBus);
basket(serviceBus);
seatMap(serviceBus);
shows(serviceBus);
extras(serviceBus);
languageoption(serviceBus);
// Export the service bus
export default serviceBus;