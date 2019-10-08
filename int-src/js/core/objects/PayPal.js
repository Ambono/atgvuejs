import { payment } from "../../config/checkout/checkout";

export const PayPal = function(container, paypalData, {validate, handleSuccess}) {
    const paypal = this;

    paypal.configData = [paypalData];

    paypal.validate = validate;
    paypal.handleSuccess = handleSuccess;

    paypal.container = container;

};


// Inject the script
// Create hidden button
// Wait till script is available
// Inject Pricing
// Request Payment
// Handle Success
    // Remove paypal code
    // Progress to confirmation 

/**
 * Function used to create the paypal instance
 * @memberof PayPal
 * @function
 */
PayPal.prototype.create = function() {
    const paypal = this;
    
    const injectScript = new Promise((resolve, reject) => {
        paypal.injectScript(resolve, reject);
    })
    .then(() => {
        paypal.createPPInstance();
    });
};

/**
 * Used to inject the script and button into the page
 * @memberof PayPal 
 * @function
 */
PayPal.prototype.injectScript = function(resolve, reject) {
    // Cache instance
    const paypal = this;

    // Check if the script is already present
    if(document.querySelector("[data-paypal-inject]")) {
        resolve();
        return;
    }

    // Create the paypal script element
    const script  = document.createElement("script");
    script.setAttribute("data-paypal-inject", "");
    script.setAttribute("src", payment.paypal.src)

    // Inject into the container
    document.body.appendChild(script);

    // Wait till paypal is loaded
    const paypalCheck = setInterval(() => {
        // If the paypal object is present
        if(window.paypal !== undefined) {
            clearInterval(paypalCheck);
            resolve();
        }
    }, 100);

};

/**
 * Used to create a paypal express checkout instance
 * @memberof PayPal
 * @function
 */
PayPal.prototype.createPPInstance = function() {
    const paypal = this;

    window.paypal.Button.render({
        // Configure environment
        env: 'sandbox',
        client: {
          sandbox: payment.paypal.sandbox.id,
          production: payment.paypal.production.id
        },

        style: {
            size: 'medium',
            color: 'blue',
            shape: 'rect',
        },

        // Set up a payment
        payment: paypal.handlePayment.bind(paypal),
        
        // Execute the payment
        onAuthorize: function(data, actions) {
          return actions.payment.execute().then(function() {
            // Show a confirmation message to the buyer
            paypal.handleSuccess();
          });
        }
    }, '#paypal-button');
}

PayPal.prototype.handlePayment = function(data, actions) {
    const paypal = this;

    return actions.payment.create({
        transactions: paypal.configData
      });
}