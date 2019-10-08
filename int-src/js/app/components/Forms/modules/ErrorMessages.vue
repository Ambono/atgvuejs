<template>
    <!-- Error Messages -->
    <div class="validation-highlight">
        <!-- Warning -->
        <div class="validation-highlight__warning">
            <svg xmlns="http://www.w3.org/2000/svg" class="validation-highlight__warning-icon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#warning"></use>
            </svg>
        </div>
        <!-- / Warning Icon -->
        <!-- Issues -->
        <div class="validation-highlight__issues">
            <!-- Intro --> 
            <div class="validation-highlight__intro">
                <h4 class="validation-highlight__title">{{ t$('errorMessages.issues.validation-highlight__title')}}</h4>
                <p class="validation-highlight__text">{{ t$('errorMessages.issues.validation-highlight__text')}}</p>
            </div>
            <!-- / Intro -->
            <!-- List of issues -->
            <ul class="validation-highlight__issues-list">
                <!-- API Error -->
                <li class="validation-highlight__issues-item" v-if="formError">
                    {{ formError }}
                </li>
                <!-- / API Error -->

                <li class="validation-highlight__issues-item" v-if="vv.formData.paymentMethod.$error">
                    {{ $t('errorMessages.payment.paymentMethod.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.details.firstName.$error">
                    {{$t('errorMessages.user.firstName.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.details.lastName.$error">
                    {{ $t('errorMessages.user.lastName.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.details.phoneNumber.$error">
                    {{ $t('errorMessages.user.phoneNumber.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.details.emailAddress.$error">
                    {{ $t('errorMessages.user.emailAddress.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.details.emailAddressConfirmation.$error">
                    {{ $t('errorMessages.user.emailAddressConfirmation.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.billing.addressLine1.$error">
                    {{ $t('errorMessages.billing.addressLine1') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.billing.addressLine2.$error">
                    {{ $t('errorMessages.billing.addressLine2') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.billing.townCity.$error">
                    {{ $t('errorMessages.billing.townCity') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.billing.county.$error">
                    {{ $t('errorMessages.billing.county') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.billing.postcode.$error">
                    {{ $t('errorMessages.billing.postCode') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.billing.country.$error">
                    {{ $t('errorMessages.billing.country') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.delivery.addressLine1.$error">
                    {{ $t('errorMessages.delivery.addressLine1') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.delivery.addressLine2.$error">
                    {{ $t('errorMessages.delivery.addressLine2') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.delivery.townCity.$error">
                    {{ $t('errorMessages.delivery.townCity') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.delivery.county.$error">
                    {{ $t('errorMessages.delivery.county') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.delivery.postcode.$error">
                    {{ $t('errorMessages.delivery.postcode') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.delivery.country.$error">
                    {{ $t('errorMessages.delivery.country') }}
                </li>
                <!-- <li class="validation-highlight__issues-item" v-if="vv.formData.ticketInsurance.$error">
                    {{ $t('errorMessages.insurance.ticketInsurance.short') }}
                </li> -->
                <li class="validation-highlight__issues-item" v-if="vv.formData.cardDetails.cardName.$error">
                    {{ $t('errorMessages.payment.cardName.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.cardDetails.cardNumber.$error">
                    {{ $t('errorMessages.payment.cardNumber.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.cardDetails.securityCode.$error">
                    {{ $t('errorMessages.payment.cardNumber.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.cardDetails.edMonth.$error">
                    {{ $t('errorMessages.payment.expiryMonth.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="vv.formData.cardDetails.edYear.$error">
                    {{ $t('errorMessages.payment.expiryYear.short') }}
                </li>
                <li class="validation-highlight__issues-item" v-if="gdprError">
                    {{ $t('errorMessages.gdpr.allTermsAndConditions') }}
                </li>
            </ul>
            <!-- / List of issues -->
        </div>
        <!-- / Issues -->
    </div>
    <!-- / Error Messages -->
</template>

<script>
    import { settings as appSettings } from "../../../../config/config";
    import {scrollTo} from "../../../../core/helpers/scrollTo";

export default {

    data() {
        return {
            appSettings
        }
    },

    props: ["vv", "showErrorHighlight", "gdprError"],

    computed: {
        // Computed property to return any checkout errors from the API.
        formError() {
            return this.$store.getters.getCheckoutFormError;
        }
        },

    mounted() {
        // Scroll the error component into view.
        scrollTo(this.$el);
    }
}
</script>
