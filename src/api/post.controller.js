import express from 'express'
import TokenHelper from '../helper/token-helper.js'
import AuthService from '../services/auth.service.js'
import PostService from '../services/post.service.js'
import authGuard from '../config/authGuard.js'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const options = {
    itemId: req.params.id,
    page: req.query.page,
    pageSize: req.query.pageSize
  }
  res.send(await PostService.GetAllPost(options))
})

router.post('/', authGuard, async (req, res) => {
  const userInfo = await AuthService.GetUserInfo(await TokenHelper(req))
  const result = await PostService.AddPost(Object.assign(req.body, userInfo))
  res.send(result)
})

router.delete('/:id', authGuard, async (req, res) => {
  const options = {
    postId: req.params.id,
    userId: await AuthService.GetUserInfo(await TokenHelper(req))
  }

  const result = await PostService.DeletePostById(options)
  res.send(result)
})

export default router
