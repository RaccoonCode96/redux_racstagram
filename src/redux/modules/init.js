import { createSlice } from '@reduxjs/toolkit';

// Initial State

const initialState = {
	isInit: false,
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
	},
	extraReducers: {},
});

export default init.reducer;

// actionCreator
export const { setIsinitTrue } = init.actions;
