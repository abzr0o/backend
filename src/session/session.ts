import expressSession from "express-session";
import dotenv from "dotenv";

import redisStore from "./redisStore";
import { redisclient } from "../db";

dotenv.config();

const session = expressSession({
	store: new redisStore({ client: redisclient }),
	secret: (process.env as any).SESSION,
	saveUninitialized: false,
	resave: false,
	name: "sessionid",
	cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: false, secure: false },
});

export default session;
