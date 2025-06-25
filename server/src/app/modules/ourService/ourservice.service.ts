import { uploadToCloudinary } from "../../utils/uploadImagetocloudenary";

import { IOurService, ourService } from "./ourservice.model";

export const createourService = async (data: IOurService, files: any) => {
  if (files && files.ourServiceImage && files.ourServiceImage[0]) {
    const file = files.ourServiceImage[0];
    const result = await uploadToCloudinary(
      file.buffer,
      `ourService_${Date.now()}`,
      file.mimetype
    ) as { secure_url: string };

    const ourServiceImageUrl = result.secure_url;
    data.image = ourServiceImageUrl || '';
  }

  const result = await ourService.create(data);
  return result;
};


export const getourServices = async () => {
  return await ourService.find();
};

export const getSingleourService = async (id: string) => {
  return await ourService.findById(id);
};

export const updateourServiceWithImage = async (id: string, data: Partial<IOurService>, files: any) => {
  if (files && files.ourServiceImage && files.ourServiceImage[0]) {
    const file = files.ourServiceImage[0];
    const result = await uploadToCloudinary(
      file.buffer,
      `ourService_${Date.now()}`,
      file.mimetype
    ) as { secure_url: string };
    data.image = result.secure_url;
  }
  return await ourService.findByIdAndUpdate(id, data, { new: true });
};


export const deleteourService = async (id: string) => {
  return await ourService.findByIdAndDelete(id);
};
