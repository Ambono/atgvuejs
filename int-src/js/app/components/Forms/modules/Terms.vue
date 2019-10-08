<template>
    <!-- GDPR -->
    <fieldset class="form__fieldset">
        <legend class="form__legend sr-only">{{ $t('components.forms.modules.terms.form_legend-GDPR') }}</legend>
        
            <template v-for="(item, index) in gdprOptions">
            <!-- Row -->
            <div class="form__row" :key="index">
                <input type="checkbox" :id="item.name" :name="item.name" @change="gdprInteraction" :data-id="item.id">
                <label class="form__label" :for="item.name" :class="">{{ item.title }}.</label>
        </div>
        <!-- / Row -->
        </template>

        <!-- Row -->
        <div class="form__row" data-payment-method="{paymentMethod}">
            <button type="submit" role="submit" class="form__submit btn btn--icon" @click.prevent="validate">
                <!-- Icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="form__submit-icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#padlock"></use>
                </svg>
                <!-- /Icon -->
                {{(formData.paymentMethod !== "payPal") ? $t('components.forms.modules.terms.formDataPaymentMethod-standard') : $t('components.forms.modules.terms.formDataPaymentMethod-paypal')}}
            </button>
        </div>
        <!-- / Row -->                        
    </fieldset>
    <!-- / GDPR -->
</template>

<script>
import { settings as appSettings } from "../../../../config/config";

export default {
    data() {
        return  {
            appSettings
        }
    },
    methods: {
        // Bind the GDPR status to the form data in state
        gdprInteraction(event) {
            // Find the item in state
            const id = event.target.getAttribute("data-id");
            let target = this.gdprOptions.filter((item) => item.id == id);
            
            // Match input to state value
            if(target.length > 0) {
                target[0].checked = event.target.checked;
                
                if(event.target.checked) {
                    target[0].showError = false;
                }
            }
        }
    },
    props: ["vv", "formData", "gdprOptions", "validate"]
}
</script>
