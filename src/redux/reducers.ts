import { combineReducers } from 'redux';

import { 
	ADD_REMINDER,
	UPDATE_REMINDER,
	DELETE_REMINDER
} from './actions';

const initialReminderListState = [];
// DUMMY DATA FOR TESTING
/*
const initialReminderListState = [{
	"name": "Test1",
	"date": 1595802420,
	"color": "#ff00ff",
	"id": "4a297945-bb94-48a3-a9af-4b6703c9ac07"
  },{
	"name": "Test2",
	"date": 1595802420,
	"color": "#ffaaff",
	"id": "4a297945-bb94-48a3-a9af-4b6703c9ac06"
  },{
	"name": "Test3",
	"date": 1595802420,
	"color": "#ff0000",
	"id": "4a297945-bb94-48a3-a9af-4b6703c9ac05"
  },{
	"name": "Test4",
	"date": 1595802420,
	"color": "#aaffaa",
	"id": "4a297945-bb94-48a3-a9af-4b6703c9ac04"
  },{
	"name": "Test5",
	"date": 1595802420,
	"color": "#ffffff",
	"id": "4a297945-bb94-48a3-a9af-4b6703c9ac03"
  }];
*/


function reminderList( state = initialReminderListState, action: any ) {
	switch( action.type ) {
		case ADD_REMINDER:
			return [...state, action.reminder].sort((a, b) => a.date - b.date);
		case UPDATE_REMINDER:
			const previousReminderIdx = state.findIndex(rem => rem.id === action.reminder.id);
			return [
				...state.slice(0, previousReminderIdx),
				action.reminder,
				...state.slice(previousReminderIdx + 1, state.length)
			].sort((a, b) => a.date - b.date);
		case DELETE_REMINDER:
			return [];
		default: return state
	}
}

const calendarApp = combineReducers( {
	reminderList
} )

export default calendarApp;
