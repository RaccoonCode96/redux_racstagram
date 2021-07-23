const ProfilePostImages = ({ profilePostList }) => {
	return (
		<>
			<div>
				{profilePostList.map((post) => (
					<img
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
