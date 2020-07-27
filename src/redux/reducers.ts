import { combineReducers } from 'redux';

import { 
	ADD_REMINDER,
	DELETE_REMINDER
} from './actions';


const initialReminderListState = [];

function reminderList( state = initialReminderListState, action: any ) {
	switch( action.type ) {
		case ADD_REMINDER:
			return [...state, action.reminder];
		case DELETE_REMINDER:
			return [];
		default: return state
	}
}

const calendarApp = combineReducers( {
	reminderList
} )

export default calendarApp;
