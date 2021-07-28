const ProfilePostImages = ({ posts, postsOnToggle }) => {
	return (
		<>
			<div>
				{posts.map((post) => (
					<img
						onClick={postsOnToggle}
						key={post.postId}
						src={post.postImageUrl}
						alt={'postImageUrl'}
						width={'200px'}
					></img>
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
