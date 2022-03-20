import server from "../src/index";
import superTest from "supertest";

jest.mock("knex", () => ({
  default: jest.fn(() => jest.fn()),
  __esModule: true
}));

describe("Efunds API", () => {
  it("index route respond with status code 200", async () =>
    expect((await superTest(server).get("/")).statusCode).toBe(200));
});
