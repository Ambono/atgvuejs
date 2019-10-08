/* Dependencies */
import { toArray } from "../toArray";

export const createCheckMarkSVG = (position) => {

    // InsertAdjacentHTML Not supported on IE11 for svg element, Requires doc create.
    // This is going to be a long function - Purpose is to create the SVG Check.
    // Takes inline SVG and is re-written to be DOM Created.

    // Outer SVG Container
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("style", "enable-background:new 0 0 16 16;");
    svg.setAttribute("xml:space", "preserve");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("x", position.x - 8);
    svg.setAttribute("y", position.y - 8);

    // Style
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.insertAdjacentHTML("beforeend", `
        .cls-1{fill:#fff;}
        .cls-1,.cls-3{fill-rule:evenodd;}
        .cls-2{mask:url(#mask);}.cls-3{fill:#4a4a4a;}
    `);
    defs.appendChild(style);

    const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    mask.setAttribute("x", 0);
    mask.setAttribute("y", 0);
    mask.setAttribute("width", 16);
    mask.setAttribute("height", 16);
    mask.setAttribute("maskUnits", "userSpaceOnUse");

    const maskG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const maskPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    maskPoly.setAttribute("class", "cls-1");
    maskPoly.setAttribute("points", "0 0 16 0 16 16 0 16 0 0");
    maskG.appendChild(maskPoly);
    mask.appendChild(maskG);
    defs.appendChild(mask);

    svg.appendChild(defs);

    // Content
    const g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g1.setAttribute("data-name", "Layer 2");

    const g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g2.setAttribute("data-name", "Layer 1");
   
    const g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g3.setAttribute("class", "cls-2");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("class", "cls-3");
    path1.setAttribute("d", "M16,8A8,8,0,1,1,8,0a8,8,0,0,1,8,8");
    g3.appendChild(path1);
    g2.appendChild(g3);

    const poly1 = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    poly1.setAttribute("class", "cls-1");
    poly1.setAttribute("points", "13 5.79 11.17 4 5.67 9.39 3.83 7.6 2 9.39 3.83 11.2 5.67 13 7.5 11.2 13 5.79");
   

    g2.appendChild(poly1);

    g1.appendChild(g2);

    svg.appendChild(g1);

    svg.setAttribute("data-selected-icon", "");

    return svg;
}


export const createDisabledSVG = (position) => {

    // InsertAdjacentHTML Not supported on IE11 for svg element, Requires doc create.
    // This is going to be a long function - Purpose is to create the SVG Check.
    // Takes inline SVG and is re-written to be DOM Created.

    // Outer SVG Container
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("style", "enable-background:new 0 0 16 16;");
    svg.setAttribute("xml:space", "preserve");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("x", position.x - 8);
    svg.setAttribute("y", position.y - 8);

    // Style
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.insertAdjacentHTML("beforeend", `
       .cls-4{fill:white}
        .cls-4,.cls-6{fill-rule:evenodd;}
        .cls-5{mask:url(#mask);}.cls-6{fill:transparent;}
    `);
    defs.appendChild(style);

    const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    mask.setAttribute("x", 0);
    mask.setAttribute("y", 0);
    mask.setAttribute("width", 16);
    mask.setAttribute("height", 16);
    mask.setAttribute("maskUnits", "userSpaceOnUse");

    const maskG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const maskPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    maskPoly.setAttribute("class", "cls-4");
    maskPoly.setAttribute("points", "0 0 16 0 16 16 0 16 0 0");
    maskG.appendChild(maskPoly);
    mask.appendChild(maskG);
    defs.appendChild(mask);

    svg.appendChild(defs);

    // Content
    const g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g1.setAttribute("data-name", "Layer 2");

    const g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g2.setAttribute("data-name", "Layer 1");

    const g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g3.setAttribute("class", "cls-5");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("class", "cls-6");
    path1.setAttribute("d", "M16,8A8,8,0,1,1,8,0a8,8,0,0,1,8,8");
    g3.appendChild(path1);
    g2.appendChild(g3);

    const poly1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    poly1.setAttribute("d", "M18,12.9v-1.7c-1.3,0-2.6-0.6-3.5-1.6l-1.1-1.2c-0.1-0.2-0.3-0.3-0.5-0.4l0,0l0,0c-0.3-0.2-0.6-0.3-1-0.2c-0.9,0.1-1.6,0.9-1.6,1.8v5c0,0.9,0.8,1.7,1.7,1.7h4.3v4.2H18v-4.7c0-0.9-0.8-1.7-1.7-1.7h-2.6v-2.9C14.8,12.1,16.5,12.8,18,12.9L18,12.9z M12.7,17.1c-0.4,1-1.3,1.7-2.4,1.7c-1.4,0-2.6-1.1-2.6-2.5c0-1.1,0.7-2,1.7-2.4v-1.8C7.5,12.5,6,14.2,6,16.3c0,2.3,1.9,4.2,4.3,4.2c2.1,0,3.8-1.5,4.2-3.4H12.7L12.7,17.1z M12,6.9c0.9,0,1.7-0.8,1.7-1.7S12.9,3.5,12,3.5s-1.7,0.8-1.7,1.7S11.1,6.9,12,6.9z");
   
    poly1.setAttribute("stroke", "white");
    poly1.setAttribute("fill", "white");
    poly1.setAttribute("transform", "scale(0.6)");

    g2.appendChild(poly1);

    g1.appendChild(g2);

    svg.appendChild(g1);

    svg.setAttribute("data-selected-icon", "");

    return svg;
}

