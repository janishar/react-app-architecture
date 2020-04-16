import { combineReducers } from 'redux';
import AppReducer from './ui/app/Reducer';

const RootReducer = combineReducers({
	appData: AppReducer,
})

export default RootReducer