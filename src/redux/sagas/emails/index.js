import { put, call} from 'redux-saga/effects';
import { fetchEmails } from "../../../utils/api";
import { 
  GET_EMAILS_FAILURE, 
  GET_EMAILS_SUCCESS
} from '../../actions/constants';

export function * fetchDummyEmails() {
  const emails = yield call(fetchEmails, 'users');

  yield put({ type: GET_EMAILS_SUCCESS, payload: emails });

}
