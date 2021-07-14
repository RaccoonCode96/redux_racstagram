import { combineReducers } from 'redux';
import init from './init';
import auth from './auth';
import post from './post';
import profile from './profile';
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
	profile,
	/* 	
  authForm,
	load,
	modal,
	navigation,
	postForm,
  */
});

export default reducer;
