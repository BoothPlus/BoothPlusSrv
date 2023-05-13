import Post from '../models/post.js'

const PostService = {}

PostService.GetAllPost = async (options) => {
  return {
    list: await Post.GetPaginatePost(options),
    count: await Post.GetCount(options)
  }
}

PostService.AddPost = async (post) => {
  const insertedId = await Post.AddPost(post)
  return Post.GetPostById(insertedId)
}

export default PostService