export const createNonstandardSVG = (position) => {

    // InsertAdjacentHTML Not supported on IE11 for svg element, Requires doc create.
    // This is going to be a long function - Purpose is to create the SVG Check.
    // Takes inline SVG and is re-written to be DOM Created.

    // Outer SVG Container
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    svg.setAttribute("viewBox", "0 0 16 16");
    svg.setAttribute("style", "enable-background:new 0 0 16 16;");
    svg.setAttribute("xml:space", "preserve");
    svg.setAttribute("width", "16");
    svg.setAttribute("height", "16");
    svg.setAttribute("x", position.x - 8);
    svg.setAttribute("y", position.y - 8);

    // Style
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.insertAdjacentHTML("beforeend", `
       .cls-7{fill:white}
        .cls-7,.cls-8{fill-rule:evenodd;}
        .cls-8{mask:url(#mask);}.cls-9{fill:transparent;}
    `);
    defs.appendChild(style);

    const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    mask.setAttribute("x", 0);
    mask.setAttribute("y", 0);
    mask.setAttribute("width", 16);
    mask.setAttribute("height", 16);
    mask.setAttribute("maskUnits", "userSpaceOnUse");

    const maskG = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const maskPoly = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    maskPoly.setAttribute("class", "cls-7");
    maskPoly.setAttribute("points", "0 0 16 0 16 16 0 16 0 0");
    maskG.appendChild(maskPoly);
    mask.appendChild(maskG);
    defs.appendChild(mask);

    svg.appendChild(defs);

    // Content
    const g1 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g1.setAttribute("data-name", "Layer 2");

    const g2 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g2.setAttribute("data-name", "Layer 1");

    const g3 = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g3.setAttribute("class", "cls-8");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("class", "cls-9");
    path1.setAttribute("d", "M16,8A8,8,0,1,1,8,0a8,8,0,0,1,8,8");
    g3.appendChild(path1);
    g2.appendChild(g3);

    const poly1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    poly1.setAttribute("d", "M16,8A8,8,0,1,1,8,0a8,8,0,0,1,8,8");

    poly1.setAttribute("stroke", "white");
    poly1.setAttribute("fill", "white");
    poly1.setAttribute("transform", "scale(0.6)");

    g2.appendChild(poly1);

    g1.appendChild(g2);

    svg.appendChild(g1);

    svg.setAttribute("data-selected-icon", "");

    return svg;
}

export const findSeatOrigin = (seatMapData, currentSeat) => {
    // Locate item
    const seatBlock = seatMapData.seats.filter((item) => item.area.name === currentSeat.area)[0];
    const seatRow = seatBlock.rows.filter((item) => item.id === currentSeat.seatRow)[0];
    const seat = seatRow.seats.filter((item) => parseInt(item.id) === parseInt(currentSeat.id))[0];
    return seat;
}