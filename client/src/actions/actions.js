//Actions
import * as actionType from '../actionTypes/actionTypes';


// APP Actions
export const setAppState = (data) => {
	return {
		type: actionType.SET_APP_STATE,
		data
	}
}
export const clearAppState = () => {
	return {
		type: actionType.CLEAR_APP_STATE,
	}
}
