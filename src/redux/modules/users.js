import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbService } from '../../fBase';

// Initial State

const initialState = {
	currentUserInfo: {
		userPhotoUrl: '',
		userDisplayName: '',
		userIntro: '',
	},
	setCurrentUserInfo: {
		isSet: false,
		loading: false,
		setError: '',
	},
	getCurrentUserInfo: {
		isGet: false,
		loading: false,
		getError: '',
	},
};

// async
// userId, userPhotoUrl, userDisplayName, userIntro
export const setCurrentUserInfoThunk = createAsyncThunk(
	'redux-racstagram/users/setCurrentUserInfoThunk',
	async (payload, thunkAPI) => {
		const {
			profile: { currentUser },
		} = thunkAPI.getState();
		const { userPhotoUrl, userDisplayName, userIntro } = payload;
		try {
			await dbService
				.collection('users')
				.doc(currentUser.uid)
				.set(
					{
						...(userPhotoUrl && { userPhotoUrl }),
						...(userDisplayName && { userDisplayName }),
						...(userIntro && { userIntro }),
					},
					{ merge: true }
				);
			return true;
		} catch ({ error, code }) {
			return thunkAPI.rejectWithValue({ error, code });
		}
	}
);

export const getCurrentUserInfoThunk = createAsyncThunk(
	'redux-racstagram/users/getCurrentUserInfoThunk',
	async (payload, thunkAPI) => {
		try {
			const {
				profile: { currentUser },
			} = thunkAPI.getState();
			const doc = await dbService
				.collection('users')
				.doc(currentUser.uid)
				.get();
			return { ...doc.data() };
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

// export const getCurrentUserInfoThunk = createAsyncThunk(
// 	'redux-racstagram/users/getCurrentUserInfoThunk',
// 	async (payload, thunkAPI) => {
// 		try {
// 			const {
// 				profile: { currentUser },
// 			} = thunkAPI.getState();
// 			let res = '';
// 			dbService.collection('users').onSnapshot(async (snapshot) => {
// 				for await (let doc of snapshot.docs) {
// 					if (doc.id === currentUser.uid) {
// 						res = { ...doc.data() };
// 					}
// 				}
// 			});
// 			await new Promise();
// 			console.log(res);
// 			return res;
// 		} catch ({ code, message }) {
// 			return thunkAPI.rejectWithValue({ code, message });
// 		}
// 	}
// );

// Slice
const users = createSlice({
	name: 'redux-racstagram/users',
	initialState,
	reducers: {},
	extraReducers: {
		[setCurrentUserInfoThunk.pending]: (state) => ({
			...state,
			setCurrentUserInfo: { ...state.setCurrentUserInfo, loading: true },
		}),
		[setCurrentUserInfoThunk.fulfilled]: (state, { payload }) => ({
			...state,
			setCurrentUserInfo: {
				...state.setCurrentUserInfo,
				loading: false,
				isSet: payload,
			},
		}),
		[setCurrentUserInfoThunk.rejected]: (state, { payload }) => ({
			...state,
			setCurrentUserInfo: {
				...state.setCurrentUserInfo,
				loading: false,
				setError: payload,
			},
		}),
		[getCurrentUserInfoThunk.pending]: (state) => ({
			...state,
			getCurrentUserInfo: { ...state.getCurrentUserInfo, loading: true },
		}),
		[getCurrentUserInfoThunk.fulfilled]: (state, { payload }) => ({
			...state,
			currentUserInfo: { ...state.currentUserInfo, ...payload },
			getCurrentUserInfo: {
				...state.getCurrentUserInfo,
				loading: false,
				isGet: true,
			},
		}),
		[getCurrentUserInfoThunk.rejected]: (state, { payload }) => ({
			...state,
			getCurrentUserInfo: {
				...state.getCurrentUserInfo,
				loading: false,
				getError: payload,
			},
		}),
	},
});

export default users.reducer;

// actionCreator
// export const {  } = users.actions;
