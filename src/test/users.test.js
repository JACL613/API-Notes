const supertest = require("supertest");
const User = require("../databases/models/Model.User");
const Note = require("../databases/models/Model.Note");
const {
  handelCreateUser,
  handelForLogin,
  defaultUser,
} = require("./helpers/helpers.user");
const { handelSaveNote1, handelSaveNote2 } = require("./helpers/helpers.notes");
const { default: mongoose } = require("mongoose");
const { server, app } = require("../server/index.server");

const api = supertest(app);

const { firstName, lastName, email, password } = defaultUser[1];
jest.setTimeout(20000);


beforeEach(async () => {
  await User.deleteMany({});
  await Note.deleteMany({});
  const idAuth = await handelCreateUser();
  idNote1 = await handelSaveNote1(idAuth);
  idNote2 = await handelSaveNote2(idAuth);
  token = await handelForLogin();
});

describe("TEST CRUD USERS API SUCCESS", () => {
  test("Creating user",async () => {
    await api
    .post("/api/users/create")
    .send({ firstName, lastName, email, password})
    .expect(200);
  })
  test("loging user",async () => {
    await api
    .post("/api/users/create")
    .send({ firstName, lastName, email, password})

    await api
    .post("/api/users/login")
    .send({email, password})
    .expect(200);
  })
  test("Get user info", async () => {
    await api
    .post("/api/users/create")
    .send({ firstName, lastName, email, password})

   const sesion =  await api
    .post("/api/users/login")
    .send({email, password})

    const user =  await api
    .get("/api/users/")
    .set({ Authorization: `Bearer ${sesion.body.token}` })
    .expect(200)
    console.log(user.body)
    
    expect(user.body.email).toBe(email)
  })


});

describe("TEST CRUD USERS API ERRORS", () => {
  test("conditions for creating users", async () => {
    await api
      .post("/api/users/create")
      .send({ firstName, lastName, email, password: "" })
      .expect(406);
  });
  test("conditions for creating users duplication", async () => {
    await api
      .post("/api/users/create")
      .send({
        firstName: defaultUser[0].firstName,
        lastName,
        email,
        password: defaultUser[0].password,
      })
      .expect(400);
  });
  test("shipping without information", async () => {
    await api.post("/api/users/create").send({}).expect(406);
  });

  test("shipping with information for login", async () => {
    await api.post("/api/users/login").send({}).expect(401);
  })
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
