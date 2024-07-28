import { Request, Response } from 'express';
import { createUserAccount } from '../model/user';
import { errorResponseHandler } from '../helper/errorResponseHandler';
// import { statusCodes } from '../helper/statusCodes';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';


// const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';

// const teacherRegistration = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     console.log(req.body);
    
//     // Validate inputs here if needed
    
//     const isTeacherExist = await UserModel.findTeacherAccountByEmail(email);
//     if (isTeacherExist) {
//       throw {
//         status: statusCodes.CONFLICT,
//         error: {
//           code: 40005,
//         },
//       };
//     }
    
//     const hashPassword = await bcrypt.hash(password, 9);
//     const otp = crypto.randomBytes(3).toString('hex');
//     const otpExpires = Date.now() + 3600000; // 1 hour from now
    
//     const newTeacher = await UserModel.createTeacherAccount({
//       email,
//       password: hashPassword,
//       otp,
//       otpExpires,
//     });
    
//     res.status(statusCodes.CREATED).json({
//       message: 'Teacher Registration is Successful. Your information will be verified.',
//       data: newTeacher
//     });
//   } catch (err) {
//     errorResponseHandler(err, req, res);
//   }
// };

// const generateJWTToken = (teacher: any) => {
//   const teacherData = {
//     teacherId: teacher?.teacherId,
//     role: teacher?.role,
//   };
//   const token = jwt.sign(teacherData, jwtSecret, {
//     expiresIn: '7d',
//   });
//   return token;
// };

// const verifyTeacher = async (req: Request, res: Response) => {
//   try {
//     const { email, otp } = req.body;
    
//     const teacher = await UserModel.findTeacherAccountByEmail(email);
//     if (!teacher) {
//       throw {
//         status: statusCodes.NOT_FOUND,
//         error: {
//           code: 40004,
//           message: 'Teacher account not found',
//         },
//       };
//     }
    
//     if (teacher.otp !== otp || teacher.otpExpires < Date.now()) {
//       throw {
//         status: statusCodes.UNAUTHORIZED,
//         error: {
//           code: 40010,
//         },
//       };
//     }
    
//     await UserModel.verifyTeacherAccount(email);
//     res.status(statusCodes.OK).json({
//       message: 'Teacher account verified successfully.',
//     });
//   } catch (err) {
//     errorResponseHandler(err, req, res);
//   }
// };

// export { teacherRegistration, verifyTeacher, generateJWTToken };
