import {
  createPostService,
  getPostsService,
  createCommentService,
} from "../service/post.js";

class PostController {
  async createPost(req, res) {
    const { _id } = req.user;
    const { content } = req.body;
    const imageUrls = req.files?.map((file) => file.path);
    const postData = {
      content,
      images: imageUrls || [],
    };
    try {
      const result = await createPostService(_id, postData);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async getPosts(req, res) {
    // const { userId } = req.user;
    const userIdResponse = req.params.userId;
    try {
      const result = await getPostsService(userIdResponse);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }

  async createComment(req, res) {
    const { _id } = req.user;
    const { textComment, postId } = req.body;
    try {
      const result = await createCommentService(_id, postId, textComment);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError(error.message);
    }
  }
}

export default new PostController();
