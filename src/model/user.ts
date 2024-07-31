import User, { IUserAccount } from '../schema/userSchema';
interface IUserData {
  phone?: string;
  password: string;
}

const createUserAccount = async (data: IUserData) => {
  const newUserAccount = new User(data);
  const createdUserAccount = await newUserAccount.save();
  return createdUserAccount;
};

const findExistingUser = async (phone: string): Promise<IUserAccount | null> => {
  const existingUser = await User.findOne({ phone });
  return existingUser;
};

export { createUserAccount, findExistingUser };
