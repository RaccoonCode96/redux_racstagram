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
	selectedUserInfo: {
		userId: '',
		userPhotoUrl: '',
		userDisplayName: '',
		userIntro: '',
	},
	getUserInfo: {
		isGet: false,
		loading: false,
		getError: '',
	},
	selectedUserPostList: [],
	getSeletedUserPost: {
		loading: false,
		isGet: false,
		getError: '',
	},
};

// async
export const getSeletedUserPostThunk = createAsyncThunk(
	'redux-racstagram/users/getSeletedUserPostThunk',
	async (userDisplayName, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('posts')
				.where('userDisplayName', '==', userDisplayName)
				.orderBy('postDate', 'desc')
				.get();
			const postList = docs.map((doc) => ({
				postId: doc.id,
				...doc.data(),
			}));
			return postList;
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
				.where('userDisplayName', '==', userName)
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
		[getSeletedUserPostThunk.pending]: (state) => ({
			...state,
			getSeletedUserPost: { ...state.getSeletedUserPost, loading: true },
		}),
		[getSeletedUserPostThunk.fulfilled]: (state, { payload }) => ({
			...state,
			selectedUserPostList: payload,
			getSeletedUserPost: {
				...state.getSeletedUserPost,
				loading: false,
				isGet: true,
			},
		}),
		[getSeletedUserPostThunk.rejected]: (state, { payload }) => ({
			...state,
			getSeletedUserPost: {
				...state.getSeletedUserPost,
				loading: false,
				getError: payload,
			},
		}),
		[getUserInfoThunk.pending]: (state) => ({
			...state,
			getUserInfo: { ...state.getUserInfo, loading: true },
		}),
		[getUserInfoThunk.fulfilled]: (state, { payload }) => ({
			...state,
			selectedUserInfo: payload,
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
