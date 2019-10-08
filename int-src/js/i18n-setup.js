//i18n-setup.js
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import axios from 'axios';
import { settings as appSettings } from './config/config';

Vue.use(VueI18n);


 const e = document.querySelector("langselection");
 console.log("This is e: ", e);
 //const strLang= e.options[e.selectedIndex];  
if(e!=null){
    const strLang= e.options[e.selectedIndex];  
    console.log(strLang);
}
/*
if(appSettings.languageAcronym!=null)
{
   const  chosenlanguage = appSettings.languageAcronym.default;
    console.log(chosenlanguage);
}
*/
const loadedLanguages = ['en'];// our default language that is preloaded 

function setI18nLanguage(lang) {
    i18n.locale = lang;
    axios.defaults.headers.common['Accept-Language'] = lang;
    document.querySelector('html').setAttribute('lang', lang);
    return lang;
}

function loadLocaleMessages() {
    const locales = require.context('../lang', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    const messages = {};
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            const locale = matched[1];
            messages[locale] = locales(key);
        }
    });
    return messages;
}

//var myItem = sessionStorage.getItem(store.session.userSession.ecxId);
//console.log(myItem);
//defaultlang:"en",  
export default new VueI18n({
  //  sessionStorage.setItem(key, 'Value');
  //  let myItem = localStorage.getItem(key);

  locale: process.env.VUE_APP_I18N_LOCALE ||'uz',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  /*
 
  locale: process.env.VUE_APP_I18N_LOCALE || 'uz',//strLang
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
   */
    messages: loadLocaleMessages()
})

//export function loadLanguageAsync(lang) {
//    if (i18n.locale !== lang) {
//        if (!loadedLanguages.includes(lang)) {
//            return import(/* webpackChunkName: "lang-[request]" */ `@/lang/${lang}`).then(msgs => {
//                i18n.setLocaleMessage(lang, msgs.default)
//                loadedLanguages.push(lang)
//                return setI18nLanguage(lang)
//            })
//        }
//        return Promise.resolve(setI18nLanguage(lang))
//    }
//    return Promise.resolve(lang)
//}