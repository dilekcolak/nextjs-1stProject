"use client";

import { Avatar, Typography } from "antd";
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const fetchUserData = async () => {
  const userId = localStorage.getItem('userId');

  if(userId) {
    const response = await fetch(`/api/${userId}`);

    if(!response.ok){
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  return null;
};

const UserProfile = ({ updatedUserData }) => {
  const router = useRouter();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userData', updatedUserData],
    queryFn: fetchUserData,
    enabled: !!localStorage.getItem('userId'),
  });

  if (isLoading || !userData) {
    return null;
  }

  const handleProfileClick = () => {
    router.push(`/profile/${userData.id}`)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
      onClick={handleProfileClick}
    >
      <Avatar src={userData.profile_image_url} size={60} />
      <Typography.Title level={5} style={{ marginLeft: '10px', marginBottom: '25px' }}>
        {userData.username}
      </Typography.Title>
    </div>
  );
};

export default UserProfile;

