import User from "../model/user.js";
import Post from "../model/post.js";

const createPostService = async (userId, postData) => {
  const user = await User.findById(userId);
  if (!user) {
    return { EC: 1, EM: "User not found" };
  }
  const newPost = new Post({
    authorId: userId,
    content: postData.content,
    image: postData.image,
  });
  const savedPost = await newPost.save();
  return {
    EC: 0,
    EM: "Create post successfully",
    result: savedPost,
  };
};

const getPostsService = async (userIdResponse) => {
  const posts = await Post.find({ authorId: userIdResponse })
    .sort({ createdAt: -1 }) // Sắp xếp mới nhất trước
    .populate("authorId", "fullname profilePicture")  
    .populate("comments.userId", "fullname profilePicture");
  return {
    EC: 0,
    EM: "Get posts successfully",
    result: posts,
  };
};

const createCommentService = async (userId, postId, textComment) => {
  const user = await User.findById(userId);
  if (!user) {
    return {
      EC: 1,
      EM: "User not found",
    };
  }
  const post = await Post.findById(postId);
  if (!post) {
    return {
      EC: 1,
      EM: "Post not found",
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
    EM: "Comment added successfully",
    result: post.comments, // Trả về danh sách các bình luận mới của bài viết
  };
};

export { createPostService, getPostsService, createCommentService };
