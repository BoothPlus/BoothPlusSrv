import TokenHelper from '../helper/token-helper.js'
import AuthService from '../services/auth.service.js'

const AuthGuard = async (req, res, next) => {
  const token = await TokenHelper(req)
  if (await AuthService.TokenValidationCheck(token)) next()
  else res.status(401).send('tokenExpired or Error Occurred')
}

export default AuthGuard
