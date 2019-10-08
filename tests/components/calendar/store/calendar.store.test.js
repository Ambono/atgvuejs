// /* Dependencies */
// import chai from "chai";
// import moment from "moment";

// import "../../../../int-src/js/core/base/HTMLElement";
// import { checkCache } from "../../../../int-src/js/core/helpers/checkCache";
// import calendarStoreHelpers from "../../../mocks/calendar/calendar-store-helpers";
// import { createMockView } from "../../../utils/createMockVue";
// import { bindHelpers } from "../../../utils/implementHelpers";

// import calendarStore from '../../../../int-src/js/app/store/modules/cache';
// import user from '../../../../int-src/js/app/store/modules/user';

// // Set constants from chai
// const assert = chai.assert;
// const expect = chai.expect;
// const should = chai.should();

// // Create store data
// const storeData = bindHelpers(calendarStore, calendarStoreHelpers);

// // Create a new mock view
// const vm = createMockView([storeData, user]);

// /**
//  * Calendar Store Tests
//  * Unit tests aimed at ensuring the Actions & Getters are workign as expected.
//  */

// describe("Calendar Store Tests", () => {

//     // Fetch the clandar data
//     vm.$store.dispatch("fetchCalendarData");

//     // Get the calendar data
//     const calendarData = vm.$store.getters.getCalendarData;

//     // Test Actions
//     describe("Calendar - Actions Test", () => {
        
//         // Test calendar data
//         it("Calendar Data should format into an object", () => {
//             // Expect the data to exist
//             expect(typeof(calendarData)).eql("object");

//             // Test properties exist
//             should.exist(calendarData.timestamp);
//             should.exist(calendarData.performances);
//             should.exist(calendarData.years);

//             // Epect years is an array with length of 2
//             expect(calendarData.years.length).eql(2);

//             // Expect performances is an object
//             expect(typeof(calendarData.performances)).eql("object");
//         });

//         // Should set a chosen item
//         it("Should set a chosen item and get its formatted date", () => {

//             // Get an item from the calendar data
//             const item = calendarData.performances[2018][8].performances[0];
            
//             // Format the chosen items date
//             const itemDate = moment(item.datetime).format("dddd Do MMMM YYYY - kk:mma"); 

//             // Set the item
//             vm.$store.dispatch("setSelectedEvent", item);

//             // Get the chosen item from state
//             const chosenItem = vm.$store.getters.getChosenDate;

//             // Expect both dates to match
//             expect(chosenItem).eql(itemDate);

//         });
//     });

//     // Test getters
//     describe("Calendar - Getters Test", () => {
//         // Should get calendar data
//         it("Should get the calendar data", () => {
//             // Get the data
//             const data = vm.$store.getters.getCalendarData;

//             // Data should exist
//             should.exist(data);
            
//             // Expect data to be an object
//             expect(typeof(data)).eql("object");
//         });

//         // Should check cache and return valid
//         it("Should return a valid cache", () => {
//             // Get the status of the cache
//             const isValid = checkCache(vm.$store.getters.getCalendarCache);

//             // Expect the cache to be valid
//             expect(isValid).eql(true);
//         });
        
//         // Should check cache and return invalid
//         it("Should return an invalid cache", (done) => {
//             // Modify the time stamp
//             vm.$store.dispatch("setInvalidCache");

//             // Set a timeout to allow above code to run
//             setTimeout(() => {
//                 // Get the status of the cache
//                 const isValid = checkCache(vm.$store.getters.getCalendarCache, 5);
                
//                 // Expect the cache to be invalid
//                 expect(isValid).eql(false);
                
//                 // Call Done
//                 done();
//             }, 250);
            
//         });
//     });

//     // Test Cache Deletion
//     describe("Calendar - Cache Clear Test", () => {
//         // Should clear the cache
//         it("Should clear the cache", () => {
//             // Clear the cache
//             vm.$store.dispatch("deleteCalendarCache");

//             // Get the calendar data
//             const data = vm.$store.getters.getCalendarData;

//             // Ecpect the data to not exist
//             should.not.exist(data);
//         });
//     });
        
// });