/**
 * Class associated with Vivaticket seat selection rules.
 */
export class VTSeatRules {

	/**
	 * Constructor.
	 * @constructor
	 * @param {Object} badSeatCounts - Array of integers specific numbers of adjacent seats that are not permitted to be left available when a one or a set of seats are selected.
	 * @memberof VTSeatRules
	 */
	constructor(badSeatCounts, vue) {
        const seatRules = this;	

        seatRules.vue = vue;
		seatRules.badSeatCounts = badSeatCounts || [];
	}
	

	/**
	 * Determines the available seats before a specified, target seat.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The targeted seat.
	 * @param {Boolean} ignoreSelecetedSeats - If true, selected seats are ignored.
	 * @memberof VTSeatRules
	 * @return The seats in the run prior to the target seat that are available.
	 */
	seatsAvailableBefore(targetSeatRun, targetSeat, ignoreSelecetedSeats=false) {
		const seatRules = this;	
		
		let result = [];
		let targetSeatIndex = targetSeatRun.indexOf(targetSeat);
		if (targetSeatIndex > -1) {
			
			
			const allSeatsBeforeReversed = targetSeatRun.slice(0, targetSeatIndex).reverse();
			
			let resultReversed = [];
			allSeatsBeforeReversed.some((currentSeat) => {
				if(!currentSeat.available || (currentSeat.selected && !ignoreSelecetedSeats) ) {
					return true;
				}  
				else {
					resultReversed.push(currentSeat);
				}  
			});
			result = resultReversed.reverse();
		}
		return result;
	}
	

	/**
	 * Determines the number of available seats before a specified, target seat.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The targeted seat.
	 * @param {Boolean} ignoreSelecetedSeats - If true, selected seats are ignored.
	 * @memberof VTSeatRules
	 * @return The number of seats in the run prior to the target seat that are available.
	 */
	seatsAvailableBeforeCount(targetSeatRun, targetSeat, ignoreSelecetedSeats=false) {
		return this.seatsAvailableBefore(targetSeatRun, targetSeat, ignoreSelecetedSeats).length;
	}
	

	/**
	 * Determines the available seats after a specified, target seat.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The targeted seat.
	 * @param {Boolean} ignoreSelecetedSeats - If true, selected seats are ignored.
	 * @memberof VTSeatRules
	 * @return The seats in the run following to the target seat that are available.
	 */
	seatsAvailableAfter(targetSeatRun, targetSeat, ignoreSelecetedSeats=false) {
		const seatRules = this;	

		let result = [];	
		let targetSeatIndex = targetSeatRun.indexOf(targetSeat);
		if (targetSeatIndex > -1) {
			const allSeatsAfter = targetSeatRun.slice(targetSeatIndex + 1, targetSeatRun.length);
			allSeatsAfter.some((currentSeat) => {
				if(!currentSeat.available || (currentSeat.selected && !ignoreSelecetedSeats)) {
					return true;
				}  
				else {
					result.push(currentSeat);
				}  
			});
		}
		return result;
	}
	

	/**
	 * Determines the number of available seats after a specified, target seat.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The targeted seat.
	 * @param {Boolean} ignoreSelecetedSeats - If true, selected seats are ignored.
	 * @memberof VTSeatRules
	 * @return The number of seats in the run following to the target seat that are available.
	 */
	seatsAvailableAfterCount(targetSeatRun, targetSeat, ignoreSelecetedSeats=false) {
		return this.seatsAvailableAfter(targetSeatRun, targetSeat, ignoreSelecetedSeats).length;
	}
	

	/**
	 * String that can be displated to the use to indicate the number(s) of invalid, adjacent seats.
	 * @property
	 */	
	get badSeatNumbersString() {
		const seatRules = this;	
		
		let result = ""
		if (seatRules.badSeatCounts.length > 0) {
			if (seatRules.badSeatCounts.length == 1) {
				result = result + seatRules.badSeatCounts[0];
			} else {
				result = result + seatRules.badSeatCounts[0];
				for(let i = 1; i < seatRules.badSeatCounts.length; i++) {
					if (i == (seatRules.badSeatCounts.length - 1)) {
						result = result + " or ";						
					} else {
						result = result + ", ";
					}
					result = result + seatRules.badSeatCounts[i];
				}
			}
		}
		return result;
	}
	

