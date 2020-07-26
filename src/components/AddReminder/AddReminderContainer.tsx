import { connect } from 'react-redux';
import AddReminder from './AddReminder';
import { closeAddReminder } from '../../redux/actions';

interface State {
	addReminderStatus: {
		isOpen: boolean
	}
}

const mapStateToProps = (state:State) => {
	return { 
		isOpen: state.addReminderStatus.isOpen,
		date: "08/27/1984 2:00PM"
	};
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAddReminder() );
		}
	}
}

const AddReminderContainer = connect( mapStateToProps, mapDispatchToProps )( AddReminder );

export default AddReminderContainer;
