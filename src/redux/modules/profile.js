import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateDisplayNameThunk, updatePhotoUrlThunk } from './auth';

// Initial State
const initialState = {
	updateProfile: {
		laoding: false,
		isUpdate: false,
		updateError: '',
	},
};

// Async
export const updateProfileThunk = createAsyncThunk(
	'redux-racstagram/profile/updateProfileThunk',
	async (inputs, thunkAPI) => {
		try {
			const {
				post: { getImageUrl },
			} = await thunkAPI.getState();
			const { displayName, imageBase64 } = inputs;

			// 기존 url 삭제는 보류
			// if(prevImageUrl) {
			//     await storageService.refFromURL(prevImageUrl).delete();
			// }

			if (imageBase64) {
				await thunkAPI.dispatch(updatePhotoUrlThunk(getImageUrl.imageUrl));
			}
			if (displayName) {
				await thunkAPI.dispatch(updateDisplayNameThunk(displayName));
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
	},
});

export default profile.reducer;

// actionCreator
// export const {} = profile.actions;

// post 위치의 getImageUrl 공유 위치로 옮기기
// profile photo storage에서 지우는 것은 보류
// 소셜 로그인으로 들어와서 profile을 가져온다면, 해당 이미지는 storage에 들어있지 않으므로 관리할 수 가 없음
