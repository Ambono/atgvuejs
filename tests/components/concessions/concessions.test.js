import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Foo from '../../../int-src/js/app/components/SeatMap/Concessions.vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex'

describe('Concessions unit tests', () => {

    const localVue = createLocalVue()

    localVue.use(Vuex)
    localVue.use(VueRouter)
    localVue.config.silent = true

    let getters
    let store
    let actions
    const router = new VueRouter()

    beforeEach(() => {
        getters = {
            ticketAmount: () => { name : "any"},
            inputValue: () => 'input'
        }
        actions = {
            actionClick: {},
            actionInput: {},
            initialiseStore: {},
            dispatch: {}
        }
        store = new Vuex.Store({
            state: {},
            getters,
            //actions
        })
    })


    it('does not show a priceband list if show concessions is false', () => {
       const wrapper = shallowMount(Foo, {
           localVue,
           data: {
               showConcessions: false
           }
       });

       // see if the message renders
       expect(wrapper.find('.concessions__priceband-list').exists()).to.be.false;
    });
    //it('does show priceband list if show concessions is true', () => {
    //    const wrapper = shallowMount(Foo, {
    //        data: {
    //            showConcessions: true
               
    //        }
    //    });

    //    wrapper.setProps({ chosenSeats: [] });
    //    wrapper.vm.seatMap = {};
    //    wrapper.vm.seatMap.seatData = [];

    //    expect(wrapper.find('.concessions__priceband-list').exists()).to.be.true;



    //});
    it('does show one price band A if defined in filters', () => {

        let chosenSeats = createBaseChosenSeats();
        let seatMap = createBaseSeatMapDataForConcessions();

        const wrapper = createStandardWrapper(store, localVue, router);

        wrapper.setData({ showConcessions: true })
        wrapper.setProps({ seatMap: seatMap });

        wrapper.setProps({ chosenSeats: chosenSeats });

        expect(wrapper.find('.concessions__priceband-list').exists()).to.be.true;
        let firstPriceBand = wrapper.find('.concessions__discount');

        checkDiscountDescription(firstPriceBand, 'test');

        checkSeatPrice(firstPriceBand, '£40.00');

        checkFilterClass(firstPriceBand, 'seat--undefined');
        checkQuantity(firstPriceBand, '1');
       

    });

    it('does show 2 price bands if defined in filters', () => {
        let chosenSeats = createBaseChosenSeats();
        let seatB = {
            priceId: 'B',
            overview: {},
            dc: 'ADU'
        };
        chosenSeats.push(seatB);

        let seatMap = createBaseSeatMapDataForConcessions();
        addExtraPriceBandToSeatMapDataForConcessions(seatMap);
        
        const wrapper = createStandardWrapper(store, localVue, router);

        wrapper.setData({ showConcessions: true })
        wrapper.setProps({ seatMap: seatMap });

        wrapper.setProps({ chosenSeats: chosenSeats });

        let priceBandB = wrapper.findAll('.concessions__priceband-item');
     
        expect(priceBandB.at(0).find('.concessions__priceband-price').text(), 'Seats at £60.00');

    });

    it ('does add discount when extra discount code on price band A', () => {
        let chosenSeats = createBaseChosenSeats();
      
        let seatMap = createBaseSeatMapDataForConcessions();
        addDiscountToPriceBand(seatMap);

        const wrapper = createStandardWrapper(store, localVue, router);

        wrapper.setData({ showConcessions: true })
        wrapper.setProps({ seatMap: seatMap });

        wrapper.setProps({ chosenSeats: chosenSeats });

        let discounts = wrapper.findAll('.concessions__discount');
        let discountChild = discounts.at(1);

        checkSeatPrice(discountChild, '£35.00');
        checkDiscountDescription(discountChild, 'child');
        checkFilterClass(discountChild, 'seat--undefined');
        checkQuantity(discountChild, '0');
    })

    it('does change discount code of seat when add pressed', () => {
        let chosenSeats = createBaseChosenSeats();
      
        let seatMap = createBaseSeatMapDataForConcessions();
        addDiscountToPriceBand(seatMap);

        const wrapper = createStandardWrapper(store, localVue, router);

        wrapper.setData({ showConcessions: true })
        wrapper.setProps({ seatMap: seatMap });

        wrapper.setProps({ chosenSeats: chosenSeats });

        const plusButton = wrapper.findAll('.concessions__btn').at(1);
        
        expect(chosenSeats[0].dc).equals('ADU');
        plusButton.trigger('click');

        expect(chosenSeats[0].dc).equals('CHI');
    })
})

function checkQuantity(discountChild, quantity) {
    let input = discountChild.find('.concessions__discount-quantity-input');
    expect(input.element.value).equal(quantity);
}

function createStandardWrapper(store, localVue, router) {
    return shallowMount(Foo, {
        store,
        localVue,
        router,
        data: {
            showConcessions: true,
            totalPrice: 0
        }
    });
}

function createBaseChosenSeats() {
    let chosenSeats = [];
    let seat = createSeat();
    chosenSeats.push(seat);
    return chosenSeats;
}

function createSeat() {
    return {
        priceId: 'A',
        overview: {},
        dc: 'ADU'
    };
}

function checkDiscountDescription(firstPriceBand, description) {
    let discountDescription = firstPriceBand.find('.concessions__discount-description').text();
    expect(discountDescription).to.equal(description);
}

function checkFilterClass(wrapper, filterClass) {
    let seatType = wrapper.find('.concessions__seat-type');
    expect(seatType.classes()).to.contain(filterClass);
}

function checkSeatPrice(wrapper, price) {
    let seatPrice = wrapper.find('.concessions__seat-price').text();
    expect(seatPrice).to.equal(price);
}

function createBaseSeatMapDataForConcessions() {
    let seatMapData = {
        filters: [
            createFilterA()
        ]
    };
    let seatMap = { seatData: seatMapData };
    return seatMap;
}

function createFilterA() {
    return {
        id: 'A',
        price: 50,
        dcs: [{
            discount_group_code: 'WEB',
            unit_price: 40,
            numberOfSeats: 0,
            code: 'ADU',
            description: 'test'
        }],
        filterClass: 'undefined'
    };
}

function addDiscountToPriceBand(seatMapData){
    let filterA = seatMapData.seatData.filters.find(x => x.id === 'A');
    let dc = {
        discount_group_code: 'WEB',
        unit_price: 35,
        numberOfSeats: 0,
        code: 'CHI',
        description: 'child'
    };

    filterA.dcs.push(dc);
}

function addExtraPriceBandToSeatMapDataForConcessions(seatMapData) {

    let newPriceBand = {
        id: 'B',
        price: 100,
        dcs: [{
            discount_group_code: 'WEB',
            unit_price: 60,
            numberOfSeats: 0,
            code: 'ADU',
            description: 'test'
        }],
        filterClass: 'undefined'
    }

    seatMapData.seatData.filters.push(newPriceBand);
}
