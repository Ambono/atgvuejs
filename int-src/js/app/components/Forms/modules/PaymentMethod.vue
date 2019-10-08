<template>
    <!-- Method -->
    <fieldset class="form__fieldset">
        <legend class="form__legend" :class="{ invalid: vv.formData.paymentMethod.$error }">{{ $t('components.forms.modules.paymentMethod.paymentMethodLegend')}}</legend>
        <!-- Row -->
        <div class="form__row">
            <input type="radio" name="paymentMethod" id="methodCreditDebit" class="form__radio" checked="checked" value="creditDebit" v-model="formData.paymentMethod" @change="resetFormValidation">
            <label class="form__label" for="methodCreditDebit" :aria-label="$t('components.forms.modules.paymentMethod.methodCreditDebitAriaLabel')" aria-role="radio" aria-checked="checked">{{ $t('components.forms.modules.paymentMethod.methodCreditDebit')}}</label>
        </div>
        <!-- / Row -->
        <!-- Row -->
        <div class="form__row">
            <input type="radio" name="paymentMethod" id="methodPayPal" class="form__radio" value="payPal" v-model="formData.paymentMethod"  @change="resetFormValidation">
            <label class="form__label" for="methodPayPal" :aria-label="$t('components.forms.modules.paymentMethod.methodPaypalAriaLabel')" aria-role="radio" aria-checked="false">{{ $t('components.forms.modules.paymentMethod.methodPaypal')}}</label>
        </div>
        <!-- / Row -->

        <!-- Error Message -->
        <div class="form__error" v-if="vv.formData.paymentMethod.$error">
            <small class="form__error-message">{{ appSettings.config.errorMessages.payment.paymentMethod.long }}</small>
        </div>
        <!-- / Error Message -->

    </fieldset>
    <!-- / Method -->
</template>

<script>
import { settings as appSettings } from "../../../../config/config";

export default {
    props:["vv", "formData", "resetFormValidation"]
}
</script>
