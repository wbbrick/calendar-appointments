import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import { isSameMonth, isSameDay, getDate } from 'date-fns';
import Reminder from '../../types/Reminder';
import { format, fromUnixTime } from 'date-fns';

const styles = (theme: Theme) => createStyles({
	dayCell: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		cursor: 'pointer'
	},
	dayCellOutsideMonth: {
		display: 'flex',
		flex: '1 0 13%',
		flexDirection: 'column',
		border: '1px solid lightgray',
		backgroundColor: 'rgba( 211, 211, 211, 0.4 )',
		cursor: 'pointer'
	},
	dateNumber: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: 'transparent'
	},
	todayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[400],
	},
	focusedAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#000',
		backgroundColor: '#f1f1f1',
	},
	focusedTodayAvatar: {
		margin: 5,
		height: '28px',
		width: '28px',
		fontSize: '0.85rem',
		color: '#fff',
		backgroundColor: deepPurple[800],
	},
	remindersContainer: {
		height: '100%',
		display: 'flex'
	},
	reminderCircle: {
		flex: '0 0 auto',
		height: '8px',
		width: '8px',
		margin: '6px 0',
		borderRadius: '4px',
		border: '1px solid red'
	}
});

interface DateObj {
	date: Date
}

interface Props extends WithStyles<typeof styles>{
	calendarDate: Date,
	dateObj: DateObj,
	onDayClick: (dateObj: DateObj) => void,
	reminderList: Array<Reminder>
}

const CalendarDay = (props: Props) => {
	const { classes, dateObj, calendarDate, reminderList, onDayClick } = props;
	const [ focused, setFocused ] = useState(false)

	const isToday = isSameDay( dateObj.date, new Date() );
	const avatarClass = isToday && focused ? classes.focusedTodayAvatar :
		isToday ? classes.todayAvatar :
		focused ? classes.focusedAvatar :
		classes.dateNumber;
	
	const todaysReminders = reminderList.filter(
		rem => format(fromUnixTime(rem.date), 'MM/dd/yyyy') === format(dateObj.date, 'MM/dd/yyyy')
	);

	const onMouseOver = () => setFocused(true)
	const onMouseOut = () => setFocused(false)

	return (
		<div
			onMouseOver={ onMouseOver }
			onMouseOut={ onMouseOut }
			onClick={ () => onDayClick( dateObj ) }
			className={
				isSameMonth( dateObj.date, calendarDate )
					? classes.dayCell
					: classes.dayCellOutsideMonth
			}
		>
			<Avatar className={ avatarClass }>{ getDate( dateObj.date ) }</Avatar>
			<div className={ classes.remindersContainer }>
				{ todaysReminders.map((rem, idx) => (
					<div className={classes.reminderCircle} key={idx} />
				) ) }
			</div>
		</div>
	)
}

export default withStyles( styles )( CalendarDay );
