/* Dependencies */
import { parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Class associated with phone numbers.
 */
export class PhoneNumber {

	/**
	 * Constructor.
	 * @constructor
	 * @param {String} value - The raw phone number.
	 * @param {String} iso3166_2CountryCode - The two character ISO 3166 code of the associated country.
	 * @memberof PhoneNumber
	 */
	constructor(value, iso3166_2CountryCode) {
		const phoneNumber = this;	
		phoneNumber.rawValue = value;
		phoneNumber.countryCode = iso3166_2CountryCode;
    }
	

	/**
	 * Property that indicates whether the phone number is valid.
	 * @property
	 * @memberof PhoneNumber
	 * @return True if the phone number is valid for the target country, false otherwise.
	 */
	get isValidPhoneNumberForCountry() {
        const phoneNumber = this;

        if (phoneNumber.rawValue === null || phoneNumber.countryCode === null || phoneNumber.rawValue === "" || phoneNumber.countryCode === "" ) {
            return false;
        }
    
        const phoneNumberObject = parsePhoneNumberFromString(phoneNumber.rawValue, phoneNumber.countryCode);
        if (typeof phoneNumberObject !== 'object' || phoneNumberObject === null) {
            return false;
        }
    
        return phoneNumberObject.isValid();
    }
	

	/**
	 * The international version of the number starting with '+' and the country code.
	 * @property
	 * @memberof PhoneNumber
	 * @return The international number.
	 */
	get internationalPhoneNumber() {
        const phoneNumber = this;

        if (phoneNumber.rawValue === null || phoneNumber.countryCode === null || phoneNumber.rawValue === "" || phoneNumber.countryCode === "" ) {
            return false;
        }
    
        const phoneNumberObject = parsePhoneNumberFromString(phoneNumber.rawValue, phoneNumber.countryCode);
        if (typeof phoneNumberObject !== 'object' || phoneNumberObject === null) {
            return false;
        }

        const validPhoneNumber = phoneNumberObject.isValid();

        if (validPhoneNumber === false) {
            Sentry.captureException(new Error("Invalid phone number " + phoneNumberObject.number));
        }

        return validPhoneNumber ? phoneNumberObject.number : '';
    }
}