"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
	const router = useRouter();
	const [user, setUser] = React.useState({
		email: "",
		password: "",
	});

	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [loading, setLoading] = useState(false);

	const onLogin = async () => {
		try {
			setLoading(true);

			const response = await axios.post("/api/users/login", user);
			console.log("Login Successful", response.data);
			console.log(response);

			toast.success("Login Successful!", {
				duration: 6000,
			});
			router.push("/profile");
		} catch (error: any) {
			console.log("login failed", error.message);
			// toast.error("Something went wrong. You can't log in");
			toast.error(error.message, {
				duration: 6000,
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user.email.length > 0 && user.password.length > 0) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="card">
			<h1 className="title">{loading ? "Processing" : "Login"}</h1>

			{/* <h1 className="title">Login</h1> */}
			<hr />
			{/* <form> */}
			<label htmlFor="email">Email</label>
			<input
				className="input"
				type="email"
				placeholder="Email"
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
			/>
			<label htmlFor="password">Password</label>
			<input
				// className="block w-full rounded-md p-2 placeholder:text-sm border-0 outline-0 ring-1 ring-indigo-500 focus:ring-2 mb-4"
				className="input"
				type="password"
				placeholder="Password"
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
			/>

			<button onClick={onLogin} className="btn">
				{buttonDisabled ? "No Login" : " Login"}
			</button>
			<p className="mt-3 text-center">
				Not yet registered?{" "}
				<Link className="underline" href="/signup">
					{" "}
					Sign Up
				</Link>
			</p>
			{/* </form> */}
		</div>
	);
}
