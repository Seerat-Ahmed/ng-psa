import { put, call } from 'redux-saga/effects';
import {
  GET_TRANSCRIPTS_SUCCESS,
} from '../../actions/constants';

import db from '../../../utils/firebase';

export function * fetchTranscripts() {
  const transcripts = yield call(db.database.read, 'transcripts');

  yield put({ 
    type: GET_TRANSCRIPTS_SUCCESS, 
    payload: { 
      data: transcripts 
    }
  });

}
