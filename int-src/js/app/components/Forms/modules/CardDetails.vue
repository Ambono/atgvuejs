<template>
    <!-- Card Details -->
    <fieldset class="form__fieldset" v-if="formData.paymentMethod !== 'payPal'">
        <legend class="form__legend">{{$t('components.forms.modules.cardDetails.legendCardDetails')}}</legend>

        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="cardName" :class="{ invalid: vv.formData.cardDetails.cardName.$error }">{{$t('components.forms.modules.cardDetails.cardName')}}</label>
                
                <input type="text" name="cardName" id="cdCardName" class="form__input" required 
                :class="{ invalid: vv.formData.cardDetails.cardName.$error }"
                v-model="formData.cardDetails.cardName" @blur="vv.formData.cardDetails.cardName.$touch()">

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.cardDetails.cardName.$error">
                    <small class="form__error-message">{{ appSettings.config.errorMessages.payment.cardName.long }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->
        </div>
        <!-- / Row -->

        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="cdCardNumber" :class="{ invalid: vv.formData.cardDetails.cardNumber.$error }">{{$t('components.forms.modules.cardDetails.cardNumber')}}</label>
                
                <input type="num" name="cardNumber" id="cdCardNumber" class="form__input" required 
                :class="{ invalid: vv.formData.cardDetails.cardNumber.$error }"
                v-model="formData.cardDetails.cardNumber" @blur="vv.formData.cardDetails.cardNumber.$touch()">

                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.cardDetails.cardNumber.$error">
                    <small class="form__error-message">{{ appSettings.config.errorMessages.payment.cardNumber.long }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->

            <!-- Column -->
            <div class="form__column form__column--half">
                <label class="form__label" for="cdSecurityCode" aria-role="radio" aria-checked="false" :class="{ invalid: vv.formData.cardDetails.securityCode.$error }">{{$t('components.forms.modules.cardDetails.securityCode')}}</label>                                
                
                <input type="num" name="cardNumber" id="cdSecurityCode" class="form__input form__input--small" required 
                :class="{ invalid: vv.formData.cardDetails.securityCode.$error }"
                v-model="formData.cardDetails.securityCode" @blur="vv.formData.cardDetails.securityCode.$touch()">
                
                <!-- Error Message -->
                <div class="form__error" v-if="vv.formData.cardDetails.securityCode.$error">
                    <small class="form__error-message">{{ appSettings.config.errorMessages.payment.securityCode.long }}</small>
                </div>
                <!-- / Error Message -->
            </div>
            <!-- / Column -->
        </div>
        <!-- / Row -->

        <!-- Row -->
        <div class="form__row">
            <!-- Column -->
            <div class="form__column form__column--half">
                <fieldset class="form__fieldset" >
                    <legend class="form__legend form__legend--label" :class="{ invalid: invalidCCDate }">{{$t('components.forms.modules.cardDetails.expiryDate')}}</legend>

                    <!-- Row --> 
                    <div class="form__row form__row--spaced">
                        <!-- Column --> 
                        <div class="form__column form__column--half">
                            <label class="form__label sr-only" for="cdMonth" aria-label="Card expiry month.">{{$t('components.forms.modules.cardDetails.cardExpiryMonth')}}</label>
                            
                            <select name="cdMonth" id="cdMonth" class="form__select" 
                            v-model="formData.cardDetails.edMonth" 
                            :class="{ invalid: vv.formData.cardDetails.edMonth.$error }">
                                <template v-for="(item, index) in cardMonths">                                    
                                    <option :value="item.id" :key="index">{{ item.text }}</option>
                                </template>
                            </select>

                            <!-- Error Message -->
                            <div class="form__error" v-if="vv.formData.cardDetails.edMonth.$error">
                                <small class="form__error-message">{{ appSettings.config.errorMessages.payment.expiryMonth.long }}</small>
                            </div>
                            <!-- / Error Message -->
                        </div>
                        <!-- / Column -->
                        <!-- Column -->
                        <div class="form__column form__column--half">
                            <label class="form__label sr-only" for="cdYear" aria-label="Card expiry year.">{{$t('components.forms.modules.cardDetails.cardExpiryYear')}}</label>                                    
                            
                            <select name="cdYear" id="cdYear" class="form__select" 
                            v-model="formData.cardDetails.edYear" @change="vv.formData.cardDetails.edYear.$touch()"
                            :class="{ invalid: vv.formData.cardDetails.edYear.$error }">
                                <template v-for="(item, index) in cardYears">                                    
                                    <option :value="item.id" :key="index">{{ item.value }}</option>
                                </template>
                            </select>

                            <!-- Error Message -->
                            <div class="form__error" v-if="vv.formData.cardDetails.edYear.$error">
                                <small class="form__error-message">{{ appSettings.config.errorMessages.payment.expiryYear.long }}</small>
                            </div>
                            <!-- / Error Message -->
                        </div>
                        <!-- / Column -->
                    </div>
                    <!-- / Row -->

                </fieldset>
            </div>
            <!-- / Column -->
        </div>
        <!-- / Row -->
    
    </fieldset>
    <!-- / Card Details -->
</template>

<script>
import { settings as appSettings } from "../../../../config/config";

export default {
    data() {
        return  {
            appSettings
        }
    },
    computed: {
        // Computed property to track if the Credit card month or year is invalid.
        invalidCCDate() {
            return (this.vv.formData.cardDetails.edMonth.$error || this.vv.formData.cardDetails.edYear.$error);
        },

        // Computed property to allow usage of config expiry years.
        cardYears() {
            return appSettings.config.expiryYears();
        },

        // Computed property to allow usage of config expiry months. 
        cardMonths() {
            return appSettings.config.expiryMonths;
        }

    },
    props: ["vv", "formData"]
}
</script>
