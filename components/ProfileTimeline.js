"use client";

import { List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import PostModal from './PostModal';
import PostCard from './PostCard';

const fetchPosts = async ({ pageParam = 1, queryKey }) => {
    const userId = queryKey[1];
    const response = await fetch(`/api/posts?userId=${userId}&page=${pageParam}`);
    if(!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return {
        posts: data.posts || [],
        nextPage: pageParam + 1,
        hasMore: data.hasMore || false,
    };
};

const ProfileTimeline = ({ userId, currentUserId }) => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    const { 
        data, 
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ['profilePosts', userId],
        queryFn: fetchPosts,
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
    });

    useEffect(() => {
        if(data) {
            setPosts(data.pages.flatMap(page => page.posts));
        }
    }, [data])

    const showPostDetails = (post) => {
        setSelectedPost(post);
    };

    const handleCancel = () => {
            setSelectedPost(null); 
    };

    if(isLoading) {
        return <Spin tip="Yükleniyor..."/>
    }

    return (
        <>
            <InfiniteScroll
                dataLength={posts.length}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={isFetchingNextPage && <h4>Yükleniyor...</h4>}
                endMessage={<p style={{ textAlign: 'center' }}>Tüm Gönderiler Yüklendi</p>}
            >
                <List
                    itemLayout='vertical'
                    size='large'
                    dataSource={posts}
                    renderItem={post => (
                        <PostCard
                            post={post}
                            currentUserId={currentUserId}
                            showPostDetails={showPostDetails}
                            setPosts={setPosts}
                        />
                    )}
                    style={{ maxWidth: '100%' }}
                />
            </InfiniteScroll>

            <PostModal selectedPost={selectedPost} onCancel={handleCancel} />
            
        </>
    );
};

export default ProfileTimeline;
