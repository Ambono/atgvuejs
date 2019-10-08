<template>
    <div>
        <h1>{{ $t('views.error.error') }}</h1>
        <p>{{errorMessage}}</p>
        <router-link to="/book/LK2018">{{ $t('views.error.goToEvent') }}</router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            errorMessage: ""
        }
    },

    props: ["type"],

    created() {
        // Define message
        switch (this.type) {
            case "404":
                this.errorMessage = this.$t('views.error.404');
                break;
        
            case "EventInfoInvalid":
                this.errorMessage = this.$t('views.error.eventInfoInvalid');
                break;

            default:
                break;
        }
    }
}
</script>
