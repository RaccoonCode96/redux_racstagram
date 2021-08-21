import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbService } from '../../fBase';

// InitialState
const initialState = {
	likes: [],
	getLikes: {
		isGet: false,
		loading: false,
		getError: '',
	},
	setLikeOff: {
		isSet: false,
		loading: false,
		setError: '',
	},
	setLikeOn: {
		isSet: false,
		loading: false,
		setError: '',
	},
};

// Async
export const getLikesThunk = createAsyncThunk(
	'redux-racstagram/post/getLikesThunk',
	async (_, thunkAPI) => {
		try {
			const {
				profile: {
					currentUser: { uid },
				},
			} = thunkAPI.getState();
			const { docs } = await dbService.collection('likes').get();
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
	'redux-racstagram/post/setLikeOnThunk',
	async (postId, thunkAPI) => {
		try {
			const {
				profile: {
					currentUser: { uid },
				},
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
			thunkAPI.dispatch(getLikesThunk());
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const setLikeOffThunk = createAsyncThunk(
	'redux-racstagram/post/setLikeOffThunk',
	async (postId, thunkAPI) => {
		try {
			const {
				profile: {
					currentUser: { uid },
				},
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
			thunkAPI.dispatch(getLikesThunk());
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

const like = createSlice({
	name: 'redux-racstagram/like',
	initialState,
	reducers: {},
	extraReducers: {
		[getLikesThunk.pending]: (state) => ({
			...state,
			getLikes: { ...state.getLikes, loading: true },
		}),
		[getLikesThunk.fulfilled]: (state, { payload }) => ({
			...state,
			likes: payload,
			getLikes: {
				...state.getLikes,
				loading: false,
				isGet: true,
			},
		}),
		[getLikesThunk.rejected]: (state, { payload }) => ({
			...state,
			getLikes: {
				...state.getLikes,
				loading: false,
				setError: payload,
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
// export const {} = like.actions
