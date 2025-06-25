
// import { getValidToken } from "@/app/lib/verifyToken";

import { getValidToken } from "../../lib/verifyToken";



const API_BASE = 'https://nexa-tech-server.vercel.app/api/v1/services';

export interface ServiceData {
  _id?: string;
  title: string;
  description: string;
  image?: string | File;  // File for upload or string for existing url
}

export const fetchServices = async (): Promise<ServiceData[]> => {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch banners');
  return res.json();
};

export const createService = async (data: ServiceData): Promise<ServiceData> => {
    const token = await getValidToken();
  const formData = new FormData();

  // Send metadata as stringified JSON
  formData.append('formdata', JSON.stringify({
    title: data.title,
    description: data.description,
  }));

  // Attach the image if it's a File (not string)
  if (data.image && typeof data.image !== 'string') {
formData.append('ourServiceImage', data.image);
 
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


export const updateService = async (id: string, data: ServiceData): Promise<ServiceData> => {
        const token = await getValidToken();
  const formData = new FormData();
  formData.append('formdata', JSON.stringify({
    title: data.title,
    description: data.description,
  }));

  if (data.image && data.image instanceof File) {
formData.append('ourServiceImage', data.image);

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

export const   deleteService = async (id: string): Promise<void> => {
            const token = await getValidToken();
  const res = await fetch(`${API_BASE}/${id}`,
     { method: 'DELETE',     
            headers: {
  Authorization: `${token}`,
}, });
  if (!res.ok) throw new Error('Failed to delete banner');
};
