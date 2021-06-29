import { Route, Router, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import User from '../pages/User';

const AppRouter = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/user" exact component={User} />
				<Route path="/profile" exact component={Profile} />
			</Switch>
		</Router>
	);
};

export default AppRouter;
