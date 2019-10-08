<template>
    <!-- Delivery -->
    <fieldset class="form__fieldset">
        <legend class="form__legend">{{$t('components.forms.modules.delivery.chooseDeliveryAddress')}}</legend>
        <template v-for="(item, index) in deliveryMethods">
            <!-- Row -->
            <div class="form__row" :key="index">
                <input type="radio" name="deliveryMethod" :id="'DM-' + item.id" class="form__radio" :value="item.value" @change="deliveryMethodSelect(item)" :data-id="item.id" :checked="parseInt(item.id) == parseInt(chosenDeliveryMethod.id)">
                <label class="form__label form__label--price" :for="'DM-' + item.id" :aria-label="$t('components.forms.modules.delivery.chooseDeliveryAddressAriaLabel', {description : item.description, price : item.price})">
                    <span v-html="item.description"></span>
                    <span class="form__price">{{ $t('components.forms.modules.delivery.price', { price : item.price.toFixed(2)}) }}</span>
                </label>
            </div>
            <!-- / Row -->
        </template>

        <!-- Optional Address -->
        <fieldset class="form__fieldset" v-if="deliveryAddressRequired">
            <legend class="form__legend">{{$t('components.forms.modules.delivery.deliveryAddress')}}</legend>
            <div class="form__row">
                <div class="form__column form__column--half">

                    <input type="checkbox" name="copyBillingaddress" id="copyaddress" class="form__checkbox" value="address" checked="checked" v-model="formData.copyBillingaddress" @change=deliveryAddressCopy()>
                    <label class="form__label" for="copyaddress" :aria-label="$t('components.forms.modules.delivery.deliveryAddressAriaLabel')" aria-role="checked">{{$t('components.forms.modules.delivery.copyAddress')}}</label>

                </div>
            </div>
            <!-- Row -->
            <div class="form__row">
                <!-- Column -->
                <div class="form__column form__column--half">
                    <label class="form__label" for="deliveryAddressLine1" :class="{ invalid: vv.formData.delivery.addressLine1.$error }">{{$t('components.forms.modules.delivery.addressLine1')}}</label>

                    <input type="text" name="addressLine1" id="deliveryAddressLine1" class="form__input" required
                           :class="{ invalid: vv.formData.delivery.addressLine1.$error }"
                           v-model="formData.delivery.addressLine1" @blur="vv.formData.delivery.addressLine1.$touch()">

                    <!-- Error Message -->
                    <div class="form__error" v-if="vv.formData.delivery.addressLine1.$error">
                        <small class="form__error-message">{{ appSettings.config.errorMessages.address.address.long }}</small>
                    </div>
                    <!-- / Error Message -->
                </div>
                <!-- / Column -->
                <!-- Column -->
                <div class="form__column form__column--half">
                    <label class="form__label" for="deliveryAddressLine2" :class="{ invalid: vv.formData.delivery.addressLine2.$error }">{{$t('components.forms.modules.delivery.addressLine2')}}</label>

                    <input type="text" name="addressLine2" id="deliveryAddressLine2" class="form__input" required
                           :class="{ invalid: vv.formData.delivery.addressLine2.$error }"
                           v-model="formData.delivery.addressLine2" @blur="vv.formData.delivery.addressLine2.$touch()">

                    <!-- Error Message -->
                    <div class="form__error" v-if="vv.formData.delivery.addressLine2.$error">
                        <small class="form__error-message">{{ appSettings.config.errorMessages.address.address.long }}</small>
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
                    <label class="form__label" for="deliveryTownCity" :class="{ invalid: vv.formData.delivery.townCity.$error }">{{$t('components.forms.modules.delivery.townCity')}}</label>

                    <input type="text" name="townCity" id="deliveryTownCity" class="form__input" required
                           :class="{ invalid: vv.formData.delivery.townCity.$error }"
                           v-model="formData.delivery.townCity" @blur="vv.formData.delivery.townCity.$touch()">

                    <!-- Error Message -->
                    <div class="form__error" v-if="vv.formData.delivery.townCity.$error">
                        <small class="form__error-message">{{ appSettings.config.errorMessages.address.townCity.long }}</small>
                    </div>
                    <!-- / Error Message -->
                </div>
                <!-- / Column -->
                <!-- Column -->
                <div class="form__column form__column--half">
                    <label class="form__label" for="deliveryCountyState" :class="{ invalid: vv.formData.delivery.county.$error }">{{$t('components.forms.modules.delivery.county')}}</label>

                    <input type="text" name="countyState" id="deliveryCountyState" class="form__input"
                           :class="{ invalid: vv.formData.delivery.county.$error }"
                           v-model="formData.delivery.county" @blur="vv.formData.delivery.county.$touch()">

                    <!-- Error Message -->
                    <div class="form__error" v-if="vv.formData.delivery.county.$error">
                        <small class="form__error-message">{{ appSettings.config.errorMessages.address.countyState.long }}</small>
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
                    <label class="form__label" for="deliveryCountry" :class="{ invalid: vv.formData.delivery.country.$error }">{{$t('components.forms.modules.delivery.country')}}</label>

                    <select name="country" id="deliveryCountry" class="form__select"
                            :class="{ invalid: vv.formData.delivery.country.$error }"
                            v-model="formData.delivery.country" @blur="vv.formData.delivery.country.$touch()">
                        <template v-for="(item, index) in countries">
                            <option :value="item.value" :key="index"> {{ item.label }} </option>
                        </template>
                    </select>

                    <!-- Error Message -->
                    <div class="form__error" v-if="vv.formData.delivery.country.$error">
                        <small class="form__error-message">{{ appSettings.config.errorMessages.deliveryAddress.country.long }}</small>
                    </div>
                    <!-- / Error Message -->
                </div>
                <!-- / Column -->
                <!-- Column -->
                <div class="form__column form__column--half">
                    <label class="form__label" for="deliveryPostCode" :class="{ invalid: vv.formData.delivery.postcode.$error }">{{$t('components.forms.modules.delivery.postCode')}}</label>

                    <input type="text" name="postCode" id="deliveryPostCode" class="form__input" required
                           :class="{ invalid: vv.formData.delivery.postcode.$error }"
                           v-model="formData.delivery.postcode" @blur="vv.formData.delivery.postcode.$touch()">

                    <!-- Error Message -->
                    <div class="form__error" v-if="vv.formData.delivery.postcode.$error">
                        <small class="form__error-message">{{ appSettings.config.errorMessages.address.postcode.long }}</small>
                    </div>
                    <!-- / Error Message -->
                </div>
                <!-- / Column -->
            </div>
            <!-- / Rows -->
        </fieldset>
        <!-- / Optional Address -->

    </fieldset>
    <!-- / Delivery -->
