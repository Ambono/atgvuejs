import  i18n  from '../../i18n-setup';
/**
 * Error Messages
 */
const errorMessages = {
    // Payment Details  
   payment: {
    paymentMethod: {
        long: i18n.t('errorMessages.payment.paymentMethod.long'),
        short: i18n.t('errorMessages.payment.paymentMethod.short')
    },
    cardName: {
        long: i18n.t('errorMessages.payment.cardName.long'),
        short: i18n.t('errorMessages.payment.cardName.short')
    },  
    cardNumber: {
        long: i18n.t('errorMessages.payment.cardNumber.long'),
        short: i18n.t('errorMessages.payment.cardNumber.short')
    },
    securityCode: {
        long: i18n.t('errorMessages.payment.securityCode.long'),
        short: i18n.t('errorMessages.payment.securityCode.short')
    },
    expiryMonth: {
        long: i18n.t('errorMessages.payment.expiryMonth.long'),
        short: i18n.t('errorMessages.payment.expiryMonth.short')
    },
    expiryYear: {
        long: i18n.t('errorMessages.payment.expiryYear.long'),
        short: i18n.t('errorMessages.payment.expiryYear.short')
    }
},

// User Details
user: {
    firstName: {
        long: i18n.t('errorMessages.user.firstName.long'),
        short: i18n.t('errorMessages.user.firstName.short')
    },
    lastName: {
        long: i18n.t('errorMessages.user.lastName.long'),
        short: i18n.t('errorMessages.user.lastName.short')
    },
    phoneNumber: {
        long: i18n.t('errorMessages.user.phoneNumber.long'),
        short: i18n.t('errorMessages.user.phoneNumber.short')
    },
    emailAddress: {
        long: i18n.t('errorMessages.user.emailAddress.long'),
        short: i18n.t('errorMessages.user.emailAddress.short')
    },
    emailAddressConfirmation: {
        long: i18n.t('errorMessages.user.emailAddressConfirmation.long'),
        short: i18n.t('errorMessages.user.emailAddressConfirmation.short')
    }
},

// Address
address: {
    address: {
        long: i18n.t('errorMessages.address.address.long'),
        short: i18n.t('errorMessages.address.address.short')
    },
    townCity: { 
        long: i18n.t('errorMessages.address.townCity.long'),
        short: i18n.t('errorMessages.address.townCity.short')
    },
    countyState: {
        long: i18n.t('errorMessages.address.countyState.long'),
        short: i18n.t('errorMessages.address.countyState.short')
    },
    postcode: {
        long: i18n.t('errorMessages.address.postcode.long'),
        short: i18n.t('errorMessages.address.postcode.short')
    },
    country: {
        long: i18n.t('errorMessages.address.country.long'),
        short: i18n.t('errorMessages.address.country.short')
    }
},

// Delivery
deliveryAddress: {
    country: {
        long: i18n.t('errorMessages.deliveryAddress.country.long'),
        short: i18n.t('errorMessages.deliveryAddress.country.short')
    }
},

// Delivery
delivery: {
    deliveryMethod: {
        long: i18n.t('errorMessages.delivery.deliveryMethod.long'),
        short: i18n.t('errorMessages.delivery.deliveryMethod.short')
    }
},

// Insurance
insurance: {
    ticketInsurance: {
        long: i18n.t('errorMessages.insurance.ticketInsurance.long'),
        short: i18n.t('errorMessages.insurance.ticketInsurance.short')
    }
},

// GDPR
gdpr: {
    termsConditions: {
        long: i18n.t('errorMessages.gdpr.termsConditions.long'),
        short: i18n.t('errorMessages.gdpr.termsConditions.short')

    },
    ageConsent: {
        long: i18n.t('errorMessages.gdpr.ageConsent.long'),
        short: i18n.t('errorMessages.gdpr.ageConsent.short')
    }
}
};

export default errorMessages;