import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { storageService } from '../../fBase';
import { updateDisplayNameThunk, updatePhotoUrlThunk } from './auth';

// Initial State
const initialState = {
	updateProfile: {
		loading: false,
		isUpdate: false,
		updateError: '',
	},
	deleteImageUrl: {
		loading: false,
		isDelete: false,
		deleteError: '',
	},
};

// Async
export const deleteImageUrlThunk = createAsyncThunk(
	'redux-racstagram/profile/deleteImageUrlThunk',
	async (ImageUrl, thunkAPI) => {
		try {
			storageService.refFromURL(ImageUrl).delete();
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const updateProfileThunk = createAsyncThunk(
	'redux-racstagram/profile/updateProfileThunk',
	async (inputs, thunkAPI) => {
		const {
			post: { getImageUrl },
		} = await thunkAPI.getState();
		const { displayName, imageBase64, prevImageUrl } = inputs;

		// 이전 storage 이미지 파일 제거 처리 (초반 외부 image URL인 경우 에러 제외)
		if (prevImageUrl) {
			thunkAPI.dispatch(deleteImageUrlThunk(prevImageUrl));
		}
		// 추가하는 이미지 url & displayName 반영 하기
		try {
			if (imageBase64) {
				thunkAPI.dispatch(updatePhotoUrlThunk(getImageUrl.imageUrl));
			}
			if (displayName) {
				thunkAPI.dispatch(updateDisplayNameThunk(displayName));
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
	reducers: {},
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
		[deleteImageUrlThunk.pending]: (state) => ({
			...state,
			deleteImageUrl: { ...state.deleteImageUrl, loading: true },
		}),
		[deleteImageUrlThunk.fulfilled]: (state, { payload }) => ({
			...state,
			deleteImageUrl: {
				...state.deleteImageUrl,
				loading: false,
				isDelete: payload,
			},
		}),
		[deleteImageUrlThunk.rejected]: (state, { payload }) => ({
			...state,
			deleteImageUrl: {
				...state.deleteImageUrl,
				loading: false,
				deleteError: payload,
			},
		}),
	},
});

export default profile.reducer;

// actionCreator
// export const {} = profile.actions;

// post 위치의 getImageUrl 공유 위치로 옮기기
// profile photo storage에서 지우는 것은 보류
// 소셜 로그인으로 들어와서 profile을 가져온다면, 해당 이미지는 storage에 들어있지 않으므로 관리할 수 가 없음
