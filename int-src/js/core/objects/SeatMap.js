/* Dependencies */
import Hammer from "hammerjs";
import svgPanZoom from "svg-pan-zoom";
import { settings as appSettings } from "../../config/config";
import { createDisabledSVG, createNonstandardSVG } from "../../core/helpers/seatMap/seatMap.js";
import i18n from '../../i18n-setup';

const getCenterSVG = (container, element) => {
    return (parseInt(container.getAttribute("width")) - parseInt(element.getAttribute("width"))) / 2;
}

const renderSeats = ({seatMap, seatData}) => {
    // Return promise as could take a few seconds
    return new Promise((resolve) => {
        
        // Create a container SVG
        const mapSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        
        // Set the base attrbutes on the container
        mapSVG.setAttribute("data-seat-map", "");
        mapSVG.setAttribute("class", "seat-map__map");
        mapSVG.setAttribute("width", "958");
        mapSVG.setAttribute("height", "1200");
        
        // Create The Stage
        const stage = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        stage.setAttribute("width", appSettings.stage.width);
        stage.setAttribute("height", appSettings.stage.height);
		if (appSettings.core.stageOnTop) {
			stage.setAttribute("y", "0");
		} else {
			stage.setAttribute("y", "1400");
		}
        stage.setAttribute("x", getCenterSVG(mapSVG, stage) + appSettings.stage.X);// + 675);			
        //+ 750
        // InsertAdjacentHTML Not supported on IE11 for svg element, Requires doc create.
        const stageRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        stageRect.setAttribute("x", "0");
        stageRect.setAttribute("y", "0");
        stageRect.setAttribute("width", appSettings.stage.width);
        stageRect.setAttribute("height", appSettings.stage.height);
        stageRect.setAttribute("class", "seat-map__map-stage");
        stage.appendChild(stageRect);

        const stageTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
        stageTitle.setAttribute("x", "50%");
        stageTitle.setAttribute("y", "50%");
        stageTitle.setAttribute("dominant-baseline", "middle");
        stageTitle.setAttribute("text-anchor", "middle");
        stageTitle.setAttribute("class", "seat-map__map-stage-title");
        stageTitle.textContent = i18n.t('core.objects.seatMap.stageTitle');
        stage.appendChild(stageTitle);
        
        // Add stage to the map
        mapSVG.appendChild(stage);

        // Add stage to instance
        seatData.stageDetails = {
            postion: "top",
            element: stage
        }

        // Define Offset
        const stageOffset = appSettings.core.stageOnTop ? 100 : 0;
        let sectionSpacing = 0;


        // Loop through areas
        seatData.areas.forEach((currentArea) => {

            const totalOffset = stageOffset + sectionSpacing;
            sectionSpacing += 40;

            // Ignore All option
            if(currentArea.id === "ALL") {
                return;
            }

            // Create a group for the Area
            const mapGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
            mapGroup.setAttribute("data-map-area", `${currentArea.id}`);
            
            // Create area title
            const areaTitle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            areaTitle.setAttribute("width", appSettings.area.titleWidth);
            areaTitle.setAttribute("height", appSettings.area.titleHeight);
            // 2000, 800
            areaTitle.setAttribute("y", currentArea.offset.top + totalOffset - 50);
            //-500
            areaTitle.setAttribute("x", getCenterSVG(mapSVG, areaTitle) );
 //+ 750
            // InsertAdjacentHTML Not supported on IE11 for svg element, Requires doc create.
            const areaTitleRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            areaTitleRect.setAttribute("x", "0");
            areaTitleRect.setAttribute("y", "0");
            areaTitleRect.setAttribute("width", "200");
            areaTitleRect.setAttribute("height", "50");
            areaTitleRect.setAttribute("fill", "transparent");
            areaTitle.appendChild(areaTitleRect);
            
            const areaTitleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            areaTitleText.setAttribute("x", "50%");
            areaTitleText.setAttribute("y", "50%");
            areaTitleText.setAttribute("dominant-baseline", "middle");
            areaTitleText.setAttribute("text-anchor", "middle");
            areaTitleText.setAttribute("class", "seat-map__map-section-title");
            areaTitleText.textContent = currentArea.title;
            areaTitle.appendChild(areaTitleText);           
            
            // Append the title
            if (appSettings.area.showTitle) {
                mapGroup.appendChild(areaTitle);
            }

            // Locate the seats to be rendered
            const seats = seatData.seats.filter((item) => currentArea.id === item.area.id)[0];
 
            // Loop through the rows
            seats.rows.forEach((currentRow, index) => {

              
                // Loop through the seats
                currentRow.seats.forEach((currentSeat) => {
                    
                    // Create a seat circle element
                    const seatElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");

                    // Set Size & Position
                    seatElement.setAttribute("cx", currentSeat.coordinates.x);
                    seatElement.setAttribute("cy", currentSeat.coordinates.y + totalOffset);
                    seatElement.setAttribute("r", appSettings.core.seatSize);
                    
                    // Add Identifiers
                    seatElement.setAttribute("data-row-id", currentSeat.rowId);
                    seatElement.setAttribute("data-seat-id", currentSeat.id);
                    seatElement.setAttribute("data-area-id", currentArea.id);

                    // Locate the filter class
                    const filter = seatData.filters.filter((item) => item.id === currentSeat.filterID)[0];

                    var disabledElement;
                    var nonstandardElement;

                    // Apply filter 
                    if( (!currentSeat.available) || (filter === undefined) ){
                        // Note that the filter can be undefined if there are no prices for the seat.
                        seatElement.setAttribute("class", `seat seat--unavailable`);
                    }
                    else {
                        seatElement.setAttribute("class", `seat seat--${filter.filterClass}`);
                        currentSeat.filterClass = filter.filterClass;

                        // MATTHEW add disabled and non standard classes
                        if (currentSeat.isDisabled) {

                            disabledElement = createDisabledSVG({ x: currentSeat.coordinates.x, y: currentSeat.coordinates.y + totalOffset});

                        }
                        else if (currentSeat.isNonStandard) {
                          
                            nonstandardElement = createNonstandardSVG({ x: currentSeat.coordinates.x + 3, y: currentSeat.coordinates.y + totalOffset + 3});
                            
                        }
                    }

                    // Add element to the instance
                    currentSeat.element = seatElement;

                    // Add to the map
                    mapGroup.appendChild(seatElement);

                    if (currentSeat.isDisabled) {
                        if (disabledElement) {
                            seatElement.parentNode.appendChild(disabledElement);
                        }
                    }
                    else {
                        if (nonstandardElement) {
                            seatElement.parentNode.appendChild(nonstandardElement);
                        }
                    }
                });
            });

            // Add the group to the map svg
            mapSVG.appendChild(mapGroup);

        });

        

        // Append the svg map to the DOM
        seatMap.container.appendChild(mapSVG);

        // Store the SVG Map on the instance.
        seatMap.mapSVG = mapSVG;

        // Resolve the promise
        resolve();
    });
}


