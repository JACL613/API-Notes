const noteRouter = require('express').Router()
const Note = require('../../databases/models/Model.Note')
const User = require('../../databases/models/Model.User')

noteRouter.get('/', async (req, res) => {
  // !Obtiene todas las notas
  const Notes = await Note.find({}).populate({
    path: 'userAuthor',
    select: { name: 1, nameuser: 1, _id: 0 }
  })
  // las filtra por el nombre de usuario
  const nameuser = req.body.user.nameuser
  const filterNote = Notes.filter(item => item.userAuthor.nameuser === nameuser)
  res.json(filterNote)
})
noteRouter.get('/one/', async (req, res) => {
  // !Obtiene una sola nota
  const id = req.get('id')
  const query = await Note.findById(id).populate('userAuthor', {
    name: 1,
    nameuser: 1,
    _id: 0
  })
  if (query === null) {
    // en caso de no encontrarla
    res.status(404).send({ error: 'No se encontró la nota' })
  }
  res.send(query)
})

noteRouter.post('/create', async (req, res) => {
  // !Crea una nota

  // desestructuración  del cuerpo de la petición  
  const { body } = req
  const {
    title,
    content
  } = body
  // comprueba que el contenido no este vació
  if (!content || !title) {
    return res.status(400).json({ error: 'Invalid content or title' })
  }
  // Toma el id usuario y comprueba que la nota pertenece a su colección
  const userId  = body.user.id
  const user = await User.findById(userId)
  console.log(user);
  if (!user || user == null || user==undefined) {
    return res.status(400).json({ error: 'Invalid User sesión' })
  }
  // Comprueba que el contenido de la nota no este duplicada
  const query = await Note.find({
    $or: [
      { title },
      { content }
    ]
  })
  if (query[0]) {
    if (query[0].title === title || query[0].content === content) {
      return res.status(400).json({ error: 'Invalid content or title have create' })
    }
  }
  // Después se guarda la nota y se concatena a la colección del usuario
  const noteNew = new Note({
    title,
    content,
    date: new Date().getTime(),
    userAuthor: user.toJSON().id
  })
  const saveNote = await noteNew.save()
  user.note = user.note.concat(saveNote._id)
  await user.save()

  res.status(200).json(noteNew) 
})

noteRouter.delete('/', async (req, res) => {
  // !Borrar Una Nota

  // Obtiene el id de la nota y la borra (devuelve la nota borrada)
  const noteId  = req.get('id')

  const noteDelete = await Note.findByIdAndRemove(noteId)
  res.send(noteDelete)
})

noteRouter.put('/', async (req, res) => {
  // !Actualiza una nota

  // desestructuración del cuerpo de la petición 
  const { body } = req
  const { title, content , user } = body

  // Toma el id de la nota y la actualiza con el nuevo contenido
  const noteId = req.get('id')

    const newNote = {
      title,
      content,
      date: new Date().getTime(),
      userAuthor: user._id
    }
    const noteUpdate = await Note.findByIdAndUpdate({ _id: noteId }, newNote)
    return res.send(noteUpdate)
  
})
module.exports = noteRouter
