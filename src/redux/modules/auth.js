import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService, firebaseInstance } from '../../fBase';
import { setCurrentUser } from './init';

// Initial State
const initialState = {
	newAccount: false,
	errorSelector: '',
	updateDisplayName: {
		isUpdate: false,
		loading: false,
		updateError: '',
	},
	emailSignUp: {
		isSignUp: false,
		loading: false,
		signUpError: '',
	},
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
export const emailSignUpThunk = createAsyncThunk(
	'redux-racstagram/auth/emailSignUpThunk',
	async (data, thunkAPI) => {
		try {
			const { email, password } = data;
			await authService.createUserWithEmailAndPassword(email, password);
			await thunkAPI.dispatch(emailSignInThunk(data));
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

export const updateDisplayNameThunk = createAsyncThunk(
	'redux-racstagram/auth/updateProfileThunk',
	async (displayName, thunkAPI) => {
		try {
			await authService.currentUser.updateProfile({ displayName });
			const state = await thunkAPI.getState();
			thunkAPI.dispatch(
				setCurrentUser({ ...state.init.currentUser, displayName })
			);
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

export const emailSignInThunk = createAsyncThunk(
	'redux-racstagram/auth/emailSignInThunk',
	async (data, thunkAPI) => {
		try {
			const { email, password, displayName } = data;
			await authService.signInWithEmailAndPassword(email, password);
			if (displayName !== '') {
				await thunkAPI.dispatch(updateDisplayNameThunk(displayName));
			}
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
			await authService.signInWithRedirect(provider);
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
		setNewAccount: (state, { payload }) => ({
			...state,
			newAccount: payload,
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
		[emailSignUpThunk.pending]: (state) => ({
			...state,
			emailSignUp: { ...state.emailSignUp, loading: true },
		}),
		[emailSignUpThunk.fulfilled]: (state, { payload }) => ({
			...state,
			emailSignUp: {
				...state.emailSignUp,
				loading: false,
				isSignUp: payload,
			},
		}),
		[emailSignUpThunk.rejected]: (state, { payload }) => ({
			...state,
			emailSignUp: {
				...state.emailSignUp,
				loading: false,
				signUpError: payload,
			},
		}),
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
	},
});

export default auth.reducer;

// actionCreator
export const { resetAuth, selectError, setNewAccount } = auth.actions;

// Async
