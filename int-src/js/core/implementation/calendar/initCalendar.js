// Dependencies
import anime from "animejs";
import { createRange } from "../../../core/helpers/calendar/createRange";
import { calendarCarousel } from "../../../core/implementation/carousel/calendarCarousel";

/**
 * 
 */
export const initCalendar = (instance, callback) => {
    // Cache vue instance
    const vm = instance;
    
    // Bind the data to the calendar
    vm.calendar.calendarData = vm.calendarData;
            
    // Get the first month to load in the calendar
    const year = vm.calendar.calendarData.years[0];
    const month = Object.keys(vm.calendar.calendarData.performances[year])[0];

    // Render The Calendar
    vm.calendar.createCalendar(year, month);

    // Select the range carousel
    const rangeContainer = vm.$el;

    // Retrieve elements for the range carousel
    const rangeCarousel = rangeContainer.querySelector("[data-carousel]");
    const carouselArrows = {
        prevArrow: rangeContainer.querySelector("[data-carousel-prev]"),
        nextArrow: rangeContainer.querySelector("[data-carousel-next]")
    };

    // Populate The Range Carousel
    createRange(
        {
            container: rangeCarousel,  
            data: vm.calendar.calendarData, 
            clickFunction: (item) => {
                // Set the active month
                vm.activeMonth = item;
            }
        },
        (rangeItems) => {
            // Store the range items
            vm.range = rangeItems;

            // Form Carousel
            const carousel = calendarCarousel(rangeCarousel, carouselArrows);
            
            // Set the first item as active
            vm.activeMonth = rangeItems[0];
        }
    );

    // Remove the loader
    setTimeout(() => { 
        // Animate in the calendar
        anime({
            targets: vm.$el,
            duration: 300,
            opacity: 1,
            easing: "linear",
            complete: () => {
                // If there is a callback
                if(callback) {
                    // Fire the callback
                    callback();
                }
            }
        });
     }, 500);
}