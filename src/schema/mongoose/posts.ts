import { Schema, model } from "mongoose";

const post = new Schema({
	username: String,
	createdAt: String,
	likes: [Number],
	comment: {
		username: String,
		createAt: String,
		likes: [Number],
	},
	body: String,
});

export default model("post", post);
