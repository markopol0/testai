// Entry Point
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store';
import { Provider } from 'react-redux';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react'
import CircularProgress from '@material-ui/core/CircularProgress';

let {persistor, store} = configureStore()

if(typeof window !== 'undefined') { 
	ReactDOM.render(
		<Provider store={store}>
			<PersistGate 
				persistor={persistor} 
				loading={
					<div style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<CircularProgress  size={150} style={{color:'#4527a0'}} thickness={4} />
					</div>
				}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</PersistGate>
		</Provider>
		, document.querySelector('.container')
	);
}