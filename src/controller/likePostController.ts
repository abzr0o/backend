import { Request, Response, NextFunction } from "express";

import { post } from "../schema/mongoose";

const Like = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const { postid } = request.params;
	const username = (request.session as any).data.username;
	const Post = await post.findById(postid);
	if (Post) {
		if (Post.likes.find((like: any) => like.username === username)) {
			Post.likes = Post.likes.filter((like: any) => like.username !== username);
		} else {
			Post.likes.push({
				username,
				CreatedAt: new Date().toISOString(),
			});
		}
		await Post.save();
		response.status(200).end();
		return Post;
	} else {
		response.status(500).end();
	}
};

export default Like;
