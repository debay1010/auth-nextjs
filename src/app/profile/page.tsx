"use client";

import axios from "axios";
import { collectGenerateParams } from "next/dist/build/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import Router from "next/router";
import toast from "react-hot-toast";

export default function Profilepage() {
	const router = useRouter();
	const [data, setData] = useState("nothing");
	const logout = async () => {
		try {
			const response = await axios.get("/api/users/logout");
			console.log(response);
			toast.success("Logout successful");
			router.push("/login");
		} catch (error: any) {
			console.log(error.message);
			toast.error(error.message);
		}
	};

	const getUserDetails = async () => {
		const res = await axios.get("/api/users/me");
		console.log(res.data);
		setData(res.data.data._id);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<hr />
			<h1 className="title">Profile Page</h1>
			<hr />
			<h2 className=" p-2 rounded mb-3 bg-black text-white">
				{data === "nothing" ? (
					"Nothing"
				) : (
					<Link href={`/profile/${data}`}>{data}</Link>
				)}
			</h2>
			<button onClick={logout} className="btn2">
				{" "}
				Logout
			</button>

			<button
				type="button"
				onClick={getUserDetails}
				className="btn3 mt-4"
			>
				Get User Details
			</button>
			{/* <button onClick={getUserDetails} className="btn2">
				{" "}
				Logout
			</button> */}
		</div>
	);
}
