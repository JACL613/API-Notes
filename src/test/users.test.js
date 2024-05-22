const supertest = require("supertest");
const User = require("../databases/models/Model.User");
const Note = require("../databases/models/Model.Note");
const { handelCreateUser, handelForLogin, defaultUser } = require("./helpers/helpers.user");
const { handelSaveNote1, handelSaveNote2 } = require("./helpers/helpers.notes");
const { default: mongoose } = require("mongoose");
const { server, app } = require("../server/index.server");

const api = supertest(app);

const {firstName,lastName , email ,password} = defaultUser[1]
jest.setTimeout(20000);

beforeEach(async () => {
  await User.deleteMany({});
  await Note.deleteMany({});
  const idAuth = await handelCreateUser();
  idNote1 = await handelSaveNote1(idAuth);
  idNote2 = await handelSaveNote2(idAuth);
  token = await handelForLogin();
});

describe("TEST CRUD USERS API", () => {
    test('conditions for creating users',async () => {
    await api
    .post('/api/users/create')
    .send({firstName, lastName, email, password: ''})
    .expect(406)
    })
    test('conditions for creating users duplication',async () => {
      await api
      .post('/api/users/create')
      .send({firstName:defaultUser[0].firstName, lastName, email, password: defaultUser[0].password})
      .expect(400)
      })
    test('shipping without information',async () => {
      await api
      .post('/api/users/create')
      .send({})
      .expect(406)
      })
    
})

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
