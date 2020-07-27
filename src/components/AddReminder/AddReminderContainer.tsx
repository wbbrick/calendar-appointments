import { connect } from 'react-redux';
import AddReminder from './AddReminder';

interface State {
}

const mapStateToProps = (state:State) => {
	return { 
		date: "08/27/1984 2:00PM"
	};
}

const AddReminderContainer = connect( mapStateToProps )( AddReminder );

export default AddReminderContainer;
