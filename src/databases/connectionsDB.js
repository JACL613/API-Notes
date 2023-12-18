const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
let conecctionString = process.env.DB_URI
if (process.env.NODE_ENV === 'test') {
  console.log('entorno de tests')
  conecctionString = process.env.DB_URI_TEST
}
if (process.env.NODE_ENV === 'local') {
  console.log('entorno local')
  conecctionString = process.env.DB_URI_TEST_LOCAL
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
