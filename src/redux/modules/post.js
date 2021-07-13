import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
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
	getImageUrl: {
		isGet: false,
		loading: false,
		getError: '',
		imageUrl: '',
	},
	setPostObj: {
		isSet: false,
		loading: false,
		setError: '',
	},
};

// Async
export const updatePostThunk = createAsyncThunk(
	'redux-racstagram/post/updatePostThunk',
	async (inputs, thunkAPI) => {
		try {
			const {
				init: { currentUser },
				post: { getImageUrl },
			} = await thunkAPI.getState();
			const { postId, text, prevImageUrl, userId } = inputs;
			// 유저 방어 코드
			if (userId === currentUser.uid) {
				if (prevImageUrl !== '') {
					await storageService.refFromURL(prevImageUrl).delete();
				}
				await dbService.collection('posts').doc(postId).update({
					postText: text,
					postImageUrl: getImageUrl.imageUrl,
				});
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
	async (thunkAPI) => {
		try {
			let result = '';
			const {
				init: { currentUser },
				post: { postSelector },
			} = await thunkAPI.getState();
			const { postId, postImageUrl, userId } = postSelector;
			// 유저 방어 코드
			if (userId === currentUser.uid) {
				await dbService.doc(`posts/${postId}`).delete();
				if (postImageUrl !== '') {
					await storageService.refFromURL(postImageUrl).delete();
				}
				result = postId;
			} else {
				throw new Error('Invalid user access!');
			}
			return result;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const getImageUrlThunk = createAsyncThunk(
	'redux-racstagram/post/getImageUrlThunk',
	async (imageBase64, thunkAPI) => {
		try {
			if (imageBase64) {
				const {
					init: { currentUser },
				} = await thunkAPI.getState();
				// storage 생성
				const attachmentRef = storageService
					.ref()
					.child(`${currentUser.uid}/${uuidv4()}`);
				// firebase storage에 데이터 넣기
				const res = await attachmentRef.putString(imageBase64, 'data_url');
				// url 가져오기
				return await res.ref.getDownloadURL();
			}
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({
				code,
				message,
			});
		}
	}
);

export const setPostObjThunk = createAsyncThunk(
	'redux-racstagram/post/setPostObjThunk',
	async (text, thunkAPI) => {
		try {
			const {
				init: { currentUser },
				post: { getImageUrl },
			} = await thunkAPI.getState();
			const postObj = {
				postText: text,
				postDate: Date.now(),
				userId: currentUser.uid,
				userPhotoUrl: currentUser.photoURL,
				userDisplayName: currentUser.displayName,
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
		[getImageUrlThunk.pending]: (state) => ({
			...state,
			getImageUrl: { ...state.getImageUrl, loading: true },
		}),
		[getImageUrlThunk.fulfilled]: (state, { payload }) => ({
			...state,
			getImageUrl: {
				...state.getImageUrl,
				loading: false,
				isGet: true,
				imageUrl: payload,
			},
		}),
		[getImageUrlThunk.rejected]: (state, { payload }) => ({
			...state,
			getImageUrl: {
				...state.getImageUrl,
				loading: false,
				getError: payload,
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
