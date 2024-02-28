import { useState } from "react";

const Success = ({ msg }: any) => {
	const [show, setShow] = useState(true);
	setTimeout(() => setShow(false), 10000);

	return (
		<div className="">
			{show && (
				<div className="bg-green-500 text-500 text-white p-2 rounded-md mt-6 text-sm mb-4">
					<i className="w-4 h-4 fa-solid fa-square-check"></i>
					{"  "}

					{msg}
				</div>
			)}
		</div>
	);
};

export default Success;
