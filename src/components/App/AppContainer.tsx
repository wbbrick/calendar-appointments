import { connect } from 'react-redux';

import App from './App';


interface Props {}
interface State {}

const mapStateToProps = ( state: State, ownProps: Props ) => {
	return {};
}

const AppContainer = connect( mapStateToProps )( App );

export default AppContainer;
