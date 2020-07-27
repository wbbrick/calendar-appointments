import Reminder from '../types/Reminder';

// action types
export const ADD_REMINDER = 'ADD_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';

interface DateObj {
	date: Date
}

export function addReminder(reminder: Reminder) {
	return { type: ADD_REMINDER, reminder };
}

export function deleteReminder() {
	return { type: DELETE_REMINDER };
}
