/* Dependencies */
import CryptoJS from "crypto-js";
import { settings as appSettings } from "../../config/config";
import store from "../../app/store/store";

/**
 * Class associated with phone numbers.
 */
export class Encrypt {

	/**
	 * Constructor.
	 * @constructor
	 * @param {String} Text - The raw Text.
	 * @memberof Encrypt
	 */
	constructor(Text) {
		const Encrypt = this;	
        Encrypt.rawValue = Text;
        var sessiondata= store.getters.getSession;
        Encrypt.ecxToken=sessiondata.ecxToken.toString().substring(0,16);
    }
	

	get Encryptedvalue() {
        const Encrypt = this;
        let srcs = CryptoJS.enc.Utf8.parse(Encrypt.rawValue);
        const key=CryptoJS.enc.Utf8.parse(Encrypt.ecxToken);
        const iv=CryptoJS.enc.Utf8.parse(Encrypt.ecxToken);
        var encrypted = CryptoJS.AES.encrypt(srcs, key, {  keySize: 128 / 8, iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        return encrypted.toString();
       
    }
	

}