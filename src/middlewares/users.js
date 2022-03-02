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
  const users = await User.find({isActive: true});
  return users;
};

export const getAllUsersId = async () => {
  const usersFullInfo = await User.find({isActive: true});
  const usersIds = usersFullInfo.map((user) => user.chatId);
  return usersIds;
};

export const updateUserByChatId = async (chatId, props) => {
  const user = await User.findOneAndUpdate(
    { chatId },
    { $set: { ...props } },
    { new: true, useFindAndModify: false }
  );
  return user;
};