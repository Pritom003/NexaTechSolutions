/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-key */
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Button,
  Form,
  Input,
  Upload,
  message,
  Modal,
  Card,
  Popconfirm,
  Spin,
} from 'antd';
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import {
  ServiceData,
  createService,
  deleteService,
  fetchServices,
  updateService,
} from '@/services/ServiceApis';
import toast from 'react-hot-toast';

const AdminServicePage = () => {
  const [services, setServices] = useState<ServiceData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const { control, handleSubmit, reset, setValue, watch } = useForm<ServiceData>({
    defaultValues: { title: '', description: '', image: '' },
  });

  const previewImage = watch('image');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        message.error('Failed to load services');
      } finally {
        setLoading(false);
        
      }
    };
    load();
  }, []);

const onSubmit = async (formData: ServiceData) => {
  setSubmitLoading(true);
  try {
    const payload: ServiceData = {
      title: formData.title,
      description: formData.description,
      image: imageFile || formData.image,
    };

    let result: ServiceData;
    if (editIndex !== null && services[editIndex]._id) {
      result = await updateService(services[editIndex]._id!, payload);
      const updated = [...services];
      updated[editIndex] = result;
      setServices(updated);
      toast.success('✅ Service updated successfully!');
    } else {
      result = await createService(payload);
      setServices(prev => [...prev, result]);
      message.success('✅ Service created successfully!');
    }

    handleModalClose();
  } catch (error: any) {
    console.error(error);

    if (error?.response?.status === 413) {
      toast.error('❌ Image too large. Please upload a smaller file (max ~5MB).');
    } else {
   toast.error('❌ Image too large. Please upload a smaller file (max ~5MB).');
    }
  }finally {
    setSubmitLoading(false); // Stop loading
  }
};
 

 
  const handleImageUpload = (file: File) => {
    setImageFile(file);
    setImagePreviewUrl(URL.createObjectURL(file));
    return false; // Prevent automatic upload
  };
  const handleEdit = (index: number) => {
    const selected = services[index];
    reset({
      title: selected.title,
      description: selected.description,
      image: selected.image,
    });
    setImageFile(null);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    reset({ title: '', description: '', image: '' });
    setImageFile(null);
    setEditIndex(null);
  };

  const handleDelete = async (index: number) => {
    const id = services[index]._id;
    if (!id) return;
    try {
      await deleteService(id);
      setServices(prev => prev.filter((_, i) => i !== index));
      message.success('Service deleted!');
    } catch (err) {
      console.error(err);
      message.error('Failed to delete service');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Services</h2>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsModalOpen(true)}>
          Add Service
        </Button>
      </div>

      {loading ? (
        <Spin />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <Card
              key={service._id}
              cover={
                <Image
                  src={typeof service.image === 'string' ? service.image : ''}
                  alt="service"
                  width={400}
                  height={192}
                  className="h-48 object-cover"
                  style={{ width: '100%', height: '192px', objectFit: 'cover' }}
                  unoptimized
                />
              }
              actions={[
                <EditOutlined key="edit" onClick={() => handleEdit(index)} />,
                <Popconfirm
                  title="Are you sure to delete this service?"
                  onConfirm={() => handleDelete(index)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" style={{ color: 'red' }} />
                </Popconfirm>,
              ]}
            >
              <Card.Meta title={service.title} description={service.description} />
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        title={editIndex !== null ? 'Edit Service' : 'Add New Service'}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {['title', 'description'].map((field) => (
            <Form.Item key={field} label={field[0].toUpperCase() + field.slice(1)}>
              <Controller
                name={field as 'title' | 'description'}
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          ))}

          <Form.Item label="Image">
            <Upload
              beforeUpload={handleImageUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>

        {imagePreviewUrl && (
              <Image
                src={imagePreviewUrl}
                alt="Preview"
                className="mt-3 rounded-md"
                width={400}
                height={200}
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
                unoptimized
              />
            
            )}
          </Form.Item>

          <Button type="primary" htmlType="submit" block  loading={submitLoading} disabled={submitLoading}>
            {editIndex !== null ? 'Update Service' : 'Create Service'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminServicePage;
