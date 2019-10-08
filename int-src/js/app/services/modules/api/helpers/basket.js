// Group seats
export const groupSeats = (seats, seatData) => {
    const groups = [];
    seats.forEach((currentItem) => {
        if(!groups['price' + currentItem.price.price]) {
            groups['price' + currentItem.price.price] = { 
                type: currentItem.price.description,
                filter: {
                    id: currentItem.price.id,
                    class: seatData.filters.filter((currentFilter) => currentFilter.id === currentItem.price.id)[0].filterClass
                },
                bookingFee: currentItem.price.bookingFee,
                price: currentItem.price.price,
                priceWithoutFee: currentItem.price.price - currentItem.price.bookingFee,
                seats: []
            }
        }
        
        groups['price' + currentItem.price.price].seats.push(currentItem);
    });

    const keys = Object.keys(groups);

    return keys.map((key) => groups[key]);
}

export const groupExtras = (extras) => {
    const groups = [];
    extras.forEach((currentExtra) => {

        // Matthew
        // dont display
        if (currentExtra.doNotDisplay && currentExtra.doNotDisplay === true) {
            return;
        }

        if(!groups['extra' + currentExtra.id]) {
            groups['extra' + currentExtra.id] = {
                ...currentExtra//,
                //quantity: 0
            }
        }

        //groups['extra' + currentExtra.id].quantity ++;
    });

    const keys = Object.keys(groups);

    return keys.map((key) => groups[key]);
}

export const formatOffers = (offers) => {
    // Format to seats and extras
    const seats = [];
    const extras = [];
    
    offers.forEach((currentOffer) => {
        seats.push(...currentOffer.offered_seats.map((currentItem) => {
            return {
                id: currentItem.seat.id,
                name: currentItem.seat.seat,
                area: currentItem.seat.area,
                seatBlock: currentItem.seat.seat_block,
                seatRow: currentItem.seat.seat_row_id, 
                price: currentItem.price,
                discountCode: currentItem.discount_code,
                discountGroupCode: currentItem.discount_group_code
            }
        }));
        
        if(currentOffer.extra) {
            extras.push({
                id: currentOffer.extra.id,
                offerId: currentOffer.id,
                description: currentOffer.extra.description,
                price: currentOffer.extra.price,
                stockId: currentOffer.offered_stock_sequence_number,
                quantity: currentOffer.extra.quantity
            });
        }
    });

    return {seats, extras};
}

export const formatOffersConfirmation = (offers) => {
    // Format to seats and extras
    const seats = [];
    const extras = [];
    
    offers.forEach((currentOffer) => {
        seats.push(...currentOffer.tickets.map((currentItem) => {
            return {
                id: currentItem.seat.id,
                name: currentItem.seat.seat,
                area: currentItem.seat.area,
                seatBlock: currentItem.seat.seat_block,
                seatRow: currentItem.seat.seat_row_id, 
                price: currentItem.price
            }
        }));

        if(currentOffer.extra && currentOffer.extra.length > 0) {
            extras.push({
                id: currentOffer.extra[0].id,
                offerId: currentOffer.id,
                description: currentOffer.extra[0].description,
                price: currentOffer.extra[0].price,
                stockId: currentOffer.offered_stock_sequence_number,
                doNotDisplay: currentOffer.extra[0].do_not_display,
                quantity: currentOffer.extra[0].quantity
            });
        }
    });

    return {seats, extras};
}

export const applyFees = (seats, fees) => {
    // Handle fees
    seats.forEach((currentSeat) => {
        // Get any fees for ticket
        const attachedFees = fees.filter((currentFee) => currentFee.seat_id == currentSeat.id && currentFee.seat_row_id == currentSeat.seatRow);

        attachedFees.forEach((currentFee) => {

            switch (currentFee.description) {
                case "Price Reduction": {
                    currentSeat.price.price -= currentFee.price; 
                    break;
                }
                    
                case "Booking Fee": {
                    currentSeat.price.bookingFee = currentFee.price;
                    currentSeat.price.price += currentFee.price;
                    break;
                }
                    
                default:
                    break;
            }
        });

    });
}