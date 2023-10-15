const { info } = require("./logger")
const jwt = require('jsonwebtoken')
const Note = require('../databases/models/Model.Note')
// const User = require('../../databases/models/Model.User')


 const getAutorization = async (req, res, next ) =>{
  
    const autorization = req.get('authorization')
  let token = ''

  if (autorization && autorization.toLowerCase().startsWith('bearer')) {
    token = autorization.substring(7)
  }
  if (!token) {
    return res.status(400).json({ menssage: 'Invalid token' })
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken) {
    return res.status(400).json({ error: 'Invalid token' })
  }
  if (req.method !== 'POST') {
    const noteId = req.get('id')
    const query = await Note.findById(noteId).populate({
      path: 'userAuthor',
      select: {
        name: 1,
        nameuser: 1,
        _id: 1
      }
    })
    const { nameuser } = decodedToken
    const { userAuthor: user } = query
    if (nameuser !== user.nameuser) {
      return res.status(400).json({ error: 'Usuario Invalid' })
    }
    req.body = {...req.body, user: user}
  }
  

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