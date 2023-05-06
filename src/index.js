import express from 'express'
import './config/dbConnection.js'
import Auth from './config/auth.js'
import postController from './api/post.controller.js'
import TokenHelper from './helper/token-helper.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(async (req, res, next) => {
  const token = await TokenHelper(req)
  if (await Auth.TokenValidationCheck(token)) next()
  else res.status(401).send('tokenExpired or Error Occurred')
})

app.use('/post', postController)

app.listen(port, () => {
  console.log(`App Listening Port => ${port}`)
})


