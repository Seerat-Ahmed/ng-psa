import {
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAILURE
} from '../actions/constants';

import initialState from '../InitialState';

export default function contactsReducer(state = initialState.entities.contacts, action) {
  switch(action.type) {
    case GET_CONTACTS_SUCCESS:
      return Object.assign({}, state, {
        data: action.payload,
        request: {
          loading: false
        }
      });

    case GET_CONTACTS_FAILURE:
      return Object.assign([], state, {
        request: {
          error: action.payload.errorInfo,
          loading: false
        }
      });

    default:
      return state;
  }
}
