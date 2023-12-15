const bcrypt = require('bcrypt')
// const {dezz} = require('./helpers.notes')
const supertest = require('supertest')
const User = require('../../databases/models/Model.User.js')
const { app } = require('../../server/index.server')

const api = supertest(app)
const defaultUser = {
  name: 'Administrador',
  nameUser: 'admin123',
  password: 'Lapasswordadmin',
  refAvatar: 2
}

// ! login for user
const handelCreateUser = async () => {
  const passwordHash = await bcrypt.hash(defaultUser.password, 10)
  const user = new User({
    name: defaultUser.name,
    nameuser: defaultUser.nameUser,
    passwordHash,
    date: new Date().getTime(),
    refAvatar: defaultUser.refAvatar
  })
  const saveUser = await user.save()
  const id = saveUser._id.toString()
  return id
}
//! inicio de sesion user admin
const handelForLogin = async () => {
  const userToken = await api
    .post('/api/users/login')
    .send({
      nameuser: defaultUser.nameUser,
      password: defaultUser.password
    })
  return userToken.body.token
}

module.exports = { defaultUser, handelCreateUser, handelForLogin }
