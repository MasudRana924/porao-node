import { Request, Response } from 'express';
import { createUserAccount, findExistingUser } from '../model/user';
import { IUserAccount } from '../schema/userSchema';
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { phone, password } = req.body;
      if (!phone || !password) {
        return res.status(400).json({ message: 'Phone and password are required' });
      }
      const existingUser = await findExistingUser(phone);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData: Partial<IUserAccount> = {
        phone,
        password:hashedPassword,
        createdAt: new Date(),
        isVerified: false,
        otp: "123456",
        otpExpires: new Date(Date.now() + 3600000),
      };
      const newUser = await createUserAccount(userData as IUserAccount);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };