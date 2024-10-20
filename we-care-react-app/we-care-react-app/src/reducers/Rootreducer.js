import { combineReducers } from "redux";
import  coachreducer from "./Coachreducer";
import userreducer from "./Userreducer";

const rootreducer = combineReducers({
    coachreducer,
    userreducer
});

export default rootreducer;