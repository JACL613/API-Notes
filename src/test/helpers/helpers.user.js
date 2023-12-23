const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../../databases/models/Model.User.js')
const { app } = require('../../server/index.server')

const api = supertest(app)
const defaultUser = {
  firstNqame: 'Administrador',
  lastName: 'admin123',
  email: 'root@example.com',
  password: 'LarootPassword2'
}

// ! Registro de usuario admin
const handelCreateUser = async () => {
  const passwordHash = await bcrypt.hash(defaultUser.password, 10)
  delete defaultUser.password
  const user = new User({ ...defaultUser, passwordHash })
  const saveUser = await user.save()
  const id = saveUser._id.toString()
  return id
}
//! inicio de sesión user admin
const handelForLogin = async () => {
  const userToken = await api
    .post('/api/users/login')
    .send({
      email: defaultUser.email,
      password: defaultUser.password
    })
  return userToken.body.token
}

module.exports = { defaultUser, handelCreateUser, handelForLogin }
