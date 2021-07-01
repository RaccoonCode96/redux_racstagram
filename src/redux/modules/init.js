import { createActions, handleActions } from 'redux-actions';

// init Structure
const initialState = {
	isInit: false,
	currentUser: {
		loading: false,
		photoURL: '',
		displayName: '',
		uid: '',
		error: '',
	},
};

// Action Creator (by redux-actions)

export const {
	getCurrentUserSuccess,
	getCurrentUserFail,
	getCurrentUserStart,
} = createActions(
	{
		GET_CURRENT_USER_SUCCESS: (user) => user,
		GET_CURRENT_USER_FALE: (error) => error,
	},
	'GET_CURRENT_USER_START',
	{
		prefix: 'redux-racstagram/init',
	}
);

export const { completeInit } = createActions('COMPLETE_INIT', {
	prefix: 'redux-racstagram/init',
});

// Reducer (by redux-actions)
const reducer = handleActions(
	{
		GET_CURRENT_USER_START: (state) => ({
			...state,
			currentUser: {
				loading: true,
			},
		}),
		GET_CURRENT_USER_SUCCESS: (state, action) => ({
			...state,
			currentUser: {
				photoURL: action.payload.photoURL,
				displayName: action.payload.displayName,
				uid: action.payload.uid,
			},
		}),
		GET_CURRENT_USER_FALE: (state, action) => ({
			...state,
			currentUser: {
				error: action.payload,
			},
		}),
		COMPLETE_INIT: (state, action) => ({
			...state,
			isInit: true,
		}),
	},
	initialState,
	{ prefix: 'redux-racstagram/init' }
);

export default reducer;
