import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import AppContainer from './components/App/AppContainer';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import calendarApp from './redux/reducers';
import * as serviceWorker from './serviceWorker';
import './index.css';

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

const store = createStore(
	calendarApp,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Router>
		<Provider store={ store as any}>
			<AppContainer />
		</Provider>
	</Router>,
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
