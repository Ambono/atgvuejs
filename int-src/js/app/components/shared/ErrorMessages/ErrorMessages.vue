<template>
    <!-- Error Messages -->
    <div class="error-messages">
        <h3 class="error-messages__title">{{$t('components.shared.errorMessages.errorMessages.error-messages__title')}}</h3>
        <ul class="error-messages__list">
            <li class="error-messages__list-item" v-for="(error, index) in errors" :key="index + 'error'">
                {{error}}
            </li>
        </ul>
    </div>
    <!-- / Error Messages -->
</template>

<script>
import {scrollTo} from "../../../../core/helpers/scrollTo";

export default {
    props: ["errors"],
    
    mounted() {
        // Scroll the error component into view.
        scrollTo(this.$el);
    }
}
</script>
