import { 
  GET_ACTIVITY_SUCCESS,
  SAVE_ACTIVITY_SUCCESS,
  GET_ACTIVITY_REQUEST,
  SAVE_ACTIVITY_REQUEST
 } from '../actions/constants';
import initialState from '../InitialState';

export default function modalReducer(state = initialState.entities.call.recentActivity, action) {
  switch (action.type) { 
    case GET_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true
      }  

    case GET_ACTIVITY_SUCCESS:
      return {
        ...action.payload,
        loading: false
      }

    case SAVE_ACTIVITY_REQUEST:
      return {
        ...state,
        loading: true
      }
      
    case SAVE_ACTIVITY_SUCCESS:
      return {
        ...state, 
        ...action.payload
      };
      
    default:
      return state;
  }
}
