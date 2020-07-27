import { connect } from 'react-redux';
import CalendarDay from './CalendarDay';
import Reminder from '../../types/Reminder';

interface Props {

}

interface State {
	reminderList: Array<Reminder>
}

interface DateObj {
	date: Date
}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	return { ...state, ...ownProps };
}


const CalendarDayContainer = connect( mapStateToProps )( CalendarDay );

export default CalendarDayContainer;
