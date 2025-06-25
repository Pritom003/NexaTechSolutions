import { Request, Response } from "express";
import * as bannerService from "./banner.service";
import sendResponse from "../../utils/sendResponse";
import CatchAsync from "../../utils/fetch.async";
import mongoose from "mongoose";

export const createBanner = CatchAsync(async (req: Request, res: Response) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
 const data = JSON.parse(req.body.formdata); 
// const data =req

// console.log(data ,files , "data i am receriving from postman as formdata");
  const result = await bannerService.createBanner(data,files);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

export const getAll = async (_req: Request, res: Response) => {
  const banners = await bannerService.getBanners();
  res.json(banners);
};

export const getOne = async (req: Request, res: Response) => {
  const banner = await bannerService.getSingleBanner(req.params.id);
  if (!banner) return res.status(404).json({ message: "Banner not found" });
  res.json(banner);
};

export const update = CatchAsync(async (req: Request, res: Response) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  const data = JSON.parse(req.body.formdata);

  const banner = await bannerService.updateBannerWithImage(req.params.id, data, files);

  if (!banner) {
    res.status(404).json({ message: "Banner not found" });
    return;
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Banner updated successfully',
    data: banner,
  });
});

export const remove = CatchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ success: false, message: "Invalid banner ID" });
    return;
  }

  const banner = await bannerService.deleteBanner(id);
  if (!banner) {
    res.status(404).json({ success: false, message: "Banner not found" });
    return;
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Banner deleted successfully",
    data: banner,
  });
});

