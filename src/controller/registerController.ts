import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { emailvaild, uservaild, emailVerfiy } from "../util";
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
		const userExist = await uservaild(value.username);
		const emailExist = await emailvaild(value.email);

		if (!userExist && !emailExist) {
			try {
				const hashedPassword = await bcrypt.hash(value.password, 12);
				const query = await pool.query(
					"insert into users(username ,name ,email, password) values($1, $2, $3 ,$4) returning id, username, email,verfied;",
					[value.username, value.name, value.email, hashedPassword]
				);
				(request.session as any).data = query.rows[0];

				try {
					const token = jwt.sign(
						{ username: value.username, email: value.email },
						(process.env as any).jwt,
						{ expiresIn: "1h" }
					);
					const sent = emailVerfiy(
						value.email,
						value.username,
						token,
						(done: boolean) => {
							if (done) {
								response.status(200).send(request.session);
							} else {
								response.status(500).send({ error: "something went wrong" });
							}
						}
					);
				} catch (err) {
					console.log(err);
				}
			} catch (err) {
				console.log(err);
				response.status(500).send(err);
			}
		} else if (userExist) {
			response.status(400).send({ error: "username is already taken" });
		} else {
			response.status(400).send({ error: "email is already in use" });
		}
	} catch (err) {
		console.log(err);
	}
}

export default registerController;
