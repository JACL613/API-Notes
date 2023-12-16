const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// esquema del modelo de usuarios
const SchemaUser = new Schema({
  firstName: { type: String, require: true, unique: true },
  lastName: { type: String, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  passwordHash: { type: String, require: true, unique: true },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }]
})

SchemaUser.set('toJSON', {
  transform: (doc, returnObj) => {
    returnObj.id = returnObj._id
    delete returnObj._id
    delete returnObj.__v
    delete returnObj.passwordHash
  }
})
SchemaUser.plugin(uniqueValidator)

const User = model('User', SchemaUser)
module.exports = User
