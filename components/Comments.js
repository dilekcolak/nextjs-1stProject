"use client";
import { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Divider } from 'antd';
import { useQuery } from '@tanstack/react-query';

const Comments = ({ postId }) => {
    const [visibleComments, setVisibleComments] = useState(3);
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

    const { data: comments = [], refetch } = useQuery({
        queryKey: ['comments', postId],
        queryFn: async () => {
            const response = await fetch(`/api/comments?post_id=${postId}`);
            return response.json();
        }
    });

    const handleCommentAdded = () => {
        refetch();
    };

    const handleCommentDeleted = () => {
        refetch();
    };

    const loadMoreComments = () => {
        setVisibleComments(prevVisibleComments => prevVisibleComments + 5);
    };

    const commentsToDisplay = comments.slice(-visibleComments);

    return (
        <div>
            <Divider style={{ marginTop: '20px', marginBottom: '10px' }} />  {/* Çizgi ve boşluk */}
            {comments.length === 0 ? (
                <div style={{ 
                    textAlign: 'center', 
                    color: '#a9a9a9',  
                    padding: '20px 0', 
                    fontSize: '16px' 
                }}>
                    No comment
                </div>  
            ) : (
                <>
                    {comments.length > visibleComments && (
                        <div style={{ marginBottom: '10px' }}>
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                                loadMoreComments();
                            }}>
                                Show more comments
                            </a>
                        </div>
                    )}
                    <CommentList 
                        comments={commentsToDisplay}
                        userId={userId}
                        onDelete={handleCommentDeleted}
                    />
                </>
            )}

            <CommentForm 
                postId={postId}
                userId={userId}
                onCommentAdded={handleCommentAdded}
            />
        </div>
    );
};

export default Comments;


