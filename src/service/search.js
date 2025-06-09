import User from "../model/user.js";

// const 

const searchUsersService = async (userId, keyword) => {
  const users = await User.find({
    fullname: { $regex: keyword.trim(), $options: "i" },
    _id: { $ne: userId },
  }).select("fullname profilePicture friends friendRequests");
  return {
    EC: 0,
    EM: "Tìm kiếm người dùng thành công",
    result: users,
  };
};

export { searchUsersService };
