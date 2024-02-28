"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgotPasswordEmail() {
	const router = useRouter();

	const [email, setEmail] = React.useState("");

	const [buttonDisabled, setButtonDisabled] = React.useState(false);
	const [loading, setLoading] = useState(false);

	const onSignup = async (e: any) => {
		e.preventDefault();
		try {
			const user = { email };
			setLoading(true);
			console.log(email, user);
			const response = await axios.post(
				"/api/users/emailForgotPassword",
				user
			);
			console.log(response);
			// console.log("Signup Success", response.data);S
			console.log("Password change success", response.data.message);

			toast.success(response.data.message, { duration: 6000 });
			router.push("/login");
		} catch (error: any) {
			console.log("Passowd change failed:", error.message);
			toast.error(error.message, { duration: 6000 });
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (email.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [email]);

	return (
		<div className="card">
			<h1 className="processing">
				{loading ? "Processing" : "Forgot Password"}
			</h1>
			<p className=" text-center py-4 w-full ">
				Emter your email address and click ok to reset your password
			</p>
			{/* <hr /> */}
			<form onSubmit={onSignup}>
				<label htmlFor="email">Email</label>
				<input
					className="input"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				{buttonDisabled ? (
					<button disabled className="btn-disabled">
						OK
					</button>
				) : (
					<button className="btn">OK</button>
				)}
			</form>
		</div>
	);
}
