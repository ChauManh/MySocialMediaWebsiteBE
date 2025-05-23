import {
  createPostService,
  getPostsService,
  createCommentService,
  getPostsToDisplayService,
  likePostService,
  deletePostService,
  getDetailPostService,
  savePostService,
  getSavedPosts,
} from "../service/post.js";

class PostController {
  async createPost(req, res) {
    const { _id } = req.user;
    const { content } = req.body;
    const media =
      req.files?.map((file) => {
        const isVideo = file.mimetype.startsWith("video");
        return {
          url: file.path,
          type: isVideo ? "video" : "image",
        };
      }) || [];
    const postData = {
      content,
      media,
    };
    try {
      const result = await createPostService(_id, postData);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async getPosts(req, res) {
    const userIdResponse = req.params.userId;
    try {
      const result = await getPostsService(userIdResponse);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async createComment(req, res) {
    const { _id } = req.user;
    const { textComment } = req.body;
    const { postId } = req.params;
    try {
      const result = await createCommentService(_id, postId, textComment);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async getPostsToDisplay(req, res) {
    const { _id } = req.user;
    try {
      const result = await getPostsToDisplayService(_id);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async likePost(req, res) {
    const { _id } = req.user;
    const { postId } = req.params;
    try {
      const result = await likePostService(_id, postId);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async deletePost(req, res) {
    const { _id } = req.user;
    const { postId } = req.params;
    try {
      const result = await deletePostService(_id, postId);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async getDetailPost(req, res) {
    const { postId } = req.params;
    try {
      const result = await getDetailPostService(postId);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async savePost(req, res) {
    const { _id } = req.user;
    const postId = req.params.postId;
    try {
      const result = await savePostService(_id, postId);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }

  async getSavedPosts(req, res) {
    const { _id } = req.user;
    try {
      const result = await getSavedPosts(_id);
      return result.EC === 0
        ? res.success(result.result, result.EM)
        : res.error(result.EC, result.EM);
    } catch (error) {
      return res.InternalError();
    }
  }
}

export default new PostController();
