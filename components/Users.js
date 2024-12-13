"use client";

import { useState, useEffect } from 'react';
import { List, Avatar, Button } from 'antd';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

const getRandomUsers = (users, num, excludeUserId) => {
    if (!users || users.length === 0) return [];

    const filteredUsers = users.filter(user => user.id != excludeUserId); 
    
    if (filteredUsers.length < num) {
        return filteredUsers;
    }

    const shuffled = [...filteredUsers].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
};

const fetchUsers = async () => {
    const response = await fetch(`/api/users`);

    if(!response.ok) {
        throw new Error('Network response was nok ok');
    }

    return response.json();
};

const Users = ({ excludeUserId, newUserEvent, isAuthenticated }) => {
    
    const [userCount, setUserCount] = useState(0);

    const { data: users, isLoading, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });

    useEffect(() => {
        if(users && users.length !== userCount) {
            setUserCount(users.length);
        }
    }, [users, userCount]);

    useEffect(() => {
        if(newUserEvent) {
            refetch();
        }
    }, [newUserEvent, refetch]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching users</p>;

    const randomUsers = getRandomUsers(users, 4, excludeUserId);
    
    return (
        <List
            itemLayout="horizontal"
            dataSource={randomUsers}
            renderItem={user => (
                <List.Item 
                    key={user.id}
                    className="my-2"  
                    style={{ padding: '10px 20px', backgroundColor:'#F0F0F0', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}} 
                >
                    <List.Item.Meta 
                        avatar={<Avatar src={user.profile_image_url} size={50} />}
                        title={<span style={{ fontWeight: 'bold' }}>{user.username}</span>}
                        description={user.company}
                    />
                    <Link href={isAuthenticated ? `/profile/${user.id}` : '#'}>
                        <Button 
                            type="primary" 
                            shape="round" 
                            style={{ backgroundColor: '#BE61AD'}}
                            disabled={!isAuthenticated}
                        >
                            View
                        </Button>
                    </Link>
                </List.Item>
            )}
        />
    );
};

export default Users;
