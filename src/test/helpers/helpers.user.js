const bcrypt = require("bcrypt");
const supertest = require("supertest");
const User = require("../../databases/models/Model.User.js");
const { app } = require("../../server/index.server");

const api = supertest(app);
const defaultUser = [
  {
    firstName: "Administrador",
    lastName: "admin123",
    email: "root@example.com",
    password: "LarootPassword",
  },
  {
    firstName: "Administrador2",
    lastName: "admin000",
    email: "root2@example.com",
    password: "LarootPassword2",
  },
];

// ! Registro de usuario admin
const handelCreateUser = async () => {
  const passwordHash = await bcrypt.hash(defaultUser[0].password, 10);
  const user = new User({ ...defaultUser[0], passwordHash });
  const saveUser = await user.save();
  const id = saveUser._id.toString();
  return id;
};
//! inicio de sesión user admin
const handelForLogin = async () => {
  const userToken = await api.post("/api/users/login").send({
    email: defaultUser[0].email,
    password: defaultUser[0].password,
  });
  return userToken.body.token;
};

module.exports = { defaultUser, handelCreateUser, handelForLogin };
