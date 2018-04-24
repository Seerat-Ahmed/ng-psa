import {
  SHOW_MENU,
  HIDE_MENU
} from '../actions/constants';

import initialState from '../InitialState';

export default function menuReducer(state = initialState.ui.menu, action) {
  switch(action.type) {
    case HIDE_MENU:
      return Object.assign({}, state, {
          show: false,
      });

    case SHOW_MENU:
      return Object.assign({}, state, {
          show: true
      });

    default:
      return state;
  }
}
