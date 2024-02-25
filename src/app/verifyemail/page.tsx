"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
	const [token, setToken] = useState("");
	const [verified, setVerified] = useState(false);
	const [error, setError] = useState(false);

	const verifyUserEmail = async () => {
		try {
			const response = await axios.post("/api/users/verifyemail", {
				token,
			});
			// console.log("response");
			// console.log(response.data.message);
			toast.success(response.data.message);
			setVerified(true);
		} catch (error: any) {
			setError(true);
		}
	};

	useEffect(() => {
		const urlToken = window.location.search.split("=")[1];
		setToken(urlToken || "");
	}, []);

	useEffect(() => {
		if (token.length > 0) {
			verifyUserEmail();
		}
	}, [token]);

	return (
		<div className="flex flex-col justify-center items-center min-h-screen px-2">
			<h1 className="text-4xl ">Verify Email</h1>

			<h2 className="bg-orange-500 text-black p-2  mt-3">
				{token ? `${token}` : "No Token"}
			</h2>

			{verified && (
				<div className="">
					<h2 className="text-2xl">Email verified</h2>
					<Link href="/login">Login</Link>
				</div>
			)}
			{error && (
				<div className="">
					<h2 className="text-2xl bg-red-500 text-black">{error}</h2>
				</div>
			)}
		</div>
	);
}
