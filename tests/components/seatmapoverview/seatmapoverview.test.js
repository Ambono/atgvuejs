import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import SeatMapOverview from '../../../int-src/js/app/components/SeatMap/SeatMapOverview.vue';
import VueRouter from 'vue-router'
import Vuex from 'vuex'

describe('Seat Map Overview Tests', () => {

    const localVue = createLocalVue()

    localVue.use(Vuex)
    localVue.use(VueRouter)
   

    let getters
    let store
    let actions
    const router = new VueRouter()

    beforeEach(() => {
        getters = {
            getTicketAmount: function () { return { name: 'any'}},
            getChosenArea: function() { return {name: 'RC'}}
        }
        
        store = new Vuex.Store({
            //state: {},
            getters,
            //actions
        })
    })

    it('Should show 1 seat if one seat ', () => {
        
        let chosenSeats = createBaseChosenSeats();
        
        const wrapper = createStandardWrapper(store, localVue, router );
      
        wrapper.setProps({ chosenSeats: chosenSeats, errors: [], seatMap: {}});

        const seat = wrapper.find('.selected-seats__seat');
        
        expect(seat).to.exist;
    })

    it('Should show correct seat type ', () => {
        
        let chosenSeats = createBaseChosenSeats();
        
        const wrapper = createStandardWrapper(store, localVue, router );
      
        wrapper.setProps({ chosenSeats: chosenSeats, errors: [], seatMap: {}});

        const seat = wrapper.find('.selected-seats__seat');
       
        const seatType = wrapper.find('.selected-seats__seat-type');
      
        expect(seatType.classes()).to.contain('seat--seat--red');
       
    })

    it('Should show correct seat location ', () => {
        
        let chosenSeats = createBaseChosenSeats();
        
        const wrapper = createStandardWrapper(store, localVue, router );
      
        wrapper.setProps({ chosenSeats: chosenSeats, errors: [], seatMap: {}});

        const seat = wrapper.find('.selected-seats__seat');
       
        const seatLocation = wrapper.find('.selected-seats__seat-location');
      
        expect(seatLocation.text()).equal('Royal Circle');
       
    })

    it('Should show correct seat number ', () => {
        
        let chosenSeats = createBaseChosenSeats();
        
        const wrapper = createStandardWrapper(store, localVue, router );
      
        wrapper.setProps({ chosenSeats: chosenSeats, errors: [], seatMap: {}});

        const seat = wrapper.find('.selected-seats__seat');
       
        const seatLocation = wrapper.find('.selected-seats__seat-number');
      
        expect(seatLocation.text()).equal('C2');
       
    })

    it('Should show correct seat info ', () => {
        
        let chosenSeats = createBaseChosenSeats();
        
        const wrapper = createStandardWrapper(store, localVue, router );
      
        wrapper.setProps({ chosenSeats: chosenSeats, errors: [], seatMap: {}});

        const seat = wrapper.find('.selected-seats__seat');
       
        const seatLocation = wrapper.find('.selected-seats__seat-information');
      
        expect(seatLocation.text()).equal('Clear View');
       
    })

    it('Should show correct seat price ', () => {
        
        let chosenSeats = createBaseChosenSeats();
        
        const wrapper = createStandardWrapper(store, localVue, router );
      
        wrapper.setProps({ chosenSeats: chosenSeats, errors: [], seatMap: {}});

        const seat = wrapper.find('.selected-seats__seat');
       
        const seatLocation = wrapper.find('.selected-seats__seat-price');
      
        expect(seatLocation.text()).equal('£50.00');
       
    })

    it('Should show correct seat price ', () => {
        
        let chosenSeats = createBaseChosenSeats();
        
        const wrapper = createStandardWrapper(store, localVue, router );
      
       

        wrapper.setProps({ chosenSeats: chosenSeats, errors: [], seatMap: {}});

        const seat = wrapper.find('.selected-seats__seat');
       
        const seatRemoveAllLink = wrapper.find('.selected-seats__remove_all-link');
      
        expect(seatRemoveAllLink.text()).equal('Remove all');
       
    })
})

function createStandardWrapper(store, localVue, router) {
    return shallowMount(SeatMapOverview, {
        store,
        localVue,
        router,
        data: {
            
            
        },
        propsData: {
            chosenSeats: []
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
        overview: { 
            price: 50, 
            filterClass: 'seat--red'
        },
        seatInformation: 'Clear View',
        dc: 'ADU',
        name: 'C2',
        areaName: 'Royal Circle'
    };
}