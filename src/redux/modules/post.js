import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { dbService, storageService } from '../../fBase';

/* 
postList
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
	postList: [],
	postSelector: '',
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
	getPostList: {
		isGet: false,
		loading: false,
		getError: '',
	},
	setPostObj: {
		isSet: false,
		loading: false,
		setError: '',
	},
	updatePostUserInfo: {
		isUpdate: false,
		loading: false,
		updateError: '',
	},
};

// Async
export const updatePostUserInfoThunk = createAsyncThunk(
	'redux-racstagram/post/updatePostUserInfoThunk',
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
			await console.log(col.docs, 'docs');
			const posts = [...col.docs];
			console.log(posts);
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
				common: { getImageUrl },
			} = await thunkAPI.getState();
			const { postId, text, prevImageUrl, imageBase64, userId } = inputs;
			// 유저 방어 코드
			if (userId === currentUser.uid) {
				if (prevImageUrl) {
					await storageService.refFromURL(prevImageUrl).delete();
				}
				if (imageBase64) {
					await dbService.collection('posts').doc(postId).update({
						postImageUrl: getImageUrl.imageUrl,
					});
				}
				if (text) {
					await dbService
						.collection('posts')
						.doc(postId)
						.update({
							postText: text ?? '',
						});
				}
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
	async (data, thunkAPI) => {
		try {
			const {
				profile: { currentUser },
				post: { postSelector },
			} = await thunkAPI.getState();
			let result = '';
			const { postId, postImageUrl, userId } = postSelector;
			// 유저 방어 코드
			if (userId === currentUser.uid) {
				await dbService.collection('posts').doc(postId).delete();
				if (postImageUrl !== '') {
					await storageService.refFromURL(postImageUrl).delete();
				}
				result = postId;
			} else {
				throw new Error('Invalid user access!');
			}
			return result;
		} catch ({ code, message }) {
			console.log({ code, message });
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const setPostObjThunk = createAsyncThunk(
	'redux-racstagram/post/setPostObjThunk',
	async (text, thunkAPI) => {
		try {
			const {
				profile: { currentUser },
				common: { getImageUrl },
				users: { currentUserInfo },
			} = await thunkAPI.getState();
			const postObj = {
				postText: text,
				postDate: Date.now(),
				userId: currentUser.uid,
				userPhotoUrl: currentUserInfo.userPhotoUrl,
				userDisplayName: currentUserInfo.userDisplayName,
				postImageUrl: getImageUrl.imageUrl,
			};
			await dbService.collection('posts').add(postObj);
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({
				code,
				message,
			});
		}
	}
);

export const getPostListThunk = createAsyncThunk(
	'redux-racstagram/post/getPostListThunk',
	async (thunkAPI) => {
		try {
			const array = await dbService
				.collection('posts')
				.orderBy('postDate', 'desc')
				.get();
			const postList = array.docs.map((doc) => ({
				postId: doc.id,
				...doc.data(),
			}));
			return postList;
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
		[updatePostUserInfoThunk.pending]: (state) => ({
			...state,
			updatePostUserInfo: { ...state.updatePostUserInfo, loading: true },
		}),
		[updatePostUserInfoThunk.fulfilled]: (state, { payload }) => ({
			...state,
			updatePostUserInfo: {
				...state.updatePostUserInfo,
				loading: false,
				isUpdate: payload,
			},
		}),
		[updatePostUserInfoThunk.rejected]: (state, { payload }) => ({
			...state,
			updatePostUserInfo: {
				...state.updatePostUserInfo,
				loading: false,
				updateError: payload,
			},
		}),
		[setPostObjThunk.pending]: (state) => ({
			...state,
			setPostObj: { ...state.setPostObj, loading: true },
		}),
		[setPostObjThunk.fulfilled]: (state, { payload }) => ({
			...state,
			setPostObj: {
				...state.setPostObj,
				loading: false,
				isSet: payload,
			},
		}),
		[setPostObjThunk.rejected]: (state, { payload }) => ({
			...state,
			setPostObj: {
				...state.setPostObj,
				loading: false,
				setError: payload,
			},
		}),
		[getPostListThunk.pending]: (state) => ({
			...state,
			getPostList: { ...state.getPostList, loading: true },
		}),
		[getPostListThunk.fulfilled]: (state, { payload }) => ({
			...state,
			postList: payload,
			getPostList: {
				...state.getPostList,
				loading: false,
				isGet: true,
			},
		}),
		[getPostListThunk.rejected]: (state, { payload }) => ({
			...state,
			getPostList: {
				...state.getPostList,
				loading: false,
				getError: payload,
			},
		}),
		[deletePostThunk.pending]: (state) => ({
			...state,
			deletePost: { ...state.deletePost, loading: true },
		}),
		[deletePostThunk.fulfilled]: (state, { payload }) => {
			const result = state.postList.filter((post) => post.postId !== payload);
			return {
				...state,
				postList: result,
				deletePost: {
					...state.deletePost,
					loading: false,
					isDelete: true,
				},
			};
		},
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
