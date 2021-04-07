import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";

import { vaild } from "../util";
import { pool } from "../db";
import Schema from "../schema/registerControllerSchema";

async function registerController(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const { name, username, password, email, confirmPassword } = request.body;

	try {
		const value = await Schema.validateAsync({
			username,
			password,
			email,
			name,
			confirmPassword,
		});
		const isExist = await vaild(value.username);

		if (!isExist) {
			try {
				const hashedPassword = await bcrypt.hash(value.password, 12);
				const query = await pool.query(
					"insert into users(username ,name ,email, password) values($1, $2, $3 ,$4) returning id, username, email,verfied;",
					[value.username, value.name, value.email, hashedPassword]
				);
				response.status(200).send(query.rows[0]);
			} catch (err) {
				console.log(err);
				response.status(500).send(err);
			}
		} else {
			response.status(400).send({ error: "username is already taken" });
		}
	} catch (err) {
		console.log(err);
	}
}

export default registerController;
