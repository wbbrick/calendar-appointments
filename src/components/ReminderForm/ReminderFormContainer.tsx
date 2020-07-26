import { connect } from 'react-redux';
import ReminderForm from './ReminderForm';
import { closeAddReminder } from '../../redux/actions';

interface State {
	addReminderStatus: {
		isOpen: boolean
	}
}

const mapStateToProps = (state:State) => {
	return { 
		isOpen: state.addReminderStatus.isOpen
	};
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAddReminder() );
		}
	}
}

const ReminderFormContainer = connect( mapStateToProps, mapDispatchToProps )( ReminderForm );

export default ReminderFormContainer;
