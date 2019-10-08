<template>
    <fieldset class="form__fieldset" v-if="formData.paymentMethod !== 'payPal'">
        <legend class="form__legend">{{$t('components.forms.modules.billingDetails.yourDetails')}}</legend>
        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="detailsFirstName" :class="{ invalid: vv.formData.details.firstName.$error }">{{$t('components.forms.modules.billingDetails.detailsFirstName')}}</label>

                <input type="text" name="firstName" id="detailsFirstName" class="form__input" required
                :class="{ invalid: vv.formData.details.firstName.$error }"
                v-model="formData.details.firstName"  @blur="vv.formData.details.firstName.$touch()">
                
                    <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.details.firstName.$error">
                    <small class="form__error-message">{{ $t('errorMessages.user.firstName.long') }}</small>
                </div>
                <!-- / Error Message -->

            </div>
            <!-- / Column -->
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="detailsLastName" :class="{ invalid: vv.formData.details.lastName.$error }">{{$t('components.forms.modules.billingDetails.detailsLastName')}}</label>
                
                <input type="text" name="lastName" id="detailsLastName" class="form__input" required
                :class="{ invalid: vv.formData.details.lastName.$error }" 
                v-model="formData.details.lastName" @blur="vv.formData.details.lastName.$touch()">
            
                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.details.lastName.$error">
                    <small class="form__error-message">{{ $t('errorMessages.user.lastName.long') }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->
        </div>
        <!-- / Rows -->
        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__select--countryDialcode">
                <label class="form__label" for="detailsPhoneNumber" :class="{ invalid: vv.formData.details.phoneNumber.$error }">{{$t('components.forms.modules.billingDetails.detailsPhoneNumber')}}</label>

                <select class="form__input" name="phoneNumberCountry"  v-model="formData.details.phoneNumberCountry">                    
                    <template v-for="(item, index) in countries">
                        <option :value="item.value" :key="index"> {{ item.value }} (+{{ item.dialCode }}) </option>
                    </template>
                </select>

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.details.phoneNumber.$error">
                    <small class="form__error-message">{{ $t('errorMessages.user.phoneNumber.long') }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->

            <!-- Column -->

            <div class="form__column form__input--phone">
                <label class="form__label" for="detailsPhoneNumber" :class="{ invalid: vv.formData.details.phoneNumber.$error }">&nbsp;&nbsp;&nbsp;&nbsp;</label>

                <input type="tel" name="phoneNumber" id="detailsPhoneNumber" class="form__input" required 
                :class="{ invalid: vv.formData.details.phoneNumber.$error }"
                v-model="formData.details.phoneNumber" @blur="vv.formData.details.phoneNumber.$touch()">
            </div>
            <!-- / Column -->
        </div>
        <!-- / Rows -->

        
        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="detailsEmailAddress" :class="{ invalid: vv.formData.details.emailAddress.$error }">{{$t('components.forms.modules.billingDetails.detailsEmailAddress')}}</label>

                <!-- Tool Tip -->
                <!--<a class="form__tool-tip" role="button" href="#"> ? </a>-->
                <!-- / Tool Tip -->

                <input type="email" name="emailAddress" id="detailsEmailAddress" class="form__input" required
                       :class="{ invalid: vv.formData.details.emailAddress.$error }"
                       v-model="formData.details.emailAddress" 
                       @blur="vv.formData.details.emailAddress.$touch()" 
                       @keyup="onEmailChanging" >

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.details.emailAddress.$error">
                    <small class="form__error-message">{{ $t('errorMessages.user.emailAddress.long') }}</small>
                </div>
                <!-- / Error Message -->

                <!-- Email Address Warning -->
                <div class="form__warning" v-if="enableEmailWarning" >
                    <small class="form__warning-text" v-html="enableEmailWarningText"></small>
                </div>
                <!-- / Email Address Warning -->

            </div>
            <!-- / Column -->
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="detailsEmailAddressVerify" :class="{ invalid: vv.formData.details.emailAddressConfirmation.$error }">{{$t('components.forms.modules.billingDetails.detailsEmailAddressVerify')}}</label>

                <input type="email" name="emailAddressConfirmation" id="detailsEmailAddressVerify" class="form__input" onpaste="return false;" required
                       :class="{ invalid: vv.formData.details.emailAddressConfirmation.$error }"
                       v-model="formData.details.emailAddressConfirmation" @blur="vv.formData.details.emailAddressConfirmation.$touch()">

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.details.emailAddressConfirmation.$error">
                    <small class="form__error-message">{{ $t('errorMessages.user.emailAddressConfirmation.long') }}</small>
                </div>
                <!-- / Error Message -->

            </div>
            <!-- / Column -->
        </div>
        <!-- / Rows -->

    </fieldset>
    <fieldset class="form__fieldset" v-else-if="formData.paymentMethod === 'payPal'">
        <legend class="form__legend">Your details</legend>
        <!-- Row -->
        <div class="form__row">
            
        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__select--countryDialcode">
                <label class="form__label" for="detailsPhoneNumber" :class="{ invalid: vv.formData.details.phoneNumber.$error }">{{$t('components.forms.modules.billingDetails.detailsPhoneNumber')}}</label>

                <select class="form__input" name="phoneNumberCountry"  v-model="formData.details.phoneNumberCountry">                    
                    <template v-for="(item, index) in countries">
                        <option :value="item.value" :key="index"> {{ item.value }} (+{{ item.dialCode }}) </option>
                    </template>
                </select>

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.details.phoneNumber.$error">
                    <small class="form__error-message">{{ $t('errorMessages.user.phoneNumber.long') }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->

            <!-- Column -->

            <div class="form__column form__input--phone">
                <label class="form__label" for="detailsPhoneNumber" :class="{ invalid: vv.formData.details.phoneNumber.$error }">&nbsp;&nbsp;&nbsp;&nbsp;</label>

                <input type="tel" name="phoneNumber" id="detailsPhoneNumber" class="form__input" required 
                :class="{ invalid: vv.formData.details.phoneNumber.$error }"
                v-model="formData.details.phoneNumber" @blur="vv.formData.details.phoneNumber.$touch()">
            </div>
            <!-- / Column -->
        </div>
        <!-- / Rows -->
        </div>
        <!-- / Rows -->
    </fieldset>
</template>

<script>
import { settings as appSettings } from "../../../../config/config";

export default {

    data() {
        return  {
            appSettings,
            isEmailInWarningList: false
        }
    },
    created() {
        this.formData.details.phoneNumberCountry = appSettings.core.defaultCountryCode;
    },
    methods: {
        onEmailChanging: function(event) {
            let address = this.formData.details.emailAddress.toLowerCase();
            const matchingEmailAddresses = appSettings.core.warningEmailAddresses.filter(x => address.indexOf(x) !== -1);
            this.isEmailInWarningList = matchingEmailAddresses.length > 0;
        }
    },
    computed: {
        countries() {
            return appSettings.config.countries;
        },
        enableEmailWarning() {
            return this.isEmailInWarningList;
        },
        enableEmailWarningText() {
            let result = "";
            if (appSettings.core.warningEmailAddresses.length > 0) {
                result += "\u2757 ";
                result += "Unfortunately, ";
                result += "<strong>";
                if (appSettings.core.warningEmailAddresses.length === 1) {
                    result += appSettings.core.warningEmailAddresses[0];
                } else {
                    for(var i = 0; i < appSettings.core.warningEmailAddresses.length; i++) {
                        if (i < (appSettings.core.warningEmailAddresses.length - 1)) {
                            if (i > 0) { 
                                result += ", ";
                            }
                        } else {
                            result += "</strong> and <strong>";
                        }
                        result += appSettings.core.warningEmailAddresses[i];
                    }
                }
                result += "</strong>";
                result += " email addresses, operated by the same provider, are currently blocking our emails (booking confirmation, e-tickets etc.) and we are in discussions with them trying to resolve the issue.";
                result += "<br />";
                result += "<br />";
                result += "Therefore, in the meantime, we recommend that you use an alternative email address, if possible.";
                result += "<br />";
                result += "<br />";
                result += "We apologise for the inconvenience that this may cause.";
            }
            return result
        },
    },
    props: ["vv", "formData"]
}
</script>
