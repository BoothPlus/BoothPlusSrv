import express from 'express'
import './config/dbConnection.js'
import Auth from './config/auth.js'

const app = express()
const port = process.env.PORT || 3000

app.use((req, res, next) => {
  const bearerHeader = req.headers['authorization']
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]
    Auth.TokenValidationCheck(token).then(res => {
      if (res) next()
    })
  } else {
    res.status(401).send('tokenExpired or Error Occurred')
  }
})

app.get('/', async (req, res) => {
  res.send('asdad')
})

app.listen(port, () => {
  console.log(`App Listening Port => ${port}`)
})


