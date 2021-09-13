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
// 제일 최근의 유저 숫자를 가져옴 (가입 순으로 붙여지는 숫자, 랜덤 유저 추천시 필요)
export const getUserMaxCountThunk = createAsyncThunk(
	'redux-racstagram/users/getUserMaxCountThunk',
	async (_, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('users')
				.orderBy('count', 'desc')
				.limit(1)
				.get();
			const res = docs.length ? docs[0].data() : { count: -1 };
			return res.count;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

// 랜덤으로 유저 정보 가져오기
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

			if (userMaxCount === -1) {
				return [];
			}
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

// 이름 중복 확인 요청
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

// 특정 유저 정보 가져오기
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

// 현재 유저 정보 설정 하기 (유저 정보 update시에 사용 됨)
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
						...(subDisplayName ? { subDisplayName } : { subDisplayName: '' }),
						...(userIntro ? { userIntro } : { userIntro: '' }),
						...(website ? { website } : { website: '' }),
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

// 현재 유저 정보 가져오기 (로그인시 필요함)
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
		resetUserInfo: (state) => ({
			...state,
			userInfo: initialState.userInfo,
		}),
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
export const { resetUsers, resetUserInfo } = users.actions;
