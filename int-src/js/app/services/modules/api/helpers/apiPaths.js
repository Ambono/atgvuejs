// API Paths
export const showSummaryApiPath = (client, showID) => {
    return `/Shows/Summary/client/${client}/showID/${showID}`;
}

export const showApiPath = (client, showID) => {
    return `/Shows/client/${client}/id/${showID}`;
}

export const calendarApiPath = (client, showID, startDate, endDate, numOfSeats) => {
    return `/Shows/Calendar3/client/${client}/id/${showID}/startdate/${startDate}/enddate/${endDate}/minContigSeats/${numOfSeats.num}`;
}


export const pricesForPerformanceApiPath = (client, performanceId) => {
    return `SeatPrice/PricesForPerformance/client/${client}/performanceId/${performanceId}`;
}


export const seatStatusForPerformanceApiPath = (client, performanceId) => {
    return `SeatPrice/SeatStatusForPerformance/client/${client}/performanceId/${performanceId}`;
}

export const seatMapForPerformanceApiPath = (client, showID, layoutID, venueID, performanceId) => {
    return `SeatPrice/SeatMapForPerformance/client/${client}/PerformanceId/${performanceId}/VenueId/${venueID}/LayoutId/${layoutID}/ShowId/${showID}`;
}

export const profileApiPath = (client) => {
    return 'Profile';
}

export const profileOpenUserSessionApiPath = (client) => {
    return `Profile/OpenUserSession?client=${client}`;
}

export const getAllLocationsApiPath = (client, showID) => {
    return `/Shows/Locations/client/${client}/id/${showID}`;
}

export const listExtrasApiPath = (client) => {
    return `/SeatPrice/ListExtras/client/${client}`;
}

export const releaseOfferApiPath = (client) => {
    return `SeatPrice/releaseoffer`;
}

export const releaseExtraApiPath = (client) => {
    return `SeatPrice/ReleaseExtra`;
}

export const releaseExtrasApiPath = (client) => {
    return `SeatPrice/releaseExtras`;
}

export const postCheckOutApiPath = (client) => {
    return `Booking/PostCheckOut`;
};
export const postCheckOut3DApiPath = (client) => {
    return `Booking/PostCheckOut_3D`;
};

export const postCheckOutStage1ApiPath = (client) => {
    return `Booking/PostCheckOutStage1`;
};

export const postCheckOutStage2ApiPath = (client) => {
    return `Booking/PostCheckOutStage2`;
};

export const offerSeatsApiPath = (client) => {
    return `SeatPrice/OfferSeats`;
}

export const offerExtrasApiPath = (client) => {
    return `SeatPrice/OfferExtras`;
}

export const getCheckOutApiPath = (client) => {
    return `Booking/GetCheckOut/client/${client}`;
}

export const confirmationApiPath = (client) => {
    return `Booking/Confirmation/client/${client}`;
}

export const holdSeatApiPath = (client) => {
    return `SeatPrice/HoldSeat/`;
}

export const savePatronAndMakeBookingExternalPaymentApiPath = (client) => {
    return `Booking/SavePatronAndMakeBookingExternalPayment`;
}

export const getPaypalClientTokenApiPath = (client) => {
    return `Booking/GetPaypalClientToken/client/${client}`;
}