import { useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import './ProfilePostImages.scss';
const ProfilePostImages = ({ posts }) => {
	const { userName } = useParams();
	const location = useLocation();
	const history = useHistory();

	const goPosts = useCallback(() => {
		if (location.pathname === '/profile') {
			history.push({ pathname: '/profile/posts', state: { posts } });
		} else if (location.pathname === `/user/${userName}`) {
			history.push({ pathname: `/user/${userName}/posts`, state: { posts } });
		} else {
			console.log('invalid location request');
		}
	}, [history, userName, location, posts]);

	const devidePosts = (posts) => {
		const arr = [...posts];
		let tmp = [];
		const length = posts.length;
		for (let i = 0; i <= length / 3; i++) {
			tmp = [...tmp, [...arr.splice(0, 3)]];
		}
		return tmp;
	};

	return (
		<>
			<div className="post_table">
				{devidePosts(posts).map((row, index) => (
					<div className="posts_row" key={index.toString()}>
						{[0, 1, 2].map((i) =>
							row[i] ? (
								<div
									className="post_image_container"
									onClick={goPosts}
									key={i.toString()}
								>
									<img
										key={row[i].postId.toString()}
										src={row[i].postImageUrl}
										alt={'postImageUrl'}
										className="post_image"
									/>
								</div>
							) : (
								<div className="none_image" key={i.toString()}></div>
							)
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default ProfilePostImages;

/*
뒤로가기 버튼 제어시 사용되는 상위 컴포넌트의 함수와 state 
const [postOn, setPostOn] = useState({ isOn: false, scrollY: 0 });
const postsOnToggle = useCallback(() => {
  setPostOn({ ...postOn, isOn: !postOn.isOn });
}, [setPostOn, postOn]); 
*/
