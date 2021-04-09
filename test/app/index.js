"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../../src/index"));
describe("api", function () {
    it("post /login", function (done) {
        supertest_1.default(index_1.default)
            .post("/login")
            .send({ username: "a", password: "Q" })
            .expect(200)
            .then(function (res) {
            var body = res.body;
            chai_1.expect(body).to.contain(Object);
            done();
        })
            .catch(done);
    });
    it("get /pro", function (done) {
        supertest_1.default(index_1.default)
            .get("/pro")
            .expect(401)
            .then(function (res) {
            var body = res.body;
            chai_1.expect(body).to.contain({});
            done();
        })
            .catch(done);
    });
});
