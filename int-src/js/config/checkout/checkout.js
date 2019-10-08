export const payment = {
    paypal: {
        src: "https://www.paypalobjects.com/api/checkout.js",
        mode: "sandbox",
        sandbox: {
            id: "ASWcyvz1SDX7L68ILe2tDwppepocosdqJYIyp4B1spgveWnrBU-RFJBMMTbRnqZVVbcsZeNPPgM8ySnP"
        },
        production: {
            id: "AXn1gTWhiN4F08yoThFyQ7i5CgrKTR3Cdbcjtcb8BQIS2DmiwRSy9u0bLZ4jVVzUJMaPt3f5nY00_KkC"
        }
    }
};

export const formOptions = {
    ticketInsuranceTypes: [
        {
            id: 0,
            name: "insuranceProtect",
            title: "<strong>Protect my non-refundable tickets</strong>&nbsp;(recommended)",
            titleClean: "Protect my non-refundable tickets",
            price: 12
        },
        {
            id: 1,
            name: "insuranceNoProtect",
            title: "No, i do not wish to protect my tickets.",
            titleClean: "No, i do not wish to protect my tickets.",
            price: 0
        }
    ]
}