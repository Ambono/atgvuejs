export const errorCheck = (response) => {
    if(parseInt(response.data.error_code) !== 0) {
        console.log("Fired error");
        return { 
            error: true, 
            message: (response.data.error_text !== "") ? response.data.error_text : "An Unhandled Error Has Occured"
        }
    }
    return false;
}