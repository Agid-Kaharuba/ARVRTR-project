import { expect } from "chai";
import httpMocks from "node-mocks-http";
import sinon from "sinon";
import StepController from "../step"
import request from "supertest";

describe("Step controller", () => {
    var server: any;
    var stepId: any;
  
    beforeEach(() => {
      server = require("../../app");
    });
  
    afterEach(() => {
      server.close();
    });


    it("should create a step", async function () {
      const step = {
        name: "Test",
        description: "this is some text"
      }
      const { body } = await request(server).post("/step").send(step);
      stepId = body._id;
    });

    it("should get all steps", async function () {
      const step = {
        name: "Another test",
        description: "this is some text"
      }
      await request(server).post("/step").send(step);

      const { body } = await request(server).get("/step").send();
      expect(body.length).to.equal(2);
      expect(body[0]._id).to.equal(stepId);
    });

    it("should get a step", async function () {
      const { body } = await request(server).get(`/step/${stepId}`).send();
      expect(body.name).to.equal("Test");
      expect(body._id).to.equal(stepId);
    });

    it("should update a step", async function () {
      const step = {
        name: "Another test",
        description: "this is some text"
      }

      const response = await request(server).put(`/step/${stepId}`).send(step);
      expect(response.status).to.equal(200);
      const { body } = await request(server).get(`/step/${stepId}`).send();
      expect(body.name).to.equal(step.name);
      expect(body.description).to.equal(step.description);
    });

    it("should delete a step", async function () {
      const step = {
        name: "Another test",
        description: "this is some text"
      }

      const response = await request(server).delete(`/step/${stepId}`).send();
      expect(response.status).to.equal(200);
      const { body } = await request(server).get("/step").send();
      expect(body.length).to.equal(1);
      expect(body[0]._id).to.not.equal(stepId);
    });
});

