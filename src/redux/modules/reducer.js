import { combineReducers } from 'redux';
import authForm from './AuthForm';
import init from './init';
import load from './Load';
import modal from './Modal';
import navigation from './Navigation';
import post from './Post';
import postForm from './PostForm';
import profileForm from './ProfileForm';

const reducer = combineReducers({
	authForm,
	init,
	load,
	modal,
	navigation,
	post,
	postForm,
	profileForm,
});

export default reducer;
