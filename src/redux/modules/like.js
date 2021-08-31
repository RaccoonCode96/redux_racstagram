import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbService } from '../../fBase';

// InitialState
const initialState = {
	allLikes: [],
	userLikes: [],
	getAllLikes: {
		isGet: false,
		loading: false,
		getError: {},
	},
	getUserLikes: {
		isGet: false,
		loading: false,
		getError: {},
	},
	getMoreLikes: {
		isGet: false,
		loading: false,
		getError: {},
		isNone: false,
	},
	setLikeOff: {
		isSet: false,
		loading: false,
		setError: {},
	},
	setLikeOn: {
		isSet: false,
		loading: false,
		setError: {},
	},
};

// Async
export const getMoreLikesThunk = createAsyncThunk(
	'redux-racstagram/like/getMoreLikesThunk',
	async ({ postDate, type, userName }, thunkAPI) => {
		try {
			const {
				profile: {
					currentUser: { uid },
				},
			} = thunkAPI.getState();

			let query = dbService.collection('likes').orderBy('postDate', 'desc');

			if (type === 'allPosts') {
			} else if (type === 'userPosts') {
				query = query.where('userDisplayName', '==', userName);
			}
			const { docs } = await query.startAfter(postDate).limit(6).get();

			if (!docs.length) {
				return { type: 'none' };
			}

			const likes = docs.map((doc) => ({
				postId: doc.id,
				likeCount: doc.data().likeCount,
				isLike: doc.data().likeUsers.includes(uid),
			}));

			return { type, likes };
		} catch ({ message, code }) {
			return thunkAPI.rejectWithValue();
		}
	}
);

