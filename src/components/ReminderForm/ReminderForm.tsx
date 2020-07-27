import React, { useState, useEffect, ReactNode } from 'react';
import { useParams, Link } from "react-router-dom";
import { addDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Reminder from '../../types/Reminder';
import { v4 as uuid } from 'uuid';
import { parse, getUnixTime, fromUnixTime } from 'date-fns';

const DATE_FORMAT = 'MM/dd/yyyy HH:mm';

const styles = (theme: Theme) => createStyles({
	buttonContainer: {
		display: 'flex',
		position: 'absolute',
		bottom: '20px',
		right: '20px',
	},
	button: {
		flex: 'auto',
		margin: '0 5px'
	},
	colorPicker: {
		width: '20px'
	}
});

interface ContextualLinkProps {
	children: ReactNode,
	hasError: boolean,
	to: string
}

const ContextualLink = ( { children, hasError, to } : ContextualLinkProps ) => (
	hasError ? <>{children}</> : (
		<Link to={to}>
			{children}
		</Link>
	)
);
interface Props extends WithStyles<typeof styles>{
	onSave: (id: string, name: string, date: number, color: string, editMode: boolean) => void,
	reminderList: Array<Reminder>
};

const ReminderForm = ( { classes, onSave, reminderList } : Props) => {
	// our default reminder is set exactly 24 hours from now
	let defaults = {
		date: addDays(new Date(), 1),
		name: '',
		color: '#dd0000',
		id: uuid()
	};
	
	const { id } = useParams("id");
	const existingReminder = reminderList.find(rem => rem.id === id);
	const editMode = !!existingReminder;

	if( editMode ) {
		defaults = {...existingReminder, date: fromUnixTime(existingReminder.date)}
	}
	const [ date, setDate ] = useState(defaults.date);
	const [ name, setName ] = useState(defaults.name);
	const [ color, setColor] = useState(defaults.color);
	const [ nameError, setNameError ] = useState({ hasError: false, message: ''});

	useEffect(() => {
		if(name.length > 30) {
			setNameError({
				hasError: true,
				message: 'Your reminder name cannot exceed 30 characters.'
			});
		} else if(name.length === 0) {
			setNameError({
				hasError: true,
				message: 'Your reminder must be named.'
			});
		} else {
			setNameError({
				hasError: false,
				message: ''
			});
		}
	  }, [name])

	return (
		<Typography>
			<TextField
				id='name'
				label='Name'
				type='text'
				fullWidth
				value={name}
				onChange={ev => setName(ev.currentTarget.value)}
				InputLabelProps={{
					shrink: true
				}}
				error={nameError.hasError}
				helperText={nameError.message}
				margin='dense'
			/>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<DateTimePicker
					format={DATE_FORMAT}
					margin='dense'
					id='date-picker-inline'
					label='Date/Time'
					value={date}
					onChange={setDate.bind(setDate)}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
			<div>
				<TextField
					id='color'
					label='Color'
					type='color'
					value={color}
					onChange={ev=> setColor(ev.target.value)}
					InputLabelProps={{
						shrink: true
					}}
					className={classes.colorPicker}
					margin='dense'
				/>
			</div>
			<div className={classes.buttonContainer}>
				<Link to="/">
					<Button className={classes.button} onClick={() => ({})} variant='contained'>Cancel</Button>
				</Link>
				<ContextualLink hasError={nameError.hasError} to="/">
					<Button 
						className={classes.button} 
						disabled={nameError.hasError}
						onClick={() => {
							if(!nameError.hasError) {
								onSave(id, name, getUnixTime(date), color, editMode) 
							}
						}}
						variant='contained' 
						color='primary'
					>
						Save
					</Button>
				</ContextualLink>
			</div>
		</Typography>
	);
}


export default withStyles(styles)( ReminderForm );
