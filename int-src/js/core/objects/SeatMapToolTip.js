
import anime from "animejs";
import { scrollTo } from '../../core/helpers/scrollTo';

const animateIn = (toolTip, position, seatMapToolTip) => {
    if(seatMapToolTip.timeline) {
        seatMapToolTip.timeline.pause();
    }
    
    const tl = anime.timeline({
        autoplay: false,
        loop: false
    });

    tl.add({
        targets: toolTip,
        opacity: 0,
        duration: 0,
        easing: "linear",
        complete: () => {
            toolTip.style.top = `${position.y}px`;
            toolTip.style.left = `${position.x}px`;
        }
    });

    tl.add({
        targets: toolTip,
        opacity: 1,
        delay: 10,
        duration: 0, 
        easing: "linear"
    });

    seatMapToolTip.timeline = tl;

    seatMapToolTip.timeline.play();
}

const animateOut = (element, seatMapToolTip) => {
    if(seatMapToolTip.timeline) {
        seatMapToolTip.timeline.pause();
    }

    const tl = anime.timeline({
        autoplay: false,
        loop: false
    });

    tl.add({
        targets: element,
        duration: 50,
        opacity: 0,
        easing: "linear",
        complete: () => {
            element.style.display = "none";
        }
    });

    seatMapToolTip.timeline = tl;

    seatMapToolTip.timeline.play();
}

const getSeatPosition = (seat, container) => {
    return {
        x: seat.element.getBoundingClientRect().left - container.getBoundingClientRect().left,
        y: seat.element.getBoundingClientRect().top - container.getBoundingClientRect().top,
        width: seat.element.getBoundingClientRect().width,
        height: seat.element.getBoundingClientRect().height
    }
}

const updatePosition = (toolTip, position) => {
    toolTip.style.top = `${position.y}px`;
    toolTip.style.left = `${position.x}px`;
}

const createToolTip = ({seatMapToolTip}) => {
    
    // Create the container
    const container = document.createElement("div");
    container.addClass("tool-tip");
    container.setAttribute("data-tool-tip", "");

    // Render the content
    const content = `
        <!-- Container -->
        <div class="tool-tip__container">
            <!-- Close -->
            <button class="tool-tip__close" data-tool-tip-close>
                <!-- Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="tool-tip__close-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-in"></use>
                </svg>
                <!-- /Icon -->
            </button>
            <!-- / Close -->
            <!-- Image -->
            <div class="tool-tip__image" style="background-image:url(https://images.unsplash.com/photo-1519753888173-87c071176960?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80)"></div>
            <!--<div class="tool-tip__image" style="background-image:url(assets/images/defaults/blankSeatView.jpg)"></div>-->
            <!-- / Image -->
            <!-- Content -->
            <div class="tool-tip__content" data-tool-tip-content>
                <!-- Rendered with js -->
            </div>
            <!-- / Content -->
        </div>
        <!-- / Container -->
    `;

    container.insertAdjacentHTML("beforeend", content);

    return {
        element: container,
        closeBnt: container.querySelector("[data-tool-tip-close]"),
        content: container.querySelector("[data-tool-tip-content]")
    }
}

const renderToolTipContent = (container, item, seatMap, callback) => {
    
   const price = seatMap.seatData.filters.filter((currentFilter) => currentFilter.id === item.priceId)[0].price;

    const info = `
        <!-- Info -->
        <div class="tool-tip__info">
            <h4 class="tool-tip__seat">
                ${item.name}
                <small>${item.areaName}</small>
            </h4>
            <h4 class="tool-tip__price">
                £${price.toFixed(2)}
                <small>${item.seatInformation}</small>
            </h4>
        </div>
        <!-- / Info -->
    `;

    container.innerHTML = "";
    container.insertAdjacentHTML("beforeend", info);

    const actionContainer = document.createElement("div");
    actionContainer.addClass("tool-tip__action-container");

    if(!seatMap.presentation) {        
        const actionBTN = document.createElement("button");
        actionBTN.addClass("btn");
        actionBTN.addClass("tool-tip__action");
        actionBTN.setAttribute("data-select-seat", "");
        actionBTN.innerHTML = "Select This Seat";
        actionBTN.addEventListener("click", (event) => {
            event.preventDefault();
            if(!item.selected) {
                seatMap.selectSeat(item, false, () => {
                    actionBTN.innerHTML = "Remove";
                });
                setTimeout(()=>{scrollTo(document.querySelector(".selected-seats"))
                    },
                    500); 
                   }
            else {
                seatMap.removeSeat(item);
                actionBTN.innerHTML = this.$t('core.objects.seatMapToolTip.actionBTN.selectSeat');
            }
            
        });

        if(item.selected) {                     
            actionBTN.innerHTML = this.$t('core.objects.seatMapToolTip.actionBTN.remove'); 
        }
        
        container.appendChild(actionBTN);
    }
    callback();
}


export class SeatMapToolTip {
    constructor({seatMap, container, beforeOpen}) {
        const seatMapToolTip = this;

        seatMapToolTip.seatMap = seatMap;
        seatMapToolTip.elements = {
            container,
            seatMap: seatMap.wrapper
        }
        seatMapToolTip.active = false;
        seatMapToolTip.beforeOpen = (beforeOpen) ? beforeOpen.bind(this) : undefined;
        seatMapToolTip.timeline = undefined;
        seatMapToolTip.hoverTimeout = undefined;
        seatMapToolTip.init();
    }

