import {
  GET_TRANSCRIPTS_REQUEST,
  GET_TRANSCRIPTS_SUCCESS,
  GET_TRANSCRIPTS_FAILURE,
  SAVE_TRANSCRIPT_REQUEST,
  SAVE_TRANSCRIPT_SUCCESS,
  SAVE_TRANSCRIPT_FAILURE
} from '../actions/constants';

import initialState from '../InitialState';

export default function emailsReducer(state = initialState.entities.transcripts, action) {
  switch(action.type) {
    case GET_TRANSCRIPTS_REQUEST:
    case SAVE_TRANSCRIPT_REQUEST:
      return Object.assign({}, state, { 
        request: { loading: true }
      });
  
    case GET_TRANSCRIPTS_SUCCESS:
      return Object.assign({}, state, {
        data: {...state.data, ...action.payload.data},
        request: {
          loading: false,
          error: ''
        }
      });

    case GET_TRANSCRIPTS_FAILURE:
      return Object.assign({}, state, {
        request: {
          loading: false,
          error: action.payload.errorInfo
        }
      });

    case SAVE_TRANSCRIPT_SUCCESS:
      return Object.assign({}, state, {
        data: {...state.data, ...action.payload.data},
        request: {
          loading: false,
          error: ''
        }
      });

    case SAVE_TRANSCRIPT_FAILURE:
      return Object.assign({}, state, {
        request: {
          loading: false,
          error: action.payload.errorInfo
        }
      });

    default:
      return state;
  }
}
