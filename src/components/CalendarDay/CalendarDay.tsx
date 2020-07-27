import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
		display: 'flex',
		flexWrap: 'wrap',
		margin: '5px'
	},
	reminderBadge: {
		flex: '0 0 auto',
		height: '8px',
		width: '8px',
		margin: '2px',
		borderRadius: '4px',
		border: '1px solid black',
	},
	overflowMessage: {
		fontFamily: "sans-serif",
		fontSize: "12px",
		margin: "auto"
	},
	agendaLink: {
		textDecoration: "none",
		fontColor: "black"
	}
});

interface DateObj {
	date: Date
}

interface Props extends WithStyles<typeof styles>{
	calendarDate: Date,
	dateObj: DateObj,
	reminderList: Array<Reminder>
}

const CalendarDay = (props: Props) => {
	const { classes, dateObj, calendarDate, reminderList } = props;
	const [ focused, setFocused ] = useState(false)

	const isToday = isSameDay( dateObj.date, new Date() );
	const avatarClass = isToday && focused ? classes.focusedTodayAvatar :
		isToday ? classes.todayAvatar :
		focused ? classes.focusedAvatar :
		classes.dateNumber;
	
	const todaysReminders = reminderList
		.filter(rem => 
			format(fromUnixTime(rem.date), 'MM/dd/yyyy') === format(dateObj.date, 'MM/dd/yyyy')
		).map(rem => (
			<div className={ classes.reminderBadge } style={{ backgroundColor: rem.color}} {...rem} />
		));

	const onMouseOver = () => setFocused(true)
	const onMouseOut = () => setFocused(false)

	return (
		<div
			onMouseOver={ onMouseOver }
			onMouseOut={ onMouseOut }
			className={
				isSameMonth( dateObj.date, calendarDate )
					? classes.dayCell
					: classes.dayCellOutsideMonth
			}
		>
			<Link className={classes.agendaLink} to={`/agenda/${format(dateObj.date, 'MM-dd-yyyy')}`}>
				<Avatar className={ avatarClass }>{ getDate( dateObj.date ) }</Avatar>
				<div className={ classes.remindersContainer }>
					{todaysReminders.length <= 10 ? todaysReminders : (<span className={ classes.overflowMessage }>10+</span>)}
				</div>
			</Link>
		</div>
	)
}

export default withStyles( styles )( CalendarDay );