	/**
	 * Tests whether making a single selection creates bad seats.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The seat targeted for selection.
	 * @param {Boolean} ignoreSelecetedSeats - If true, selected seats are ignored.
	 * @memberof VTSeatRules
	 * @return True if making the select would result in invalid seats adjacent to the target seat.
	 */
	badSeat(targetSeatRun, targetSeat, ignoreSelecetedSeats=false) {
		const seatRules = this;	
		
		let result = false;
		let availableSeatsBefore = seatRules.seatsAvailableBeforeCount(targetSeatRun, targetSeat,ignoreSelecetedSeats);
		let availableSeatsAfter = seatRules.seatsAvailableAfterCount(targetSeatRun, targetSeat, ignoreSelecetedSeats);
		if ( (seatRules.badSeatCounts.indexOf(availableSeatsBefore) > -1) || (seatRules.badSeatCounts.indexOf(availableSeatsAfter) > -1) ) {
			result = true;
		}
		return result;
	}
	

	/**
	 * Tests whether making a single selection creates bad seat before a target seat.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The seat targeted for selection.
	 * @param {Boolean} ignoreSelecetedSeats - If true, selected seats are ignored.
	 * @memberof VTSeatRules
	 * @return True if making the select would result in invalid seats before to the target seat.
	 */
	badSeatBefore(targetSeatRun, targetSeat, ignoreSelecetedSeats=false) {
		const seatRules = this;	
		
		let result = false;
		let availableSeatsBefore = seatRules.seatsAvailableBeforeCount(targetSeatRun, targetSeat, ignoreSelecetedSeats);
		if (seatRules.badSeatCounts.indexOf(availableSeatsBefore) > -1) {
			result = true;
		}
		return result;
	}
	

	/**
	 * Tests whether making a single selection creates bad seat after a target seat.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The seat targeted for selection.
	 * @param {Boolean} ignoreSelecetedSeats - If true, selected seats are ignored.
	 * @memberof VTSeatRules
	 * @return True if making the select would result in invalid seats after to the target seat.
	 */
	badSeatAfter(targetSeatRun, targetSeat, ignoreSelecetedSeats=false) {
		const seatRules = this;	
		
		let result = false;
		let availableSeatsAfter = seatRules.seatsAvailableAfterCount(targetSeatRun, targetSeat, ignoreSelecetedSeats);
		if (seatRules.badSeatCounts.indexOf(availableSeatsAfter) > -1) {
			result = true;
		}
		return result;
	}
	

	/**
	 * Tests whether a specified seat is a single seat, that is at the end of a row or with the seats both sides being either selected or unavailable.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The target seat.
	 * @param {Boolean} ignoreSelecetedSeats - If true, selected seats are ignored.
	 * @memberof VTSeatRules
	 * @return True if the seat is a single seat.
	 */
	isSingleSeat(targetSeatRun, targetSeat, ignoreSelecetedSeats=false) {
		const seatRules = this;	
		
		let result = false;
		
		let targetSeatIndex = targetSeatRun.indexOf(targetSeat);
		if (targetSeatIndex > -1) {
			let availableSeatsBefore = seatRules.seatsAvailableBeforeCount(targetSeatRun, targetSeat,ignoreSelecetedSeats);
			let availableSeatsAfter = seatRules.seatsAvailableAfterCount(targetSeatRun, targetSeat, ignoreSelecetedSeats);
			
			if (targetSeatIndex == 0) {
				if (availableSeatsAfter == 0) {
					result = true;
				}
			} else if (targetSeatIndex == (targetSeatRun.length - 1) ) {
				if (availableSeatsBefore == 0) {
					result = true;
				}				
			} else {
				if ( (availableSeatsAfter == 0) || (availableSeatsAfter == 0) ) {
					result = true;
				}
			}
		}
		return result;
	}
	

