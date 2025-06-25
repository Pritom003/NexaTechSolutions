import { uploadToCloudinary } from "../../utils/uploadImagetocloudenary";
import { Banner } from "./banner.model";
import { IBanner } from "./banner.model";

export const createBanner = async (data: IBanner, files: any) => {
  if (files && files.BannerImage && files.BannerImage[0]) {
    const file = files.BannerImage[0];
    const result = await uploadToCloudinary(
      file.buffer,
      `banner_${Date.now()}`,
      file.mimetype
    ) as { secure_url: string };

    const BannerImageUrl = result.secure_url;
    data.image = BannerImageUrl || '';
  }

  const result = await Banner.create(data);
  return result;
};


export const getBanners = async () => {
  return await Banner.find();
};

export const getSingleBanner = async (id: string) => {
  return await Banner.findById(id);
};

export const updateBannerWithImage = async (id: string, data: Partial<IBanner>, files: any) => {
  if (files && files.BannerImage && files.BannerImage[0]) {
    const file = files.BannerImage[0];
    const result = await uploadToCloudinary(
      file.buffer,
      `banner_${Date.now()}`,
      file.mimetype
    ) as { secure_url: string };
    data.image = result.secure_url;
  }
  return await Banner.findByIdAndUpdate(id, data, { new: true });
};


export const deleteBanner = async (id: string) => {
  return await Banner.findByIdAndDelete(id);
};
