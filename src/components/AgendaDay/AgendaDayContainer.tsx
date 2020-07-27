import { connect } from 'react-redux';
import AgendaDay from './AgendaDay';
import Reminder from '../../types/Reminder';
import { format, fromUnixTime } from 'date-fns';

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
	}
}

const AgendaDayContainer = connect( mapStateToProps, mapDispatchToProps )( AgendaDay );

export default AgendaDayContainer;
