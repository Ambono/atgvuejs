
/**
 * Configuration Settings
 * Settings for the application.
 */
import ticketAmounts from "./core/ticketAmounts";
import countries from "./core/countries";
import { expiryMonths, expiryYears } from "./core/expiry";
import errorMessages from "./core/errorMessages";
import validation from "./core/validation";
 
/**
  * App Settings 
  */
export const settings = {
    languageAcronym:{
        default:'en',
        locale :'en'
      }, 
    core: {
        showID: 7518,
        layoutID: 9,
        stageOnTop: false,      
        apiUrl:  "https://vivalkemyorchestrationstaging2.azurewebsites.net/api/v1/",
        client: "SHAPREPROD",
		gaClients: ['UA-143782168-2'],
		discountCode: "REG",
		discountGroup: "SHW",
        seatBlockIcons: { 'STA': 'seats-stalls', 'RCR': 'seats-royal-circle', 'GCR': 'seats-grand-circle' },
        phoneNumber: "02073795399",
        enableConcessions: true,
        enableAccessibilitySeating: false,
        enableSeperateDeliveryAddress: true,
		allowedSeatStatusValues: [1, 9],
		blockExtrasIDs: ["1-110", "1-106"],
        warningEmailAddresses: ["@aol", "@yahoo", "@sky"],

        showAllSeatMapArea: false,
        seatSize: 8,
      
        defaultCountryCode: "GB",
        postCode: "EC2A 4PE",
        email: "support@vivaticket.com",
        afterConfirmationUrl:  "http://www.shaftesburytheatre.com",
        maximumNumberOfSelectableSeatsForAny: "10",
        key:"8080808080808080",
        iv:"8080808080808080",
        IsThreeD : true
    },
    stage: {
        X: 0,
        width: 420,
        height: 80,
        title: "Stage"
    },
    area: {
        titleWidth: 200,
        titleHeight: 50,
        showTitle: true
    },
    extraItems: {
        maximumExtraItems: 10
    },
    format: {
        currency: "£",
        currencyCode: "GBP"
    },
    config: {
        ticketAmounts,
        countries,
        expiryMonths,
        expiryYears,
        errorMessages,
        validation
    },       
    sentry: {		
		dsn: 'https://c72a61eac29a48d1956e55c1b98f38e3@sentry.io/1354182',
		release: "28d497fb8af6cc3efbe160e28c1c08f08bd688fc",
		environment: 'dev',
		maxBreadcrumbs: 50,
		debug: true
    }
}

