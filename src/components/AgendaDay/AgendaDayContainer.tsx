import { connect } from 'react-redux';
import AgendaDay from './AgendaDay';
import { closeAgenda } from '../../redux/actions';
import Reminder from '../../types/Reminder';
import { format, fromUnixTime } from 'date-fns';

interface Props {}

interface State {
	agendaStatus: {
		isOpen: boolean,
		date: Date
	},
	reminderList: Array<Reminder>
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	const { agendaStatus, reminderList } = state;

	return { agendaStatus, reminderList };
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onClose: () => {
			dispatch( closeAgenda() );
		}
	}
}

const AgendaDayContainer = connect( mapStateToProps, mapDispatchToProps )( AgendaDay );

export default AgendaDayContainer;
