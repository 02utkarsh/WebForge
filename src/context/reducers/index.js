import {combineReducers} from "redux";
import userAuthReducer from "./userAuthReducer";
// import projectReducer from "./ProjectReducer";
import projectReducers from "./projectReducers";
import searchReducer from "./searchReducer";

const myReducer=combineReducers({
    user:userAuthReducer,
    projects:projectReducers,
    searchTerm:searchReducer

})
export default myReducer;