import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteImageUrlThunk } from './common';
import { authService } from '../../fBase';
import { selectError } from './auth';
import { setCurrentUserInfoThunk } from './users';

// Initial State
const initialState = {
	updateProfile: {
		loading: false,
		isUpdate: false,
		updateError: '',
	},
	currentUser: {
		isSignIn: false,
		photoURL: '',
		displayName: '',
		uid: '',
	},
	updateDisplayName: {
		isUpdate: false,
		loading: false,
		updateError: '',
	},
	updatePhotoUrl: {
		isUpdate: false,
		loading: false,
		updateError: '',
	},
};

// Async
export const updateDisplayNameThunk = createAsyncThunk(
	'redux-racstagram/profile/updateDisplayThunk',
	async (displayName, thunkAPI) => {
		try {
			await authService.currentUser.updateProfile({ displayName });
			const {
				profile: { currentUser },
			} = await thunkAPI.getState();
			thunkAPI.dispatch(setCurrentUser({ ...currentUser, displayName }));
			thunkAPI.dispatch(
				setCurrentUserInfoThunk({ userDisplayName: displayName })
			);
			return true;
		} catch ({ code, message }) {
			thunkAPI.dispatch(selectError(code));
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const updatePhotoUrlThunk = createAsyncThunk(
	'redux-racstagram/profile/updatePhotoUrlThunk',
	async (photoURL, thunkAPI) => {
		try {
			await authService.currentUser.updateProfile({ photoURL });
			const {
				profile: { currentUser },
			} = await thunkAPI.getState();
			thunkAPI.dispatch(setCurrentUser({ ...currentUser, photoURL }));
			thunkAPI.dispatch(setCurrentUserInfoThunk({ userPhotoUrl: photoURL }));
			return true;
		} catch ({ code, message }) {
			thunkAPI.dispatch(selectError(code));
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

export const updateProfileThunk = createAsyncThunk(
	'redux-racstagram/profile/updateProfileThunk',
	async (inputs, thunkAPI) => {
		const {
			common: { getImageUrl },
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
	reducers: {
		setCurrentUser: {
			reducer: (state, { payload }) => ({
				...state,
				currentUser: { ...state.currentUser, ...payload },
			}),
			prepare: ({ photoURL, displayName, uid }) => ({
				payload: uid
					? { photoURL: photoURL ?? '', displayName, uid, isSignIn: true }
					: {
							...initialState.currentUser,
					  },
			}),
		},
	},
	extraReducers: {
		[updateDisplayNameThunk.pending]: (state) => ({
			...state,
			updateDisplayName: { ...state.updateDisplayName, loading: true },
		}),
		[updateDisplayNameThunk.fulfilled]: (state, { payload }) => ({
			...state,
			updateDisplayName: {
				...state.updateDisplayName,
				loading: false,
				isUpdate: payload,
			},
		}),
		[updateDisplayNameThunk.rejected]: (state, { payload }) => ({
			...state,
			updateDisplayName: {
				...state.updateDisplayName,
				loading: false,
				updateError: payload,
			},
		}),
		[updatePhotoUrlThunk.pending]: (state) => ({
			...state,
			updatePhotoUrl: { ...state.updatePhotoUrl, loading: true },
		}),
		[updatePhotoUrlThunk.fulfilled]: (state, { payload }) => ({
			...state,
			updatePhotoUrl: {
				...state.updatePhotoUrl,
				loading: false,
				isUpdate: payload,
			},
		}),
		[updatePhotoUrlThunk.rejected]: (state, { payload }) => ({
			...state,
			updatePhotoUrl: {
				...state.updatePhotoUrl,
				loading: false,
				updateError: payload,
			},
		}),
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
export const { setCurrentUser } = profile.actions;

// post 위치의 getImageUrl 공유 위치로 옮기기
// profile photo storage에서 지우는 것은 보류
// 소셜 로그인으로 들어와서 profile을 가져온다면, 해당 이미지는 storage에 들어있지 않으므로 관리할 수 가 없음
