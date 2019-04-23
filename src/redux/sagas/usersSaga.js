import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUsers() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('api/user/all', config);

    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USERS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* editUser(action ) {

  console.log('edit user saga', action);

  try {
       yield axios.put("/api/user", action.payload);
       yield put({type:'FETCH_USERS'});
  }
  catch (error) {
        console.log("Failed to edit user", error);
  }
}


function* deleteUser(action) {
  console.log("delete user saga", action);
    try {
        yield axios.delete(`/api/user/${action.payload}`);
        yield put({ type: 'FETCH_USERS' });
    } catch (error) {
        console.log('error with delete ');
    };
};


function* userSaga() {
  yield takeLatest('FETCH_USERS', fetchUsers);
  yield takeLatest('EDIT_USER', editUser);
  yield takeLatest('DELETE_USER', deleteUser);

}

export default userSaga;
