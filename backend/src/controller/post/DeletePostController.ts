import { Request, Response, NextFunction } from "express";

import { post } from "../../schema/mongoose";

const DeletePost = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { postid } = request.params;
	try {
		const query = await post.findById(postid);
		const username = (request.session as any).data.username;

		if (query) {
			if (query.username === username) {
				try {
					await query.delete();
					response.status(200);
					next();
				} catch (err) {
					console.log(err);
				}
			} else {
				const err = new Error("not allwed");
				response.status(401).send({ error: "not allowed" });
				next(err);
			}
		}
		const err = new Error("post not founded");
		response.status(401).send({ error: "post not founded" });
		next(err);
	} catch (err) {
		console.log(err);
	}
};

export default DeletePost;
