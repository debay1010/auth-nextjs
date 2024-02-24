export default function UserProfile({ params }: any) {
	return (
		<div className="">
			<h1 className=" text-center mt-20 text-4xl ">
				User Profile
				<span className="text-xl ml-3 bg-orange-400">{params.id}</span>
			</h1>
		</div>
	);
}
