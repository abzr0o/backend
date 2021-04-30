import { expect } from "chai";
import request from "supertest";

import app from "../../src/index";

describe("api", () => {
	it("post /login", (done) => {
		request(app)
			.post("/login")
			.send({ username: "a", password: "Q" })
			.expect(200)
			.then((res) => {
				const body = res.body;
				expect(body).to.contain(Object);
				done();
			})
			.catch(done);
	});
	it("get /pro", (done) => {
		request(app)
			.get("/pro")

			.expect(401)
			.then((res) => {
				const body = res.body;
				expect(body).to.contain({});
				done();
			})
			.catch(done);
	});
});
