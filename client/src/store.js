import { compose, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage' 
import sessionStorage from 'redux-persist/lib/storage/session'
import createEncryptor from 'redux-persist-transform-encrypt';
import rootReducer from './reducers/reducers';
import thunk from 'redux-thunk';

var composeEnhancers = compose;

const middleware = [ thunk ]
if(typeof window !== 'undefined') {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
if (process.env.NODE_ENV !== 'production') {
  	middleware.push(createLogger({diff: true}))
}
const encryptor = createEncryptor({
  	secretKey: 'h5hbfASDDsjna'
});
const config = {
	key: 'root', // key is required
	storage, // storage is now required
	debug: 'true',
	transforms: [encryptor]
}
const reducer = persistReducer(config, rootReducer)

function configureStore () {
	let store = createStore(
		reducer,
		composeEnhancers(
			applyMiddleware(
				...middleware
			),
		)
	);
	let persistor = (persistStore(store));
	return { persistor, store }  
}
export default configureStore;
