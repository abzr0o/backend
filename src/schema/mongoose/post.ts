import { Schema, model } from "mongoose";

const post = new Schema({
	body: String,
	username: String,
	createdAt: String,
	comments: [
		{
			body: String,
			username: String,
			CreatedAt: String,
		},
	],
	likes: [
		{
			username: String,
			CreatedAt: String,
		},
	],
});

export default model("post", post);