export class SeatMap {
    constructor({ wrapper, container, seatData, controls, onMapReady, selectSeat, removeSeat, presentation }) {
        // Cache instance
        const seatMap = this;

        // Set properties
        seatMap.container = container;
        seatMap.wrapper = wrapper;
        seatMap.seatData = seatData;
        seatMap.controls = (controls) ? {
            zoomIn: controls.querySelector("[data-zoom-in]"),
            reset: controls.querySelector("[data-zoom-reset]"),
            zoomOut: controls.querySelector("[data-zoom-out]")
        } : undefined;
        seatMap.map = undefined;
        seatMap.mapSVG = undefined;
        seatMap.onMapReady = onMapReady;
        seatMap.handlers = {
            seatSelect: [],
            seatMapZoom: [],
            seatMapPan: []
        },
        seatMap.selectSeat = (selectSeat) ? selectSeat : undefined;
        seatMap.removeSeat = (removeSeat) ? removeSeat: undefined;
        seatMap.presentation = (presentation) ? presentation : false;
        seatMap.resizeTimeout = undefined;
        seatMap.init();

        window.map = seatMap;
    }

    init() {
        // Cache instance
        const seatMap = this;
        
        // Render The Map
        seatMap.renderMap()
        .then(() => {
            seatMap.handleDrag();
            seatMap.attachEvents();
        });
    }

    renderMap() {
        // Cache instance
        const seatMap = this;

        // Return promise
        return new Promise((resolve) => {
            // Render the seats
            renderSeats({ seatMap, seatData: seatMap.seatData })
            .then(() => {
                // If onMapReady is d
                if(seatMap.onMapReady) {
                    seatMap.onMapReady.call(this);
                }
                // Resolve
                resolve();
            });
        });
    }

