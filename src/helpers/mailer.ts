// .
// domain.com/verifytoken/gfgfrjtotkenname  =>      params approach --server side
// domain.com/verifytoken?token=cjbchvhvhvv  =>      window.location.  --client side

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
	try {
		// Create a hashed token
		const hashedToken = await bcryptjs.hash(userId.toString(), 10);

		// Update the database with hashed token
		if (emailType === "VERIFY") {
			await User.findByIdAndUpdate(userId, {
				verifyToken: hashedToken,
				verifyTokenExpiry: Date.now() + 3600000,
			});
		} else if (emailType === "RESET") {
			await User.findByIdAndUpdate(userId, {
				forgotPasswordToken: hashedToken,
				forgotPasswordTokenExpiry: Date.now() + 3600000,
			});
		}

		const transporter = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
				// add these to .env file
				user: "75a36ef46d2440",
				pass: "ce7cd9314e846d",
			},
		});

		const mailOptions = {
			from: "hopeinfinitude@gmail.com",
			to: email,
			// subject: emailType === "VERIFY" ? "Verify Your Email" :
			//  emailType === "RESET" ? "Reset Your Password" : ""
			subject:
				emailType === "VERIFY"
					? "Verify Your Email"
					: "Reset Your Password",
			html: `<p> Click
                <a href="${
					process.env.DOMAIN
				}/verifyemail?token=${hashedToken}"> here</a> to 
                ${
					emailType === "VERIFY"
						? "Verify your email"
						: "Reset your password"
				}

                or copy and paste the link below on your browser <br>
                ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`,
		};

		const mailresponse = await transporter.sendMail(mailOptions);

		return mailresponse;
	} catch (error: any) {
		throw new Error(error.message);
	}
};
