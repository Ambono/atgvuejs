import store from "../../../store/store";
import apiEventBus from "../../apiEventBus";
import { router } from "../../../../main";
import {PayPal} from "../../../../core/objects/PayPal";
import { settings as appSettings } from "../../../../config/config";
import  i18n  from '../../../../i18n-setup'; 

/**
 * Service used to handle checkout interaction. 
 * @function
 * @ignore
 * @param {Object} serviceBus - The service bus to be bound to.
 */

export const languageoption = (serviceBus) => {    
        
    serviceBus.$on("languageoption", (callback) => {
          
        var selectElement =  document.querySelector('select#selectlanguage'); 
                      
       var  output = selectElement.value; 

       console.log(output);
       callback({
           optionvalue : output,
           error : "could not retrieve language option"
       });
    });

}