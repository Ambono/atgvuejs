/**
 * Class associated with postal codes.
 */
export class PostalCode {

	/**
	 * Constructor.
	 * @constructor
	 * @param {String} value - The raw postal code.
	 * @memberof PostalCode
	 */
    constructor(value) {
        const postalCode = this;
        postalCode.rawValue = value;
    }


	/**
	 * Tests whether the postal code is valid for a specified country.
	 * @function
	 * @param {String} iso3166_2CountryCode - The two character ISO 3166 code of the target country.
	 * @memberof PostalCode
	 * @return True if the post code is valid for the target country, false otherwise.
	 */
    isValidForCountry(iso3166_2CountryCode) {
        const postalCode = this;
        
        if (typeof iso3166_2CountryCode !== 'string' || iso3166_2CountryCode === '' || typeof postalCode.rawValue !== 'string' || postalCode === '') {
            return false;
        }

        if (iso3166_2CountryCode === "GB") {
            return RegExp('^([A-Za-z]{1,2}[0-9]{1,2}[A-Za-z]?[ ]?)([0-9]{1}[A-Za-z]{2})$').test(postalCode.rawValue);
        }
        else
        {
            return RegExp('^([A-Za-z0-9 ]+)$').test(postalCode.rawValue);
        }
    }
}