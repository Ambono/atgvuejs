<template>
 <div>
    <transition name="modal">
      <div v-if="dialog">
        <div class="overlay" @click.self="dialog = false;">
         <div class="modal" aria-live="assertive" data-modal="" tabindex="0" style="opacity: 1;">
            <div class="modal__container" data-modal-container="" style="opacity: 1; transform: translateY(0px); padding: 20px;">
              <div class="modal__content" data-modal-content="">
                  <h4 class="ThreeDseucre-overlay__text">{{ $t('components.forms.checkoutForm.ThreeDseucre-overlay__text') }}</h4>
                   <iframe v-if="loaded" class="iframescroll__box"
                          :src="src" :srcdoc="src" name="myIframe" id="iframe"></iframe>
           
        </div>
        </div>
          </div>
        </div>
      </div>
    </transition>
    </div>

                          
</template>


<script>
import { settings as appSettings } from "../../../../config/config";
import vuetify from 'vuetify'

export default {
    data() {
        return  {
            appSettings,
            src: '',
            loaded: false,
            iframe: {
            src1: null,
            style: null,
            wrapperStyle: null,
            }
        }
    },
    methods: {
    
    },
    props: {
      dialog: {
        default: false
      },
      srcurl: {
        default: ''
      },
      ThreedCheckout:{
           default: ''
      }
  },

//    props: [ "ThreedCheckout"],

  mounted() {
      this.iframe.src1 = this.ThreedCheckout.htmlstring;
      var htmlstring="<!DOCTYPE html>"+this.ThreedCheckout.htmlstring;
      this.src=htmlstring;
      this.loaded = true;
    }

}
</script>