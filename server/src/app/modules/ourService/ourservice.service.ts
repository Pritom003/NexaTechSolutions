import { uploadToCloudinary } from "../../utils/uploadImagetocloudenary";

import { IOurService, ourService } from "./ourservice.model";

export const createourService = async (
  data: any,
  files?: { [fieldname: string]: Express.Multer.File[] }
): Promise<IOurService> => {
  if (files && files.ourServiceImage?.length) {
    const imageBuffer = files.ourServiceImage[0].buffer;
    const mimetype = files.ourServiceImage[0].mimetype;
    const uploaded = await uploadToCloudinary(imageBuffer, `ourService-${Date.now()}`, mimetype);
    data.image = uploaded.secure_url;
  }

  // Save to DB (replace with your actual model logic)
  const newService = await  ourService.create(data);
  return newService;
};

export const getourServices = async () => {
  return await ourService.find();
};

export const getSingleourService = async (id: string) => {
  return await ourService.findById(id);
};

export const updateourService = async (
  id: string,
  data: any,
  files?: { [fieldname: string]: Express.Multer.File[] }
): Promise<IOurService | null> => {
  if (files && files.ourServiceImage?.length) {
    const imageBuffer = files.ourServiceImage[0].buffer;
    const mimetype = files.ourServiceImage[0].mimetype;
    const uploaded = await uploadToCloudinary(imageBuffer, `ourService-${Date.now()}`, mimetype);
    data.image = uploaded.secure_url;
  }

  const updated = await ourService.findByIdAndUpdate(id, data, { new: true });
  return updated;
};


export const deleteourService = async (id: string) => {
  return await ourService.findByIdAndDelete(id);
};
