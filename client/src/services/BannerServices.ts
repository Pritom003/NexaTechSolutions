// import { getValidToken } from "@/app/lib/verifyToken";

import { getValidToken } from "../../lib/verifyToken";

/* eslint-disable @typescript-eslint/no-explicit-any */

const API_BASE = 'http://localhost:5000/api/v1/banners';

export interface BannerData {
  _id?: string;
  title: string;
  subtitle: string;
  image?: string | File;  // File for upload or string for existing url
}

export const fetchBanners = async (): Promise<BannerData[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch banners');
  return res.json();
};

export const createBanner = async (data: BannerData): Promise<BannerData> => {
    const token = await getValidToken();
  const formData = new FormData();

  // Send metadata as stringified JSON
  formData.append('formdata', JSON.stringify({
    title: data.title,
    subtitle: data.subtitle,
  }));

  // Attach the image if it's a File (not string)
  if (data.image && typeof data.image !== 'string') {
    formData.append('BannerImage', data.image); 
  }

const res = await fetch(API_BASE + '/create',{
    method: 'POST',
     headers: {
  Authorization: `${token}`,
},
    body: formData,
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Error response text:', text);
    throw new Error('Failed to create banner');
  }

  const result = await res.json();
  return result.data;
};


export const updateBanner = async (id: string, data: BannerData): Promise<BannerData> => {
        const token = await getValidToken();
  const formData = new FormData();
  formData.append('formdata', JSON.stringify({
    title: data.title,
    subtitle: data.subtitle,
  }));

  if (data.image && data.image instanceof File) {
    formData.append('BannerImage', data.image);
  }

  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
         headers: {
  Authorization: `${token}`,
},
    body: formData,
  });
console.log(res, 'response from update banner service');
  if (!res.ok) throw new Error('Failed to update banner');
  return res.json();
};

export const deleteBanner = async (id: string): Promise<void> => {
            const token = await getValidToken();
  const res = await fetch(`${API_BASE}/${id}`,
     { method: 'DELETE',     
            headers: {
  Authorization: `${token}`,
}, });
  if (!res.ok) throw new Error('Failed to delete banner');
};
