import { combineReducers } from "redux";
import ScriptsReducer from "../../containers/Scripts/reducer";

const allReducers = combineReducers({
  scripts: ScriptsReducer
});

export default allReducers;
