import { NextFunction, Request, Response } from "express";

import pool from "../db/db";
import schema from "../schema/loginControllerSchema";

async function logincontroller(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const { username, password } = request.body;

	try {
		const value = await schema.validateAsync({ username, password });
		const query = await pool.query(
			"select username,email,name from users where username = $1",
			[value.username]
		);
		if (query.rowCount > 0) {
			(request.session as any).data = query.rows[0];
			response.status(200).send(request.session);
			next();
		} else {
			response.status(400).send({ error: "user is not found" });
			next();
		}
	} catch (err) {
		response.status(400).send(err);
		next();
	}
}

export default logincontroller;
