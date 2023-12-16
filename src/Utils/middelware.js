const { info } = require('./logger')
const jwt = require('jsonwebtoken')
const Note = require('../databases/models/Model.Note')
// const User = require('../../databases/models/Model.User')

const getAutorization = async (req, res, next) => {
  // Esta parte extrae la autorización de la cabecera http
  //
  const autorization = req.get('authorization')
  let token = ''

  if (autorization && autorization.toLowerCase().startsWith('bearer')) {
    token = autorization.substring(7)
  }
  if (!token) {
    return res.status(400).json({ message: 'Invalid token' })
  }
  // Esto comprueba que la autorización no valla a ser errada
  let decodedToken
  try {
    // en caso de no tener inconvenientes el token se almacena en la variable
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    if (error) {
    // si no detiene la petición y devuelve el error
      return res.status(400).json({ error: 'No se pudo desencriptar la autorización' })
    }
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    // Si el método es DELETE o UPDATE necesita comprobar que la nota le pertenezca al usuario
    const noteId = req.get('id')
    const query = await Note.findById(noteId).populate({
      path: 'userAuthor',
      select: {
        firstName: 1,
        email: 1,
        _id: 1
      }
    })
    // comprueba que se halla encontrado la nota
    if (!query || query === null || query === undefined) {
      return res.status(400).json({ message: 'No se encontró la nota' })
    }
    const { nameuser } = decodedToken
    console.log(noteId, query)
    const { userAuthor: user } = query
    if (nameuser !== user.nameuser) {
      return res.status(400).json({ error: 'Usuario Invalid' })
    }
    // envía directamente el usuario
    req.body = { ...req.body, user }
  }

  req.body = { ...req.body, user: decodedToken }
  next()
}

const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:  ', request.path)
  info('Body:  ', request.body)
  info('---')
  next()
}

module.exports = {
  getAutorization,
  requestLogger
}
