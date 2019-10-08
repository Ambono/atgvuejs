/* Depenedencies */ 
import { Modal } from "../../objects/Modal";
import { sessionExpiredContent } from "../../helpers/modal/modal";
import { settings as appSettings } from "../../../config/config";
import  i18n  from '../../../i18n-setup'; 

export const sessionTimeout = (element, instance) => {
    console.log("FIRED");

    var desc =  document.querySelector("[session-expired-desc]");
    var title =  document.querySelector("[user-message__info-title]");
    var buttontext =  document.querySelector("[btn-btn--keyline]");
    desc.innerHTML = i18n.t('modals.session.sessionexpireddesc');
    title.innerHTML = i18n.t('modals.session.usermessageinfotitle') ;
    buttontext.innerHTML = i18n.t('modals.session.sessionexpireddescbutton') ;   

    
    // Create a new modal
    const modal = new Modal(element, {
        contentEvents: sessionExpiredContent
    });

    // return the modal
    return modal;

};