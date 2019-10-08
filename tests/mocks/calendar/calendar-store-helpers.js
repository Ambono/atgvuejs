// Imports
import moment from "moment";

const testdata = {
    data: {
      show_id: 1,
      title: "The Lion King",
      image: "/this/is/an/image.jpg",
      venue: {
        id: 1,
        name: "The Lyceum Theatre",
        address: "21 Wellington St, London WC2E 7RQ"
      },
      date_start: "2018-08-01",
      date_end: "2018-09-24",
      performances: [
        {
          id: 0,
          datetime: "2018-07-30 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 386,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 1,
          datetime: "2018-08-01 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 386,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 2,
          datetime: "2018-08-02 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 286,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 3,
          datetime: "2018-08-03 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 0,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 4,
          datetime: "2018-08-03 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 10,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 5,
          datetime: "2018-08-04 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 500,
          total_availability: 500,
          on_sale: false
        },
        {
          id: 6,
          datetime: "2018-08-05 13:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 400,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 7,
          datetime: "2018-08-05 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 300,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 8,
          datetime: "2018-09-03 13:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 400,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 9,
          datetime: "2018-09-07 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 300,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 10,
          datetime: "2019-08-01 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 386,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 11,
          datetime: "2019-08-02 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 286,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 12,
          datetime: "2019-08-03 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 0,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 13,
          datetime: "2019-08-03 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 10,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 14,
          datetime: "2019-08-04 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 500,
          total_availability: 500,
          on_sale: false
        },
        {
          id: 15,
          datetime: "2019-08-05 13:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 400,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 16,
          datetime: "2019-08-05 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 300,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 17,
          datetime: "2019-09-03 13:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 400,
          total_availability: 500,
          on_sale: true
        },
        {
          id: 18,
          datetime: "2019-09-07 19:00:00",
          min_price: 30.5,
          max_price: 170.0,
          current_availability: 300,
          total_availability: 500,
          on_sale: true
        }
      ]
    },
    code: 200
  };

const mutations = {
    /**
     * Mutation used to update the calendars state 
     * @function
     * @param {Object} data - The data object contianing the calendar data.
     */
    setCalenderData(state, data) {
        state.calendarData = data;
    }
}

const actions = {
    
    /**
     * Action used to fetch the calendar data from the endpoint.
     * @function
     * @param {Function} dispatch - Vue method for calling actions.
     */
    fetchCalendarData({dispatch}) {
        // Format the data
        dispatch("formatCalendarData", testdata);
    },

    /** 
     * Action added for testing purposes
     * @function
     */
    setInvalidCache({commit, state}) {
        state.calendarData.timestamp = moment("1995-12-25").format();
    }
};

// Export
export default {
    mutations,
    actions
}