import User from "../models/user.js";

export const createUser = async (props) => {
  let user = await getUserByChatId(props.chatId);
  if (!user) {
    user = await User.create({
      chatId: props.chatId,
      fullName: props.fullName,
      weight: props.weight,
      height: props.height,
      age: props.age,
      isActive: true,
    });
  }
  return user;
};

export const getUserByChatId = async (chatId) => {
  const user = await User.findOne({
    chatId,
  });
  return user;
};

export const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

export const getUsersWithoutReport = async () => {
  const users = await User.aggregate([
    { $match: query },
    {
      $lookup: {
        from: "users",
        localField: "chatId",
        foreignField: "chatId",
        as: "userId",
      },
    },
    { $unwind: "$userId" },
  ]);
  console.log(users);
  return users;
};
