import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteImageUrlThunk, resetImage } from './image';
import { setCurrentUserInfoThunk } from './users';
import { dbService } from '../../fBase';
import { updatePostsUserInfoThunk } from './post';

// Initial State
const initialState = {
	updateProfile: {
		loading: false,
		isUpdate: false,
		updateError: '',
	},
	currentUser: {
		isSignIn: false,
		uid: '',
	},
	profilePostList: [],
	getProfilePost: {
		loading: false,
		isGet: false,
		getError: '',
	},
};

// Async
export const getProfilePostThunk = createAsyncThunk(
	'redux-racstagram/profile/getProfilePostThunk',
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
			const postList = await array.docs.map((doc) => ({
				postId: doc.id,
				...doc.data(),
			}));
			return postList;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const updateProfileThunk = createAsyncThunk(
	'redux-racstagram/profile/updateProfileThunk',
	async (inputs, thunkAPI) => {
		const {
			image: { imageUrl },
		} = await thunkAPI.getState();
		const { displayName, imageBase64, prevImageUrl, userIntro } = inputs;

		// 이전 storage 이미지 파일 제거 처리 (초반 외부 image URL인 경우 에러 제외)
		if (prevImageUrl !== imageBase64) {
			thunkAPI.dispatch(deleteImageUrlThunk(prevImageUrl));
		}
		// 추가하는 이미지 url & displayName 반영 하기
		try {
			if (userIntro || displayName || imageBase64) {
				await Promise.all([
					thunkAPI.dispatch(
						setCurrentUserInfoThunk({
							userIntro,
							userDisplayName: displayName,
							userPhotoUrl: imageUrl,
						})
					),
					thunkAPI.dispatch(
						updatePostsUserInfoThunk({
							userDisplayName: displayName,
							userPhotoUrl: imageUrl,
						})
					),
				]);
				await thunkAPI.dispatch(resetImage());
			}
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

// Slice
const profile = createSlice({
	name: 'redux-racstagram/profile',
	initialState,
	reducers: {
		resetProfile: () => ({ ...initialState }),
		setCurrentUser: {
			reducer: (state, { payload }) => ({
				...state,
				currentUser: { ...state.currentUser, ...payload },
			}),
			prepare: ({ uid }) => ({
				payload: uid
					? {
							...(uid && { uid }),
							isSignIn: true,
					  }
					: {
							...initialState.currentUser,
					  },
			}),
		},
	},
	extraReducers: {
		[updateProfileThunk.pending]: (state) => ({
			...state,
			updateProfile: { ...state.updateProfile, loading: true },
		}),
		[updateProfileThunk.fulfilled]: (state, { payload }) => ({
			...state,
			updateProfile: {
				...state.updateProfile,
				loading: false,
				isUpdate: payload,
			},
		}),
		[updateProfileThunk.rejected]: (state, { payload }) => ({
			...state,
			updateProfile: {
				...state.updateProfile,
				loading: false,
				updateError: payload,
			},
		}),
		[getProfilePostThunk.pending]: (state) => ({
			...state,
			getProfilePost: { ...state.getProfilePost, loading: true },
		}),
		[getProfilePostThunk.fulfilled]: (state, { payload }) => ({
			...state,
			profilePostList: payload,
			getProfilePost: {
				...state.getProfilePost,
				loading: false,
				isGet: true,
			},
		}),
		[getProfilePostThunk.rejected]: (state, { payload }) => ({
			...state,
			getProfilePost: {
				...state.getProfilePost,
				loading: false,
				getError: payload,
			},
		}),
	},
});

export default profile.reducer;

// actionCreator
export const { setCurrentUser, resetProfile } = profile.actions;

// post 위치의 getImageUrl 공유 위치로 옮기기
// profile photo storage에서 지우는 것은 보류
// 소셜 로그인으로 들어와서 profile을 가져온다면, 해당 이미지는 storage에 들어있지 않으므로 관리할 수 가 없음
