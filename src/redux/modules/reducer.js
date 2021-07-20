import { combineReducers } from 'redux';

import init from './init';
import auth from './auth';
import post from './post';
import profile from './profile';
import common from './common';
import users from './users';

const reducer = combineReducers({
	init,
	auth,
	post,
	profile,
	common,
	users,
});

/* 
state = {
  init :{
    isInit: false,
  },
  auth :{
    newAccount: false,
	  errorSelector: '',
    emailSignUp: {
      isSignUp: false,
      loading: false,
      signUpError: '',
    },
    emailSignIn: {
      isSignIn: false,
      loading: false,
      signInError: '',
    },
    socialSignIn: {
      isSignIn: false,
      loading: false,
      signInError: '',
    },
  },
  post :{
    postList: [],
    postSelector: '',
    updatePost: {
      isUpdate: false,
      loading: false,
      updateError: '',
    },
    deletePost: {
      isDelete: false,
      loading: false,
      deleteError: '',
    },
    getPostList: {
      isGet: false,
      loading: false,
      getError: '',
    },
    setPostObj: {
      isSet: false,
      loading: false,
      setError: '',
    },
  },
  profile :{
    updateProfile: {
		  loading: false,
		  isUpdate: false,
		  updateError: '',
	  },
    currentUser: {
      isSignIn: false,
      photoURL: '',
      displayName: '',
      uid: '',
    },
    updateDisplayName: {
      isUpdate: false,
      loading: false,
      updateError: '',
    },
    updatePhotoUrl: {
      isUpdate: false,
      loading: false,
      updateError: '',
    },
  },
  common :{
    updateSelector: '',
    getImageUrl: {
      isGet: false,
      loading: false,
      getError: '',
      imageUrl: '',
    },
    deleteImageUrl: {
      loading: false,
      isDelete: false,
      deleteError: '',
    },
  },
  users :{
    
  }
}
 */

export default reducer;
