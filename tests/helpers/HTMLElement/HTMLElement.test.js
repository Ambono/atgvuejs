/* Dependencies */
import chai from 'chai';

import "../../../int-src/js/core/base/HTMLElement";

// Set constants from chai
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

// Set Body content
document.body.innerHTML += window.__html__["tests/helpers/HTMLElement/HTMLElement.test.html"];

// Select element from dom
let element = document.querySelector(".test");

/**
 * HTMLElement Helper Tests
 * Unit tests aimed at ensuring the HTMLElement helper extensions are working as expected.
 */
describe("HTMLElement Methods Tests", function() {

    // Test Adding A Class
    it("Should be able to add a class", function() {
        
        // Add a class to the test element
        element.addClass("example");

        // Expect the element to contain the example class
        expect(element.classList.contains("example")).eql(true);
    });

    // Test Has A Class
    it("Should be able to detect if class exists", function() {
        // Expect the element to contain the example class
        expect(element.hasClass("example")).eql(true);
    });

    // Test Removing A Class
    it("Should be able to remove a class", function() {
        
        // Remove the example class from the test element
        element.removeClass("example");

        // Expect the element to not contain the example class
        expect(element.classList.contains("example")).eql(false);
    });

});