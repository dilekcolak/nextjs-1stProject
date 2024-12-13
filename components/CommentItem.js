"use client";
import { useState } from 'react';
import { List, Tooltip, message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CommentItem = ({ comment, userId, onDelete }) => {
    const [expanded, setExpanded] = useState(false);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await fetch('/api/comments', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: comment.id, user_id: userId }),
            });

            return response.ok;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', comment.post_id]);
            onDelete(comment.id);
            message.success('Yorum başarıyla silindi.');
        },
        onError: () => {
            message.error('Yorumu silerken bir hata oluştu.');
        }
    });

    const toggleExpandedComment = () => {
        setExpanded(prev => !prev);
    };

    const handleDeleteComment = () => {
        mutation.mutate();
    };

    return (
        <List.Item
            key={comment.id}
            style={{ padding: '4px 0', marginBottom: '2px', display: 'flex', justifyContent: 'space-between' }}
            actions={userId == comment.user_id ? [
                <Tooltip title='sil'>
                    <DeleteOutlined
                        style={{ fontSize: '15px', cursor: 'pointer' }}
                        onClick={handleDeleteComment}
                    />
                </Tooltip>
            ] : []}
        >
            <List.Item.Meta
                title={
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <a
                            href={`/profile/${comment.user_id}`}
                            style={{ fontWeight: 'bold', color: '#000' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {comment.username}
                        </a>
                        <span style={{ fontWeight: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                            {expanded || (comment.content && comment.content.length < 100)
                                ? comment.content
                                : `${comment.content ? comment.content.slice(0, 100) : ''}...`}

                            {(comment.content && comment.content.length > 100) && !expanded && (
                                <a href='#' onClick={(e) => {
                                    e.preventDefault();
                                    toggleExpandedComment();
                                }}>
                                    Devamını oku
                                </a>
                            )}

                        </span>
                    </div>
                }
            />
        </List.Item>
    )
}

export default CommentItem;
