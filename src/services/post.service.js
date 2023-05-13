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

PostService.DeletePostById = async (options) => {
  const post = await Post.GetPostById(options.postId)
  if (post.creator !== options.userId.id) return { status: false, message: '님이 작성한 리뷰가 아닙니다.' }
  return await Post.DeletePostById(options.postId)
}

export default PostService
