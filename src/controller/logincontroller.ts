import e, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

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
		const query = await pool.query("select * from users where username = $1", [
			value.username,
		]);
		if (query.rowCount > 0) {
			const cheackPassword = await bcrypt.compare(
				password,
				query.rows[0].password
			);
			if (cheackPassword) {
				(request.session as any).data = {
					username: query.rows[0].username,
					email: query.rows[0].email,
					name: query.rows[0].name,
				};
				response.status(200).send(request.session);
				next();
			} else {
				response.status(400).send({ error: "wrong crediantil" });
			}
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
