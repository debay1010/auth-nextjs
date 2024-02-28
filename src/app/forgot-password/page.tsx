"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Success from "../components/success";

export default function ForgotPassword() {
	const router = useRouter();
	const [token, setToken] = useState("");
	const [passwordReset, setPasswordReset] = useState(false);
	const [error, setError] = useState(false);

	const [password, setPassword] = useState("");
	const [buttonDisabled, setButtonDisabled] = React.useState(false);
	const [loading, setLoading] = useState(false);
	const [grabToken, setGrabToken] = useState(false);

	const onPasswordSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setLoading(true);
			if (!grabToken) {
				throw Error("Invalid token");
			}
			const response = await axios.post("/api/users/forgotPassword", {
				token,
				password,
			});
			console.log(response);
			console.log(response.data.message);
			toast.success(response.data.message, { duration: 12000 });
			toast.success("Password reset successful", { duration: 8000 });

			setPasswordReset(true);

			router.push("/login");
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
			setGrabToken(true);
		}
	}, [token]);

	return (
		<div className="card">
			{passwordReset && <Success msg="Password change successful" />}
			<h1 className="processing">
				{loading ? "Processing" : "Forgot Password"}
			</h1>
			<p className=" text-center py-4 w-full ">
				Emter your new password and click ok
			</p>
			{/* <hr /> */}
			<form onSubmit={onPasswordSubmit}>
				<label htmlFor="password">New Password</label>
				<input
					className="input"
					type="password"
					placeholder="New Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className="btn">OK</button>
			</form>
		</div>
	);
}
