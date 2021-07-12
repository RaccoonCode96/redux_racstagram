import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from '../../fBase';

// Initial State
const initialState = {
	postList: [],
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
	},
});

export default post.reducer;

// actionCreator
export const { resetPost } = post.actions;
