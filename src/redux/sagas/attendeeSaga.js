import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';


function* fetchAttendees() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('api/attendees', config);

    yield put({ type: 'SET_ATTENDEES', payload: response.data });
  } catch (error) {
    console.log('Attendess get request failed', error);
  }
}

function* addAttendee(action) {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };

        console.log('add event', action);

        // the config includes credentials which
        // allow the server session to recognize the user
        yield axios.post('api/attendee', action.payload, config);
        yield put({ type: 'FETCH_ATTENDEES' });

    }
    catch (error) {
        console.log(`Attendee post request failed`, error);
    }
}


function* attendeeSaga() {
    yield takeLatest('FETCH_ATTENDEES', fetchAttendees);
    yield takeEvery('ADD_ATTENDEE', addAttendee);
}

export default attendeeSaga;
