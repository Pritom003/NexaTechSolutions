
import cors from 'cors';
import cookieParser from'cookie-parser'
import express, { Application,  NextFunction,  Request, Response } from 'express';
import os from "os";
import router from './app/router';
import globalErrorHandler from './app/error/globalErrorHandler';
const app: Application = express();

// Middleware to parse JSON and handle CORS
app.use(express.json({ limit: '90mb' }));
app.use(express.urlencoded({ extended: true, limit: '90mb' }));

app.use(cookieParser())

const allowedOrigins = [
  'http://localhost:3000',
  'https://nexa-tech-delta.vercel.app',
  'https://nexa-tech-server.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        // For non-browser clients like Postman or curl, allow requests
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// app Routes
app.use('/api/v1', router);


// Root route
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    const currentDateTime = new Date().toISOString();
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const serverHostname = os.hostname();
    const serverPlatform = os.platform();
    const serverUptime = os.uptime();
  
    res.status(200).json({
      success: true,
      message: "Welcome to the Nexus Tech API",
      version: "1.0.0",
      clientDetails: {
        ipAddress: clientIp,
        accessedAt: currentDateTime,
      },
      serverDetails: {
        hostname: serverHostname,
        platform: serverPlatform,
        uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
          (serverUptime / 60) % 60
        )} minutes`,
      },
      developerContact: {
        email: "njahanpritom65@gmail.com",
        website: "https://github.com/Pritom003",
      },
    });
    next()
  });



app.use(globalErrorHandler);
// app.use(notFound)
export default app;