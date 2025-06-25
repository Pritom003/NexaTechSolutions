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
import { BannerData, createBanner, deleteBanner, fetchBanners, updateBanner } from '@/services/BannerServices';

const AdminBannerPage = () => {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, reset, setValue, watch } = useForm<BannerData>({
    defaultValues: { title: '', subtitle: '', image: '' },
  });

  const previewImage = watch('image');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchBanners();
        setBanners(data);
      } catch (error) {
        message.error('Failed to load banners');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const onSubmit = async (formData: BannerData) => {
    try {
      const payload: BannerData = {
        title: formData.title,
        subtitle: formData.subtitle,
        image: imageFile || formData.image,
      };

      let result: BannerData;
      if (editIndex !== null && banners[editIndex]._id) {
        result = await updateBanner(banners[editIndex]._id!, payload);
        console.log(result, 'result from update banner');
        const updated = [...banners];
        updated[editIndex] = result;
        setBanners(updated);
        message.success('Banner updated!');
      } else {
        result = await createBanner(payload);
        console.log(result, 'result from create banner');
        setBanners(prev => [...prev, result]);
        message.success('Banner created!');
      }

      handleModalClose();
    } catch (error) {
      console.error(error);
      message.error('Failed to submit banner');
    }
  };

  const handleImageUpload = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue('image', reader.result as string); // for preview
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleEdit = (index: number) => {
    const selected = banners[index];
    reset({
      title: selected.title,
      subtitle: selected.subtitle,
      image: selected.image,
    });
    setImageFile(null);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    reset({ title: '', subtitle: '', image: '' });
    setImageFile(null);
    setEditIndex(null);
  };

  const handleDelete = async (index: number) => {
    const id = banners[index]._id;
    if (!id) return;
    try {
      await deleteBanner(id);
      setBanners(prev => prev.filter((_, i) => i !== index));
      message.success('Banner deleted!');
    } catch (err) {
      console.error(err);
      message.error('Failed to delete banner');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Banners</h2>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => setIsModalOpen(true)}>
          Add Banner
        </Button>
      </div>

      {loading ? (
        <Spin />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {banners.map((banner, index) => (
            <Card
              key={banner._id}
              cover={
                <Image
                  src={typeof banner.image === 'string' ? banner.image : ''}
                  alt="banner"
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
                  title="Are you sure to delete this banner?"
                  onConfirm={() => handleDelete(index)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" style={{ color: 'red' }} />
                </Popconfirm>,
              ]}
            >
              <Card.Meta title={banner.title} description={banner.subtitle} />
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        title={editIndex !== null ? 'Edit Banner' : 'Add New Banner'}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          {['title', 'subtitle'].map((field) => (
            <Form.Item key={field} label={field[0].toUpperCase() + field.slice(1)}>
              <Controller
                name={field as 'title' | 'subtitle'}
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

            {previewImage && typeof previewImage === 'string' && (
              <Image
                src={previewImage}
                alt="Preview"
                className="mt-3 rounded-md"
                width={400}
                height={200}
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
                unoptimized
              />
            )}
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {editIndex !== null ? 'Update Banner' : 'Create Banner'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminBannerPage;
