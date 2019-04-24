import axios from "axios";
import { put, takeLatest, takeEvery } from "redux-saga/effects";

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchFiles() {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    const response = yield axios.get("api/files", config);

    console.log(response);

    yield put({ type: "SET_FILES", payload: response.data });
  } catch (error) {
    console.log("Files get request failed", error);
  }
}

function* addFile(action) {
  try {

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true
    };

    // posting to AWS
    const formData = new FormData();
    formData.append("file", action.payload.file[0]);
    const bucketResponse = yield axios.post(`/api/aws`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    console.log("bucket response:",bucketResponse);

    // using the URL from aws, post to our database
    yield axios.post('/api/files', {
      title: action.payload.title,
      description: action.payload.description,
      url: bucketResponse.data.Location,
      key: bucketResponse.data.key,
    });

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

    console.log("delete event", action);
  
    console.log("action.payload.key", action.payload.key);
    

   yield axios({
    method: "DELETE",
    url: "/api/aws",
    params: {
      awsKey: action.payload.key
    },

    // TODO axios delete on /api/files
    })  
    yield axios ({
     method: "DELETE",
    url: "/api/files",
    params: {
      id: action.payload.id
    }
    
  });

    yield put({ type: "FETCH_FILES" });
  } catch (error) {
    console.log(`error`, error);
  }
}

function* eventSaga() {
  yield takeLatest("FETCH_FILES", fetchFiles);
  yield takeEvery("ADD_FILE", addFile);
  yield takeEvery("DELETE_FILE", deleteFile);
}

export default eventSaga;
