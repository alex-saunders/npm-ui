import { combineReducers } from "redux";
import ScriptsReducer from "../../containers/Scripts/reducer";

console.log(ScriptsReducer);

const allReducers = combineReducers({
  scripts: ScriptsReducer
});

export default allReducers;
