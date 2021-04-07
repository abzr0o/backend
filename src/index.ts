import express from "express";

import { login, register } from "./routes";
import { session } from "./session";

const port = process.env.PORT || 2000;

const app = express();
app.use(express.json());
app.use(session);
app.use(login);

app.use((req, res, next) => {
	if (!req.session || !(req.session as any).userid) {
		const err = new Error("not allowed");
		(err as any).statusCode = 401;
		next(err);
	}
	next();
});

app.get("/pro", (req, res) => {
	res.status(200).send(req.session);
});
app.listen(port, () => {
	console.log("up and running on port " + port);
});

export default app;
