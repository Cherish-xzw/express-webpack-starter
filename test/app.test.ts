import app from "../src/app";
import * as request from "supertest";

describe("App", () => {
  const agent = request.agent(app.listen());
  it("should login success", done => {
    agent
      .post("/api/login")
      .set("Content-Type", "application/json")
      .send({ username: "helloworld", password: "password" })
      .expect(200, (err, res) => {
        res.body.should.have.property("token");
        done();
      });
  });
});
