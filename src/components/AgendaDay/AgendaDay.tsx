import React from 'react';
import { useParams, Link } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Reminder from '../../types/Reminder';
import { parse, format, fromUnixTime } from 'date-fns';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme: Theme) => createStyles({
	remindersContainer: {
		minHeight: '250px',
		marginTop: '10px'
	},
	closeButton: {
		position: 'absolute',
		right: '10px',
		top: '10px'
	},
	toolbarButtonHidden: {
		visibility: 'hidden'
	},
	toolbarButtonVisible: {
		visibility: 'visible'
	},
	colorIndicator: {
		display: 'inline-block',
		flex: '0 0 auto',
		height: '10px',
		width: '10px',
		margin: '0 2px',
		borderRadius: '10px',
		border: '1px solid black'
	},
	listEntry: {
		fontSize: '16px',
		'& span': {
			marginRight: '10px'
		}
	}
});

interface Props extends WithStyles<typeof styles>{
	reminderList: Array<Reminder>
}

const AgendaDay = (props: Props) => {
	const { classes, reminderList } = props;
	const { date } = useParams();
	const parsedDate = parse(date, 'MM-dd-yyyy', new Date());
	const dateTitle = parsedDate ? format( parsedDate, 'LLLL do, yyyy' ) : 'Closing'

	const todaysReminders = parsedDate ? 	
		reminderList
			.filter(
				rem => format(fromUnixTime(rem.date), 'MM/dd/yyyy') === format(parsedDate, 'MM/dd/yyyy')
			)
			.map(rem => ({ ...rem, "time": format(fromUnixTime(rem.date), "h:mma") })) : [];

	let agendaContent = (<div>No Reminders for today.</div>)
	
	if( todaysReminders.length > 0 ) {
		agendaContent = (
			<List aria-label="reminders">
				{ todaysReminders.map(rem => (
					<ListItem>
						<span className={ classes.colorIndicator } style={{ backgroundColor: rem.color}} {...rem} />
						<ListItemText>
							<Typography component="p" className={ classes.listEntry }>
								<span>{rem.time}</span>
								<Link to={`/reminder/${rem.id}`}>
									<span>{rem.name}</span>
								</Link>
							</Typography>
						</ListItemText>
					</ListItem>
				)) }
			</List>
		);
	}


	return (
		<Dialog
			open
			aria-labelledby='form-dialog-title'
			fullWidth
			maxWidth='md'
		>
			<DialogTitle id='form-dialog-title'>
				{ dateTitle }
				<Link to="/">
					<IconButton aria-label='Close' className={ classes.closeButton }>
						<CloseIcon />
					</IconButton>
				</Link>
			</DialogTitle>
			<Divider light />
			<DialogContent className={ classes.remindersContainer }>
				<Typography>
					{
						agendaContent
					}
				</Typography>
			</DialogContent>
		</Dialog>
	);
}

export default withStyles( styles )( AgendaDay );
