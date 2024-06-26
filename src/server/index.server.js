require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
const app = express()

require('../databases/connectionsDB')

const noteRouter = require('./controllers/note.routes')
const userRouter = require('./controllers/user.routes')
const middelware = require('../Utils/middelware')

app.use(express.json())
app.use(morgan('dev'))
app.use(middelware.requestLogger)
app.use(cors())
if (process.env.NODE_ENV === 'test') {
  console.log('entorno de tests')

  app.set('port', process.env.PORT_TEST || 8080)
} else {
  app.set('port', process.env.PORT || 3003)
}

app.use('/api/users', userRouter)
app.use('/api/notes', middelware.getAutorization, noteRouter)
app.use(express.static('public'))
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../../public/404.html'));
});

// app.get('/', function (req, res) {
//   res.sendFile(path.join((__dirname, './public/index.html')))
// })
const server = app.listen(app.get('port'), () => {
  console.log('listening on port ' + app.get('port'))
})
module.exports = { app, server }
