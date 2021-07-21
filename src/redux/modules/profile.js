import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteImageUrlThunk } from './common';
import { setCurrentUserInfoThunk } from './users';
import { updatePostUserInfoThunk } from './post';

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
};

// Async

export const updateProfileThunk = createAsyncThunk(
	'redux-racstagram/profile/updateProfileThunk',
	async (inputs, thunkAPI) => {
		const {
			common: { getImageUrl },
		} = await thunkAPI.getState();
		const { displayName, imageBase64, prevImageUrl, userIntro } = inputs;

		// 이전 storage 이미지 파일 제거 처리 (초반 외부 image URL인 경우 에러 제외)
		if (prevImageUrl) {
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
							userPhotoUrl: getImageUrl.imageUrl,
						})
					),
					thunkAPI.dispatch(
						updatePostUserInfoThunk({
							userDisplayName: displayName,
							userPhotoUrl: getImageUrl.imageUrl,
						})
					),
				]);
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
	},
});

export default profile.reducer;

// actionCreator
export const { setCurrentUser, resetProfile } = profile.actions;

// post 위치의 getImageUrl 공유 위치로 옮기기
// profile photo storage에서 지우는 것은 보류
// 소셜 로그인으로 들어와서 profile을 가져온다면, 해당 이미지는 storage에 들어있지 않으므로 관리할 수 가 없음
