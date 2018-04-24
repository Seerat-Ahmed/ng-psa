import {
  SHOW_MODAL,
  HIDE_MODAL
} from '../actions/constants';

import initialState from '../InitialState';

export default function modalReducer(state = initialState.ui.modal, action) {
  switch(action.type) {
    case HIDE_MODAL:
      return Object.assign({}, state, {
          show: false
      });

    case SHOW_MODAL:
      return Object.assign({}, state, {
          show: true,
          type: action.modalType
      });

    default:
      return state;
  }
}
