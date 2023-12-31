const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const SchemaNote = new Schema({
  title: { type: String, require: true, unique: true },
  content: { type: String, require: true },
  startDate: { type: Date, default: new Date(), require: true },
  finishDate: { type: Date, default: new Date() },
  statusNote: { type: String, require: true, default: false },
  userAuthor: { type: Schema.Types.ObjectId, ref: 'User' }
})
SchemaNote.set('toJSON', {
  transform: (doc, returnObj) => {
    returnObj.id = returnObj._id
    delete returnObj._id
    delete returnObj.__v
  }
})
SchemaNote.plugin(uniqueValidator)

const Note = model('Note', SchemaNote)
module.exports = Note
