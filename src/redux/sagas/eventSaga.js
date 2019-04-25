import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// fetches events formatted for calendar
function* fetchCalendarEvents(action) {

  yield generalizedFetchEvents('SET_CALENDAR_EVENTS', '/calendar', {communityId: action.payload})

}

// fetches events formatted for table
function* fetchTableEvents(action) {

  yield generalizedFetchEvents('SET_TABLE_EVENTS', '/table' );
}

function* generalizedFetchEvents(onCompleteActionName, route, params) {
  try {
    const response = yield axios({
      method: 'get',
      url: 'api/events' + route,
      params,
    });

    yield put({ type: onCompleteActionName, payload: response.data });
  } catch (error) {
    console.log('Events', route, 'get request failed', error);
  }
}

function* addEvent(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    console.log('add event', action);

    yield axios.post('api/events', action.payload, config);

    // Refresh both the calendar and table event lists
    yield put({ type: 'FETCH_CALENDAR_EVENTS' });
    yield put({ type: 'FETCH_TABLE_EVENTS' });


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

  yield takeLatest('FETCH_CALENDAR_EVENTS', fetchCalendarEvents);
  yield takeLatest('FETCH_TABLE_EVENTS', fetchTableEvents);
  yield takeEvery('ADD_EVENT', addEvent);
  yield takeEvery('FETCH_CONTACTS', fetchContacts);
}

export default eventSaga;
