import { combineReducers } from 'redux';
import ScriptsReducer from './scripts-reducer';

const allReducers = combineReducers(
  {
    scripts: ScriptsReducer
  },
);

export default allReducers;