// @flow
import { combineReducers } from 'redux';
import appReducer from './ui/app/reducer';

const rootReducer = combineReducers({
	appData: appReducer,
})

export default rootReducer