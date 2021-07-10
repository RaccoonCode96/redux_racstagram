import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService, firebaseInstance } from '../../fBase';

// Initial State
const initialState = {
	errorSelector: '',
	emailSignIn: {
		isSignIn: false,
		loading: false,
		signInError: '',
	},
	socialSignIn: {
		isSignIn: false,
		loading: false,
		signInError: '',
	},
};
// async
export const emailSignInThunk = createAsyncThunk(
	'redux-racstagram/auth/emailSignInThunk',
	async (data, thunkAPI) => {
		try {
			const { email, password } = data;
			await authService.signInWithEmailAndPassword(email, password);
			return true;
		} catch (error) {
			thunkAPI.dispatch(selectError(error.code));
			return thunkAPI.rejectWithValue({
				code: error.code,
				message: error.message,
			});
		}
	}
);

export const socialSignInThunk = createAsyncThunk(
	'redux-racstagram/auth/SocialSignInThunk',
	async (name, thunkAPI) => {
		try {
			await authService.setPersistence(
				firebaseInstance.auth.Auth.Persistence.SESSION
			);
			let provider;
			if (name === 'google') {
				provider = new firebaseInstance.auth.GoogleAuthProvider();
			} else if (name === 'github') {
				provider = new firebaseInstance.auth.GithubAuthProvider();
			}
			provider.addScope('profile');
			await authService.signInWithPopup(provider);
			return true;
		} catch (error) {
			thunkAPI.dispatch(selectError(error.code));
			return thunkAPI.rejectWithValue({
				code: error.code,
				message: error.message,
			});
		}
	}
);

// Slice
const auth = createSlice({
	name: 'redux-racstagram/auth',
	initialState,
	reducers: {
		resetAuth: (state) => ({
			...initialState,
		}),
		selectError: (state, { payload }) => ({
			...state,
			errorSelector: payload,
		}),
	},
	extraReducers: {
		[emailSignInThunk.pending]: (state) => ({
			...state,
			emailSignIn: { ...state.emailSignIn, loading: true },
		}),
		[emailSignInThunk.fulfilled]: (state, { payload }) => ({
			...state,
			emailSignIn: {
				...state.emailSignIn,
				loading: false,
				isSignIn: payload,
			},
		}),
		[emailSignInThunk.rejected]: (state, { payload }) => ({
			...state,
			emailSignIn: {
				...state.emailSignIn,
				loading: false,
				signInError: payload,
			},
		}),
		[socialSignInThunk.pending]: (state) => ({
			...state,
			socialSignIn: { ...state.socialSignIn, loading: true },
		}),
		[socialSignInThunk.fulfilled]: (state, { payload }) => ({
			...state,
			socialSignIn: {
				...state.socialSignIn,
				loading: false,
				isSignIn: payload,
			},
		}),
		[socialSignInThunk.rejected]: (state, { payload }) => ({
			...state,
			socialSignIn: {
				...state.socialSignIn,
				loading: false,
				signInError: payload,
			},
		}),
	},
});

export default auth.reducer;

// actionCreator
export const { resetAuth, selectError } = auth.actions;

// Async