export const getAllLikesThunk = createAsyncThunk(
	'redux-racstagram/like/getAllLikesThunk',
	async (_, thunkAPI) => {
		try {
			const {
				profile: {
					currentUser: { uid },
				},
			} = thunkAPI.getState();

			const { docs } = await dbService
				.collection('likes')
				.orderBy('postDate', 'desc')
				.limit(6)
				.get();

			const likes = docs.map((doc) => ({
				postId: doc.id,
				likeCount: doc.data().likeCount,
				isLike: doc.data().likeUsers.includes(uid),
			}));

			return likes;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const getUserLikesThunk = createAsyncThunk(
	'redux-racstagram/like/getUserLikesThunk',
	async (userName, thunkAPI) => {
		try {
			const {
				profile: {
					currentUser: { uid },
				},
			} = thunkAPI.getState();

			const { docs } = await dbService
				.collection('likes')
				.where('userDisplayName', '==', userName)
				.orderBy('postDate', 'desc')
				.limit(6)
				.get();

			const likes = docs.map((doc) => ({
				postId: doc.id,
				likeCount: doc.data().likeCount,
				isLike: doc.data().likeUsers.includes(uid),
			}));

			return likes;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const setLikeOnThunk = createAsyncThunk(
	'redux-racstagram/like/setLikeOnThunk',
	async ({ postId, type }, thunkAPI) => {
		try {
			const {
				profile: {
					currentUser: { uid },
				},
				like,
			} = thunkAPI.getState();
			const doc = dbService.collection('likes').doc(postId);
			const prevDoc = await doc.get();

			await doc.set(
				{
					likeCount: prevDoc.data().likeCount + 1,
					likeUsers: [...prevDoc.data().likeUsers, uid],
				},
				{ merge: true }
			);

			const res = like[type].map((like) => {
				if (like.postId === postId) {
					return {
						...like,
						likeCount: like.likeCount + 1,
						isLike: true,
					};
				} else {
					return like;
				}
			});

			thunkAPI.dispatch(setLikeOn({ res, type }));
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const setLikeOffThunk = createAsyncThunk(
	'redux-racstagram/like/setLikeOffThunk',
	async ({ postId, type }, thunkAPI) => {
		try {
			const {
				profile: {
					currentUser: { uid },
				},
				like,
			} = thunkAPI.getState();
			const doc = dbService.collection('likes').doc(postId);
			const prevDoc = await doc.get();

			await doc.set(
				{
					likeCount: prevDoc.data().likeCount - 1,
					likeUsers: prevDoc
						.data()
						.likeUsers.filter((userId) => userId !== uid),
				},
				{ merge: true }
			);

			const res = like[type].map((like) => {
				if (like.postId === postId) {
					return {
						...like,
						likeCount: like.likeCount - 1,
						isLike: false,
					};
				} else {
					return like;
				}
			});

			thunkAPI.dispatch(setLikeOff({ res, type }));

			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

const like = createSlice({
	name: 'redux-racstagram/like',
	initialState,
	reducers: {
		resetGetMoreLikes: (state) => ({
			...state,
			getMoreLikes: { ...initialState.getMoreLikes },
		}),
		resetUserLikes: (state) => ({
			...state,
			userLikes: [...initialState.userLikes],
		}),
		setLikeOn: (state, { payload }) => ({
			...state,
			[payload.type]: payload.res,
		}),
		setLikeOff: (state, { payload }) => ({
			...state,
			[payload.type]: payload.res,
		}),
	},
	extraReducers: {
		[getMoreLikesThunk.pending]: (state) => ({
			...state,
			getMoreLikes: { ...state.getMoreLikes, loading: true },
		}),
		[getMoreLikesThunk.fulfilled]: (state, { payload }) => {
			if (payload.type === 'allPosts') {
				return {
					...state,
					allLikes: [...state.allLikes, ...payload.likes],
					getMoreLikes: {
						...state.getMoreLikes,
						loading: false,
						isGet: true,
					},
				};
			} else if (payload.type === 'userPosts') {
				return {
					...state,
					userLikes: [...state.userLikes, ...payload.likes],
					getMoreLikes: {
						...state.getMoreLikes,
						loading: false,
						isGet: true,
					},
				};
			} else if (payload.type === 'none') {
				return {
					...state,
					getMoreLikes: {
						...state.getMoreLikes,
						loading: false,
						isGet: true,
						isNone: true,
					},
				};
			}
		},
		[getMoreLikesThunk.rejected]: (state, { payload }) => ({
			...state,
			getMoreLikes: {
				...state.getMoreLikes,
				loading: false,
				getError: payload,
			},
		}),
		// getAllLikesThunk
		[getAllLikesThunk.pending]: (state) => ({
			...state,
			getAllLikes: { ...state.getAllLikes, loading: true },
		}),
		[getAllLikesThunk.fulfilled]: (state, { payload }) => ({
			...state,
			allLikes: payload,
			getAllLikes: { ...state.getAllLikes, loading: false, isGet: true },
		}),
		[getAllLikesThunk.rejected]: (state, { payload }) => ({
			...state,
			getLikes: {
				...state.getLikes,
				loading: false,
				getError: payload,
			},
		}),
		// getUserLikesThunk
		[getUserLikesThunk.pending]: (state) => ({
			...state,
			getUserLikes: { ...state.getUserLikes, loading: true },
		}),
		[getUserLikesThunk.fulfilled]: (state, { payload }) => ({
			...state,
			userLikes: payload,
			getUserLikes: { ...state.getUserLikes, loading: false, isGet: true },
		}),
		[getUserLikesThunk.rejected]: (state, { payload }) => ({
			...state,
			getUserLikes: {
				...state.getUserLikes,
				loading: false,
				getError: payload,
			},
		}),
		[setLikeOnThunk.pending]: (state) => ({
			...state,
			setLikeOn: { ...state.setLikeOn, loading: true },
		}),
		[setLikeOnThunk.fulfilled]: (state, { payload }) => ({
			...state,
			setLikeOn: {
				...state.setLikeOn,
				loading: false,
				isSet: payload,
			},
		}),
		[setLikeOnThunk.rejected]: (state, { payload }) => ({
			...state,
			setLikeOn: {
				...state.setLikeOn,
				loading: false,
				setError: payload,
			},
		}),
		[setLikeOffThunk.pending]: (state) => ({
			...state,
			setLikeOff: { ...state.setLikeOff, loading: true },
		}),
		[setLikeOffThunk.fulfilled]: (state, { payload }) => ({
			...state,
			setLikeOff: {
				...state.setLikeOff,
				loading: false,
				isSet: payload,
			},
		}),
		[setLikeOffThunk.rejected]: (state, { payload }) => ({
			...state,
			setLikeOff: {
				...state.setLikeOff,
				loading: false,
				setError: payload,
			},
		}),
	},
});

export default like.reducer;

// ActionCreator
export const { resetGetMoreLikes, resetUserLikes, setLikeOn, setLikeOff } =
	like.actions;
