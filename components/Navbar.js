"use client";
import { DiffOutlined, AppstoreOutlined, FileSearchOutlined, HistoryOutlined, HomeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const { Sider } = Layout;

const Navbar = ({ isAuthenticated }) => {
    const [language, setLanguage] = useState('TR');
    const router = useRouter();

    const toggleLanguage = () => {
        setLanguage(prevLang => (prevLang === 'TR' ? 'EN' : 'TR'));
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        router.push('/'); 
    };

    return (
        <Sider style={{ minHeight: '100vh', backgroundColor: '#9254DE', padding: '16px', width: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
                <div style={{ marginBottom: '5px', textAlign: 'center', paddingTop: '30px' }}>
                <svg width="96" height="78.822" viewBox="0 0 40 32.842" fill="rgba(122, 93, 203, 1)" xmlns="http://www.w3.org/2000/svg">
                    <path x="20.5583" y="7.57385" width="148.884" height="85.4419" rx="13.5581" stroke="white" strokeWidth="2.908210526315789" d="M7.182 1.594H32.818A2.854 2.854 0 0 1 35.672 4.449V16.728A2.854 2.854 0 0 1 32.818 19.582H7.182A2.854 2.854 0 0 1 4.328 16.728V4.449A2.854 2.854 0 0 1 7.182 1.594z"></path>
                    <path d="M4.274 25.452L35.726 25.452" stroke="white" strokeWidth="2.908210526315789" strokeLinecap="round"></path>
                    <path d="M38.526 6.711L38.526 14.358" stroke="white" strokeWidth="2.908210526315789" strokeLinecap="round"></path>
                    <path d="M1.474 6.711L1.474 14.358" stroke="white" strokeWidth="2.908210526315789" strokeLinecap="round"></path>
                    <path d="M4.274 31.269L35.726 31.269" stroke="white" strokeWidth="2.908210526315789" strokeLinecap="round"></path>
                    <path x="45.3721" y="28.8065" width="33.2558" height="42.4651" rx="16.6279" fill="white" d="M13.053 6.065H13.053A3.501 3.501 0 0 1 16.553 9.565V11.504A3.501 3.501 0 0 1 13.053 15.005H13.053A3.501 3.501 0 0 1 9.552 11.504V9.565A3.501 3.501 0 0 1 13.053 6.065z"></path>
                    <path x="111.372" y="28.8065" width="33.2558" height="42.4651" rx="16.6279" fill="white" d="M26.947 6.065H26.947A3.501 3.501 0 0 1 30.448 9.565V11.504A3.501 3.501 0 0 1 26.947 15.005H26.947A3.501 3.501 0 0 1 23.447 11.504V9.565A3.501 3.501 0 0 1 26.947 6.065z"></path>
                </svg>
                </div>
                <div style={{ paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ paddingTop: '64px' }}>
                        <Button
                            icon={<HomeOutlined style={{ marginRight: '8px' }} />}
                            type='text'
                            style={{ color: 'white', textAlign: 'left', paddingLeft: '16px', display: 'block' }}
                        >
                            <Link href="/Home">{language === 'TR' ? 'Ana sayfa' : 'Home'}</Link>
                        </Button>

                        <Button
                            icon={<AppstoreOutlined style={{ marginRight: '8px' }} />}
                            type='text'
                            style={{ color: 'white', textAlign: 'left', paddingLeft: '16px', display: 'block' }}
                        >
                            <Link href="/Tables">{language === 'TR' ? 'Tablolar' : 'Tables'}</Link>
                        </Button>

                        <Button
                            icon={<FileSearchOutlined style={{ marginRight: '8px' }} />}
                            type='text'
                            style={{ color: 'white', textAlign: 'left', paddingLeft: '16px', display: 'block' }}
                        >
                            <Link href="/DataExplorer">{language === 'TR' ? 'Veri Keşfi' : 'Data Explorer'}</Link>
                        </Button>
                    </div>

                    <div style={{ paddingTop: '64px'}}>
                        <Button
                            icon={<HistoryOutlined style={{ marginRight: '8px' }} />}
                            type='text'
                            style={{ color: 'white', textAlign: 'left', paddingLeft: '16px', display: 'block' }}
                            disabled={!isAuthenticated}
                        >
                            <Link href="/home">{language === 'TR' ? 'Paylaşılanlar' : 'Shared'}</Link>
                        </Button>

                        <Button
                            icon={<DiffOutlined style={{ marginRight: '8px' }} />}
                            type='text'
                            style={{ color: 'white', textAlign: 'left', paddingLeft: '16px', display: 'block' }}
                            disabled={!isAuthenticated}
                        >
                            <Link href="/posting">{language === 'TR' ? 'Paylaş' : 'Share'}</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: '20px', position: 'absolute', bottom: '32px', left:'16px'}}>
                <Button 
                    onClick={toggleLanguage}
                    type="text"
                    style={{
                        color: 'white'
                    }}
                >
                    {language}
                </Button>

                <Button 
                    icon={<LogoutOutlined style={{ marginRight: '8px' }} />} 
                    type="text" 
                    style={{ color: 'white', textAlign: 'left', display: 'block' }}
                    onClick={handleLogout}
                >
                    {language === 'TR' ? 'Çıkış yap' : 'Log out'}
                </Button>
            </div>
        </Sider>
    );
}

export default Navbar;







