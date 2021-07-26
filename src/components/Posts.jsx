import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deletePostThunk, selectPost } from '../redux/modules/post';
import Post from './Post';

const Posts = ({ postList, postsOnToggle }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUserId = useSelector((state) => state.profile.currentUser.uid);

	const deletePost = useCallback(
		(post) => {
			dispatch(selectPost(post));
			dispatch(deletePostThunk());
		},
		[dispatch]
	);

	const updatePost = useCallback(
		(post) => {
			dispatch(selectPost(post));
			history.push('/update');
		},
		[dispatch, history]
	);
	return (
		<>
			<div>Posts</div>
			<button onClick={postsOnToggle}>뒤로가기</button>
			{postList.map((post) => (
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

export default Posts;

/*
뒤로가기 버튼 제어시 사용되는 상위 컴포넌트의 함수와 state 
const [postOn, setPostOn] = useState({ isOn: false, scrollY: 0 });
const postsOnToggle = useCallback(() => {
  setPostOn({ ...postOn, isOn: !postOn.isOn });
}, [setPostOn, postOn]); 
*/
