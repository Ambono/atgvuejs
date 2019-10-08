import  i18n  from '../../../i18n-setup'; 

/**
 * Function used to create a loading element
 * @ignore
 * @param {Object} data - The information to be used within the element.
 * @param {String} data.title - The title to be displayed.
 * @param {String} data.icon - The name of the icon to be used.
 * @returns {HTMLElement} - The created loading element.
 * 
 * @example
 * // Define data
 * var errormsg= i18n.t('object.loading.title');
 * const data = {
 *    
 *     title: errormsg,
 *     icon: "calendar"
 * };
 * 
 * // Create a loader
 * const loader = createLoader(data);
 * 
 * // Append to the DOM
 * document.body.appendChild(loader);
 */
export const createLoader = (data) => {
    // Create a div for the loading element
    const loadingElement = document.createElement("div");
    loadingElement.addClass("loading");

    // Define the elements contents
    const loadingElementContent = `
        <div class="loading__container">
            <svg xmlns="http://www.w3.org/2000/svg" class="loading__icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#${data.icon}"></use>
            </svg>
            <h3 class="loading__title">${data.title}</h3>
            <!-- Progress bar -->
            <div class="loading__progress"></div>
            <!-- / Progress bar -->
        </div>
    `;

    // Insert the content into the loading element
    loadingElement.insertAdjacentHTML("beforeend", loadingElementContent);

    // Return the loading element
    return loadingElement;
};