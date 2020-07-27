import { connect } from 'react-redux';
import AgendaDay from './AgendaDay';
import Reminder from '../../types/Reminder';
import { deleteReminder } from '../../redux/actions';

interface Props {}

interface State {
	reminderList: Array<Reminder>
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const { reminderList } = state;

	return { reminderList };
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onDelete: (id: string) => {
			dispatch( deleteReminder(id) );
		}
	}
}

const AgendaDayContainer = connect( mapStateToProps, mapDispatchToProps )( AgendaDay );

export default AgendaDayContainer;
