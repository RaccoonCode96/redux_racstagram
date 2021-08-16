import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbService } from '../../fBase';

// Initial State
const initialState = {
	comments: [],
	setComment: {
		loading: false,
		isSet: false,
		setError: '',
	},
	getComments: {
		loading: false,
		isGet: false,
		getError: '',
	},
	deleteComments: {
		loading: false,
		isDelete: false,
		deleteError: '',
	},
};

// async
export const setCommentThunk = createAsyncThunk(
	'redux-racstagram/comment/setCommentThunk',
	async ({ comment, postId }, thunkAPI) => {
		try {
			const {
				users: { currentUserInfo },
				comment: { comments },
			} = thunkAPI.getState();

			const commentObj = {
				postId,
				userDisplayName: currentUserInfo.displayName,
				userPhotoUrl: currentUserInfo.userPhotoUrl,
				commentDate: Date.now(),
				comment,
				count: comments[0] ? comments[0].count + 1 : 0,
			};
			await dbService.collection('comments').doc().set(commentObj);
			thunkAPI.dispatch(getCommentsThunk(postId));
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const getCommentsThunk = createAsyncThunk(
	'redux-racstagram/comment/getCommentsThunk',
	async (postId, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('comments')
				.where('postId', '==', postId)
				.orderBy('commentDate', 'desc')
				.get();
			const comments = docs.map((doc) => ({
				commentId: doc.id,
				...doc.data(),
			}));
			return comments;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const deleteCommentsThunk = createAsyncThunk(
	'redux-racstagram/comment/deleteCommentsThunk',
	async (postId, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('comments')
				.where('postId', '==', postId)
				.get();
			const promises = docs.forEach((doc) => {
				dbService.collection('comments').doc(doc.id).delete();
			});
			await Promise.all(promises);
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

// slice

const comment = createSlice({
	name: 'redux-racstagram/comment',
	initialState,
	reducers: {},
	extraReducers: {
		[deleteCommentsThunk.pending]: (state) => ({
			...state,
			deleteComments: { ...state.deleteComments, loading: true },
		}),
		[deleteCommentsThunk.fulfilled]: (state, { payload }) => ({
			...state,
			deleteComments: {
				...state.deleteComments,
				loading: false,
				isDelete: payload,
			},
		}),
		[deleteCommentsThunk.rejected]: (state, { payload }) => ({
			...state,
			deleteComments: {
				...state.deleteComments,
				loading: false,
				deleteError: payload,
			},
		}),
		[setCommentThunk.pending]: (state) => ({
			...state,
			setComment: { ...state.setComment, loading: true },
		}),
		[setCommentThunk.fulfilled]: (state, { payload }) => ({
			...state,
			setComment: {
				...state.setComment,
				loading: false,
				isSet: payload,
			},
		}),
		[setCommentThunk.rejected]: (state, { payload }) => ({
			...state,
			setComment: {
				...state.setComment,
				loading: false,
				setError: payload,
			},
		}),
		[getCommentsThunk.pending]: (state) => ({
			...state,
			getComments: { ...state.getComments, loading: true },
		}),
		[getCommentsThunk.fulfilled]: (state, { payload }) => ({
			...state,
			comments: payload,
			getComments: {
				...state.getComments,
				loading: false,
				isGet: true,
			},
		}),
		[getCommentsThunk.rejected]: (state, { payload }) => ({
			...state,
			getComments: {
				...state.getComments,
				loading: false,
				getError: payload,
			},
		}),
	},
});

export default comment.reducer;

// export const {} = comment.actions
