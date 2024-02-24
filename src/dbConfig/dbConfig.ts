import mongoose, { Connection } from "mongoose";

export async function connect() {
	try {
		mongoose.connect(process.env.MONGO_URL!);
		const connection = mongoose.connection;
		connection.on("connected", () => {
			console.log("MongoDB Connected Successfully");
		});
		connection.on("error", (err) => {
			console.log(
				"MongoDB Connection problem. Make sure MongoDB is running",
				err
			);

			process.exit();
		});
	} catch (error) {
		console.log(error, "something went wrong with database connection");
	}
}
