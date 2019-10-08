<template>
<div v-if="!isMobile()">
    <!-- Product Card -->
    <div :class="['product-card product-card--' + item.options.layout]" v-if="item.prices[0]">
        <!-- Image -->
        <div class="product-card__image" :style="{ backgroundImage: `url(${ item.image })`}" v-if="item.image"></div>
        <!-- / Image -->
        <!-- Content -->
        <div class="product-card__content">
            <h3 class="product-card__title">{{ item.title }}</h3>
            <p class="product-card__desc">{{ item.description }}</p>
            <p class="product-card__price"><span class="product-card__price--large">{{ $t('components.productCards.productCard.product_card__price', {  price : item.prices[0].unit_price.toFixed(2)}) }}</span>{{ $t('components.productCards.productCard.perAdult')}}</p>
            <!-- Quantity Selector -->
            <div class="product-card__quantity">
                 <h4 class="product-card__quantity-title">{{$t('components.productCards.productCard.product_card__quantity-title')}}</h4>
                <!-- Selector -->
                <div class="product-card__quantity-select">
                    <button class="btn btn--medium product-card__btn" :aria-label="['Decrement the quantity for ' +  item.title + ' by 1, The current quantity is ' + item.quantity]" data-product-arrow-prev @click="decrement" :disabled="item.quantity === 0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="product-card__btn-icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-out"></use>
                        </svg>
                    </button>
                    <input type="text" name="numOfProduct" min="0" :max="item.options.maxQuantity" :aria-label="['Quantity for ' + item.title + ', current quantity is ' + item.quantity]" class="product-card__quantity-input" value="0" v-model="item.quantity" disabled>
                    <button class="btn btn--medium product-card__btn" :aria-label="['Increment the quantity for ' + item.title + ' by 1, The current quantity is ' + item.quantity]" data-product-arrow-next @click="increment" :disabled="item.quantity >= item.options.maxQuantity">
                        <svg xmlns="http://www.w3.org/2000/svg" class="product-card__btn-icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-in"></use>
                        </svg>
                    </button>
                </div>
                <!-- / Selector -->
            </div>
            <!-- / Quantity Selector -->
        </div>
        <!-- / Content -->
    </div>
    <!-- / Product Card -->
</div>
<div v-else>
 <div :class="['product-card product-card--' + item.options.layout]" v-if="item.prices[0] ">

        <!-- Image -->
        <div  class="product-card__image_ismobile" :style="{ backgroundImage: `url(${ item.image })`}" v-if="item.image ">
           <div class="product-card__content_ismobile">
         
             
          <p class="product-card__price"><span class="product-card__price--large">{{ $t('components.productCards.productCard.product_card__price', {  price : item.prices[0].unit_price.toFixed(2)}) }}</span>{{ $t('components.productCards.productCard.perAdult')}}</p>
                     <!-- Quantity Selector -->
            <div class="product-card__quantity">
              
                <!-- Selector -->
                <div class="product-card__quantity-select_ismobile">
                    
                    <button class="btn btn--medium product-card__btn_ismobile" :aria-label="['Decrement the quantity for ' +  item.title + ' by 1, The current quantity is ' + item.quantity]" data-product-arrow-prev @click="decrement" :disabled="item.quantity === 0">
                        <svg xmlns="http://www.w3.org/2000/svg" class="product-card__btn-icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-out"></use>
                        </svg>
                    </button>
                    <input type="text" name="numOfProduct" min="0" :max="item.options.maxQuantity" :aria-label="['Quantity for ' + item.title + ', current quantity is ' + item.quantity]" class="product-card__quantity-input_ismobile" value="0" v-model="item.quantity" disabled>
                    <button class="btn btn--medium product-card__btn_ismobile" :aria-label="['Increment the quantity for ' + item.title + ' by 1, The current quantity is ' + item.quantity]" data-product-arrow-next @click="increment" :disabled="item.quantity >= item.options.maxQuantity">
                        <svg xmlns="http://www.w3.org/2000/svg" class="product-card__btn-icon">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/images/sprites/sprites.svg#zoom-in"></use>
                        </svg>
                    </button>
                </div>
                <!-- / Selector -->
            </div>
            <!-- / Quantity Selector -->
        </div>
   
        </div>
        <!-- / Image -->
        <!-- Content -->
       
        <!-- / Content -->
    </div>
    <!-- / Product Card -->

</div>
</template>

<script>
/* Dependencies */
import serviceBus from "../../services/serviceBus";

export default {
    data() {
        return {
        }
    },

    props: ["item"],

    methods: {
        // Method used to increment the quantity
        increment() {
            // If the quantity is below the maximum
            if(this.item.quantity < this.item.options.maxQuantity) {
                // Increment
                this.item.quantity += 1;
                
                // Update the state
                this.updateState(this.item.quantity);
            }
        },
 
        // Method used to decrement the quantity
        decrement() {
            // If the quantity is more than 0
            if(this.item.quantity > 0) {
                // Decrement
                this.item.quantity -= 1;
                
                if(this.item.quantity === 0) {
                    serviceBus.$emit("removeExtra", this.item.id);
                }
                else {
                    // Update the state
                    this.updateState(this.item.quantity);
                }
            }
        },

        // Method used to update the basket state
        updateState(quantity) {
            // Ensure quantitiy is valid
            // More than the max then set to max
            // Less than 0 then set to 0
            (this.item.quantity > this.item.options.maxQuantity) ? this.item.quantity = this.item.options.maxQuantity : "";
            (this.item.quantity < 0) ? this.item.quantity = 0 : "";
                        
            // Update the items
            serviceBus.$emit("updateExtra", {
                item: this.item,
                quantity: this.item.quantity
            });
        },

          isMobile: function() {
    	var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
    }

    }
}
</script>
