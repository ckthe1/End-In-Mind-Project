import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchEvents() {
  try {

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('api/events', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
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

    console.log('add event?????', action);

    // the config includes credentials which
    // allow the server session to recognize the user
    yield axios.post('api/events', action.payload, config);

    yield put({ type: 'FETCH_EVENTS' });

  }
  catch(error) {
    console.log(`you dun f'd up, hoe`, error);
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
