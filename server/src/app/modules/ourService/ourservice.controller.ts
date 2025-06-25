import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import CatchAsync from "../../utils/fetch.async";
import mongoose from "mongoose";
import { createourService, deleteourService, getourServices, updateourService } from "./ourservice.service";

export const createBanner = CatchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
const data = JSON.parse(req.body.formdata); 
// const data =req

// console.log(data ,files , "data i am receriving from postman as formdata");
  const result = await createourService(data,files);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

export const getAll = async (_req: Request, res: Response) => {
  const banners = await getourServices();
  res.json(banners);
};


export const update = CatchAsync(async (req: Request, res: Response) => {
const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
const data = JSON.parse(req.body.formdata);

  const service = await updateourService(req.params.id, data, files);

  if (!service) {
    res.status(404).json({ message: "service not found" });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'service updated successfully',
    data: service,
  });
});

export const remove = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid service ID" });
    return;
  }

  const service = await deleteourService(id);
  if (!service) {
    res.status(404).json({ success: false, message: "service not found" });
    return;
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "service deleted successfully",
    data: service,
  });
});

