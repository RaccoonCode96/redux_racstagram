import { combineReducers } from 'redux';

import init from './init';
import auth from './auth';
import post from './post';
import profile from './profile';
import users from './users';
import image from './image';
import comment from './comment';
import like from './like';

// combineReducers
const reducer = combineReducers({
	init,
	auth,
	post,
	profile,
	users,
	image,
	comment,
	like,
});

export default reducer;
