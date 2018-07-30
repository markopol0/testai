// Reducer
// Reducers only update the State
import * as actionType from '../actionTypes/actionTypes';
import {REHYDRATE} from 'redux-persist/src/constants'

const app = (state = {
	getNotifiedEmail: '',

}, action) => {
		switch (action.type) {
			case actionType.SET_APP_STATE:
				return {
					...state,
					...action.data,
				}
			case actionType.CLEAR_APP_STATE:
				return {
					getNotifiedEmail: '',
				}
			case REHYDRATE:
				if(!action.payload){
					action.payload={app:{}}
				}
				return {
					...state,
					...action.payload.app,

					createAccount: false,
				}
				
			default:
				return state;
		}
}
export default app;
