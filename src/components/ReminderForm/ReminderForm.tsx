import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {  MuiPickersUtilsProvider, TimePicker, DateTimePicker } from 'material-ui-pickers';
  import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
	
};

const ReminderForm = (props: Props) => {
	const { classes } = props;
	const [ date, setDate ] = useState('1/1/2001');
	const [ name, setName ] = useState('');

	return (
		<Typography>
			<TextField
				id="name"
				label="Name"
				type="text"
				fullWidth
				value={name}
				onChange={newName => setName(newName.currentTarget.value)}
				InputLabelProps={{
					shrink: true
				}}
				margin="dense"
			/>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<DateTimePicker
					format="MM/dd/yyyy h:mma"
					margin="normal"
					id="date-picker-inline"
					label="Date picker inline"
					value={date}
					onChange={setDate.bind(setDate)}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
				/>
			</MuiPickersUtilsProvider>
			<div className={classes.buttonContainer}>
				<Button className={classes.button} variant="contained">Cancel</Button>
				<Button className={classes.button} variant="contained" color="primary">Save</Button>
			</div>
		</Typography>
	);
}


export default withStyles(styles)( ReminderForm );
