import express from "express";

import { authentication } from "./routes/auth";
import { session } from "./session";
import v1 from "./routes";

const port = process.env.PORT || 2000;

const app = express();
app.use(express.json());
app.use(session);
app.use(v1);

app.use(authentication);

app.get("/pro", (req, res) => {
	res.status(200).send(req.session);
});
app.listen(port, () => {
	console.log("up and running on port " + port);
});

export default app;
