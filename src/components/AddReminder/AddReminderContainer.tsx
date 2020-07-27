import { connect } from 'react-redux';
import AddReminder from './AddReminder';

interface State {
}

const mapStateToProps = (state:State) => {}

const AddReminderContainer = connect( mapStateToProps )( AddReminder );

export default AddReminderContainer;
