"use client";

import { useState } from 'react';
import { Typography, Spin } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import ProfileTimeline from './ProfileTimeline';
import EditProfileModal from './EditProfileModal';
import ProfileCard from './ProfileCard';

const { Text } = Typography;

const fetchUserData = async (userId) => {
    const res = await fetch(`/api/members/${userId}`);
    if(!res.ok) {
        throw new Error('Kullanıcı bulunamadı');
    }
    return res.json();
};

const updateProfile = async ({ userId, values }) => {
    const res = await fetch('/api/updateProfile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, ...values }),
    });

    if(!res.ok) {
        throw new Error('Profil güncelleme başarısız!');
    }

    return res.json();
};

const Profile = ({ userId }) => {
    const [editVisible, setEditVisible] = useState(false);
    const currentUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    const {data: userData, isLoading, error } = useQuery({
        queryKey: ['userProfile', userId],
        queryFn: () => fetchUserData(userId),
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (values) => updateProfile({ userId, values }),
        onSuccess: (updatedData) => {
            queryClient.setQueryData(['userProfile', userId], updatedData);
            setEditVisible(false);
        },
    });

    const handleEditClick = () => {
        setEditVisible(true);
    };

    const handleEditCancel = () => {
        setEditVisible(false);
    };

    const handleEditSave = (values) => {
        mutation.mutate(values);
    };

    if (isLoading) {
        return <Spin tip="Yükleniyor..." size="large" style={{ width: '100%', height: '100vh' }} />;
    }

    if (error) {
        return <Text>Kullanıcı bulunamadı</Text>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <ProfileCard 
                userData={userData}
                currentUserId={currentUserId}
                onEditClick={handleEditClick}
            />

            <ProfileTimeline userId={userId} currentUserId={currentUserId} />

            <EditProfileModal
                visible={editVisible}
                onCancel={handleEditCancel}
                onSave={handleEditSave}
                initialValues={{
                    username: userData.username,
                    email: userData.email,
                    profile_image_url: userData.profile_image_url,
                    company: userData.company,
                    position: userData.position,
                    job_description: userData.job_description,
                }}
            />
        </div>
    );
};

export default Profile;

