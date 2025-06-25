
import config from '../../config'
import mongoose from 'mongoose';
import { UserInterface, Users } from './auth.models';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../error/AppError';
import AuthUtils from './auth.jwt';
import { uploadToCloudinary } from '../../utils/uploadImagetocloudenary';





const login = async (payload: UserInterface) => {
  const user = await Users.isUserExists(payload.email);

  if (!user) {
    throw new AppError(404, 'No user found with this email');
  }

  const isPasswordMatched = await user.isPasswordMatched(payload.password); // ✅ fixed

  if (!isPasswordMatched) {
    throw new AppError(401, 'Invalid password');
  }

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
    image: user.Profileimage || '',
  };

  const accessToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string,
  );

  const refreshToken = AuthUtils.CreateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string,
  );

  return { accessToken, refreshToken };
};




const register = async (payload: UserInterface) => {
  console.log(payload, 'from service');
  const isUserExists = await Users.isUserExists(payload.email);
  if (isUserExists) {
    throw new AppError(400, 'User already exists');
  }

  try {
    const user = new Users(payload);
    // Save the user to DB
    await user.save();

    // Create access & refresh tokens
    const jwtPayload = {
      id: user._id,
      email: user.email,
      image: user.Profileimage,
      role: user.role,
    };

    const accessToken = AuthUtils.CreateToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_token_expires_in as string
    );

    const refreshToken = AuthUtils.CreateToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_token_expires_in as string
    );

    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Registration Error:', error);
    throw new AppError(500, 'User registration failed');
  }
};




const RefreshToken = async (refreshToken: string) => {
  if (!config.jwt_refresh_secret) {
    throw new AppError(500, 'JWT refresh secret is not defined');
  }
  const decoded = AuthUtils.VerifyToken(refreshToken, config.jwt_refresh_secret) as JwtPayload;
  const user = await Users.findOne({ _id: decoded.id, is_blocked: false });
  if (!user) throw new AppError(404, 'No user found');

  const jwtPayload = { id: user._id, email: user.email, role: user.role, image: user.Profileimage};
  if (!config.jwt_access_secret || !config.jwt_access_token_expires_in) {
    throw new AppError(500, 'JWT configuration is not defined');
  }
  const accessToken = AuthUtils.CreateToken(jwtPayload, config.jwt_access_secret, config.jwt_access_token_expires_in);

  return { accessToken };
};


const GetMyProfile = async (user :UserInterface) => {
  const result = await Users.findOne({
    email: user.email,
  
  }).select(' -createdAt -updatedAt');

  if (!result) {
    throw new AppError(404, 'User not found');
  }

  return result;
};


const MakeAdmin = async (targetUserId: string) => {
  const user = await Users.findById(targetUserId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.role === "admin ") {
    throw new AppError(400, "User is already an admin");
  }

  user.role = "admin ";
  await user.save();
};

const RemoveAdmin = async (UserId: string) => {
  const user = await Users.findById(UserId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (user.role === "user" )  {
    throw new AppError(400, "User is not an admin");
  }

  user.role = "user";
  await user.save();
};

const DeleteUser = async (UserId: string) => {
  const user = await Users.findByIdAndDelete(UserId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return { message: "User deleted successfully" };
};



export const AuthService = 
{ register ,
  login,
   DeleteUser,
  RemoveAdmin,
  MakeAdmin,
  GetMyProfile,

  RefreshToken,
 
};