import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Auth from '../pages/Auth/Auth';
import Comments from '../pages/Comments/Comments';
import Home from '../pages/Home/Home';
import Posts from '../pages/Posts/Posts';
import Profile from '../pages/Profile/Profile';
import Update from '../pages/Update/Update';
// import User from '../pages/User/User';
import Write from '../pages/Write/Write';
import { getAllPostsThunk } from '../redux/modules/post';
import {
	getCurrentUserInfoThunk,
	getRandomUserInfoThunk,
} from '../redux/modules/users';

const AppRouter = () => {
	const isLoggedIn = useSelector((state) => state.profile.currentUser.isSignIn);
	const dispatch = useDispatch();
	const getInitInfo = useCallback(async () => {
		if (isLoggedIn) {
			await Promise.all([
				dispatch(getAllPostsThunk()),
				dispatch(getCurrentUserInfoThunk()),
			]);
			dispatch(getRandomUserInfoThunk());
		}
	}, [dispatch, isLoggedIn]);
	useEffect(() => {
		getInitInfo();
	}, [getInitInfo]);
	return (
		<BrowserRouter>
			<Switch>
				{isLoggedIn ? (
					<>
						<Route path="/" exact component={Home} />
						<Route path="/write" exact component={Write} />
						<Route path="/update" exact component={Update} />
						<Route path="/profile" exact component={Profile} />
						<Route path="/profile/posts" exact component={Posts} />
						<Route path="/user/:userName" exact component={Profile} />
						<Route path="/user/:userName/posts" exact component={Posts} />
						<Route path="/:postId/comments" exact component={Comments} />
						<Redirect from="*" to="/" />
					</>
				) : (
					<>
						<Route path="/" exact component={Auth} />
						<Redirect from="*" to="/" />
					</>
				)}
			</Switch>
		</BrowserRouter>
	);
};

export default AppRouter;
