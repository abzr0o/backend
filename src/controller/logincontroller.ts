import { NextFunction, Request, Response } from "express";
import pool from "../db/db";

async function logincontroller(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const query = await pool.query("select * from users");
	(request.session as any).userid = query.rows[0].id;
	response.send(request.session);
	return;
}

export default logincontroller;
