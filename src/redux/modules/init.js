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

// payload로 한번에 너무 많은 데이터를 redux로 보내면 안됨, prepare에서 걸러지도록 해야함
