import express from 'express'
import postService from '../services/post.service.js'
import TokenHelper from '../helper/token-helper.js'
import Auth from '../config/auth.js'
import PostService from '../services/post.service.js'

const router = express.Router()


router.get('/:id', async (req, res) => {
  const options = {
    itemId: req.params.id,
    page: req.query.page,
    pageSize: req.query.pageSize,
  }
  res.send(await PostService.GetAllPost(options))
})

router.post('/', async (req, res) => {
  const userInfo = await Auth.GetUserInfo(await TokenHelper(req))
  await postService.AddPost(Object.assign(req.body, userInfo))
  res.send('success')
})

export default router