"use client";
import { Modal, Form, Input, Button } from 'antd';
import { useEffect } from 'react';

const EditProfileModal = ({ visible, onCancel, onSave, initialValues }) => {
    const [editForm] = Form.useForm();

    useEffect(() => {
        if (visible) {
            const initialFormValues = { ...initialValues };
            delete initialFormValues.password; 
            editForm.setFieldsValue(initialFormValues);
        }
    }, [visible, initialValues, editForm]);

    const handleSave = async () => {
        try {
            const values = await editForm.validateFields();

            if(!values.password){
                delete values.password; 
            }

            onSave(values);
        } catch (error) {
            console.error('Form validation error:', error);
        }
    };

    return (
        <Modal 
            title="Profil Bilgilerini Düzenle"
            open={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    İptal
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Kaydet
                </Button>,
            ]}
        >
            <Form form={editForm} layout="vertical">
                <Form.Item name="username" label="Kullanıcı Adı" rules={[{ required: true, message: "Lütfen kullanıcı adınızı giriniz!" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="email" label="E-mail" rules={[{ required: true, message: "Lütfen email adresinizi giriniz!" }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="password" label="Şifre">
                    <Input.Password placeholder="Yeni bir şifre girin (isteğe bağlı)" />
                </Form.Item>

                <Form.Item name="profile_image_url" label="Profil Resmi URL">
                    <Input />
                </Form.Item>

                <Form.Item name="company" label="Şirket">
                    <Input />
                </Form.Item>

                <Form.Item name="position" label="Pozisyon">
                    <Input />
                </Form.Item>

                <Form.Item name="job_description" label="İş Tanımı">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditProfileModal;
