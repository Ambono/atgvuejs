

export class SeatMapFilters {

    

    constructor({seatMap, container, vue}) {
        const seatMapFilters = this;

        seatMapFilters.seatMap = seatMap;
        seatMapFilters.elements = {
            container
        };
        seatMapFilters.vue = vue;

        seatMapFilters.active = [];

        // Initiate
        seatMapFilters.init();
    }

    init() {
        const seatMapFilters = this;

        seatMapFilters.renderFilters();
        seatMapFilters.attachEvents();
    }

    renderFilters() {
        const seatMapFilters = this;
        const seatMap = seatMapFilters.seatMap;

        // Clear the container
        seatMapFilters.elements.container.innerHTML = "";

        const sortedFilters = seatMap.seatData.filters.sort(function (a, b) {
            return a.price - b.price;

        });

        sortedFilters.forEach((currentFilter) => {

            // Create Filter Item
            const filterItem = document.createElement("div");
            filterItem.classList.add("price-filters__item");
            filterItem.classList.add(`price-filters__item--${currentFilter.filterClass}`);

            // Create Checkbox
            const filterCheckBox = document.createElement("input");
            filterCheckBox.classList.add("price-filters__item-input");
            filterCheckBox.setAttribute("type", "checkbox");
            filterCheckBox.setAttribute("aria-checked", "false");
            filterCheckBox.setAttribute("aria-label", seatMapFilters.vue.$t('core.objects.SeatMapFilters.price-filters__item-input-aria-label', { price: currentFilter.price.toFixed(2)}));
            filterCheckBox.setAttribute("id", `price_filter_${currentFilter.id}`);

            // Create Label
            const filterLabel = document.createElement("label");
            filterLabel.classList.add("price-filters__item-label");
            filterLabel.setAttribute("for", `price_filter_${currentFilter.id}`);
            filterLabel.innerHTML = seatMapFilters.vue.$t('core.objects.SeatMapFilters.price-filters__item-label', { price: currentFilter.price.toFixed(2)});

            // Append Items
            filterItem.appendChild(filterCheckBox);
            filterItem.appendChild(filterLabel);

            // Set elements to the instance
            currentFilter.elements = {
                input: filterCheckBox
            };

            // Append to the DOM
            seatMapFilters.elements.container.appendChild(filterItem);

        });

    }

    attachEvents() {
        const seatMapFilters = this;
        const seatMap = seatMapFilters.seatMap;

        seatMap.seatData.filters.forEach((currentFilter) => {
            currentFilter.elements.input.addEventListener("change", (event) => {
                if(event.target.checked === false) {
                    seatMapFilters.active = seatMapFilters.active.filter((item) => item !== currentFilter.filterClass);
                }
                else {
                    seatMapFilters.active.push(currentFilter.filterClass);
                }

                seatMapFilters.updateUI();
            });

            // Enable by default
            currentFilter.elements.input.click();
        });
    }

    updateUI() {
        const seatMapFilters = this;
        const seatMap = seatMapFilters.seatMap;

        // Set filters
        seatMap.container.setAttribute("data-active-filters", seatMapFilters.active.toString());
    }

}