const Note = require('../../databases/models/Model.Note.js')
const defaultNotes = [
  {
    title: 'Nota 1 de Test',
    content: 'Esta es la primera nota creada para test'
  },
  {
    title: 'Nota 2 de Test',
    content: 'Esta es la segunda nota creada para test'
  }
]
const handelSaveNote1 = async (params) => {
  const note1 = new Note({
    title: defaultNotes[0].title,
    content: defaultNotes[0].content,
    date: new Date().getTime(),
    userAuthor: params
  })
  const saveNote1 = await note1.save()
  return saveNote1._id.toString()
}
const handelSaveNote2 = async (params) => {
  const note2 = new Note({
    title: defaultNotes[1].title,
    content: defaultNotes[1].content,
    date: new Date().getTime(),
    userAuthor: params
  })
  const saveNote2 = await note2.save()
  return saveNote2._id.toString()
}
module.exports = { defaultNotes, handelSaveNote1, handelSaveNote2 }
