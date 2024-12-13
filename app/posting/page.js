"use client";
import { Button, Input, Upload, message, Form, Spin, Layout } from 'antd';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';

const { TextArea } = Input;

export default function Posting() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const router = useRouter();

  useEffect(() => {
    if (previewUrl) {
      setIsSupported(isImageUrl(previewUrl));
    } else {
      setIsSupported(true);
    }
  }, [previewUrl]);

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      const file = info.file.originFileObj;
      const url = URL.createObjectURL(file);

      if (isImageUrl(url)) {
        setSelectedFile(file);
        setPreviewUrl(url);
        setImageUrl("");
        setIsSupported(true);
      } else {
        message.error('Desteklenmeyen dosya türü.');
        setIsSupported(false);
        handleRemoveFile();
      }
    }
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);

    if (isImageUrl(url)) {
      setPreviewUrl(url);
      setSelectedFile(null);
      setIsSupported(true);
    } else {
      message.error('Desteklenmeyen URL türü.');
      setPreviewUrl(null);
      setImageUrl("");
      setIsSupported(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageUrl("");
    setIsSupported(true);
  };

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          description: values.description,
          imageUrl: previewUrl,
        }),
      });

      return response.json();
    },
    onSuccess: (result) => {
      if (result.success) {
        message.success('Post kaydedildi!');
        router.push('/home');
      } else {
        message.error('Post kaydedilemedi: ' + result.error);
      }
    },
    onError: (error) => {
      message.error('Post kaydedilirken bir hata oluştu: ' + error.message);
    },
    onSettled: () => {
      setIsLoading(false);
      handleRemoveFile();
    }
  });

  const handleSubmit = async (values) => {
    if (!isSupported) {
      message.error('Desteklenmeyen dosya veya URL türü.');
      return;
    }

    setIsLoading(true);
    mutation.mutate(values);
  };

  const isImageUrl = (url) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };

  return (
    <Layout className="site-layout">
      <Layout.Sider>
        <Navbar isAuthenticated={true} />
      </Layout.Sider>

      <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Gönderi Oluştur</h1>
        <Form onFinish={handleSubmit} layout="vertical" initialValues={{ description: "" }}>
          <Form.Item label="Açıklama" name="description">
            <TextArea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Görsel ekle">
            <Upload
              accept=".jpg,.jpeg,.png"
              showUploadList={false}
              onChange={handleFileChange}
              disabled={!!selectedFile || !!imageUrl}
            >
              <Button icon={<UploadOutlined />} disabled={!!selectedFile || !!imageUrl}>Dosya Seç</Button>
            </Upload>
            <Button
              icon={<DeleteOutlined />}
              onClick={handleRemoveFile}
              disabled={!selectedFile && !imageUrl}
              style={{ marginLeft: '8px' }}
              danger
            >
              Sil
            </Button>
          </Form.Item>

          <Form.Item label="URL ile Görsel Ekle">
            <Input
              placeholder="URL girin"
              value={imageUrl}
              onChange={handleUrlChange}
              disabled={!!selectedFile}
            />
          </Form.Item>

          {previewUrl && (
            <Form.Item>
              {isImageUrl(previewUrl) ? (
                <Image src={previewUrl} alt="Preview" width={500} height={300} />
              ) : (
                <div style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: 'red',
                  padding: '20px',
                  borderRadius: '5px'
                }}>
                  Unsupported type.
                </div>
              )}
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading} disabled={!isSupported}>
              {isLoading ? <Spin /> : 'Paylaş'}
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    </Layout>
  );
}
