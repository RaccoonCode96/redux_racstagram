import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbService } from '../../fBase';
import { getAllPostsThunk } from './post';

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
	deleteComment: {
		loading: false,
		isDelete: false,
		deleteError: '',
	},
	updateComment: {
		loading: false,
		isUpdate: false,
		updateError: '',
	},
};

// async
// 댓글 작성 요청 비동기 함수
export const setCommentThunk = createAsyncThunk(
	'redux-racstagram/comment/setCommentThunk',
	async ({ comment, postId }, thunkAPI) => {
		try {
			const {
				users: { currentUserInfo },
				comment: { comments },
				profile: {
					currentUser: { uid },
				},
			} = thunkAPI.getState();

			const commentObj = {
				userId: uid,
				postId,
				userDisplayName: currentUserInfo.displayName,
				userPhotoUrl: currentUserInfo.userPhotoUrl,
				commentDate: Date.now(),
				comment,
				count: comments[0] ? comments[0].count + 1 : 1,
			};
			await dbService.collection('comments').doc().set(commentObj);

			const { docs } = await dbService
				.collection('comments')
				.where('postId', '==', postId)
				.orderBy('commentDate', 'desc')
				.limit(2)
				.get();
			const commentArray = docs.map((doc) => ({
				comment: doc.data().comment,
				commentDate: doc.data().commentDate,
				commentDisplayName: doc.data().userDisplayName,
				commentId: doc.id,
				count: doc.data().count,
			}));
			await dbService
				.collection('posts')
				.doc(postId)
				.set({ commentArray }, { merge: true });

			thunkAPI.dispatch(getCommentsThunk(postId));
			thunkAPI.dispatch(getAllPostsThunk());
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

// 댓글 정보 요청 비동기 함수
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

// 특정 게시글의 댓글들 모두 삭제 비동기 함수
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

// 특정 게시글의 특정 댓글 삭제 비동기 함수
export const deleteCommentThunk = createAsyncThunk(
	'redux-racstagram/comment/deleteCommentThunk',
	async ({ commentId, postId }, thunkAPI) => {
		try {
			// comments의 comment delete
			await dbService.collection('comments').doc(commentId).delete();
			const { docs } = await dbService
				.collection('comments')
				.where('postId', '==', postId)
				.orderBy('commentDate', 'desc')
				.limit(2)
				.get();

			// delete 이후 최신 comment 가져와서 다시 post 설정
			const commentArray = docs.map((doc) => ({
				comment: doc.data().comment,
				commentDate: doc.data().commentDate,
				commentDisplayName: doc.data().userDisplayName,
				commentId: doc.id,
				count: doc.data().count,
			}));
			await dbService
				.collection('posts')
				.doc(postId)
				.set({ commentArray }, { merge: true });
			thunkAPI.dispatch(getCommentsThunk(postId));
			thunkAPI.dispatch(getAllPostsThunk());
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
		[deleteCommentThunk.pending]: (state) => ({
			...state,
			deleteComment: { ...state.deleteComment, loading: true },
		}),
		[deleteCommentThunk.fulfilled]: (state, { payload }) => ({
			...state,
			deleteComment: {
				...state.deleteComment,
				loading: false,
				isDelete: payload,
			},
		}),
		[deleteCommentThunk.rejected]: (state, { payload }) => ({
			...state,
			deleteComment: {
				...state.deleteComment,
				loading: false,
				deleteError: payload,
			},
		}),
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
