import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json();
		const { token, password } = reqBody;

		console.log("one");
		console.log(reqBody);

		const user = await User.findOne({
			forgotPasswordToken: token,
			forgotPasswordTokenExpiry: { $gt: Date.now() }, //has not expired
		});

		if (!user) {
			return NextResponse.json(
				{ error: "Invalid token" },
				{ status: 400 }
			);
		}

		// Hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		console.log("two");
		console.log(user);

		user.password = hashedPassword;
		user.forgotPasswordToken = undefined;
		user.forgotPasswordTokenExpiry = undefined;
		await user.save();

		console.log("three");
		console.log(user);

		return NextResponse.json({
			message: "Password successfully changed",
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
