import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { pool } from "../db";

async function verifyEmailController(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const token: any = request.query.token;
	try {
		const vaild = jwt.verify(token, (process.env as any).jwt);
		try {
			const isVerifyed = await pool.query(
				"select verfied from users where username = $1",
				[(vaild as any).username]
			);

			if (isVerifyed.rows[0].verfied === true) {
				response.status(300).redirect("/");
				return;
			}

			const query = await pool.query(
				"update users set verfied = true where username = $1",
				[(vaild as any).username]
			);
			response.status(300).redirect("/");
		} catch (err) {
			response.status(400).send({ error: err });
		}
	} catch (err) {
		response.status(400).redirect("/");
	}
}

export default verifyEmailController;
