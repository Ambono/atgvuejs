import anime from "animejs";

export class SeatMapAreas {
    constructor({seatMap, container, onSelect, vue}) {
        // Cache instance
        const seatMapAreas = this;

        seatMapAreas.seatMap = seatMap;
        seatMapAreas.elements = {
            container
        }
        seatMapAreas.onSelect = onSelect;
        seatMapAreas.active = 0;
        seatMapAreas.vue = vue;

        // Initiate
        seatMapAreas.init();
    }

    init() {
        //Cache instacne
        const seatMapAreas = this;
        const seatMap = seatMapAreas.seatMap;

        seatMapAreas.renderAreas();
        seatMapAreas.attachEvents();
        seatMapAreas.setDefaultArea();
    }

    setDefaultArea() {
        const seatMapAreas = this;
        const seatMap = seatMapAreas.seatMap;

        // Set the first area as the default selected
        if(seatMapAreas.onSelect) {
            seatMapAreas.onSelect(seatMap.seatData.areas[0]);
        }
    }

    renderAreas() {
        // Cache instacne
        const seatMapAreas = this;
        const seatMap = seatMapAreas.seatMap;

        // Create container
        const areaList = document.createElement("ul");
        areaList.classList.add("area-selection__list");

        // Clear the container
        seatMapAreas.elements.container.innerHTML = "";

        // Loop through items in the data
        seatMap.seatData.areas.forEach((currentArea, index) => {

            if (!currentArea.title) {
                return;
            }

            //if (currentArea.id === "ALL" && !appSettings.core.showAllSeatMapArea) {
            //    return;
            //}

            

            // Create Container
            const container = document.createElement("li");
            container.classList.add("area-selection__item", `area-selection__item--${currentArea.id.toLowerCase()}`);
            // If first item
            (index === 0) ? container.setAttribute("data-active", "") : "";
            
            // Create the anchor
            const anchor = document.createElement("a");
            anchor.classList.add("area-selection__item-link");
            anchor.setAttribute("href", "#");
            anchor.setAttribute("aria-label", seatMapAreas.vue.$t('core.objects.seatMapAreas.area-selection__item-aria-label', { title: currentArea.title }));

            // Create the inner content
            anchor.innerHTML = `
                <h4 class="area-selection__item-title">${currentArea.title}</h4>
                <svg xmlns="http://www.w3.org/2000/svg" class="area-selection__item-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#${currentArea.iconName}"></use>
                </svg>
            `;

            // Append the anchor
            container.appendChild(anchor);

            // Append the item
            areaList.appendChild(container);

            // Add the element to the original array
            seatMap.seatData.areas[index].elements = {
                anchor,
                container,
                svgMapGroup: document.querySelector(`[data-map-area="${currentArea.id}"]`)
            };
        });

        // Append to the container
        seatMapAreas.elements.container.appendChild(areaList);

    }

    attachEvents() {
        // Cache instance
        const seatMapAreas = this;
        const seatMap = seatMapAreas.seatMap;

        // Add events to the area anchor elements
        seatMap.seatData.areas.forEach((currentArea, index) => {

            if (!currentArea.elements || !currentArea.elements.anchor) {
                return;
            }

            currentArea.elements.anchor.addEventListener("click", (event) => {
                event.preventDefault();
                seatMapAreas.updateUI(index);
                if(seatMapAreas.onSelect) {
                    seatMapAreas.onSelect(currentArea);
                }
            });
        });
    }

    updateUI(desiredIndex) {
        // Cache instance
        const seatMapAreas = this;
        const seatMap = seatMapAreas.seatMap;

        // Locate the items to be shown and faded
        const toBeFaded = [];
        const toBeShown = [];

        // If all
        if(seatMap.seatData.areas[desiredIndex].id === "ALL") {
            // Show all areas
            seatMap.seatData.areas.forEach((item) => {
                if(item.id !== "ALL") {
                    toBeShown.push(item.elements.svgMapGroup);
                    item.active = true;
                }
            });

            // Include stage
            toBeShown.push(seatMap.seatData.stageDetails.element);
        }
        else {
            seatMap.seatData.areas.forEach((item, index) => {
                // If to be hidden
                if (index !== desiredIndex && item.id !== "ALL") {
                    if (item.elements && item.elements.svgMapGroup) {
                        toBeFaded.push(item.elements.svgMapGroup);
                        item.active = false;
                    }
                }
                // If to be shown
                else if (item.id !== "ALL") {
                    if (item.elements && item.elements.svgMapGroup) {

                        toBeShown.push(item.elements.svgMapGroup);
                        item.active = true;
                    }

                }
            }); 
            
            // Include stage
            toBeFaded.push(seatMap.seatData.stageDetails.element);
        }

        // Animate the areas in / out

        // Clear previous timeline
        if(seatMapAreas.timeline) {
            seatMapAreas.timeline.pause();
        }

        // Create a timeline
        const timeline = anime.timeline({
            loop: false,
            autoplay: false
        });
        
        // Fade out map
        timeline.add({
            targets: seatMap.mapSVG,
            opacity: 0,
            duration: 300,
            easing: "linear",
            complete: () => {
                // Update Items
                toBeFaded.forEach((item) => item.setAttribute("style", "display: none; opacity: 0;"));
                toBeShown.forEach((item) => item.setAttribute("style", "display: block; opacity: 1;"));

                // Clear Stack and reset viewport
                setTimeout(() => {
                    seatMap.map.updateBBox();
                    seatMap.map.center();
                    // MATTHEW zoom in on areas
                    if (seatMap.seatData.areas[desiredIndex].id !== "ALL") {
                        seatMap.map.zoom(1.4);
                    }
                    else {
                        seatMap.map.zoom(0.9);
                    }

                }, 0);
            }
        });

        // Fade in map
        timeline.add({
            targets: seatMap.mapSVG,
            opacity: 1,
            duration: 300,
            easing: "linear"
        });

        
        timeline.play();

        // Store the timeline
        seatMapAreas.timeline = timeline;

        // Update active item
        seatMap.seatData.areas[seatMapAreas.active].elements.container.removeAttribute("data-active");
        seatMap.seatData.areas[desiredIndex].elements.container.setAttribute("data-active", "");
        seatMapAreas.active = desiredIndex;
    
        window.map = seatMap.map;
    }
}