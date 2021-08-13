import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbService } from '../../fBase';
import useRandom from '../../hooks/useRandom';

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
	randomUserInfo: [],
	userMaxCount: 0,
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
	getRandomUserInfo: {
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
	getUserMaxCount: {
		isGet: false,
		loading: false,
		getError: '',
	},
};

// async
export const getUserMaxCountThunk = createAsyncThunk(
	'redux-racstagram/users/getUserMaxCountThunk',
	async (_, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('users')
				.orderBy('count', 'desc')
				.limit(1)
				.get();
			const res = docs[0].data();
			return res.count;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);
export const getRandomUserInfoThunk = createAsyncThunk(
	'redux-racstagram/users/getRandomUserInfoThunk',
	async (_, thunkAPI) => {
		try {
			await thunkAPI.dispatch(getUserMaxCountThunk());
			const {
				users: {
					currentUserInfo: { count },
					userMaxCount,
				},
			} = await thunkAPI.getState();
			const random = useRandom(2, userMaxCount, count);
			const { docs } = await dbService
				.collection('users')
				.where('count', 'in', random)
				.get();

			const res = docs.map((doc) => {
				const { displayName, userPhotoUrl } = doc.data();
				return { displayName, userPhotoUrl };
			});
			return res;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

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
		const {
			userPhotoUrl,
			displayName,
			userIntro,
			subDisplayName,
			website,
			count,
		} = payload;
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
						...(count && { count }),
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
		[getRandomUserInfoThunk.pending]: (state) => ({
			...state,
			getRandomUserInfo: { ...state.getRandomUserInfo, loading: true },
		}),
		[getRandomUserInfoThunk.fulfilled]: (state, { payload }) => ({
			...state,
			randomUserInfo: payload,
			getRandomUserInfo: {
				...state.getRandomUserInfo,
				loading: false,
				isGet: true,
			},
		}),
		[getRandomUserInfoThunk.rejected]: (state, { payload }) => ({
			...state,
			getRandomUserInfo: {
				...state.getRandomUserInfo,
				loading: false,
				getError: payload,
			},
		}),
		[getUserMaxCountThunk.pending]: (state) => ({
			...state,
			getUserMaxCount: { ...state.getUserMaxCount, loading: true },
		}),
		[getUserMaxCountThunk.fulfilled]: (state, { payload }) => ({
			...state,
			userMaxCount: payload,
			getUserMaxCount: {
				...state.getUserMaxCount,
				loading: false,
				isGet: true,
			},
		}),
		[getUserMaxCountThunk.rejected]: (state, { payload }) => ({
			...state,
			getUserMaxCount: {
				...state.getUserMaxCount,
				loading: false,
				getError: payload,
			},
		}),
	},
});

export default users.reducer;

// actionCreator
export const { resetUsers } = users.actions;