</template>

<script>
import { settings as appSettings } from "../../../../config/config";
import serviceBus from '../../../services/serviceBus';

export default {
    data() {
        return  {
            appSettings
        }
    },
    created() {
        this.formData.delivery.country = appSettings.core.defaultCountryCode;
    },
    computed: {
        countries() {
            return appSettings.config.countries;
        },
        deliveryMethods() {
            return this.$store.getters.getCheckoutDeliveryMethods;
        },
        chosenDeliveryMethod() {
            return this.$store.getters.getBasketDeliveryMethod;
        },
        deliveryAddressRequired() {
            let deliveryMethod = this.$store.getters.getBasketDeliveryMethod;
            return deliveryMethod && ((deliveryMethod.delivery_address_required === true && appSettings.core.enableSeperateDeliveryAddress) && this.formData.paymentMethod !== 'payPal');
        }
    },
    methods: {
        deliveryMethodSelect(item) {
            let originalDelivery = this.$store.getters.getBasketDeliveryMethod;
            serviceBus.$emit("basketSetDeliveryMethod", { item });
            if ( (originalDelivery.value === 'M') && (item.value !== 'M') ) {
                this.formData.delivery.country = appSettings.core.defaultCountryCode;
            } else if ( (originalDelivery.value !== 'M') && (item.value === 'M') )  {
                this.formData.copyBillingaddress = false;
            }
        },
       deliveryAddressCopy(){
        if(this.formData.copyBillingaddress && this.$store.getters.getBasketDeliveryMethod.value === 'M')
        {
            this.formData.delivery.addressLine1=this.formData.billing.addressLine1;
            this.formData.delivery.addressLine2=this.formData.billing.addressLine2;
            this.formData.delivery.townCity=this.formData.billing.townCity;
            this.formData.delivery.countyState=this.formData.billing.countyState;
            this.formData.delivery.postcode=this.formData.billing.postcode;
            this.formData.delivery.country=this.formData.billing.country;
        }
    }

    },
    props: ["vv", "formData"]
}
</script>
