import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
import bcrypt from "bcryptjs";
import axios from "axios";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { username, email, password } = reqBody;

		console.log("one -signup");
		console.log(reqBody);

		// validate user entries
		if (!username || !email || !password) {
			// throw new Error("Al fields are required");

			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 }
			);
		}

		// Check if user already exists
		const user = await User.findOne({ email });
		console.log(user);
		if (user) {
			return NextResponse.json(
				{ error: "User Already Exists" },
				{ status: 400 }
			);
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = await new User({
			username,
			email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();

		console.log("two- signup");
		console.log(savedUser);

		// send verification email
		await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

		return NextResponse.json({
			message: "User created successfully!!!",
			success: true,
			savedUser,
		});
	} catch (error: any) {
		// return NextResponse.json({ error: error.message }, { status: 500 });
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
