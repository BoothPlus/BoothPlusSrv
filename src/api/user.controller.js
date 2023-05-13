import express from 'express'
import authGuard from '../config/authGuard.js'
import AuthService from '../services/auth.service.js'
import TokenHelper from '../helper/token-helper.js'
import UserService from '../services/user.service.js'

const router = express.Router()

router.get('/me', authGuard, async (req, res) => {
  const userInfo = await AuthService.GetUserInfo(await TokenHelper(req))
  const user = await UserService.GetUserByUserId(userInfo.id)
  res.send(user)
})

export default router
