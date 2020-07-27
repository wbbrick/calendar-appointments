import { connect } from 'react-redux';
import ReminderForm from './ReminderForm';
import { addReminder } from '../../redux/actions';
import Reminder from '../../types/Reminder';
import { v4 as uuid } from 'uuid';

interface State {
	reminderList: Array<Reminder>
}

const mapStateToProps = (state:State) => {
	return { 
		reminder: state.reminderList[0]
	};
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onCancel: () => {
		},
		onSave: (name: string, date: number, color: string, id = uuid()) => {
			dispatch( addReminder({ name, date, color, id }) );
		}
	}
}

const ReminderFormContainer = connect( mapStateToProps, mapDispatchToProps )( ReminderForm );

export default ReminderFormContainer;
