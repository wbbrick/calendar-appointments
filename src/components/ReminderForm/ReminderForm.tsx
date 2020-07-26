import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Reminder from '../../types/Reminder';
import { parse, getUnixTime } from 'date-fns';

const DATE_FORMAT = "MM/dd/yyyy HH:mm";

const styles = (theme: Theme) => createStyles({
	buttonContainer: {
		display: "flex",
		position: "absolute",
		bottom: "20px",
		right: "20px",
	},
	button: {
		flex: "auto",
		margin: "0 5px"
	}
});

interface Props extends WithStyles<typeof styles>{
	onSave: (name: String, date: number, color: String) => void,
	onCancel: () => void,
	reminder?: Partial<Reminder>
};

const ReminderForm = ( { classes, onSave, onCancel, reminder } : Props) => {
	// our default reminder is set exactly 24 hours from now
	const [ date, setDate ] = useState(format(addDays(new Date(), 1), DATE_FORMAT));
	const [ name, setName ] = useState('');
	const [ color, setColor] = useState('#fff');

	return (
		<Typography>
			<TextField
				id="name"
				label="Name"
				type="text"
				fullWidth
				value={name}
				onChange={ev => setName(ev.currentTarget.value)}
				InputLabelProps={{
					shrink: true
				}}
				margin="dense"
			/>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<DateTimePicker
					format="MM/dd/yyyy h:mma"
					margin="dense"
					id="date-picker-inline"
					label="Date picker inline"
					value={date}
					onChange={setDate.bind(setDate)}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
			<TextField
				id="color"
				label="Color"
				type="text"
				value={color}
				onChange={ev=> setName(ev.currentTarget.value)}
				InputLabelProps={{
					shrink: true
				}}
				margin="dense"
			/>
			<div className={classes.buttonContainer}>
				<Button className={classes.button} onClick={onCancel} variant="contained">Cancel</Button>
				<Button 
					className={classes.button} 
					onClick={() => onSave(name, getUnixTime(parse(date, DATE_FORMAT, new Date())), "#fff")}
					variant="contained" 
					color="primary"
				>
					Save
				</Button>
			</div>
		</Typography>
	);
}


export default withStyles(styles)( ReminderForm );
