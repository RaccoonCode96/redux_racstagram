import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbService } from '../../fBase';
import { deleteImageUrlThunk, resetImage } from './image';

/* 
posts
 [
  {
    postId,
    userDisplayName,
    userId,
    postDate,
    userPhotoUrl,
    postImageUrl,
    postText
  }
] 
*/

// Initial State
const initialState = {
	allPosts: [],
	userPosts: [],
	currentUserPosts: [],
	getAllPosts: {
		isGet: false,
		loading: false,
		getError: '',
	},
	getUserPosts: {
		isGet: false,
		loading: false,
		getError: '',
	},
	getCurrentUserPosts: {
		isGet: false,
		loading: false,
		getError: '',
	},
	createPost: {
		isSet: false,
		loading: false,
		setError: '',
	},
	updatePost: {
		isUpdate: false,
		loading: false,
		updateError: '',
	},
	deletePost: {
		isDelete: false,
		loading: false,
		deleteError: '',
	},
	updatePostsUserInfo: {
		isUpdate: false,
		loading: false,
		updateError: '',
	},
};

// Async
export const updatePostsUserInfoThunk = createAsyncThunk(
	'redux-racstagram/post/updatePostsUserInfoThunk',
	async (info, thunkAPI) => {
		try {
			const { userPhotoUrl, userDisplayName } = info;
			const {
				profile: { currentUser },
			} = thunkAPI.getState();
			const col = await dbService
				.collection('posts')
				.where('userId', '==', currentUser.uid)
				.get();
			const posts = [...col.docs];
			for await (let post of posts) {
				dbService
					.collection('posts')
					.doc(post.id)
					.update({
						...(userPhotoUrl && { userPhotoUrl }),
						...(userDisplayName && { userDisplayName }),
					});
			}
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const updatePostThunk = createAsyncThunk(
	'redux-racstagram/post/updatePostThunk',
	async (inputs, thunkAPI) => {
		try {
			const {
				profile: { currentUser },
				image: { imageUrl: postImageUrl },
			} = await thunkAPI.getState();
			const {
				postId,
				text: postText,
				prevImageUrl,
				imageBase64,
				userId,
			} = inputs;
			// 유저 방어 코드
			if (userId === currentUser.uid) {
				if (prevImageUrl !== imageBase64) {
					thunkAPI.dispatch(deleteImageUrlThunk(prevImageUrl));
				}
				await dbService
					.collection('posts')
					.doc(postId)
					.update({
						...(postImageUrl && { postImageUrl }),
						...(postText && { postText }),
					});
				await thunkAPI.dispatch(resetImage());
			} else {
				throw new Error('Invalid user access!');
			}
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const deletePostThunk = createAsyncThunk(
	'redux-racstagram/post/deletePostThunk',
	async (post, thunkAPI) => {
		try {
			const {
				profile: { currentUser },
			} = await thunkAPI.getState();
			let result = '';
			const { postId, postImageUrl, userId } = post;
			// 유저 방어 코드
			if (userId === currentUser.uid) {
				await dbService.collection('posts').doc(postId).delete();
				if (postImageUrl !== '') {
					await thunkAPI.dispatch(deleteImageUrlThunk(postImageUrl));
				}
				result = postId;
			} else {
				throw new Error('Invalid user access!');
			}
			await thunkAPI.dispatch(resetImage());
			return result;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const createPostThunk = createAsyncThunk(
	'redux-racstagram/post/createPostThunk',
	async (text, thunkAPI) => {
		try {
			const {
				profile: { currentUser },
				image: { imageUrl },
				users: { currentUserInfo },
			} = await thunkAPI.getState();
			const post = {
				postText: text,
				postDate: Date.now(),
				userId: currentUser.uid,
				userPhotoUrl: currentUserInfo.userPhotoUrl,
				userDisplayName: currentUserInfo.userDisplayName,
				postImageUrl: imageUrl,
			};
			await dbService.collection('posts').add(post);
			await thunkAPI.dispatch(resetImage());
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({
				code,
				message,
			});
		}
	}
);

export const getAllPostsThunk = createAsyncThunk(
	'redux-racstagram/post/getAllPostsThunk',
	async (_, thunkAPI) => {
		try {
			const array = await dbService
				.collection('posts')
				.orderBy('postDate', 'desc')
				.get();
			const posts = array.docs.map((doc) => ({
				postId: doc.id,
				...doc.data(),
			}));
			return posts;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const getUserPostsThunk = createAsyncThunk(
	'redux-racstagram/post/getUserPostsThunk',
	async (userName, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('posts')
				.where('userDisplayName', '==', userName)
				.orderBy('postDate', 'desc')
				.get();
			const posts = docs.map((doc) => ({
				postId: doc.id,
				...doc.data(),
			}));
			return posts;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const getCurrentUserPostsThunk = createAsyncThunk(
	'redux-racstagram/post/getCurrentUserPostsThunk',
	async (_, thunkAPI) => {
		try {
			const {
				profile: { currentUser },
			} = thunkAPI.getState();
			const array = await dbService
				.collection('posts')
				.where('userId', '==', currentUser.uid)
				.orderBy('postDate', 'desc')
				.get();
			const posts = await array.docs.map((doc) => ({
				postId: doc.id,
				...doc.data(),
			}));
			return posts;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

// Slice
const post = createSlice({
	name: 'redux-racstagram/post',
	initialState,
	reducers: {
		resetPost: (state) => ({
			...initialState,
		}),
		selectPost: (state, { payload }) => ({
			...state,
			postSelector: payload,
		}),
	},
	extraReducers: {
		[updatePostsUserInfoThunk.pending]: (state) => ({
			...state,
			updatePostUserInfo: { ...state.updatePostUserInfo, loading: true },
		}),
		[updatePostsUserInfoThunk.fulfilled]: (state, { payload }) => ({
			...state,
			updatePostUserInfo: {
				...state.updatePostUserInfo,
				loading: false,
				isUpdate: payload,
			},
		}),
		[updatePostsUserInfoThunk.rejected]: (state, { payload }) => ({
			...state,
			updatePostUserInfo: {
				...state.updatePostUserInfo,
				loading: false,
				updateError: payload,
			},
		}),
		[createPostThunk.pending]: (state) => ({
			...state,
			setPostObj: { ...state.setPostObj, loading: true },
		}),
		[createPostThunk.fulfilled]: (state, { payload }) => ({
			...state,
			setPostObj: {
				...state.setPostObj,
				loading: false,
				isSet: payload,
			},
		}),
		[createPostThunk.rejected]: (state, { payload }) => ({
			...state,
			setPostObj: {
				...state.setPostObj,
				loading: false,
				setError: payload,
			},
		}),
		[getAllPostsThunk.pending]: (state) => ({
			...state,
			getAllPosts: { ...state.getAllPosts, loading: true },
		}),
		[getAllPostsThunk.fulfilled]: (state, { payload }) => ({
			...state,
			allPosts: payload,
			getAllPosts: {
				...state.getAllPosts,
				loading: false,
				isGet: true,
			},
		}),
		[getAllPostsThunk.rejected]: (state, { payload }) => ({
			...state,
			getAllPosts: {
				...state.getAllPosts,
				loading: false,
				getError: payload,
			},
		}),
		[getUserPostsThunk.pending]: (state) => ({
			...state,
			getUserPosts: { ...state.getUserPosts, loading: true },
		}),
		[getUserPostsThunk.fulfilled]: (state, { payload }) => ({
			...state,
			userPosts: payload,
			getUserPosts: {
				...state.getUserPosts,
				loading: false,
				isGet: true,
			},
		}),
		[getUserPostsThunk.rejected]: (state, { payload }) => ({
			...state,
			getUserPosts: {
				...state.getUserPosts,
				loading: false,
				getError: payload,
			},
		}),
		[getCurrentUserPostsThunk.pending]: (state) => ({
			...state,
			getCurrentUserPosts: { ...state.getCurrentUserPosts, loading: true },
		}),
		[getCurrentUserPostsThunk.fulfilled]: (state, { payload }) => ({
			...state,
			currentUserPosts: payload,
			getCurrentUserPosts: {
				...state.getCurrentUserPosts,
				loading: false,
				isGet: true,
			},
		}),
		[getCurrentUserPostsThunk.rejected]: (state, { payload }) => ({
			...state,
			getCurrentUserPosts: {
				...state.getCurrentUserPosts,
				loading: false,
				getError: payload,
			},
		}),
		[deletePostThunk.pending]: (state) => ({
			...state,
			deletePost: { ...state.deletePost, loading: true },
		}),
		[deletePostThunk.fulfilled]: (state, { payload }) => ({
			...state,
			deletePost: {
				...state.deletePost,
				loading: false,
				isDelete: true,
			},
		}),
		[deletePostThunk.rejected]: (state, { payload }) => ({
			...state,
			deletePost: {
				...state.deletePost,
				loading: false,
				deleteError: payload,
			},
		}),
		[updatePostThunk.pending]: (state) => ({
			...state,
			updatePost: { ...state.updatePost, loading: true },
		}),
		[updatePostThunk.fulfilled]: (state, { payload }) => ({
			...state,
			updatePost: { ...state.updatePost, isUpdate: payload, loading: false },
		}),
		[updatePostThunk.rejected]: (state, { payload }) => ({
			...state,
			updatePost: {
				...state.updatePost,
				loading: false,
				updateError: payload,
			},
		}),
	},
});

export default post.reducer;

// actionCreator
export const { resetPost, selectPost } = post.actions;
