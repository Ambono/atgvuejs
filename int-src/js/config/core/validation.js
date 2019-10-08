/* Dependencies */ 
import { required, alpha, numeric, email, between, alphaNum, minLength, maxLength } from 'vuelidate/lib/validators'
import { cardValidate } from "../../core/helpers/validation/validation";
import { PhoneNumber } from "../../core/objects/PhoneNumber";
import { PostalCode } from "../../core/objects/PostalCode";
import { settings as appSettings } from "../config";

/* Additional Validators */ 
/**
 * Validation to allow for string, num & space or blank
 * @param {*} value 
 */
const alphaNumSpace = (value) => {
    return (value === "" || value === " ") ? true : RegExp(/^[#.0-9a-zA-Z\s,-]+$/).test(value);
};

/**
 * Validation to allow for string, num & space, apostrophe or blank
 * @param {*} value 
 */
const alphaNumSpaceApostrophe = (value) => {
    return (value === "" || value === " ") ? true : RegExp(/^[#.0-9a-zA-Z\s',-]+$/).test(value);
};

const isPhoneNumber = (value, vm) => { 
    
    let phoneNumber = new PhoneNumber(value, vm.phoneNumberCountry);
    return phoneNumber.isValidPhoneNumberForCountry;
}

const isValidPostCode = (value, vm) => {
    
    let postalCode = new PostalCode(value);    
    return postalCode.isValidForCountry(vm.country);
}

const isValidEmailAddress = (value) => {
    
    const valueLower = value.toLowerCase();
    const rfc2822EmailValidationRegEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    
    return (valueLower === "" || valueLower === " ") ? false : RegExp(rfc2822EmailValidationRegEx).test(valueLower);
}

const isValidDeliveryCountry = (value, vm) => {
    return (value === appSettings.core.defaultCountryCode);
}





/**
 * Validation Requirements
 */
const validation = {
    // Payment details
    payment: {
        paymentMethod: {
            required
        },
        cardName: {
            required,
            alphaNumSpaceApostrophe
        },
        cardNumber: {
            required,
            numeric, 
            cardValidate,
            minLength: minLength(12),
            maxLength: maxLength(19)
        },
        securityCode: {
            required,
            numeric,
            minLength: minLength(3),
            maxLength: maxLength(4)
        },
        edMonth: {
            required
        },
        edYear: {
            required
        },
    },
    
    // User Details
    user: {
        firstName: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(30)
        },
        lastName: {
            required, 
            minLength: minLength(2),
            maxLength: maxLength(35)
        },
        phoneNumber: {
            required,
            minLength: minLength(4),
            maxLength: maxLength(20),
            isPhoneNumber
        },
        emailAddress: {
            required,
            email,
            isValidEmailAddress
        },
        emailAddressConfirmation: {
            required,
            email
        },
    },

    // Address
    address: {
        addressLine1: {
            required,
            alphaNumSpaceApostrophe,
            maxLength: maxLength(50)
        },
        addressLine2: {
            alphaNumSpaceApostrophe,
            maxLength: maxLength(50)
        },
        townCity: {
            required,
            alphaNumSpaceApostrophe,
            maxLength: maxLength(30)
        },
        county: {
            alphaNumSpaceApostrophe,
            maxLength: maxLength(30)
        }, 
        postcode: {
            alphaNumSpace,
            isValidPostCode
        },
        country: {
            required
        },
    },
    
    // Delivery
    deliveryAddress: {
        country: {
            isValidDeliveryCountry
        },
    },
    
    // Delivery
    delivery: {
        deliveryMethod: {
            required
        }
    },

    // Insurance
    insurance: {
        ticketInsurance: {
           required
        }
    }
};

export default validation;