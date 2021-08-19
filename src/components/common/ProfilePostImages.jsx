import { useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
	getMorePostsThunk,
	resetGetCurrentUserPosts,
	resetGetMorePosts,
	resetGetUserPosts,
} from '../../redux/modules/post';
import './ProfilePostImages.scss';
import UseInfiniteScroll from './UseInfiniteScroll';

const ProfilePostImages = ({ posts }) => {
	const { userName } = useParams();
	const { pathname } = useLocation();
	const history = useHistory();
	const dispatch = useDispatch();
	const { isNone } = useSelector((state) => state.post.getMorePosts);

	const isGetUserPosts = useSelector((state) => state.post.getUserPosts.isGet);
	const isGetCurrentUserPosts = useSelector(
		(state) => state.post.getCurrentUserPosts.isGet
	);

	const getMorePosts = useCallback(() => {
		const postDate = posts[posts.length - 1]?.postDate;
		if (pathname === '/profile') {
			dispatch(getMorePostsThunk({ postDate, type: 'currentUserPosts' }));
		} else if (pathname === `/user/${userName}`) {
			dispatch(getMorePostsThunk({ postDate, type: 'userPosts', userName }));
		}
	}, [dispatch, pathname, posts, userName]);

	const goPosts = useCallback(
		(postNum) => {
			if (pathname === '/profile') {
				history.push({ pathname: '/profile/posts', state: { postNum } });
			} else if (pathname === `/user/${userName}`) {
				history.push({
					pathname: `/user/${userName}/posts`,
					state: { postNum },
				});
			} else {
				console.log('invalid location request');
			}
		},
		[history, userName, pathname]
	);

	const devidePosts = (posts) => {
		const arr = [...posts];
		let tmp = [];
		const length = posts.length;
		for (let i = 0; i <= length / 3; i++) {
			tmp = [...tmp, [...arr.splice(0, 3)]];
		}
		return tmp;
	};
	// unmount 되기 전에 모두 reset
	useLayoutEffect(() => {
		return async () => {
			dispatch(resetGetMorePosts());
			dispatch(resetGetUserPosts());
			dispatch(resetGetCurrentUserPosts());
		};
	}, [dispatch]);

	return (
		<>
			<div className="post_table">
				{devidePosts(posts).map((row, index) => (
					<div className="posts_row" key={index.toString()}>
						{[0, 1, 2].map((i) =>
							row[i] ? (
								<div
									className="post_image_container"
									onClick={() => {
										goPosts(3 * index + i);
									}}
									key={`postTable/${row[i].postId.toString()}`}
								>
									<img
										// key={row[i].postId.toString()}
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
			{!isNone && (isGetCurrentUserPosts || isGetUserPosts) && (
				<UseInfiniteScroll execute={getMorePosts} />
			)}
		</>
	);
};

export default ProfilePostImages;
