import './ProfilePostImages.scss';
const ProfilePostImages = ({ posts, postsOnToggle }) => {
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
								<div className="post_image_container" key={i.toString()}>
									<img
										onClick={postsOnToggle}
										key={row[i].postId.toString()}
										src={row[i].postImageUrl}
										alt={'postImageUrl'}
										className="post_image"
									/>
								</div>
							) : (
								<div className="none_image" key={i}></div>
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
