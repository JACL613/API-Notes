const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
let conecctionString = process.env.DB_URI
if (process.env.NODE_ENV === 'test') {
  console.log('entorno de tests')
  conecctionString = process.env.DB_URI_TEST
} 

mongoose.connect(`${conecctionString}`)
  .then(() => {
    console.log('Data bases Listening')
  })
  .catch(err => {
    console.log({
      status: 400,
      error: err.message
    })
  })
