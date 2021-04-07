import express from "express";

import { login, register, authentication } from "./routes";
import { session } from "./session";

const port = process.env.PORT || 2000;

const app = express();
app.use(express.json());
app.use(session);
app.use(login);
app.use(register);

app.use(authentication);

app.get("/pro", (req, res) => {
	res.status(200).send(req.session);
});
app.listen(port, () => {
	console.log("up and running on port " + port);
});

export default app;
