<template>
    <!-- Insurance -->
    <fieldset class="form__fieldset">
        <legend class="form__legend" :class="{ invalid: vv.formData.ticketInsurance.$error }">{{ $t('components.forms.modules.ticketInsurance.form__legend')}}</legend>

        <!-- Row -->
        <div class="form__row">
            <!-- Information -->
            <div class="form__information">
                <p class="form__information-text">{{ $t('components.forms.modules.ticketInsurance.form__information-text')}}</p>
                <ul class="icon-list">
                    <li class="icon-list__item">{{ $t('components.forms.modules.ticketInsurance.icon-list__item-transitDelay')}}</li>
                    <li class="icon-list__item">{{ $t('components.forms.modules.ticketInsurance.icon-list__item-accident')}}</li>
                    <li class="icon-list__item">{{ $t('components.forms.modules.ticketInsurance.icon-list__item-strikes')}}</li>
                    <li class="icon-list__item">{{ $t('components.forms.modules.ticketInsurance.icon-list__item-flood')}}</li>
                    <li class="icon-list__item no-icon"><a href="#" :aria-label="$t('components.forms.modules.ticketInsurance.icon-list__item-LearnMore-aria-label')">{{ $t('components.forms.modules.ticketInsurance.icon-list__item-LearnMore')}}</a></li>
                    
                </ul>
            </div>
            <!-- / Information -->
        </div>
        <!-- / Row -->

        <template v-for="(item, index) in insuranceTypes">
            <!-- Row -->
            <div class="form__row" :key="index">
                <input type="radio" name="ticketProtection" :id="item.name" class="form__radio" :value="item.name" v-model="formData.ticketInsurance" @change="insuranceSelect" :data-id="item.id">
                <label class="form__label form__label--price" :for="item.name" :aria-label="$t('components.forms.modules.ticketInsurance.form__label form__label--price', {title : item.title, price : item.price.toFixed(2)})" aria-role="radio" aria-checked="false">
                    <span v-html="item.title"></span>
                    <span class="form__price">{{ $t('components.forms.modules.ticketInsurance.form__price', {  price : item.price.toFixed(2)}) }}</span></label>
            </div>
            <!-- / Row -->
        </template>

        <!-- Error Message -->
        <div class="form__error" v-if="vv.formData.ticketInsurance.$error">
            <small class="form__error-message">{{ appSettings.config.errorMessages.insurance.ticketInsurance.long }}</small>
        </div>
        <!-- / Error Message -->
    </fieldset>
    <!-- / Insurance -->
</template>

<script>
import { settings as appSettings } from "../../../../config/config";
import { formOptions } from "../../../../config/checkout/checkout";
import serviceBus from '../../../services/serviceBus';

export default {
    data() {
        return  {
            appSettings,
            insuranceTypes: formOptions.ticketInsuranceTypes,
        }
    },
    methods: {
        // Handle method of insurance selected
        insuranceSelect(event) {
            // find the item value in dom
            const id = event.target.getAttribute("data-id");
            const target = this.$data.insuranceTypes.filter((item) => item.id == id);
            
            // Update state to match
            if(target.length > 0) {
                serviceBus.$emit("basketSetTicketInsurance", { item: target[0] });
            }
        }
    },
    props: ["vv", "formData"]
}
</script>
