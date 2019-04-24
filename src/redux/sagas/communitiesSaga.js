import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchCommunities() {
  try {

    const response = yield axios.get('api/community');

    yield put({ type: 'SET_COMMUNITIES', payload: response.data });
  } catch (error) {
    console.log('Events get request failed', error);
  }
}

function* eventSaga() {
  yield takeLatest('FETCH_COMMUNITIES', fetchCommunities);
}

export default eventSaga;
