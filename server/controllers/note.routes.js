const noteRouter = require('express').Router()
const Note = require('../../databases/models/Model.Note')
const User = require('../../databases/models/Model.User')

noteRouter.get('/', async (req, res) => {
  
  const Notes = await Note.find({}).populate({
    path: 'userAuthor',
    select: { name: 1, nameuser: 1, _id: 0 }
  })
  const filterNote = Notes.filter(item => item.userAuthor.nameuser === decodedToken.nameuser)
  res.json(filterNote)
})
noteRouter.get('/oneNote/:id', async (req, res) => {
  const id = req.params.id
  const query = await Note.findById(id).populate('userAuthor', {
    name: 1,
    nameuser: 1,
    _id: 0
  })
  if (query === null) {
    res.status(404).send({ error: 'No se encontró la nota' })
  }
  res.send(query)
})

noteRouter.post('/createNote', async (req, res) => {
  const { body } = req
  const {
    title,
    content
  } = body
  const { id: userId } = decodedToken
  console.log(userId);
  const user = await User.findById(userId)
  if (!content || !title) {
    return res.status(400).json({ error: 'Invalid content or title' })
  }
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
  console.log(user);
  if (!user || user == null || user==undefined) {
    return res.status(400).json({ error: 'Invalid User sesión' })
  }
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
noteRouter.delete('/:id', async (req, res) => {
  const { id: noteId } = req.params

  const noteDelete = await Note.findByIdAndRemove(noteId)
  res.send(noteDelete)
})
noteRouter.put('/', async (req, res) => {
  console.log(req.body);
  const { body } = req
  const noteId = req.get('id')
  const { title, content , user } = body

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
