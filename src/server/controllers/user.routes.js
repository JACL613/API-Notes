const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = require('express').Router()
const User = require('../../databases/models/Model.User')

userRouter.get('/', (req, res) => {
  res.send('welcomen to api notes')
})

userRouter.get('/oneUser', async (req, res) => {
  const authorization = req.get('authorization')
  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken) {
    return res.status(400).json({ error: 'Invalid token' })
  }
  const { id: userId } = decodedToken
  const user = await User.findById(userId).populate('note', {
    title: 1,
    content: 1

  })
  // Crear control de errores
  res.send(user)
})

userRouter.post('/create', async (req, res) => {
  const { body } = req
  const { firstName, lastName, email, password } = body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const query = await User.find({
    $or: [
      { firstName },
      { email },
      { passwordHash }
    ]
  })
  if (query[0]) {
    const passwordCorrect = query[0]
      ? await bcrypt.compare(password, query[0].passwordHash)
      : false
    if (query[0].firstName === firstName || !passwordCorrect) {
      return res.status(400).json({ message: 'Invalid password o username have create' })
    }
  }
  const user = new User({
    firstName,
    lastName,
    email,
    passwordHash
  })
  const saveUser = await user.save()

  res.status(200).json(saveUser)
})

userRouter.post('/login', async (req, res) => {
  const { body } = req
  const { email, password } = body

  const user = await User.findOne({ email })
  const passwordCorrect = user == null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    res.status(401).json({ errors: 'invalid user or password' })
  }
  const userForToken = {
    id: user._id,
    firstName: user.firstName,
    email: user.email
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  res.send({
    firstName: user.firstName,
    token,

  })
})

module.exports = userRouter
