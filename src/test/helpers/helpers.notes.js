const Note = require('../../databases/models/Model.Note.js')
const defaultNotes = [
  {
    title: 'Nota 1 de Test',
    content: 'Esta es la primera nota creada para test',
    startDate: new Date('September 9,2001 23:15:30'),
    finishDate: new Date().getTime(),
    estatusNote: false
  },
  {
    title: 'Nota 2 de Test',
    content: 'Esta es la segunda nota creada para test',
    startDate: new Date('December 13,2019 11:15:30'),
    finishDate: new Date().getTime(),
    estatusNote: true
  }
]
const handelSaveNote1 = async (params) => {
  const note1 = new Note({ ...defaultNotes[0], userAuthor: params })
  const saveNote1 = await note1.save()
  return saveNote1._id.toString()
}
const handelSaveNote2 = async (params) => {
  const note2 = new Note({ ...defaultNotes[1], userAuthor: params })
  const saveNote2 = await note2.save()
  return saveNote2._id.toString()
}
module.exports = { defaultNotes, handelSaveNote1, handelSaveNote2 }
