import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
	deletePostThunk,
	getAllPostsThunk,
	getCurrentUserPostsThunk,
	getUserPostsThunk,
} from '../redux/modules/post';
import Post from '../components/Post';

const PostContainer = ({ postsOnToggle, posts }) => {
	const history = useHistory();
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const currentUserId = useSelector((state) => state.profile.currentUser.uid);

	const deletePost = useCallback(
		(post) => {
			dispatch(deletePostThunk(post));
			if (pathname === '/') {
				dispatch(getAllPostsThunk());
			} else if (pathname === '/profile') {
				dispatch(getCurrentUserPostsThunk());
			} else if (pathname.includes('/user/')) {
				dispatch(getUserPostsThunk(pathname.split('/')[2]));
			}
		},
		[dispatch, pathname]
	);

	const updatePost = useCallback(
		(post) => {
			history.push({
				pathname: '/update',
				state: { post, profileInfo: {}, type: 'post' },
			});
		},
		[history]
	);

	return (
		<>
			<div>Posts</div>
			{postsOnToggle && <button onClick={postsOnToggle}>뒤로가기</button>}
			{posts.map((post) => (
				<Post
					post={post}
					key={post.postId}
					updatePost={updatePost}
					deletePost={deletePost}
					currentUserId={currentUserId}
				/>
			))}
		</>
	);
};

export default PostContainer;

/*
뒤로가기 버튼 제어시 사용되는 상위 컴포넌트의 함수와 state 
const [postOn, setPostOn] = useState({ isOn: false, scrollY: 0 });
const postsOnToggle = useCallback(() => {
  setPostOn({ ...postOn, isOn: !postOn.isOn });
}, [setPostOn, postOn]); 
*/
