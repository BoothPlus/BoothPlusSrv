import express from 'express'
import cors from 'cors'
import postController from './api/post.controller.js'
import userController from './api/user.controller.js'

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
app.use('/user', userController)

app.listen(port, () => {
  console.log(`App Listening Port => ${port}`)
})
