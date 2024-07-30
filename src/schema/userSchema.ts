import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export interface IUserAccount extends Document {
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
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
  createdAt: Date;
}

const userAccountSchema: Schema = new Schema({
	userId: {
		type: String,
		default: uuidv4,
		unique: true,
	  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
	unique: true,
  },
  type: {
    type: String,
    default: "personal",
  },
  amount: {
    type: Number,
    default: 0,
  },
  point: {
    type: Number,
    default: 0,
  },
  birthdate: {
    type: String,
  },
  avatarLogo: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model<IUserAccount>('User', userAccountSchema);
export default User;
