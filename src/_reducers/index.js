import { combineReducers } from 'redux';

import { rewards, categories } from './rewards.reducer';

const rootReducer = combineReducers({
  rewards, categories
});

export default rootReducer;