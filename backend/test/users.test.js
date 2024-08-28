const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("../routes/users");
const queries = require("../models/queries");

jest.mock("../models/queries");

const app = express();
app.use(express.json());
app.use("/users", usersRouter);

beforeAll(async () => {
  const mockConnect = jest.fn();
  mongoose.connect = mockConnect.mockResolvedValue();
  await mongoose.connect();
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("Users API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("GET /users should return paginated members", async () => {
    const mockMembers = [
      {
        _id: "1",
        name: "John Doe",
        description: "A member",
        age: 30,
        image_url: "http://example.com/john.jpg",
        gender: "Male",
      }
    ];
    queries.getAllMembers.mockResolvedValue(mockMembers);

    const response = await request(app)
      .get("/users")
      .query({ page: 1, pageSize: 1 });

    expect(response.status).toBe(200);
    expect(response.headers["x-total-count"]).toBe("1");
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("John Doe");
  });

  test("POST /users/add should add a new member", async () => {
    const newMember = {
      name: "John Doe",
      description: "A new member",
      age: 30,
      image_url: "http://example.com/john.jpg",
      gender: "Male",
    };
    queries.addMember.mockResolvedValue({ _id: "1", ...newMember });

    const response = await request(app).post("/users/add").send(newMember);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("John Doe");
  });

  test("DELETE /users/delete/:index should delete a member", async () => {
    const mockMembers = [
      {
        _id: "1",
        name: "John Doe",
        description: "A member",
        age: 30,
        image_url: "http://example.com/john.jpg",
        gender: "Male",
      },
    ];
    queries.getAllMembers.mockResolvedValue(mockMembers);
    queries.deleteMember.mockResolvedValue({});

    const response = await request(app).delete("/users/delete/0");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Deleted");
  });

  test("PUT /users/update/:index should update a member", async () => {
    const mockMembers = [
      {
        _id: "1",
        name: "John Doe",
        description: "A member",
        age: 30,
        image_url: "http://example.com/john.jpg",
        gender: "Male",
      },
    ];
    const updatedMember = {
      name: "Jane Doe",
      description: "Updated member",
      age: 28,
      image_url: "http://example.com/jane.jpg",
      gender: "Female",
    };

    queries.getAllMembers.mockResolvedValue(mockMembers);
    queries.updateMember.mockResolvedValue({ _id: "1", ...updatedMember });

    const response = await request(app)
      .put("/users/update/0")
      .send(updatedMember);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Jane Doe");
  });

  test("GET /users/members/age-range should return members within age range", async () => {
    const mockMembers = [
      {
        _id: "1",
        name: "John Doe",
        description: "A member",
        age: 30,
        image_url: "http://example.com/john.jpg",
        gender: "Male",
      },
    ];
    queries.getMembersByAgeRange.mockResolvedValue(mockMembers);

    const response = await request(app)
      .get("/users/members/age-range")
      .query({ minAge: 20, maxAge: 40 });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("John Doe");
  });
});
