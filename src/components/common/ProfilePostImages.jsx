import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getMorePostsThunk, resetGetMorePosts } from '../../redux/modules/post';
import './ProfilePostImages.scss';
import UseInfiniteScroll from './UseInfiniteScroll';

const ProfilePostImages = ({ posts }) => {
	// props : posts -> 현재 유저 인지 특정 유저인지에 따라 들어오는 posts가 다름
	const { userName } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();

	// redux state
	// post 더 불러오기 상태
	const { isNone } = useSelector((state) => state.post.getMorePosts);

	// 특정 유저 Posts 가져오기 성공 상태
	const isGetUserPosts = useSelector((state) => state.post.getUserPosts.isGet);

	// 무한 스크롤시 더 가져오기 요청하는 함수 (현재 유저인지, 특정 유저인지 구분)
	const getMorePosts = useCallback(() => {
		const postDate = posts[posts.length - 1]?.postDate;
		dispatch(getMorePostsThunk({ postDate, type: 'userPosts', userName }));
	}, [dispatch, posts, userName]);

	// 유저의 작성글 이미지 클릭시 해당 글로 이동 요청(클릭한 요소가 몇번째 인지를 같이 보냄)
	const toPosts = useCallback(
		(postNum) => {
			history.push({
				pathname: `/user/${userName}/posts`,
				state: { postNum },
			});
		},
		[history, userName]
	);

	// 들어온 posts를 imagesTable(3열)로 구성하기 위한 posts를 나누는 함수
	const devidePosts = (posts) => {
		const arr = [...posts];
		let tmp = [];
		const length = posts.length;
		for (let i = 0; i <= length / 3; i++) {
			tmp = [...tmp, [...arr.splice(0, 3)]];
		}
		return tmp;
	};

	/*
	// unmount 되기 전에 모두 reset 
  - getMorePosts의 isNone 상태 reset
  - 과거 Posts 데이터 화면 표시 현상 제거를 위해 항상 unmount시 가져왔던 데이터는 reset 요청
  */
	useEffect(() => {
		return () => {
			dispatch(resetGetMorePosts());
			// dispatch(resetGetUserPosts());
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
										toPosts(3 * index + i);
									}}
									key={`postTable/${row[i].postId.toString()}`}
								>
									<img
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
			{!isNone && isGetUserPosts && (
				<UseInfiniteScroll execute={getMorePosts} />
			)}
		</>
	);
};

export default ProfilePostImages;
