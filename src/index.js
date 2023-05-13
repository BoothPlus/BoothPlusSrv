import express from 'express'
import './config/dbConnection.js'
import AuthService from './services/auth.service.js'
import postController from './api/post.controller.js'
import TokenHelper from './helper/token-helper.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200).send()
})

app.get('/healthz', (req, res) => {
  res.status(200).send()
})

app.use(express.json())
app.use(cors())
app.use('/post', postController)

app.listen(port, () => {
  console.log(`App Listening Port => ${port}`)
})
