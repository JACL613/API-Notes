// const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
// const bcrypt = require('bcrypt')
const supertest = require('supertest')
const { defaultNotes, handelSaveNote1, handelSaveNote2 } = require('./helpers/helpers.notes')
const { handelCreateUser, handelForLogin } = require('./helpers/helpers.user')
const { app, server } = require('../server/index.server')
const Note = require('../databases/models/Model.Note.js')
const User = require('../databases/models/Model.User.js')

const api = supertest(app)
// TODO user Default

let idNote1 = ''
let idNote2 = ''
let token = ''
const suma = (a, b) => {
  return a + b
}
jest.setTimeout(20000)
beforeEach(async () => {
  await User.deleteMany({})
  await Note.deleteMany({})
  const idAuth = await handelCreateUser()
  idNote1 = await handelSaveNote1(idAuth)
  idNote2 = await handelSaveNote2(idAuth)
  token = await handelForLogin()
})

describe('All Test CRUD', () => {
  // ! GETS
  // * Test de tipo Get nota unitaria por id
  test('CRUD:Get one note for id', async () => {
<<<<<<< HEAD
    await api
      .get('/api/notes/one/')
=======
    const resNote1 = await api
      .get(`/api/notes/one/${idNote1}`)
>>>>>>> 96b549c1f837e7845ad57f0b74da13440c6e61bb
      .set({ Authorization: `Bearer ${token}` })
      .set({Id: idNote1})
      .expect(200)
<<<<<<< HEAD
      await api
      .get('/api/notes/one/')
=======
    const resNote2 = await api
      .get(`/api/notes/one/${idNote2}`)
>>>>>>> 96b549c1f837e7845ad57f0b74da13440c6e61bb
      .set({ Authorization: `Bearer ${token}` })
      .set({Id: idNote2})
      .expect(200)

    expect(resNote1.body.title).toBe(defaultNotes[0].title)
    expect(resNote1.body.content).toBe(defaultNotes[0].content)
  })
  // * Test de tipo Get todas las notas
  test('CRUD:Get all notes', async () => {
    const responseAllNote = await api
      .get('/api/notes/')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)

    expect(responseAllNote.body).toHaveLength(defaultNotes.length)
    // console.log(responseAllNote.body.length)
  })
  //! POST
  // * Test de tipo Post para crear notas
  test('CRUD:Post Create one note', async () => {
    const newNote = { ...defaultNotes[0] }
    await api
      .post('/api/notes/create')
      .set({ Authorization: `Bearer ${token}` })
      .send(newNote)
      .expect(200)
    const responseQuery = await api
      .get('/api/notes/')
      .set({ Authorization: `Bearer ${token}` })
    expect(responseQuery.body).toHaveLength(defaultNotes.length + 1)
  })
})

test('should first', () => {
  const result = suma(5, 5)
  expect(result).toBe(10)
})
afterAll(() => {
  mongoose.connection.close()
  server.close()
})
