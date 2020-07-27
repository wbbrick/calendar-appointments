import { combineReducers } from 'redux';

import { 
	ADD_REMINDER,
	UPDATE_REMINDER,
	DELETE_REMINDER
} from './actions';

const initialReminderListState = [];
// DUMMY DATA FOR TESTING
// I'm intentionally leaving this in place for convenience during review
/*
const initialReminderListState = [
	  {
		name: 'Go gambling',
		date: 1596238200,
		color: '#dd0000',
		id: '0b39ab97-0a0c-4cdb-85e7-96334be223a2'
	  },
	  {
		name: 'Spend my winnings!',
		date: 1596297600,
		color: '#008000',
		id: '8c51d55f-dc4a-4e87-9f40-bb471cecf27b'
	  },
	  {
		name: 'Buy cereal',
		date: 1596541200,
		color: '#dd0000',
		id: '340bc036-8ef8-457f-8cb3-43b040eedafb'
	  },
	  {
		name: 'Buy milk',
		date: 1596582000,
		color: '#0000ff',
		id: 'ccce79d5-fe7d-4ef5-bf01-9b6da06d8fbc'
	  },
	  {
		name: 'Buy bread',
		date: 1596582300,
		color: '#dd0000',
		id: '0e904f3c-4493-483d-9eaa-18c6ea99a46d'
	  },
	  {
		name: 'Buy cookies',
		date: 1596582600,
		color: '#ff8040',
		id: 'e7213426-541a-4166-b786-eb768d054004'
	  },
	  {
		name: 'Buy lottery tickets',
		date: 1596582900,
		color: '#dd0000',
		id: '5c9ceebc-1261-4929-934d-12bf2acd74f3'
	  },
	  {
		name: 'Buy strawberries',
		date: 1596583500,
		color: '#000000',
		id: 'd812962e-54b9-46ee-8694-d3f2bdd1da0c'
	  },
	  {
		name: 'Buy pears',
		date: 1596583800,
		color: '#dd0000',
		id: 'b83a0ba6-8bd2-40ae-b937-16aa1547010f'
	  },
	  {
		name: 'Buy ice cream',
		date: 1596584100,
		color: '#dd0000',
		id: '8637b369-e999-44d7-a267-985d595f82c3'
	  },
	  {
		name: 'Buy carrots',
		date: 1596584100,
		color: '#dd0000',
		id: 'a7e87aef-20b9-488e-9b3d-eb2d7791e603'
	  },
	  {
		name: 'Buy celery',
		date: 1596584400,
		color: '#10cd52',
		id: 'd825a67f-4376-459c-88eb-a81af7b41835'
	  },
	  {
		name: 'Pick up some whataburger',
		date: 1596586500,
		color: '#400040',
		id: 'a3f53817-2e3d-41dc-8308-da220d3efa97'
	  }
	];
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
		const deletedReminderIdx = state.findIndex(rem => rem.id === action.id);
		if(deletedReminderIdx < 0) {
			return state;
		} else {
			return [
				...state.slice(0, deletedReminderIdx),
				...state.slice(deletedReminderIdx + 1, state.length)
			].sort((a, b) => a.date - b.date);
		}
	default: return state
	}
}

const calendarApp = combineReducers( { reminderList } );

export default calendarApp;
