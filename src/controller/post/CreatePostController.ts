import { NextFunction, Request, Response } from "express";
import { post } from "../../schema/mongoose";
const CreatePost = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { cookie, data } = request.session as any;
	const body = request.body;
	const newPost = new post({
		username: data.username,
		createdAt: new Date().toISOString(),
		body: body.data,
	});
	try {
		const Post = await newPost.save();
		if (Post) {
			response.status(200).end();
		}
	} catch (err) {
		response.status(500).end();
	}
};

export default CreatePost;
