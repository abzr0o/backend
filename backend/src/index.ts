import express from "express";

import { mongodb } from "./db";
import { authentication } from "./routes/auth";
import { session } from "./session";
import { NotSecure, secureRout } from "./routes";

const port = process.env.PORT || 2000;

mongodb();

const app = express();
//middleware for server
app.use(express.json());
app.use(session);

//any rout that dont need auth go in v1
app.use(NotSecure);

//makeing sure the user is authenticated
app.use(authentication);

//rout thats need use to be authenticated go in secureRout
app.use(secureRout);

//listen to port
app.listen(port, () => {
	console.log("up and running on port " + port);
});

//for testing in mocha
export default app;
