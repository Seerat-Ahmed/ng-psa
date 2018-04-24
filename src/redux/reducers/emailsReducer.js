import {
  GET_EMAILS_SUCCESS,
  GET_EMAILS_FAILURE
} from '../actions/constants';

import initialState from '../InitialState';

export default function emailsReducer(state = initialState.entities.emails, action) {
  switch(action.type) {
    case GET_EMAILS_SUCCESS:
      return Object.assign([], state, action.payload);

    case GET_EMAILS_FAILURE:
      return state;

    default:
      return state;
  }
}
