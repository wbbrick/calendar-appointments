import { connect } from 'react-redux';
import ReminderForm from './ReminderForm';
import { addReminder, updateReminder } from '../../redux/actions';
import Reminder from '../../types/Reminder';

interface State {
	reminderList: Array<Reminder>
}

const mapStateToProps = (state:State) => {
	return { 
		reminderList: state.reminderList
	};
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onCancel: () => {
		},
		onSave: (id: string, name: string, date: number, color: string, editMode: boolean) => {
			if(editMode) {
				dispatch( updateReminder({ name, date, color, id }) );
			} else {
				dispatch( addReminder({ name, date, color, id }) );
			}
		}
	}
}

const ReminderFormContainer = connect( mapStateToProps, mapDispatchToProps )( ReminderForm );

export default ReminderFormContainer;
