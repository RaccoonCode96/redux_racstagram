import reducer from './modules/reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer });
export default store;
