<template>
    <!-- Main Wrapper -->
    <div class="main">

        <!-- Header -->
        <appHeader></appHeader>
        <!-- / Header -->
       <div style = "background-color:black">
            <!--
             <button v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)" id ="button1" style="display: inline-block">
               {{entry.title}}
             </button>
              -->
               <select id="selectlanguage"  @change = "fetchLanguage"  style="width:auto;  margin-right:4px;  float:right" > 
                <option disabled value=''>Please select one</option>             
                <option   v-for="entry in languages" v-bind:value = "entry.language" > {{entry.title}}</option>
               </select>
        </div> 
       
        <!-- Current View  -->
        <router-view></router-view>
        <!-- / Current View -->
    </div>
    <!-- / Main Wrapper -->
</template>

<script>
// Dependencies
import Header from "./components/shared/Header/Header.vue";
import i18n from "../i18n-setup.js";
import serviceBus from './services/serviceBus';
export default {

    data() {

        return {
            isFirstLoad: true,            
        languages: [
            {  language: 'en', title: 'English' },
            {  language: 'sv', title: 'Swedish' },
            {  language: 'uz', title: 'SAMTest' }
        ],
        langshort : null  
        }
    },
    
    components: {
        appHeader: Header
    },
    
    beforeCreate() {
        // Initialise the sotre
        this.$store.dispatch("initialiseStore")
    },
    computed: { 
    },

    methods: {
    changeLocale: function(locale) {
        i18n.locale = locale;
    },
/*
  fetchLanguage: function ()  {  
                    
           var selectElement =  document.querySelector('select#selectlanguage');                       
           var  output = selectElement.value;                        
           return this.changeLocale(langacronym);           
      },
*/
      fetchLanguage: function ()  { 
           var langacro;
            serviceBus.$emit("languageoption", function (callback){
                if(callback.optionvalue)
                {
                   langacro = callback.optionvalue;
                }
                else{
                    console.log(callback.error);
                    return;
                }           
            });                    
           return this.changeLocale(langacro);         
      },

  }


}

</script>
