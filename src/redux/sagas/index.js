import { takeLatest } from 'redux-saga/effects';
import {
  GET_ACTIVITY_REQUEST,
  SAVE_ACTIVITY_REQUEST,
  GET_EMAILS_REQUEST,
  GET_TRANSCRIPTS_REQUEST,
  GET_CONTACTS_REQUEST
} from '../actions/constants';

import { 
  getActivity,
  saveActivity 
} from './activity';

import { fetchDummyEmails } from './emails';
import { fetchTranscripts } from './transcripts';
import { getAllContacts } from './contacts';

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
      takeLatest(GET_ACTIVITY_REQUEST, getActivity),
      takeLatest(SAVE_ACTIVITY_REQUEST, saveActivity),
      takeLatest(GET_EMAILS_REQUEST, fetchDummyEmails),
      takeLatest(GET_TRANSCRIPTS_REQUEST, fetchTranscripts),
      takeLatest(GET_CONTACTS_REQUEST, getAllContacts)
    ];
}
