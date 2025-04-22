import User from "../model/user.js";
import Post from "../model/post.js";

const createPostService = async (userId, postData) => {
  const newPost = new Post({
    authorId: userId,
    content: postData.content,
    images: postData.images,
  });
  const savedPost = await newPost.save();
  return {
    EC: 0,
    EM: "Thêm bài viết thành công",
    result: savedPost,
  };
};

const getPostsService = async (userIdResponse) => {
  const posts = await Post.find({ authorId: userIdResponse })
    .sort({ createdAt: -1 })
    .populate("authorId", "fullname profilePicture")
    .populate("comments.userId", "fullname profilePicture");
  return {
    EC: 0,
    EM: posts.length > 0 ? "Lấy bài viết thành công" : "Không có bài viết nào",
    result: posts,
  };
};

const createCommentService = async (userId, postId, textComment) => {
  const post = await Post.findById(postId);
  if (!post) {
    return {
      EC: 1,
      EM: "Bài viết không tồn tại",
    };
  }
  const newComment = {
    userId,
    content: textComment,
  };
  post.comments.push(newComment);
  await post.save();
  return {
    EC: 0,
    EM: "Thêm bình luận thành công",
    result: post.comments,
  };
};

const getPostsToDisplayService = async (userId) => {
  const user = await User.findById(userId);
  const posts = await Post.find({ authorId: { $in: user.friends } })
    .sort({ createdAt: -1 })
    .populate("authorId", "fullname profilePicture")
    .populate("comments.userId", "fullname profilePicture");
  return {
    EC: 0,
    EM: posts.length > 0 ? "Lấy bài viết thành công" : "Không có bài viết nào",
    result: posts,
  };
};

const likePostService = async (userId, postId) => {
  const post = await Post.findById(postId);
  if (!post) {
    return {
      EC: 1,
      EM: "Bài viết không tồn tại",
    };
  }
  const hasLiked = post.likes.some((id) => id.toString() === userId.toString());
  if (hasLiked)
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  else post.likes.push(userId);
  await post.save();
  return {
    EC: 0,
    EM: hasLiked ? "Bỏ thích bài viết thành công" : "Thích bài viết thành công",
    result: post.likes,
  };
};

const deletePostService = async (userId, postId) => {
  const post = await Post.findById(postId);
  if (!post) {
    return {
      EC: 1,
      EM: "Bài viết không tồn tại",
    };
  }
  if (post.authorId.toString() !== userId) {
    return {
      EC: 1,
      EM: "Bạn không thể xóa bài viết của người khác",
    };
  } else {
    await post.deleteOne();
    return {
      EC: 0,
      EM: "Xóa bài viết thành công",
      result: null,
    };
  }
};

export {
  createPostService,
  getPostsService,
  createCommentService,
  getPostsToDisplayService,
  likePostService,
  deletePostService,
};
