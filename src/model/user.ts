import UserAccount from '../schema/userSchema';

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
    amount?: string;
    point?: string;
    avatarLogo?: string;
}

const createUserAccount = async (data: IUserData) => {
  console.log('data', data);
  const newUserAccount = new UserAccount(data);
  const createdUserAccount = await newUserAccount.save();
  return createdUserAccount;
};
export { createUserAccount };