// Action Type
const COMPLETE_INIT = 'redux-racstagram/init/COMPLETE_INIT';
const SET_CURRENT_USER = 'redux-racstagram/init/SET_CURRENT_USER';

// Action Creator
export function completeInit() {
	return {
		type: COMPLETE_INIT,
	};
}

export function getCurrentUserSuccess(user) {
	return {
		type: SET_CURRENT_USER,
		currentUser: {
			photoUrl: user.photoURL,
			displayName: user.displayName,
			uid: user.uid,
		},
	};
}

// init Structure
const initialState = {
	isInit: false,
	currentUser: {
		photoUrl: '',
		displayName: '',
		uid: '',
	},
};

// Reducer
export default function reducer(state = initialState, action) {
	if (action.type === COMPLETE_INIT) {
		return {
			...state,
			isInit: true,
		};
	}
}
