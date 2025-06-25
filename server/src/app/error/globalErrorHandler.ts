

import { ErrorRequestHandler, NextFunction } from 'express';

import config from '../config';
import { TErrorSources } from '../interface/error';
import handleAuthenticationError from './handleAuthenticationError';
import handleValidationError from './handleValidation.Error';
import AppError from './AppError';
import handleCastError from './handleCastError';



const globalErrorHandler: ErrorRequestHandler = (  err: any, req, res, next:NextFunction):void => {
  //setting default values
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

 if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    const simplifiedError = handleAuthenticationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  //ultimate return
 res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
  next()
};

export default globalErrorHandler;
