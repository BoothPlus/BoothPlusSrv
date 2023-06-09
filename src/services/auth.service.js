import fetch from 'node-fetch'
import UserService from './user.service.js'

const AuthService = {}

AuthService.TokenValidationCheck = async (token) => {
  const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`)
  const data = await response.json()

  const result = data.issued_to?.startsWith(process.env.CHROME_EXTENSION_CLIENT_ID)

  if (result) {
    const { id, name, email, picture } = await AuthService.GetUserInfo(token)

    const userEntity = {
      userId: id,
      name,
      email,
      profileImage: picture
    }

    await UserService.AddUser(userEntity)
  }

  return result
}

AuthService.GetUserInfo = async (token) => {
  const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    contentType: 'json'
  })

  return await response.json()
}

export default AuthService
