const request = require("supertest");

const app = require("../index.js");

it("should created a user", async () => {
  const response = await request(app).post("/create").send({
    name: "celular",
    price: "1000",
    description: "xiaomi",
    categorie: "eletronic",
  });

  expect(response.status).toBe(200);
});

it("should return error when tried register with invalid data", async () => {
  const response = await request(app).post("/create").send({});

  expect(response.status).toBe(500);
});

it("should list all users", async () => {
  const response = await request(app).get("/");

  expect(response.status).toBe(200);
});

it("should generate report", async () => {
  const response = await request(app).get("/convertcsv");

  expect(response.status).toBe(200);
});

it("should updated a product", async () => {
  const response = await request(app)
    .put(`/update/61c69b3692b9575f54040959`)
    .send({
      name: "TV",
      price: "4000",
      description: "lg",
      categorie: "eletronic",
    });

  expect(response.status).toBe(200);
});

it("should not updated a product if the id is incorrect", async () => {
  const response = await request(app).put(`/update/1`).send({
    name: "TV",
    price: "4000",
    description: "lg",
    categorie: "eletronic",
  });

  expect(response.status).toBe(500);
});
