import User from "../model/user.js";

const getUserService = async (userIdRequest, userIdResponse) => {
  let user;
  if (userIdRequest !== userIdResponse) {
    user = await User.findById(userIdResponse).select(
      "-password -email -role -createdAt -updatedAt"
    );
  } else {
    user = await User.findById(userIdResponse).select("-password");
  }
  if (user) {
    return {
      EC: 0,
      EM: "Get user information successfully",
      result: user,
    };
  } else {
    return {
      EC: 1,
      EM: "User not found",
    };
  }
};

const updateUserService = async (userId, dataUpdate) => {
  const updatedUser = await User.findByIdAndUpdate(userId, dataUpdate, {
    new: true,
    select: "-password", // Dùng select ở đây để không lấy password
  });
  if (updatedUser) {
    return {
      EC: 0,
      EM: "Update user information successfully",
      result: updatedUser,
    };
  } else {
    return {
      EC: 1,
      EM: "User not found",
    };
  }
};

export { getUserService, updateUserService };
