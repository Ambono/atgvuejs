import { router } from "../../main";

export class ErrorHandler {
    constructor() {
        
    }

    sendToErrorPage({message, type}) {
        router.push({name: "error", props: {message, type}});
    }

    displayErrorModal({container, callback}) {

    }
}