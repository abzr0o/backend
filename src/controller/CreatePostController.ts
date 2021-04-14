import { NextFunction, Request, Response } from "express";

const CreatePost = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const session = request.session;
	const body = request.body;
};

export default CreatePost;
