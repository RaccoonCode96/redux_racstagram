import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidV4 } from 'uuid';
import { dbService } from '../../fBase';
import { deleteCommentsThunk } from './comment';
import { deleteImageUrlThunk, resetImage } from './image';

/* 
posts
 [
  {
    postId,
    postDate,
    postImageUrl,
    postText,
    userDisplayName,
    userId,
    userPhotoUrl,
    commentArray,
    likeCount,
    isLike
  }
] 
*/

// Initial State
const initialState = {
	allPosts: [],
	userPosts: [],
	currentUserPosts: [],
	prevScrollY: 0,
	getAllPosts: {
		isGet: false,
		loading: false,
		getError: '',
	},
	getMorePosts: {
		isGet: false,
		loading: false,
		getError: '',
		isNone: false,
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
			const { docs } = await dbService
				.collection('posts')
				.where('userId', '==', currentUser.uid)
				.get();
			const posts = [...docs];
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
				thunkAPI.dispatch(getAllPostsThunk());
				thunkAPI.dispatch(resetImage());
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
			const { postId, postImageUrl, userId } = post;
			// 유저 방어 코드
			if (userId === currentUser.uid) {
				await dbService.collection('posts').doc(postId).delete();
				thunkAPI.dispatch(deleteCommentsThunk(postId));
				dbService.collection('likes').doc(postId).delete();
				if (postImageUrl !== '') {
					await thunkAPI.dispatch(deleteImageUrlThunk(postImageUrl));
				}
			} else {
				throw new Error('Invalid user access!');
			}
			await thunkAPI.dispatch(resetImage());
			return true;
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
				userDisplayName: currentUserInfo.displayName,
				postImageUrl: imageUrl,
				commentArray: [],
			};
			const postId = uuidV4();
			await Promise.all([
				dbService.collection('posts').doc(postId).set(post),
				dbService.collection('likes').doc(postId).set({
					likeCount: 0,
					likeUsers: [],
				}),
			]);
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

export const getMorePostsThunk = createAsyncThunk(
	'redux-racstagram/post/getMorePostsThunk',
	async ({ postDate, type, userName }, thunkAPI) => {
		try {
			const {
				profile: { currentUser },
			} = await thunkAPI.getState();
			let query = dbService.collection('posts').orderBy('postDate', 'desc');

			if (type === 'allPosts') {
			} else if (type === 'userPosts') {
				query = query.where('userDisplayName', '==', userName);
			} else if (type === 'currentUserPosts') {
				query = query.where('userId', '==', currentUser.uid);
			}
			const { docs } = await query.startAfter(postDate).limit(5).get();
			if (!docs.length) {
				return { type: 'none' };
			}
			const posts = docs.map((doc) => ({
				postId: doc.id,
				...doc.data(),
			}));

			return { posts, type };
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const getAllPostsThunk = createAsyncThunk(
	'redux-racstagram/post/getAllPostsThunk',
	async (_, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('posts')
				.orderBy('postDate', 'desc')
				.limit(6)
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

export const getUserPostsThunk = createAsyncThunk(
	'redux-racstagram/post/getUserPostsThunk',
	async (userName, thunkAPI) => {
		try {
			const { docs } = await dbService
				.collection('posts')
				.where('userDisplayName', '==', userName)
				.orderBy('postDate', 'desc')
				.limit(9)
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
			const { docs } = await dbService
				.collection('posts')
				.where('userId', '==', currentUser.uid)
				.orderBy('postDate', 'desc')
				.limit(9)
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

// Slice
const post = createSlice({
	name: 'redux-racstagram/post',
	initialState,
	reducers: {
		resetPost: (state) => ({
			...initialState,
		}),
		resetGetMorePosts: (state) => ({
			...state,
			getMorePosts: { ...initialState.getMorePosts },
		}),
		setPrevScrollY: (state, { payload }) => ({
			...state,
			prevScrollY: payload,
		}),
		resetGetUserPosts: (state) => ({
			...state,
			getUserPosts: { ...initialState.getUserPosts },
		}),
		resetGetCurrentUserPosts: (state) => ({
			...state,
			getCurrentUserPosts: { ...initialState.getCurrentUserPosts },
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
			createPost: { ...state.createPost, loading: true },
		}),
		[createPostThunk.fulfilled]: (state, { payload }) => ({
			...state,
			createPost: {
				...state.createPost,
				loading: false,
				isSet: payload,
			},
		}),
		[createPostThunk.rejected]: (state, { payload }) => ({
			...state,
			createPost: {
				...state.createPost,
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
		[getMorePostsThunk.pending]: (state) => ({
			...state,
			getMorePosts: { ...state.getMorePosts, loading: true },
		}),
		[getMorePostsThunk.fulfilled]: (state, { payload }) => {
			if (payload.type === 'allPosts') {
				return {
					...state,
					allPosts: [...state.allPosts, ...payload.posts],
					getMorePosts: {
						...state.getMorePosts,
						loading: false,
						isGet: true,
					},
				};
			} else if (payload.type === 'currentUserPosts') {
				return {
					...state,
					currentUserPosts: [...state.currentUserPosts, ...payload.posts],
					getMorePosts: {
						...state.getMorePosts,
						loading: false,
						isGet: true,
					},
				};
			} else if (payload.type === 'userPosts') {
				return {
					...state,
					userPosts: [...state.userPosts, ...payload.posts],
					getMorePosts: {
						...state.getMorePosts,
						loading: false,
						isGet: true,
					},
				};
			} else if (payload.type === 'none') {
				return {
					...state,
					getMorePosts: {
						...state.getMorePosts,
						loading: false,
						isGet: true,
						isNone: true,
					},
				};
			}
		},
		[getMorePostsThunk.rejected]: (state, { payload }) => ({
			...state,
			getMorePosts: {
				...state.getMorePosts,
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
export const {
	resetPost,
	setPostFormError,
	resetGetMorePosts,
	setPrevScrollY,
	resetGetUserPosts,
	resetGetCurrentUserPosts,
} = post.actions;
