import Post from '../models/post.js'

const PostService = {}

PostService.GetAllPost = async (options) => {
  return await Post.GetPost(options)
}

PostService.AddPost = async (post) => {
  await Post.AddPost(post)
}

export default PostService