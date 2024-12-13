"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useForm } from 'antd/lib/form/Form';
import { Button, Input, Form, Tabs, message } from 'antd';
import { useMutation } from '@tanstack/react-query';

const Login = ({ setAuthenticated, onNewUserRegister }) => {
    const [form] = useForm();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: async (body) => {
            const url = isRegister ? '/api/register' : '/api/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`${errorText}`);
            }

            return response.json();
        },
        onSuccess: (data) => {
            if (isRegister) {
                message.success('Kayıt başarılı! Lütfen giriş yapın.');
                setIsRegister(false);  
                onNewUserRegister();
            } else {
                message.success('Giriş başarılı!');
                setAuthenticated(true);
                localStorage.setItem('userId', data.userId);
                router.push('/home');
            }
        },
        onError: async (error) => {
            try {
                const errorData = await error.response.json();
                const errorMessage = errorData.message || 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
                message.error(errorMessage);
            } catch {
                message.error('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
            }
        }
    });

    const handleSubmit = () => {
        const body = isRegister ? { username, email, password } : { email, password };
        mutation.mutate(body);
    };

    const items = [
        {
            key: '1',
            label: 'Giriş Yap',
            children: (
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'Lütfen email adresinizi girin!' }]}>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Şifre" name="password" rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}>
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
                            Giriş Yap
                        </Button>
                    </Form.Item>
                </Form>
            ),
        },
        {
            key: '2',
            label: 'Kayıt Ol',
            children: (
                <Form form={form} onFinish={handleSubmit}>
                    <Form.Item label="Kullanıcı Adı" name="username" rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}>
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="E-mail" name="email" rules={[{ required: true, message: 'Lütfen email adresinizi girin!' }]}>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Şifre" name="password" rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}>
                        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
                            Kayıt Ol
                        </Button>
                    </Form.Item>
                </Form>
            ),
        }
    ];

    return (
        <Tabs defaultActiveKey="1" items={items} onChange={(key) => setIsRegister(key === '2')} />
    );
};

export default Login;


