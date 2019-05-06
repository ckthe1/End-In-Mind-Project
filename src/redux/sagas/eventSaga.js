import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* fetchEvents(action) {

  try {
    const response = yield axios({
      method: 'get',
      url: 'api/events',
      params: {communityId: action.payload},
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

    yield axios.post('api/events', action.payload, config);

    // Refresh both the calendar and table event lists
    yield put({ type: 'FETCH_EVENTS' });
  }
  
  catch(error) {
    console.log(`rut roh`, error);
  }
}

function* editEvent(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('edit event', action);
    yield axios.put('api/events', action.payload, config);
    // Refresh both the calendar and table event lists
    yield put({ type: 'FETCH_CALENDAR_EVENTS' });
    yield put({ type: 'FETCH_TABLE_EVENTS' });
  }
  catch (error) {
    console.log(`rut roh`, error);
  }
}

function* fetchContacts(action) {
  try {
    const response = yield axios.get(`api/events/contacts/${action.payload.communityID}`);
    
    yield put({ type: 'SET_CONTACTS', payload: response.data });
  } catch (error) {
    console.log('Contact get request failed', error);
  }
}


function* archiveEvents(action){
  try{
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('archive event', action.payload);
    yield axios.put('api/events/archive', action.payload.id, config);
    // yield put({ type: 'ARCHIVE_EVENTS' });
  } catch (error) {
    console.log('archive PUT request failed', error);
  }
}//end archiveEvents

function* eventSaga() {

  yield takeLatest('FETCH_EVENTS', fetchEvents);
  yield takeLatest('ARCHIVE_EVENTS', archiveEvents);
  yield takeEvery('ADD_EVENT', addEvent);
  yield takeEvery('EDIT_EVENT', editEvent);
  yield takeEvery('FETCH_CONTACTS', fetchContacts);

}

export default eventSaga;
