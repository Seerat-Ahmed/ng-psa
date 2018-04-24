const initialState = {
  entities: {
    contacts: {
      data: [],
      request: {
        error: '',
        loading: false
      }
    },
    calendar: {
    },
    call: {
      recentActivity: {
        loading: false
      }
    },
    billing: {

    },
    analytics: {

    },
    upload: {

    },
    settings: {

    },
    objectives: {

    },
    emails: [],
    transcripts: {
      data: {},
      request: {
        error: '',
        loading: false
      }
    }
  },
  ui: {
    modal: {
      show: false,
      type: ''
    },
    menu: {
      show: true
    }
  }
};

export default initialState;
