import NavigationContainer from '../containers/NavigationContainer';
import PostContainer from '../containers/PostContainer';
import SignOutContainer from '../containers/SignOutContainer';

const Home = () => {
	return (
		<>
			<NavigationContainer />
			<PostContainer />
			<SignOutContainer />
		</>
	);
};

export default Home;
