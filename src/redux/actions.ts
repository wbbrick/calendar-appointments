import Reminder from '../types/Reminder';

// action types
export const ADD_REMINDER = 'ADD_REMINDER';
export const UPDATE_REMINDER = 'UPDATE_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';

export function addReminder(reminder: Reminder) {
	return { type: ADD_REMINDER, reminder };
}

export function deleteReminder(id: string) {
	return { type: DELETE_REMINDER, id };
}

export function updateReminder(reminder: Reminder) {
	return { type: UPDATE_REMINDER, reminder };
}
