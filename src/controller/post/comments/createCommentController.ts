import { NextFunction, Request, Response } from "express";
import { post } from "../../../schema/mongoose";
const CreateComment = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { data } = request.session as any;
	const { postid } = request.params;
	const { body } = request.body;

	try {
		const query = await post.findById(postid);
		if (query) {
			query.comments.unshift({
				body: body,
				username: data.username,
				CreatedAt: new Date().toISOString(),
			});
			await query.save();
			response.status(200).send(query);
			return query;
		}
	} catch (Err) {
		response.status(401).send({ error: "body must not be empty" }).end();
	}
};

export default CreateComment;
