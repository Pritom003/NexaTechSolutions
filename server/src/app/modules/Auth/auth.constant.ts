
import { Request, Response ,Express} from 'express';
import CatchAsync from '../../utils/fetch.async';
import { AuthService } from './auth.servie';
import sendResponse from '../../utils/sendResponse';


// import AppError from '../Errors/AppErrors';

const register = CatchAsync(async (req: Request, res: Response) => {

const data = JSON.parse(req.body.formdata); 
// console.log(data, 'from controller');
const result = await AuthService.register(data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const login = CatchAsync(async (req: Request, res: Response) => {
    // console.log(req);
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result,
  });
});
const refreshToken = CatchAsync(async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  const result = await AuthService.RefreshToken(authorization as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully!",
    data: result,
  });
});




const makeAdmin = CatchAsync(async (req, res) => {
  const { userId } = req.params;
  await AuthService.MakeAdmin(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User is now an Admin",
    data: {},
  });
});

// const getMyProfile = CatchAsync(async (req, res) => {
//   const user = req.user as UserInterface ;
// // console.log(user);
//   if (!user) {
//     throw new AppError(401, 'Unauthorized');
//   }
//   const result = await AuthService.GetMyProfile(user);

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: 'User profile fetched successfully',
//     data: result,
//   });
// });
// Removed duplicate declaration of updateMyProfile
export const AuthController = {
  register,
  login,
  makeAdmin,
  refreshToken,
  
};