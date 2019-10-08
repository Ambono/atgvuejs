<template>
    <!-- Billing Address -->
    <fieldset class="form__fieldset" v-if="formData.paymentMethod !== 'payPal'">
        <legend class="form__legend">{{ $t('components.forms.modules.billingAddress.formLegend') }}</legend>
        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="billingAddressLine1" :class="{ invalid: vv.formData.billing.addressLine1.$error }">{{ $t('components.forms.modules.billingAddress.billingAddressLine1') }}</label>
                
                <input type="text" name="addressLine1" id="billingAddressLine1" class="form__input" required 
                :class="{ invalid: vv.formData.billing.addressLine1.$error }"
                v-model="formData.billing.addressLine1" @blur="vv.formData.billing.addressLine1.$touch()">

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.billing.addressLine1.$error">
                    <small class="form__error-message">{{ $t('errorMessages.address.address.long') }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="billingAddressLine2" :class="{ invalid: vv.formData.billing.addressLine2.$error }">{{ $t('components.forms.modules.billingAddress.billingAddressLine2') }}</label>
                
                <input type="text" name="addressLine2" id="billingAddressLine2" class="form__input" required 
                :class="{ invalid: vv.formData.billing.addressLine2.$error }"
                v-model="formData.billing.addressLine2" @blur="vv.formData.billing.addressLine2.$touch()">

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.billing.addressLine2.$error">
                    <small class="form__error-message">{{ $t('errorMessages.address.address.long') }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->
        </div>
        <!-- / Rows -->
        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="billingTownCity" :class="{ invalid: vv.formData.billing.townCity.$error }">{{ $t('components.forms.modules.billingAddress.billingTownCity') }}</label>
                
                <input type="text" name="townCity" id="billingTownCity" class="form__input" required 
                :class="{ invalid: vv.formData.billing.townCity.$error }"
                v-model="formData.billing.townCity" @blur="vv.formData.billing.townCity.$touch()">

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.billing.townCity.$error">
                    <small class="form__error-message">{{ $t('errorMessages.address.townCity.long') }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="billingCountyState" :class="{ invalid: vv.formData.billing.county.$error }">{{ $t('components.forms.modules.billingAddress.billingCountyState') }}</label>
                
                <input type="text" name="countyState" id="billingCountyState" class="form__input" 
                :class="{ invalid: vv.formData.billing.county.$error }"
                v-model="formData.billing.county" @blur="vv.formData.billing.county.$touch()">

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.billing.county.$error">
                    <small class="form__error-message">{{ $t('errorMessages.address.countyState.long') }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->
        </div>
        <!-- / Rows -->
        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="billingCountry" :class="{ invalid: vv.formData.billing.country.$error }">{{ $t('components.forms.modules.billingAddress.billingCountry') }}</label>
                
                <select name="country" id="billingCountry" class="form__select" 
                :class="{ invalid: vv.formData.billing.country.$error }"
                v-model="formData.billing.country">
                <template v-for="(item, index) in countries">
                    <option :value="item.value" :key="index"> {{ item.label }} </option>
                </template>
                </select>

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.billing.country.$error">
                    <small class="form__error-message">{{ $t('errorMessages.address.country.long') }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="billingPostCode" :class="{ invalid: vv.formData.billing.postcode.$error }">{{ $t('components.forms.modules.billingAddress.billingPostCode') }}</label>
                
                <input type="text" name="postCode" id="billingPostCode" class="form__input" required 
                :class="{ invalid: vv.formData.billing.postcode.$error }"
                v-model="formData.billing.postcode" @blur="vv.formData.billing.postcode.$touch()">

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.billing.postcode.$error">
                    <small class="form__error-message">{{ $t('errorMessages.address.postcode.long') }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->
        </div>
        <!-- / Rows -->
    </fieldset>
    <!-- / Billing Address -->
</template>

<script>
import { settings as appSettings } from "../../../../config/config";

export default {
    data() {
        return  {
            appSettings
        }
    },
    created() {
        this.formData.billing.country = appSettings.core.defaultCountryCode;
    },
    computed: {
        // Computed property to allow usage of config countries.
        countries() {
            return appSettings.config.countries;
        },
    },
    props: ["vv", "formData"]
}
</script>
