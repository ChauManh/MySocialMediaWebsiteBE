import User from "../model/user.js";
import Post from "../model/post.js";
import { emitToUser } from "../socket/socketService.js";
import { createNotificationService } from "./notification.js";

const createPostService = async (userId, postData) => {
  const newPost = new Post({
    authorId: userId,
    content: postData.content,
    media: postData.media,
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
  const user = await User.findById(userId);
  if (!post) {
    return {
      EC: 1,
      EM: "Bài viết không tồn tại",
    };
  }
  if (!textComment || textComment.trim() === "") {
    return {
      EC: 2,
      EM: "Nội dung bình luận không được để trống",
    };
  }
  const newComment = {
    userId,
    content: textComment,
  };
  post.comments.push(newComment);
  await post.save();
  if (userId !== post.authorId._id.toString()) {
    await createNotificationService(
      userId,
      post.authorId._id,
      "comment",
      `${user.fullname} đã bình luận bài viết của bạn.`,
      post._id
    );
    emitToUser(post.authorId._id, "comment", {
      senderId: userId,
      message: `${user.fullname} đã bình luận về bài viết của bạn.`,
    });
  }
  await post.populate("comments.userId", "fullname profilePicture");
  const latestComment = post.comments[post.comments.length - 1];
  return {
    EC: 0,
    EM: "Thêm bình luận thành công",
    result: latestComment,
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
  const user = await User.findById(userId);
  if (!post) {
    return {
      EC: 1,
      EM: "Bài viết không tồn tại",
    };
  }
  const hasLiked = post.likes.some((id) => id.toString() === userId.toString());
  if (hasLiked)
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  else {
    post.likes.push(userId);
    if (userId !== post.authorId._id.toString()) {
      await createNotificationService(
        userId,
        post.authorId._id,
        "like_post",
        `${user.fullname} đã thích bài viết của bạn.`,
        post._id
      );
      emitToUser(post.authorId._id, "like_post", {
        senderId: userId,
        message: `${user.fullname} đã thích bài viết của bạn.`,
      });
    }
  }
  await post.save();
  return {
    EC: 0,
    EM: hasLiked ? "Bỏ thích bài viết thành công" : "Thích bài viết thành công",
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
    };
  }
};

const getDetailPostService = async (postId) => {
  const post = await Post.findById(postId)
    .populate("authorId", "fullname profilePicture")
    .populate("comments.userId", "fullname profilePicture");
  if (!post) {
    return {
      EC: 1,
      EM: "Bài viết không tồn tại",
    };
  }
  return {
    EC: 0,
    EM: "Lấy bài viết thành công",
    result: post,
  };
};

export {
  createPostService,
  getPostsService,
  createCommentService,
  getPostsToDisplayService,
  likePostService,
  deletePostService,
  getDetailPostService,
};
