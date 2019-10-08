/* Dependencies */
import chai from "chai";
import { Calendar } from "../../../../int-src/js/core/objects/Calendar";

// Import helper functions for rendering the content
import { createBlockContent } from "../../../../int-src/js/core/helpers/calendar/createBlockContent";
import { data } from "../../../mocks/calendar/calendar-data.mock";
import "../../../../int-src/js/core/base/HTMLElement";

// Set constants from chai
const assert = chai.assert;
const expect = chai.expect;
const should = chai.should();

// Set the body content
document.body.innerHTML += window.__html__["tests/components/calendar/calendar.test.html"];

// Select DOM Elements
const calendarContainer = document.querySelector("[data-calendar]");

// Create a test instance of calendar
const calendar = new Calendar(calendarContainer);

// Set render functions
calendar.renderBlockContents = createBlockContent;

// Set the calendar data
calendar.calendarData = data;

/**
 * Calendar Module Tests
 * Unit tests aimed at ensuring the Calendar Module functions correctlty.
 */
describe("Calendar Module Tests", () => {

    // Test Core Functionlaity
    describe("Core Calendar Instance Tests", () => {

        // It should be an object
        it("Should create an object", () => {
            expect(typeof(calendar)).eql("object");
        });

        // Should have the following prototypes
        it("Should have the relevant prototypes available", () => {
            expect(typeof(calendar.init)).eql("function");
            expect(typeof(calendar.renderDays)).eql("function");
            expect(typeof(calendar.setMonth)).eql("function");
            expect(typeof(calendar.createCalendar)).eql("function");
            expect(typeof(calendar.renderCalendar)).eql("function");
        });

        // It should render the days
        it("Should create and render the days of the week", () => {
            // Should have a property of days
            expect(typeof(calendar.days)).eql("object");

            // Should have a length of more than 0
            expect(calendar.days.length > 0).eql(true);

            // Should contain and array of HTML Element Object
            expect(typeof(calendar.days[0].element)).eql("object");
        });

        // It should set a month
        it("Should set the month to August 2018", () => {
            // Set render flag 
            let renderCalled = false;

            // Set a test render function
            calendar.renderCalendar = () => {
                renderCalled = true;
            }

            // Set test data for August 2018
            const data = {
                year: 2018,
                month: 8
            };

            // Set the month
            calendar.setMonth(data);

            // Expect there to be an active calendar
            expect(typeof(calendar.activeCalendar)).eql("object");
            expect(calendar.activeCalendar.length > 0).eql(true);

            // Expect the render function to have been called
            expect(renderCalled).eql(true);
        });

        // It should create a new calendar
        it("Should create a new calendar", (done) => {
            // Set render flag 
            let renderCalled = false;

            // Set a test render function
            calendar.renderCalendar = () => {
                renderCalled = true;
            }

            // Store current active calendar
            const currentCalendar = calendar.activeCalendar;

            // Create a new calendar view
            calendar.createCalendar(2018, 9, () => {
                // Should create a new active calendar
                expect(calendar.activeCalendar !== currentCalendar).eql(true);
                // Should contian calendar items
                expect(calendar.activeCalendar.length > 0).eql(true);
                // Expect the render function to have been called
                expect(renderCalled).eql(true);
                done();
            });

        });

    });

});
