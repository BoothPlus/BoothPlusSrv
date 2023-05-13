import Post from '../models/post.js'

const PostService = {}

PostService.GetAllPost = async (options) => {
  return {
    list: await Post.GetPaginatePost(options),
    count: await Post.GetCount(options)
  }
}

PostService.AddPost = async (post) => {
  await Post.AddPost(post)
}

export default PostService
