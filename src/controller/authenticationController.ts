import { NextFunction, Request, Response } from "express";

function authentication(
	request: Request,
	response: Response,
	next: NextFunction
) {
	if (!request.session || !(request.session as any).data) {
		const err = new Error("not allwed");
		response.status(401).send({ error: "not allowed" });
		next(err);
	}
	next();
}

export default authentication;
