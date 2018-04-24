import {
  put,
  call
} from 'redux-saga/effects';

import {
  GET_CONTACTS_FAILURE,
  GET_CONTACTS_SUCCESS,
} from '../../actions/constants';

import db from '../../../utils/firebase';
// import { fetchContacts } from '../../../../public/libs/googleContacts';

export function* getAllContacts() {
  // let contacts = yield call(fetchContacts);

  yield put({
    type: GET_CONTACTS_SUCCESS, 
    // payload: contacts || []
    payload: []
  });
}
