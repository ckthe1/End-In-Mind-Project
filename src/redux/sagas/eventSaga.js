import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// fetches ALL events
function* fetchEvents(action) {
  try {

    const response = yield axios({
      method: 'get',
      url: 'api/events',
      params: {
        communityId: action.payload
      },
    });

    yield put({ type: 'SET_EVENTS', payload: response.data });
  } catch (error) {
    console.log('Events get request failed', error);
  }
}

function* addEvent(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    console.log('add event', action);

    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.post('api/events', action.payload, config);
    yield put({ type: 'FETCH_EVENTS' });

  }
  catch(error) {
    console.log(`rut roh`, error);
  }
}

function* fetchContacts(action) {
  try {
      console.log('Patricks payload action:', action.payload)
    const response = yield axios.get(`api/events/contacts/${action.payload.communityID}`);
    console.log('Patricks response:', response)
    yield put({ type: 'SET_CONTACTS', payload: response.data });
  } catch (error) {
    console.log('Contact get request failed', error);
  }
}

function* eventSaga() {
  yield takeLatest('FETCH_EVENTS', fetchEvents);
  yield takeEvery('ADD_EVENT', addEvent);
  yield takeEvery('FETCH_CONTACTS', fetchContacts);
}

export default eventSaga;
