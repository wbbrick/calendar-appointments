import React, { useState, useEffect, ReactNode } from 'react';
import { Link } from "react-router-dom";
import { addDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Reminder from '../../types/Reminder';
import { parse, getUnixTime } from 'date-fns';

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
	onSave: (name: string, date: number, color: string) => void,
	onCancel: () => void,
	reminder?: Partial<Reminder>
};

const ReminderForm = ( { classes, onSave, onCancel, reminder } : Props) => {
	// our default reminder is set exactly 24 hours from now
	const [ date, setDate ] = useState(addDays(new Date(), 1));
	const [ name, setName ] = useState('');
	const [ color, setColor] = useState('#dd0000');
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
					<Button className={classes.button} onClick={onCancel} variant='contained'>Cancel</Button>
				</Link>
				<ContextualLink hasError={nameError.hasError} to="/">
					<Button 
						className={classes.button} 
						disabled={nameError.hasError}
						onClick={() => {
							if(!nameError.hasError) {
								onSave(name, getUnixTime(date), color) 
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
