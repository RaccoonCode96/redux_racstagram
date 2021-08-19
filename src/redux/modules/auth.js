import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { authService, firebaseInstance } from '../../fBase';
import { resetImage } from './image';
import { resetPost } from './post';
import { resetProfile } from './profile';
import {
	getCurrentUserInfoThunk,
	getRandomUserInfoThunk,
	getUserMaxCountThunk,
	resetUsers,
	setCurrentUserInfoThunk,
} from './users';

// Initial State
const initialState = {
	errorSelector: '',
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
	signOut: {
		isSignOut: false,
		loading: false,
		signOutError: '',
	},
};

export const DEFAULT_USER_IMAGE =
	'https://firebasestorage.googleapis.com/v0/b/rwitter-914af.appspot.com/o/user_icon.png?alt=media&token=f4e74544-2aff-4657-aa59-117adb4aad65';
// async
export const signOutThunk = createAsyncThunk(
	'redux-racstagram/auth/signOutThunk',
	async (_, thunkAPI) => {
		try {
			await Promise.all([
				authService.signOut(),
				thunkAPI.dispatch(resetPost()),
				thunkAPI.dispatch(resetImage()),
				thunkAPI.dispatch(resetProfile()),
				thunkAPI.dispatch(resetUsers()),
			]);
			return true;
		} catch ({ code, message }) {
			return thunkAPI.rejectWithValue({
				code,
				message,
			});
		}
	}
);
export const emailSignUpThunk = createAsyncThunk(
	'redux-racstagram/auth/emailSignUpThunk',
	async (data, thunkAPI) => {
		try {
			const { email, password } = data;
			await authService.createUserWithEmailAndPassword(email, password);
			await thunkAPI.dispatch(emailSignInThunk(data));
			return true;
		} catch ({ code, message }) {
			thunkAPI.dispatch(selectError(code));
			return thunkAPI.rejectWithValue({
				code,
				message,
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
			if (displayName) {
				const {
					users: { userMaxCount },
				} = thunkAPI.getState();
				await thunkAPI.dispatch(getUserMaxCountThunk());
				await thunkAPI.dispatch(
					setCurrentUserInfoThunk({
						displayName,
						userPhotoUrl: DEFAULT_USER_IMAGE,
						count: userMaxCount === -1 ? 1 : userMaxCount + 1,
					})
				);
				await thunkAPI.dispatch(getCurrentUserInfoThunk());
				thunkAPI.dispatch(getRandomUserInfoThunk());
			}
			return true;
		} catch ({ code, message }) {
			thunkAPI.dispatch(selectError(code));
			return thunkAPI.rejectWithValue({ code, message });
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

			const DEFAULT_USER_DISPLAYNAME = uuidv4();
			// Popup 로그인
			const {
				user: { photoURL, displayName },
			} = await authService.signInWithPopup(provider);

			await thunkAPI.dispatch(getCurrentUserInfoThunk());
			const {
				users: { currentUserInfo },
			} = await thunkAPI.getState();

			// 소셜 로그인을 통한 최초 로그인인 경우
			if (
				!(
					currentUserInfo.displayName &&
					currentUserInfo.userPhotoUrl &&
					currentUserInfo.count
				)
			) {
				await thunkAPI.dispatch(getUserMaxCountThunk());
				const {
					users: { userMaxCount },
				} = thunkAPI.getState();
				await thunkAPI.dispatch(
					setCurrentUserInfoThunk({
						userPhotoUrl: photoURL || DEFAULT_USER_IMAGE,
						displayName: displayName || DEFAULT_USER_DISPLAYNAME,
						count: userMaxCount === -1 ? 1 : userMaxCount + 1,
					})
				);
				await thunkAPI.dispatch(getCurrentUserInfoThunk());
				thunkAPI.dispatch(getRandomUserInfoThunk());
			}
			return true;
		} catch ({ code, message }) {
			thunkAPI.dispatch(selectError(code));
			return thunkAPI.rejectWithValue({ code, message });
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
		[signOutThunk.pending]: (state) => ({
			...state,
			signOut: { ...state.signOut, loading: true },
		}),
		[signOutThunk.fulfilled]: (state, { payload }) => ({
			...state,
			signOut: {
				...state.signOut,
				loading: false,
				isSignOut: payload,
			},
		}),
		[signOutThunk.rejected]: (state, { payload }) => ({
			...state,
			signOut: {
				...state.signOut,
				loading: false,
				signOutError: payload,
			},
		}),
	},
});

export default auth.reducer;

// actionCreator
export const { resetAuth, selectError, setNewAccount } = auth.actions;

// Async
