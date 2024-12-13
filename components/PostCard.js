"use client";
import { useState } from 'react';
import { Card } from 'antd';
import Comments from './Comments';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostImage from './PostImage';
import PostFooter from './PostFooter';

const PostCard = ({ post, currentUserId, showPostDetails, setPosts }) => {
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');
    const isOwner = post.user_id == currentUserId;

    return (
        <Card
            style={{
                position: 'relative',
                width: '100%',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '20px',
                backgroundColor: '#f5e6ff',
            }}
        >
            <div onClick={() => showPostDetails(post)} style={{ cursor: 'pointer' }}>
                <PostImage post={post} />
                <PostHeader
                    post={post}
                    isOwner={isOwner}
                    setPosts={setPosts}
                    setEditingPostId={setEditingPostId}
                    setEditedDescription={setEditedDescription}
                />
                <PostContent
                    post={post}
                    isOwner={isOwner}
                    setPosts={setPosts}
                    editingPostId={editingPostId}
                    setEditingPostId={setEditingPostId}
                    editedDescription={editedDescription}
                    setEditedDescription={setEditedDescription}
                />
            </div>

            <PostFooter post={post} />
            
            <Comments postId={post.id} />
        </Card>
    );
};

export default PostCard;
