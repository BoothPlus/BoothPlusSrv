import fetch from 'node-fetch'
import User from '../models/user.js'

const Auth = {}

Auth.TokenValidationCheck = async (token) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
  const data = await response.json()

  const result = data['issued_to']?.startsWith(process.env.CHROME_EXTENSION_CLIENT_ID || '309877406534')

  if (result) {
    const { id, name, email, picture } = await Auth.GetUserInfo(token)

    const userEntity = {
      userId: id,
      name: name,
      email: email,
      profileImage: picture
    }

    await User.AddUser(userEntity)
  }

  return result
}

Auth.GetUserInfo = async (token) => {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    'contentType': 'json'
  })

  return await response.json()
}

export default Auth