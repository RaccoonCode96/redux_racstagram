import reducer from './modules/reducer';
import { configureStore } from '@reduxjs/toolkit';

// store 연결
const store = configureStore({ reducer });
export default store;
