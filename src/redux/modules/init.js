import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService, firebaseInstance } from '../../fBase';

// Async
export const SocialSignInThunk = createAsyncThunk(
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
			return thunkAPI.rejectWithValue(error);
		}
	}
);

// Initial State
const initialState = {
	isInit: false,
	socialSignIn: {
		loading: false,
		isSignIn: false,
		signInError: '',
	},
	currentUser: {
		isSignIn: false,
		photoURL: '',
		displayName: '',
		uid: '',
	},
};

// Slice
const init = createSlice({
	name: 'redux-racstagram/init',
	initialState,
	reducers: {
		setIsinitTrue: (state) => ({
			...state,
			isInit: true,
		}),
		setCurrentUser: {
			reducer: (state, { payload }) => ({
				...state,
				currentUser: { ...state.currentUser, ...payload },
			}),
			prepare: ({ photoURL, displayName, uid }) => ({
				payload: uid
					? { photoURL, displayName, uid, isSignIn: true }
					: {
							photoURL: '',
							displayName: '',
							uid: '',
							isSignIn: false,
					  },
			}),
		},
	},
	extraReducers: {
		[SocialSignInThunk.pending]: (state) => ({
			...state,
			socialSignIn: { ...state.socialSignIn, loading: true },
		}),
		[SocialSignInThunk.fulfilled]: (state, action) => ({
			...state,
			socialSignIn: {
				...state.socialSignIn,
				loading: false,
				isSignIn: action.payload,
			},
		}),
		[SocialSignInThunk.rejected]: (state, action) => ({
			...state,
			socialSignIn: {
				...state.socialSignIn,
				loading: false,
				signInError: action.payload,
			},
		}),
	},
});

export default init.reducer;

// actionCreator
export const { setIsinitTrue, setCurrentUser } = init.actions;

// payload로 한번에 너무 많은 데이터를 redux로 보내면 안됨, prepare에서 걸러지도록 해야함
