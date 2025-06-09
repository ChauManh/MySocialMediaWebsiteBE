import UserHistory from "../model/userHistory.js";
import User from "../model/user.js";

const addSearchHistoryService = async (
  userId,
  { type, keyword = "", userIdTarget = null }
) => {
  let searchEntry;

  if (type === "keyword") {
    if (keyword.trim() === "")
      return {
        EC: 1,
        EM: "Từ khóa tìm kiếm không được để trống",
      };

    searchEntry = {
      type: "keyword",
      keyword,
    };

    await UserHistory.updateOne(
      { userId },
      { $pull: { searchHistory: { type: "keyword", keyword } } }
    );
  }

  if (type === "user") {
    const user = await User.findById(userIdTarget);
    if (!user)
      return {
        EC: 1,
        EM: "Người dùng tìm kiếm không hợp lệ",
      };

    searchEntry = {
      type: "user",
      user: {
        _id: user._id,
        fullname: user.fullname,
        profilePicture: user.profilePicture,
      },
    };

    await UserHistory.updateOne(
      { userId },
      { $pull: { searchHistory: { type: "user", "user._id": user._id } } }
    );
  }

  const updated = await UserHistory.findOneAndUpdate(
    { userId },
    {
      $push: {
        searchHistory: {
          $each: [searchEntry],
          $position: 0,
          $slice: 20, // giữ tối đa 20 dòng gần nhất
        },
      },
    },
    { upsert: true, new: true }
  );

  return {
    EC: 0,
    EM: "Thêm vào lịch sử tìm kiếm thành công",
    result: updated.searchHistory,
  };
};

const getSearchHistoryService = async (userId) => {
  const history = await UserHistory.findOne({ userId }).lean();
  if (!history) {
    return {
      EC: 0,
      EM: "Không có lịch sử tìm kiếm",
      result: [],
    };
  }
  const recentHistory = history.searchHistory.slice(0, 5);
  return {
    EC: 0,
    EM: "Lấy lịch sử tìm kiếm thành công",
    result: recentHistory,
  };
};

const deleteOneSearchHistoryByIndexService = async (userId, index) => {
  const historyDoc = await UserHistory.findOne({ userId });
  historyDoc.searchHistory.splice(index, 1);
  await historyDoc.save();
  return {
    EC: 0,
    EM: "Xoá thành công",
    result: historyDoc.searchHistory.slice(0, 5), // Trả về 5 dòng mới nhất sau khi xóa
  };
};

export {
  addSearchHistoryService,
  getSearchHistoryService,
  deleteOneSearchHistoryByIndexService,
};
