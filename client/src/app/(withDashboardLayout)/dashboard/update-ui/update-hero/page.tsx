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

interface BannerData {
  _id?: string;
  title: string;
  subtitle: string;
  image: string;
}

const API_BASE = 'http://localhost:5000/api/banner';

const AdminBannerPage = () => {
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, setValue, watch, reset } = useForm<BannerData>({
    defaultValues: { title: '', subtitle: '', image: '' },
  });

  const image = watch('image');

  // Fetch Banners
  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      message.error('Failed to load banners');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Create or Update Banner
  const onSubmit = async (data: BannerData) => {
    try {
      const isEdit = editIndex !== null;
      const url = isEdit ? `${API_BASE}/${banners[editIndex]._id}` : API_BASE;
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Network error');
      const result = await res.json();

      if (isEdit) {
        const updated = [...banners];
        updated[editIndex] = result;
        setBanners(updated);
        message.success('Banner updated!');
      } else {
        setBanners(prev => [...prev, result]);
        message.success('Banner created!');
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error('Failed to submit banner');
    }
  };

  // Delete Banner
  const handleDelete = async (index: number) => {
    try {
      const id = banners[index]._id;
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');

      setBanners(prev => prev.filter((_, i) => i !== index));
      message.success('Banner deleted!');
    } catch (err) {
      console.error(err);
      message.error('Failed to delete banner');
    }
  };

  // Image Upload (Base64)
  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue('image', reader.result as string);
    };
    reader.readAsDataURL(file);
    return false;
  };

  // Open Modal for Create
  const openCreateModal = () => {
    reset({ title: '', subtitle: '', image: '' });
    setEditIndex(null);
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleEdit = (index: number) => {
    reset(banners[index]);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Banners</h2>
        <Button icon={<PlusOutlined />} type="primary" onClick={openCreateModal}>
          Add Banner
        </Button>
      </div>

      {loading ? (
        <Spin />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {banners.map((banner, index) => (
            <Card
              cover={
                <Image
                  src={banner.image}
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

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
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
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {image && (
              <img
                src={image}
                alt="preview"
                className="mt-3 rounded-md"
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            )}
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            {editIndex !== null ? 'Save Changes' : 'Create Banner'}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminBannerPage;
