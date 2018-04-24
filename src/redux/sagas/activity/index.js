import {
  put,
  call
} from 'redux-saga/effects';

import {
  GET_ACTIVITY_FAILURE,
  GET_ACTIVITY_SUCCESS
} from '../../actions/constants';

import db from '../../../utils/firebase';

export function* getActivity() {
  const snapshot = yield call(db.firestore.getCollection, 'users');
  let recentActivity = [];
  snapshot.forEach((user) => {
    recentActivity = {
      ...recentActivity,
      [user.id]: {
        id: user.id,
        ...user.data()
      }
    };
  });

  yield put({
    type: GET_ACTIVITY_SUCCESS, 
    payload: recentActivity
  });

}

export function* saveActivity(payload) {
  try {
    // make request to server
    const doc = yield call(db.firestore.addDocument, 'users', {
                            name : 'John Doe',
                            address : 'Nairobi'
                          });

    // login was successful dispatch success
    yield put({
        type: GET_ACTIVITY_SUCCESS,
        payload: doc
    });

  } catch (error) {
    // saving document failed dispatch failure
    yield put({
        type : GET_ACTIVITY_FAILURE,
        payload: {
            message: error.response.data.message,
            status: error.response.data.status
        }
    });
  }
}
