import React from 'react';
import { Link, useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { WithStyles, withStyles, createStyles, Theme } from '@material-ui/core/styles';
import ReminderFormContainer from '../ReminderForm/ReminderFormContainer';

const styles = (theme: Theme) => createStyles({
	addReminderFormContainer: {
		minHeight: '250px',
		marginTop: '10px',
		display: 'flex',
		flexDirection: 'column'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	}
});

interface Props extends WithStyles<typeof styles>{
}

const AddReminder = (props:Props) => {
	const { classes } = props;
	const { id } = useParams('id');

	return (
		<Dialog
			open
			aria-labelledby='form-dialog-title'
			fullWidth
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				{id === 'new' ? 'Add Reminder' : 'Edit Reminder'}
				<Link to="/">
					<IconButton aria-label='Close' className={ classes.closeButton } onClick={() => ({})}>
						<CloseIcon />
					</IconButton>
				</Link>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.addReminderFormContainer }>
				<Typography>
					<ReminderFormContainer />
				</Typography>
			</DialogContent>
		</Dialog>
	);
}

export default withStyles(styles)( AddReminder );
