import { useSelector } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Update from '../pages/Update';
import User from '../pages/User';
import Write from '../pages/Write';

const AppRouter = () => {
	const isLoggedIn = useSelector((state) => state.init.currentUser.isSignIn);
	return (
		<BrowserRouter>
			<Switch>
				{isLoggedIn ? (
					<>
						<Route path="/" exact component={Home} />
						<Route path="/write" exact component={Write} />
						<Route path="/update" exact component={Update} />
						<Route path="/profile" exact component={Profile} />
						<Route path="/user" exact component={User} />
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
