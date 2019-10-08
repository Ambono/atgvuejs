// /* Dependencies */
// import chai from "chai";
// import moment from "moment";

// // Import Stores
// import extrasStore from "../../../../int-src/js/app/store/modules/extras";
// import basketStore from "../../../../int-src/js/app/store/modules/basket";

// // Import helpers
// import addExtrasStoreHelpers from "../../../mocks/addExtras/addExtras-store.helpers";
// import { checkCache } from "../../../../int-src/js/core/helpers/checkCache";

// // Import utils
// import { createMockView } from "../../../utils/createMockVue";
// import { bindHelpers } from "../../../utils/implementHelpers";


// // Set constants from chai
// const assert = chai.assert;
// const expect = chai.expect;
// const should = chai.should();

// // Create store data
// const storeData = bindHelpers(extrasStore, addExtrasStoreHelpers);

// // Create a new mock view
// const vm = createMockView([storeData, basketStore]);

// /**
//  * Add Extras Store Tests
//  * Unit tests aimed at ensuring the Actions & Getters are workign as expected.
//  */
// describe("Extras Store Tests", () => {

//     // Fetch the extras data
//     vm.$store.dispatch("fetchExtras");

//     // Test Actions
//     describe("Extras - Actions Test (inc Basket)", () => {
        
//         // Get the extras data
//         const extrasItems = vm.$store.getters.getExtrasItems;

//         // Test Extras data
//         it("Extras data should format into and object", () => {
//             // Expect the data to exist
//             expect(typeof(extrasItems)).eql("object");

//             // set item to test
//             const itemToTest = extrasItems[0];    

//             // Test properties of first item
//             expect(itemToTest.attributes.length > 0).eql(true);
//             should.exist(itemToTest.id);
//             should.exist(itemToTest.description);
//             should.exist(itemToTest.image);
//             should.exist(itemToTest.options);
//             should.exist(itemToTest.prices);
//             should.exist(itemToTest.quantity);
//             should.exist(itemToTest.status);
//             should.exist(itemToTest.title);

//             // Expect Atrtributes to have a length of 2
//             expect(itemToTest.attributes.length).eql(2);
//         });

//         // Remove the extras cache
//         it("Should remove extras cache", () => {
//             // Remove the cache
//             vm.$store.dispatch("removeExtrasCache");

//             // Expect items to be undefined
//             expect(vm.$store.getters.getExtrasItems).eql(undefined); 

//             // Expect items to be undefined 
//             expect(vm.$store.getters.getExtrasCache).eql(undefined); 
//         });

//         // Should set and extra in the basket
//         it("Should allow an extra to be selected", () => {
//             // Re add the data
//             vm.$store.dispatch("fetchExtras");

//             // Select an item
//             vm.$store.dispatch("setBasketExtra", {
//                 item: extrasItems[0],
//                 quantity: 1
//             });

//             // Get the basket extras items
//             const basketExtras = vm.$store.getters.getBasketExtras;

//             // Expect quantity to be 1
//             expect(basketExtras[0].quantity).eql(1);
            
//             // Expect the item to match
//             expect(basketExtras[0].item).eql(extrasItems[0]);
            
//         });

//         // It should get the basket extras
//         it("Should get the extras within basket", () => {
//             // Get the basket extras items
//             const basketExtras = vm.$store.getters.getBasketExtras;

//             // Expect there to be extras
//             should.exist(basketExtras);
//             expect(basketExtras.length > 0).eql(true);
//         });

//         // Check basket extra
//         it("Basket extra should match stored extra", () => {
//             // Select an item
//             vm.$store.dispatch("setBasketExtra", {
//                 item: extrasItems[1],
//                 quantity: 1
//             });

//             // Get the basket extras items
//             const basketExtras = vm.$store.getters.getBasketExtras;

//             // Expect quantity to be 1
//             expect(basketExtras[1].quantity).eql(1);
            
//             // Expect the item to match
//             expect(basketExtras[1].item).eql(extrasItems[1]);
//         });

//         // Update item in basket
//         it("Should update the item in the basket", () => {
//             // Update an item
//             vm.$store.dispatch("setBasketExtra", {
//                 item: extrasItems[0],
//                 quantity: 5
//             });

//             // Get the basket extras items
//             const basketExtras = vm.$store.getters.getBasketExtras;

//             // Expect quantity to be 1
//             expect(basketExtras[0].quantity).eql(5);
            
//         });

//         // Remove item from basket
//         it("Should remove the item from the basket", () => {

//             // Define an item to remove
//             const itemToRemove = {
//                 item: extrasItems[0],
//                 quantity: 0
//             };

//              // Remove the item
//              vm.$store.dispatch("setBasketExtra", itemToRemove);

//             // Get the basket extras items
//             const basketExtras = vm.$store.getters.getBasketExtras;

//             // Try to find the item
//             const itemLookup = basketExtras.filter((item) => item.item === itemToRemove.item);

//             // Expect quantity to be 1
//             expect(itemLookup.length).eql(0);
//         });
        

//     });

//     // Test Getters
//     describe("Extras - Getters Test", () => {
        
//         // Get items
//         it("Should get the extras items", () => {
//             // Get the extras data
//             const extrasItems = vm.$store.getters.getExtrasItems;

//             // Expect there to be items
//             expect(extrasItems.length > 0).eql(true);
//         });

//         // Get cache
//         it("Should get the extras cache", () => {
//             // Get the extras cache
//             const cacheStamp = vm.$store.getters.getExtrasCache;

//             // Expect there to be a cache
//             should.exist(cacheStamp);

//             // Expect the cache stamp to be a moment object
//             expect(typeof(cacheStamp)).eql("object");

//             // Expect the cache to be valid
//             expect(checkCache(cacheStamp, 5)).eql(true);
//         });

//     });

// });