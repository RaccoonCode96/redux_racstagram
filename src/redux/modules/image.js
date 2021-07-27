import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { storageService } from '../../fBase';
import { DEFAULT_USER_IMAGE } from './auth';

// Initial State
const initialState = {
	imageUrl: '',
	getImageUrl: {
		isGet: false,
		loading: false,
		getError: '',
	},
	deleteImageUrl: {
		loading: false,
		isDelete: false,
		deleteError: '',
	},
};
// Async
export const getImageUrlThunk = createAsyncThunk(
	'redux-racstagram/images/getImageUrlThunk',
	async (imageBase64, thunkAPI) => {
		try {
			if (imageBase64) {
				const {
					profile: { currentUser },
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

export const deleteImageUrlThunk = createAsyncThunk(
	'redux-racstagram/images/deleteImageUrlThunk',
	async (imageUrl, thunkAPI) => {
		try {
			if (imageUrl !== DEFAULT_USER_IMAGE) {
				storageService.refFromURL(imageUrl).delete();
			}
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({ code, message });
		}
	}
);

// Slice
// updateSelector : profile, post Update를 구분 해주는 역할
const image = createSlice({
	name: 'redux-racstagram/images',
	initialState,
	reducers: {
		resetimage: () => ({ ...initialState }),
	},
	extraReducers: {
		[getImageUrlThunk.pending]: (state) => ({
			...state,
			getImageUrl: { ...state.getImageUrl, loading: true },
		}),
		[getImageUrlThunk.fulfilled]: (state, { payload }) => ({
			...state,
			imageUrl: payload,
			getImageUrl: {
				...state.getImageUrl,
				loading: false,
				isGet: true,
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

export default image.reducer;

// actionCreator
export const { resetImage } = image.actions;
