import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import User from '../pages/User';

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/user" exact component={User} />
				<Route path="/profile" exact component={Profile} />
			</Switch>
		</BrowserRouter>
	);
};

export default AppRouter;
