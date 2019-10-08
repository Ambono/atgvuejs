/* Dependencies */
import anime from "animejs";

/**
 * Function used to animate the cookie warning element in.
 * @function
 * @ignore
 * @param {HTMLElement} container - The element to be animated.
 * @example
 * // Animate the element in
 * animateIn(element);
 */
export const animateIn = (container) => {
    // Animate the element in
    const animation = anime({
        begin: () => {
            // Set the element to visible
            container.style.visibility = "visible";
            // Set the element to offscreen
            container.style.transform = `translateY(${container.clientHeight})`;
        },
        targets: container,
        translateY: 0,
        opacity: 1,
        duration: 300,
        delay: 1500,
        easing: "linear"
    });
};

/**
 * Function used to animate the cookie warning element out.
 * @function
 * @ignore
 * @param {HTMLElement} container - The element to be animated.
 * @example
 * // Animate the element out
 * animateOut(element); 
 */
export const animateOut = (container) => {
    // Animate the element out
    const animation = anime({
        targets: container,
        duration: 200,
        opacity: 0,
        translateY: container.clientHeight,
        easing: "linear",
        complete: () => {
            // Hide the element
            container.style.visibility = "hidden";
        }
    });
};