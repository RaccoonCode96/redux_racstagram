import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbService } from '../../fBase';

// Initial State

const initialState = {
	currentUserInfo: {
		userPhotoUrl: '',
		userIntro: '',
		displayName: '',
		subDisplayName: '',
		website: '',
	},
	userInfo: {
		userId: '',
		userPhotoUrl: '',
		userDisplayName: '',
		userIntro: '',
	},
	getCurrentUserInfo: {
		isGet: false,
		loading: false,
		getError: '',
	},
	getUserInfo: {
		isGet: false,
		loading: false,
		getError: '',
	},
	setCurrentUserInfo: {
		isSet: false,
		loading: false,
		setError: '',
	},
	checkDisplayName: {
		loading: false,
		isCheck: false,
		checkError: '',
		exist: [false, ''],
	},
};

// async
export const checkDisplayNameThunk = createAsyncThunk(
	'redux-racstagram/users/checkDisplayNameThunk',
	async (userName, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('users')
				.where('displayName', '==', userName)
				.get();
			const res = [!!docs[0], userName];
			return res;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const getUserInfoThunk = createAsyncThunk(
	'redux-racstagram/users/getUserInfoThunk',
	async (userName, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('users')
				.where('displayName', '==', userName)
				.get();
			const res = { ...docs[0].data(), userId: docs[0].id };
			return res;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

// userId, userPhotoUrl, userDisplayName, userIntro
export const setCurrentUserInfoThunk = createAsyncThunk(
	'redux-racstagram/users/setCurrentUserInfoThunk',
	async (payload, thunkAPI) => {
		const {
			profile: { currentUser },
		} = thunkAPI.getState();
		const { userPhotoUrl, displayName, userIntro, subDisplayName, website } =
			payload;
		try {
			await dbService
				.collection('users')
				.doc(currentUser.uid)
				.set(
					{
						...(userPhotoUrl && { userPhotoUrl }),
						...(displayName && { displayName }),
						...(userIntro && { userIntro }),
						...(subDisplayName && { subDisplayName }),
						...(website && { website }),
					},
					{ merge: true }
				);
			await thunkAPI.dispatch(getCurrentUserInfoThunk());
			return true;
		} catch ({ error, code }) {
			return thunkAPI.rejectWithValue({ error, code });
		}
	}
);

export const getCurrentUserInfoThunk = createAsyncThunk(
	'redux-racstagram/users/getCurrentUserInfoThunk',
	async (_, thunkAPI) => {
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

// Slice
const users = createSlice({
	name: 'redux-racstagram/users',
	initialState,
	reducers: {
		resetUsers: () => ({ ...initialState }),
	},
	extraReducers: {
		[checkDisplayNameThunk.pending]: (state) => ({
			...state,
			checkDisplayName: { ...state.checkDisplayName, loading: true },
		}),
		[checkDisplayNameThunk.fulfilled]: (state, { payload }) => ({
			...state,
			checkDisplayName: {
				...state.checkDisplayName,
				loading: false,
				isCheck: true,
				exist: payload,
			},
		}),
		[checkDisplayNameThunk.rejected]: (state, { payload }) => ({
			...state,
			checkDisplayName: {
				...state.checkDisplayName,
				loading: false,
				checkError: payload,
			},
		}),

		[getUserInfoThunk.pending]: (state) => ({
			...state,
			getUserInfo: { ...state.getUserInfo, loading: true },
		}),
		[getUserInfoThunk.fulfilled]: (state, { payload }) => ({
			...state,
			userInfo: payload,
			getUserInfo: {
				...state.getUserInfo,
				loading: false,
				isGet: true,
			},
		}),
		[getUserInfoThunk.rejected]: (state, { payload }) => ({
			...state,
			getUserInfo: {
				...state.getUserInfo,
				loading: false,
				getError: payload,
			},
		}),
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
export const { resetUsers } = users.actions;
