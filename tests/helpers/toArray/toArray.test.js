/* Dependencies */
import chai from 'chai';

import { toArray } from '../../../int-src/js/core/helpers//toArray';

// Set constants from chai
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

// Set Body content
document.body.innerHTML += window.__html__["tests/components/toArray/toArray.test.html"];

// Select all p tags from the document and convert to array
let paragraphs = toArray(document.querySelectorAll("p"));

/**
 * toArray Helper Tests
 * Unit tests aimed at ensuring the toArray helper is working as expected.
 */
describe("toArray JS Helper Tests", function() {
    // Checks array is formed
    it("Should convert nodelist to array of object", function() {
        // Expect an Array
        expect(Array.isArray(paragraphs)).eql(true);
    });
});