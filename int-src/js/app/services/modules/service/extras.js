import store from "../../../store/store";
import apiEventBus from "../../apiEventBus";
import moment from "moment";

export const extras = (serviceBus) => {
    serviceBus.$on("extrasUpdateItem", ({item, quantity}) => {
        store.commit("updateExtra", {item, quantity});
    });

    // Extras
    serviceBus.$on("retrieveExtras", (callback) => {
        apiEventBus.$emit("retrieveExtras", (data) => {
            store.commit("setExtras", data);
            // Commit the formatted data
            callback(data);
        });
    });


    serviceBus.$on("wipeExtras", (extraId) => {
        const localExtras = store.getters.getActiveExtras;
        if(!localExtras) {
            return;
        }
        apiEventBus.$emit("releaseExtras", () => {
            localExtras.forEach((currentExtra) => currentExtra.quantity = 0);
        });
    });

    serviceBus.$on("removeExtra", (extraId) => {
        const localExtras = store.getters.getActiveExtras;
        let basketExtras = store.getters.getBasketExtras;

        const itemsToUpdate = [
            ...localExtras.filter((currentItem) => currentItem.id === extraId),
            ...basketExtras.filter((currentItem) => currentItem.id === extraId)
        ];

        itemsToUpdate.forEach((currentExtra) => {
            currentExtra.quantity = 0;
        });
        
        // Filter items to be called with API
        const basketItems = itemsToUpdate.filter((currentExtra) => currentExtra.offerId !== undefined);

        if(basketItems.length > 0) {
            apiEventBus.$emit("releaseExtra", ({id: basketItems[0].offerId, stockId: basketItems[0].stockId , callback: () => {
                serviceBus.$emit("calculateBasketTotal");
            }}));

            store.commit("setBasketExtras", [...basketExtras.filter((currentItem) => currentItem.offerId !== basketItems[0].offerId)]);
        }
        else {
            serviceBus.$emit("calculateBasketTotal")
        }
        
        serviceBus.$emit("ensureValidDeliveryMethod");

    });

    serviceBus.$on("updateExtra", ({item, quantity}) => {
        serviceBus.$emit("extrasUpdateItem", { item, quantity });
        serviceBus.$emit("ensureValidDeliveryMethod");
        serviceBus.$emit("calculateBasketTotal");
    });

    


    serviceBus.$on("ensureValidDeliveryMethod", () => {
        //
        // Adjust delivery method if required.
        //
        let extras = store.getters.getActiveExtras;
        let deliveryMethods = store.getters.getCheckoutDeliveryMethods;
        let deliveryMethod = store.getters.getBasketDeliveryMethod;
        if (deliveryMethods.length > 0) {
            if (extras.length > 0) {
                if (deliveryMethod.value === 'H') {
                    let performanceDate = moment(store.getters.getChosenDate.short, 'DD/MM/YYYY - kk:mma');
                    let daysToShow = performanceDate.startOf('day').diff(moment().startOf('day'),"days");
                    if (daysToShow < 8) {
                        deliveryMethod = deliveryMethods.find(x => x.value==='C');
                    } else {
                        deliveryMethod = deliveryMethods.find(x => x.value==='M');
                    }
                    if (deliveryMethod === undefined) {
                        if (deliveryMethods[0].value != 'H') {
                            deliveryMethod = deliveryMethods[0];
                        }
                    }
                    if (deliveryMethod !== undefined) {
                        serviceBus.$emit("basketSetDeliveryMethod", { deliveryMethod });
                        serviceBus.$emit("basketSetDefaultDeliveryMethod", {item: deliveryMethod});
                    }
                }
            } else {
                if (deliveryMethod.value !== 'H') {
                    deliveryMethod = deliveryMethods.find(x => x.value==='H');
                    if (deliveryMethod !== undefined) {
                        serviceBus.$emit("basketSetDeliveryMethod", { deliveryMethod });
                        serviceBus.$emit("basketSetDefaultDeliveryMethod", {item: deliveryMethod});
                    }
                }
            }
        }
    });

}