    attachEvents() {
        // Cache instance
        const seatMap = this;

        if(seatMap.controls) {
            seatMap.controls.zoomIn.addEventListener("click", (event) => {
                event.preventDefault();
                seatMap.map.zoomIn();
            });

            seatMap.controls.reset.addEventListener("click", (event) => {
                event.preventDefault();
                
                seatMap.resetMapPosition();
                
            });

            seatMap.controls.zoomOut.addEventListener("click", (event) => {
                event.preventDefault();
                seatMap.map.zoomOut();
            });
        }

        // Event Delegation
        seatMap.mapSVG.addEventListener("click", (event) => {
            seatMap.handlers.seatSelect.forEach((currentFunc) => currentFunc.call(this, event));
        });

        // Handle Pan
        seatMap.map.setOnPan((oldPan, newPan) => {
            seatMap.handlers.seatMapPan.forEach((currentFunc) => currentFunc.call(this, oldPan, newPan));
        });

        // Handle Zoom
        seatMap.map.setOnZoom((oldZoom, newZoom) => {
            seatMap.handlers.seatMapZoom.forEach((currentFunc) => currentFunc.call(this, oldZoom, newZoom));
        });

        // Define resize handler
        seatMap.resizeHandler = function() {
            const seatMap = this;
            clearTimeout(seatMap.resizeTimeout);
            setTimeout(() => {
                seatMap.map.resize();
                seatMap.map.fit();
                seatMap.map.center();
                seatMap.resetMapPosition();
            }, 250);
        }

        seatMap.resizeHandler = seatMap.resizeHandler.bind(this);

        // Handle Resize
        window.addEventListener("resize", seatMap.resizeHandler);
    }

    dettachEvents() {
        const seatMap = this;

        // Remove Resize handler
        window.removeEventListener("resize", seatMap.resizeHandler);
    }

    handleDrag() {
          // Cache instance
        const seatMap = this;
        
        seatMap.map = svgPanZoom(seatMap.container.querySelector("[data-seat-map]"), {
            maxZoom: 5,
            minZoom: 0.8,
            zoomSpeed: 0.065,
            fit: true,
            center: true,
            contain: true,
            zoomScaleSensitivity: 0.2,
            customEventsHandler: {
                haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'],
                init: function(options) {
                    var instance = options.instance
                    , initialScale = 1
                    , pannedX = 0
                    , pannedY = 0
                    // Init Hammer

                    // Listen only for pointer and touch events
                    this.hammer = Hammer(options.svgElement, {
                    inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.PointerEventInput : Hammer.TouchInput
                    })
                    
                    // Enable pinch
                    this.hammer.get('pinch').set({enable: true})
                    
                    // Handle double tap
                    this.hammer.on('doubletap', function(ev){
                    instance.zoomIn()
                    })
                    
                    
                    // Handle single tap.
                    this.hammer.on('tap', function(ev){
                        initialScale = instance.getZoom();
                        instance.zoomIn();
                        if (initialScale < 2.4) {
                            instance.zoomAtPoint(2.5, {x: ev.center.x, y: ev.center.y});
                        } else if (initialScale < 4.9) {
                            instance.zoomAtPoint(5.0, {x: ev.center.x, y: ev.center.y});
                        } 
                    })
                                        
                    // Handle pan
                    this.hammer.on('panstart panmove', function(ev){
                        // On pan start reset panned variables
                        if (ev.type === 'panstart') {
                            pannedX = 0
                            pannedY = 0
                        }
                        
                        // Pan only the difference
                        instance.panBy({x: ev.deltaX - pannedX, y: ev.deltaY - pannedY})
                        pannedX = ev.deltaX
                        pannedY = ev.deltaY
                    });

                    // Handle pinch
                    this.hammer.on('pinchstart pinchmove', function(ev){

                        // Get the bounds of the svg
                        const svgRect = seatMap.mapSVG.getBoundingClientRect();

                        // On pinch start remember initial zoom
                        if (ev.type === 'pinchstart') {
                            initialScale = instance.getZoom()
                            instance.zoomAtPoint(initialScale * ev.scale, {x: ev.center.x, y: ev.center.y})
                        }
                        
                        // Update the X & Y to be in relation to the SVG and not the window.
                        // Center Point - The Poisition Offset from the page the edge of the page. 
                        const xPos = ev.center.x - svgRect.left;
                        const yPos = ev.center.y - svgRect.top;

                        instance.zoomAtPoint(initialScale * ev.scale, {x: xPos, y: yPos});
                    });

                    // Prevent moving the page on some devices when panning over SVG
                    options.svgElement.addEventListener('touchmove', function(e){ e.preventDefault(); });
                }, 
                destroy: function(){
                    this.hammer.destroy()
                }
            }
        });

        // Set the initial map position
        seatMap.resetMapPosition();
    }

    resetMapPosition() {
        // Cache instance
        const seatMap = this;

        // Apply defaults to the seatmap
        seatMap.map.zoom(0.9);
        // seatMap.map.pan({ x: "22", y: "22" });
        seatMap.map.center();
    }

    /** 
     * Method used to destroy the seat map instance. Primarily used to unbind events
     * @memberof SeatMap
     */
    destroy() {
        const seatMap = this;

        // Destory map events
        seatMap.map.destroy();

        // Remove window event
        seatMap.dettachEvents();
    }


}