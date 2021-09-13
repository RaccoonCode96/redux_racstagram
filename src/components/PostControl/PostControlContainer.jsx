import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getCommentsThunk } from '../../redux/modules/comment';
import { setLikeOffThunk, setLikeOnThunk } from '../../redux/modules/like';
import PostControl from './PostControl';

// 좋아요, 댓글 보기 관리 Container 컴포넌트
const PostControlContainer = ({ post }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { pathname } = useLocation();

	// path에 따른 likes 정보 요청 type 결정
	const type = useMemo(
		() => (pathname === '/' ? 'allLikes' : 'userLikes'),
		[pathname]
	);

	// 결정된 type에 따른 likes state 가져오기
	const likes = useSelector((state) => state.like[type]);

	// likes state에서 현재 postId에 맞는 like 가져오기
	const findLike = useCallback(() => {
		return likes.find((like) => like.postId === post.postId)?.isLike;
	}, [likes, post]);

	// like 초기 정보 기억
	const initIsLike = useMemo(() => findLike(), [findLike]);

	// like 초기 정보 isLike 내부 상태에 설정
	const [isLike, setLike] = useState(initIsLike);

	// db에 like 상태 변경 요청하는 토글 함수 (Debounce)
	const toggleDebounce = useMemo(
		() =>
			debounce((checked) => {
				if (initIsLike !== checked) {
					if (checked) {
						dispatch(setLikeOnThunk({ postId: post.postId, type }));
						// console.log('setLike : On');
					} else {
						dispatch(setLikeOffThunk({ postId: post.postId, type }));
						// console.log('setLike : Off');
					}
				}
			}, 900),
		[initIsLike, dispatch, post, type]
	);

	// like의 상태에 변화가 있는 경우 화면에 보이는 like 상태를 변경, toggleDebounce 실행
	const onChange = useCallback(
		(event) => {
			const {
				target: { checked },
			} = event;
			setLike(checked);
			toggleDebounce(checked);
		},
		[toggleDebounce]
	);

	// 해당 post의 댓글 페이지로 이동하는 함수
	const toComments = useCallback(async () => {
		await dispatch(getCommentsThunk(post.postId));
		history.push({ pathname: `/${post.postId}/comments`, state: { post } });
	}, [dispatch, history, post]);

	return (
		<PostControl
			postId={post.postId}
			toComments={toComments}
			isLike={isLike}
			onChange={onChange}
		/>
	);
};

export default PostControlContainer;
