import { Request, Response, NextFunction } from "express";

import { post } from "../../schema/mongoose";

const editPost = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { postid } = request.params;
	const { body } = request.body;
	try {
		const query = await post.findById(postid);
		const username = (request.session as any).data.username;

		if (query) {
			if (query.username === username) {
				query.body = body;
				query.EditedAt = new Date().toISOString();
				await query.save();
				response.status(200).send("post edited");
				next();
			} else {
				const err = new Error("not allwed");
				response.status(401).send({ error: "not allowed" });
				next(err);
			}
		} else {
			const err = new Error("post not founded");
			response.status(401).send({ error: "post not founded" });
			next(err);
		}
	} catch (errs) {
		const err = new Error("post not founded");
		response.status(401).send({ error: "post not founded" });
		next(err);
	}
};

export default editPost;