	/**
	 * Attempts to select up to a specified number of seats, ensuring that the selection(s) is(are) valid.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The seat targeted for selection.
	 * @param {Integer} seatsRemainingToSelectCount - The number of seats that remain to be selected.
	 * @param {Boolean} allowReselection - If true, altering of the selected seats is permitted.
	 * @memberof VTSeatRules
	 * @return An array with the IDs of the seats selected.
	 */
	selectMaximum(targetSeatRun, targetSeat, seatsRemainingToSelectCount, allowReselection=false) {
		const seatRules = this;	
		
		let selectedSeats = [];
        let targetSeatIndex = targetSeatRun.indexOf(targetSeat);

        let isBadSeatBefore = false;
        let isBadSeatAfter = false;

        let numberOfSeatsRequested = seatsRemainingToSelectCount;
		
		let ignoreSelecetedSeats = allowReselection;

		if (targetSeatIndex > -1) {
			//
			// Handle speacial cases of 0 and 1 seat left to select.
			//
			if (seatsRemainingToSelectCount > 0) {
				if (seatsRemainingToSelectCount == 1) {
					//
					// Handle special case of 1 seat to select.
					//
					if (!seatRules.badSeat(targetSeatRun, targetSeat)) {
						selectedSeats.push(targetSeat);
					}
				} else {
					let originalSelectedSeats = [];
					if (allowReselection) {
						targetSeatRun.some((currentSeat) => {
							if(currentSeat.selected) {
								originalSelectedSeats.push(currentSeat);
							}
						});
					}
					
					//
					// Set up the array seatsAvailableBefore, containing seats prior to the target, 
					// ordered by their offset from the target seat, which meet the following criteria:
					//  1) The seats are available and un-selected.
					//  2) The number is limited to seatsRemainingToSelectCount - 1 such that the returned array using these seats can contain the target set.
					//  3) The seat furthest seat from the target is not a bad seat.
					//
					const allSeatsBeforeReversed = targetSeatRun.slice(0, targetSeatIndex).reverse();
					let selectedSeatsBeforeCount = 0;
					allSeatsBeforeReversed.forEach(currentSeat => selectedSeatsBeforeCount += currentSeat.selected ? 1 : 0 );
					let temp = [];
					allSeatsBeforeReversed.some((currentSeat) => {
						if(!currentSeat.available || (currentSeat.selected && !allowReselection) || temp.length >= (seatsRemainingToSelectCount - 1)) {
							return true;
						}  
						else {
							temp.push(currentSeat);
						}  
					});
					temp = temp.reverse();
                    while ((temp.length > 0) && (seatRules.badSeatBefore(targetSeatRun, temp[0], ignoreSelecetedSeats))) {
                        isBadSeatBefore = true;
						temp.shift();
					}
					let seatsAvailableBefore = temp.reverse();
					//
					// Set up the array seatsAvailableAfter, containing seats after the target, 
					// which meet the following criteria:
					//  1) The seats are available and un-selected.
					//  2) The number is limited to seatsRemainingToSelectCount - 1 such that the returned array using these seats can contain the target set.
					//  3) The seat furthest seat from the target is not a bad seat.
					//
					let seatsAvailableAfter = [];	
					const allSeatsAfter = targetSeatRun.slice(targetSeatIndex + 1, targetSeatRun.length);
					let selectedSeatsAfterCount = 0;
					allSeatsAfter.forEach(currentSeat => selectedSeatsAfterCount += currentSeat.selected ? 1 : 0 );
					allSeatsAfter.some((currentSeat) => {
						if(!currentSeat.available || (currentSeat.selected && !allowReselection) || (seatsAvailableAfter.length >= (seatsRemainingToSelectCount - 1))) {
							return true;
						}  
						else {
							seatsAvailableAfter.push(currentSeat);
						}
					});
                    while ((seatRules.badSeatAfter(targetSeatRun, seatsAvailableAfter[seatsAvailableAfter.length - 1], ignoreSelecetedSeats)) && (seatsAvailableAfter.length > 0)) {
                        isBadSeatAfter = true;
						seatsAvailableAfter = seatsAvailableAfter.slice(0, seatsAvailableAfter.length - 1);
					}
					//
					// The run of seats from which the require run can be selected is the concatentation of:
					//	seatsAvailableBefore
					//  targetSeat
					//  seatsAvailableAfter
					// From this find the maximum run of up-to seatsRemainingToSelectCount seats that:
					//  1) Includes the target seat.
					//  2) Does not have invalid seats at its ends.
					//
					let candidates = seatsAvailableBefore.reverse();
					candidates = candidates.concat([targetSeat]);
					candidates = candidates.concat(seatsAvailableAfter);
					seatsRemainingToSelectCount = seatsRemainingToSelectCount <= candidates.length ? seatsRemainingToSelectCount : candidates.length;
					let seatsAvailableBeforeCount = seatsAvailableBefore.length + 1;

					while( (seatsRemainingToSelectCount >= 0) && (selectedSeats.length == 0) ){
						let maxOffset = candidates.length - 1;
						for(let offset = 0; offset < candidates.length; offset++) {
							let startSeat = candidates[offset];
                            if (!seatRules.badSeatBefore(targetSeatRun, startSeat,ignoreSelecetedSeats)) {
                                let endSeatIndex = offset + seatsRemainingToSelectCount - 1;
                                if (endSeatIndex <= candidates.length - 1) {
                                    let endSeat = candidates[endSeatIndex];
                                    if (!seatRules.badSeatAfter(targetSeatRun, endSeat, ignoreSelecetedSeats)) {
                                        selectedSeats = candidates.slice(offset, offset + seatsRemainingToSelectCount);
                                    }
                                    else {
                                        isBadSeatAfter = true;
                                    }
                                }
                            }
                            else {
                               // isBadSeatBefore = true;
                            }
							if (ignoreSelecetedSeats) {
								if (selectedSeatsAfterCount < selectedSeatsBeforeCount) {
									if (selectedSeats.length == seatsRemainingToSelectCount) {
										break;
									}
								} else {
									if (startSeat == targetSeat) {
										break;
									}									
								}
							} else {
								if (startSeat == targetSeat) {
									break;
								}
							}
						}
						if (selectedSeats.length == 0) {
							//
							// No result found; reduce seatsRemainingToSelectCount by 1.
							//
							seatsRemainingToSelectCount--;
							//
							// If required, remove elements from the start of the
							// array candidates so that the result will include the 
							// target seat.
							//
							if (seatsAvailableBeforeCount > (seatsRemainingToSelectCount - 1)) {
								seatsAvailableBeforeCount--;
								candidates.shift();
							}
						}
					}
				}
			}
		}
		//
		// Set up the result.
		//
		if (selectedSeats.length === 0) {
            return { error: seatRules.vue.$t('core.objects.vtSeatRules.prohibitedNumberSeatsError', { number: seatRules.badSeatNumbersString }) };
        }

        if (numberOfSeatsRequested !== selectedSeats.length) {
            if (isBadSeatBefore || isBadSeatAfter) {
                return { success: selectedSeats, message: seatRules.vue.$t('core.objects.vtSeatRules.prohibitedNumberSeatsError', { number: seatRules.badSeatNumbersString }) };
            }
        }

		return { success: selectedSeats };
	}
	

	/**
	 * Attempts to de-select a seat and if required by business rules, adjacenet seats.
	 * @function
	 * @param {Object} targetSeatRun - Array of seat objects in seat sequence order for the run that contains the seat to be selected.
	 * @param {Object} targetSeat - The seat targeted for selection.
	 * @param {Integer} totalSeatsRequireCount - The total number of seats required (selected by the user at the start of the flow).
	 * @memberof VTSeatRules
	 * @return An array with the IDs of the seats de-selected.
	 */
	deselectSeat(targetSeatRun, targetSeat, totalSeatsRequireCount) {
		const seatRules = this;	
		let deSelectedSeats = [];
		//
		// Initial, trivial implementation - always return the target seat.
		//
		deSelectedSeats.push(targetSeat);
		
		//
		// Set up the result.
		//
		if (deSelectedSeats.length === 0) {
            return { error: seatRules.vue.$t('core.objects.vtSeatRules.prohibitedNumberSeatsError', { number: seatRules.badSeatNumbersString }) };
		}
		return { success: deSelectedSeats };
		
	}
}