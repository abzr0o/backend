import { NextFunction, Request, Response } from "express";
import { post } from "../../schema/mongoose";
const CreatePost = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { data } = request.session as any;
	const body = request.body;

	try {
		const newPost = new post({
			username: data.username,
			createdAt: new Date().toISOString(),
			body: body.data,
		});
		const Post = await newPost.save();
		if (Post) {
			response.status(200).end();
		}
	} catch (err) {
		response.status(401).send({ error: "body must not be empty" }).end();
	}
};

export default CreatePost;