    init() {
        const seatMapToolTip = this;

        seatMapToolTip.appendToolTip();
        seatMapToolTip.attachEvents();
    }

    appendToolTip() {
        const seatMapToolTip = this; 
        const seatMap = seatMapToolTip.seatMap;

        seatMapToolTip.elements.toolTip = createToolTip({seatMap});

        seatMapToolTip.elements.container.appendChild(seatMapToolTip.elements.toolTip.element);
    }

    close() {
        const seatMapToolTip = this; 
        const button = document.querySelector("button.btn.tool-tip__action");
        if(seatMapToolTip.active) { 
            animateOut(seatMapToolTip.elements.toolTip.element, seatMapToolTip);
            seatMapToolTip.active = false;
            seatMapToolTip.activeSeat = undefined;        
            if((button.innerHTML=="Remove"))
            {
                var selectedseats = document.querySelector(".selected-seats");
                scrollTo(selectedseats);
                 
            }                          
        }      
    }

    

    updateUI() {
        return new Promise((resolve) => {
            const seatMapToolTip = this;
            const seatMap = seatMapToolTip.seatMap;

            renderToolTipContent(seatMapToolTip.elements.toolTip.content, seatMapToolTip.activeSeat, seatMap, () => {
                resolve();
            });
        });
    }

    findSeat(event) {
        const seatMapToolTip = this;
        const seatMap = seatMapToolTip.seatMap;

        // Retrieve the identifiers
        const seatId = parseInt(event.target.getAttribute("data-seat-id"));
        const rowId = parseInt(event.target.getAttribute("data-row-id"));
        const areaId = event.target.getAttribute("data-area-id");
    
        // Filter to the target area 
        const targetArea = seatMap.seatData.seats.filter((item) => item.area.id == areaId)[0];

        // Find the row
        const targetRow = targetArea.rows.filter((item) => item.id == rowId)[0];
    
        // Find the seat
        const targetSeat = targetRow.seats.filter((item) => item.id == seatId)[0];

        return targetSeat;
    }

    open(targetSeat) {
        const seatMapToolTip = this;
        const seatMap = seatMapToolTip.seatMap;
        let valid = (seatMapToolTip.beforeOpen) ? seatMapToolTip.beforeOpen(targetSeat) : true;

        // Return if currently open / Not available
        if(seatMapToolTip.activeSeat === targetSeat || !targetSeat.available || !valid) {
            return;
        }

        const toolTip = seatMapToolTip.elements.toolTip.element;

        toolTip.style.display = "block";

        seatMapToolTip.active = true;
        seatMapToolTip.activeSeat = targetSeat;
        
        seatMapToolTip.updateUI()
        .then(() => {
            const offset = getSeatPosition(targetSeat, seatMapToolTip.elements.seatMap);
            const position = {
                y: offset.y - (toolTip.clientHeight + 10),
                x: offset.x - (toolTip.clientWidth / 2) + (offset.width / 2) - 1
            }
            animateIn(seatMapToolTip.elements.toolTip.element, position, seatMapToolTip);

        });

    }

    attachEvents() {
        const seatMapToolTip = this;
        const seatMap = seatMapToolTip.seatMap;

        // Close
        seatMapToolTip.elements.toolTip.closeBnt.addEventListener("click", (event) => {
            event.preventDefault();
            seatMapToolTip.close();         
        });

        // Event Delegation
        seatMap.handlers.seatSelect.push((event) => {        
            // If a seat is clicked
            if(event.target && event.target.nodeName == "circle") {
                // Prevent Default
                event.preventDefault();
                // Find the seat and open the tool tip
                const targetSeat = seatMapToolTip.findSeat(event);
                seatMapToolTip.open(targetSeat);
            }
        });
        
        // Debounced on mouse over event
        seatMap.mapSVG.addEventListener("mouseover", (event) => {
            clearTimeout(seatMapToolTip.hoverTimeout);
            seatMapToolTip.hoverTimeout = setTimeout(() => {
                if(event.target.nodeName === "svg") {
                    seatMapToolTip.close();
                }

                 // If a seat is clicked
                if(event.target && event.target.nodeName == "circle") {
                    // Find the seat and open the tool tip
                    const targetSeat = seatMapToolTip.findSeat(event);
                    seatMapToolTip.open(targetSeat);
                }
            }, 150);
        });

        seatMapToolTip.elements.toolTip.element.addEventListener("mouseover", (event) => {
            clearTimeout(seatMapToolTip.hoverTimeout);
        });
        
        seatMap.handlers.seatMapZoom.push((event) => {
            if(seatMapToolTip.active) {
                 // get position of the seat in the dom
                 const toolTip = document.querySelector(".tool-tip");
                    
                 const map = document.querySelector(".seat-map");

                 const offset = getSeatPosition(seatMapToolTip.activeSeat, seatMap.wrapper);

                 const position = {
                     y: offset.y - (toolTip.clientHeight + 10),
                     x: offset.x - (toolTip.clientWidth / 2) + (offset.width / 2) - 1
                 }

                 updatePosition(toolTip, position);
            }
        });

        seatMap.handlers.seatMapPan.push((event) => {
            seatMapToolTip.close();
        });
    }
}