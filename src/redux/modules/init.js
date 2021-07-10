import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
	isInit: false,
	currentUser: {
		isSignIn: false,
		photoURL: '',
		displayName: '',
		uid: '',
	},
};

// Slice
const init = createSlice({
	name: 'redux-racstagram/init',
	initialState,
	reducers: {
		setIsinitTrue: (state) => ({
			...state,
			isInit: true,
		}),
		setCurrentUser: {
			reducer: (state, { payload }) => ({
				...state,
				currentUser: { ...state.currentUser, ...payload },
			}),
			prepare: ({ photoURL, displayName, uid }) => ({
				payload: uid
					? { photoURL, displayName, uid, isSignIn: true }
					: {
							photoURL: '',
							displayName: '',
							uid: '',
							isSignIn: false,
					  },
			}),
		},
	},
	extraReducers: {},
});

export default init.reducer;

// actionCreator
export const { setIsinitTrue, setCurrentUser } = init.actions;

// payload로 한번에 너무 많은 데이터를 redux로 보내면 안됨, prepare에서 걸러지도록 해야함
