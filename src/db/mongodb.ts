import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongo = () => {
	mongoose.connect(
		(process.env as any).MONGODB,
		{ useUnifiedTopology: true, useNewUrlParser: true },
		() => {
			console.log("we are connected to db");
		}
	);
};

export default mongo;
