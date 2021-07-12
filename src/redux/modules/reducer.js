import { combineReducers } from 'redux';
import init from './init';
import auth from './auth';
import post from './post';
/* import authForm from './AuthForm';
import load from './Load';
import modal from './Modal';
import navigation from './Navigation';
import post from './Post';
import postForm from './PostForm';
import profileForm from './ProfileForm'; */

const reducer = combineReducers({
	init,
	auth,
	post,
	/* 	authForm,
	load,
	modal,
	navigation,
	postForm,
	profileForm, */
});

export default reducer;
