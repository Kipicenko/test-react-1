import {combineReducers} from "redux";
import {recordingReducer} from "./recording";

const reducers = combineReducers({
    recordings: recordingReducer
})

export default reducers;