import User, { IUserAccount } from '../schema/userSchema';

// Define the TypeScript interface for the User data
interface IUserData {
  userId: string;
  firstName?: string;
  lastName?: string;
  password: string;
  phone?: string;
  role?: string;
  gender?: string;
  type?: string;
  birthdate?: string;
  amount?: number;
  point?: number;
  avatarLogo?: string;
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
