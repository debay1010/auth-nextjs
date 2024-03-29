"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Signup() {
	const router = useRouter();

	const [user, setUser] = React.useState({
		email: "",
		password: "",
		username: "",
	});

	const [buttonDisabled, setButtonDisabled] = React.useState(false);
	const [loading, setLoading] = useState(false);

	const onSignup = async (e: any) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await axios.post("/api/users/signup", user);

			// console.log("Signup Success", response.data);S
			console.log("Signup Success", response.data.message);

			toast.success(response.data.message, { duration: 6000 });
			router.push("/login");
		} catch (error: any) {
			console.log("Signup failed:", error.message);
			toast.error(error.message, { duration: 6000 });
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (
			user.username.length > 0 &&
			user.email.length > 0 &&
			user.password.length > 0
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="card">
			<h1 className="processing">{loading ? "Processing" : "Sign Up"}</h1>
			{/* <hr /> */}
			<form onSubmit={onSignup}>
				<label htmlFor="username">Username</label>
				<input
					className="input"
					type="text"
					placeholder="Username"
					value={user.username}
					onChange={(e) =>
						setUser({ ...user, username: e.target.value })
					}
				/>
				<label htmlFor="email">Email</label>
				<input
					className="input"
					type="email"
					placeholder="Email"
					value={user.email}
					onChange={(e) =>
						setUser({ ...user, email: e.target.value })
					}
				/>
				<label htmlFor="password">Password</label>
				<input
					className="input"
					type="password"
					placeholder="Password"
					value={user.password}
					onChange={(e) =>
						setUser({ ...user, password: e.target.value })
					}
				/>

				{/* <button onClick={onSignup} className="btn"> */}

				{buttonDisabled ? (
					<button disabled className="btn-disabled">
						{buttonDisabled ? "Fill the form" : "Sign Up"}
					</button>
				) : (
					<button className="btn">
						{buttonDisabled ? "Fill the form" : "Sign Up"}
					</button>
				)}

				{/* <button className="btn">
					{buttonDisabled ? "No Sign Up" : "Sign Up"}
				</button> */}

				<p className="mt-3 text-center">
					Already registered?{" "}
					<Link className="hover:underline" href="/login">
						{" "}
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}
