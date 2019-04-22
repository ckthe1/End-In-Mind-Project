import axios from "axios";
import { put, takeLatest, takeEvery } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchFiles() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const response = yield axios.get("api/aws", config);

    yield put({ type: "SET_FILES", payload: response.data.siftedArray });
  } catch (error) {
    console.log("Files get request failed", error);
  }
}

function* addFile(action) {
  try {


    console.log(action.payload);

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    // posting to AWS
    const formData = new FormData();
    formData.append("file", action.payload.file[0]);
    yield axios.post(`/api/aws`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    // using the URL from aws, post to our database
    yield axios.post('/api/files', {
      
    })

    yield put({ type: "FETCH_FILES" });
  } catch (error) {
    console.log("its an error with adding file", error);
  }
}

function* deleteFile(action) {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    console.log("delete event?????", action);


   yield axios({
    method: "DELETE",
    url: "/api/aws",
    params: {
      awsKey: action.payload
    }
  });

    yield put({ type: "FETCH_FILES" });
  } catch (error) {
    console.log(`you dun fud up g`, error);
  }
}

function* eventSaga() {
  yield takeLatest("FETCH_FILES", fetchFiles);
  yield takeEvery("ADD_FILE", addFile);
  yield takeEvery("DELETE_FILE", deleteFile);
}

export default eventSaga;
