import { useState } from "react";
import { Form, Input, Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const CommentForm = ({ postId, userId, onCommentAdded }) => {
    const [newComment, setNewComment] = useState('');
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    post_id: postId,
                    user_id: userId,
                    content: newComment,
                }),
            });

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', postId]);
            setNewComment('');
            onCommentAdded();
        }
    });

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;
        mutation.mutate();
    };

    return (
        <Form.Item>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Input.TextArea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder='Add Comment'
                    autoSize={{ minRows: 1, maxRows: 3 }}
                    style={{flex: 1}}
                />

                <Button 
                    type='primary'
                    onClick={handleAddComment}
                    disabled={newComment.trim() === ''}
                >
                    Comment
                </Button>
            </div>
        </Form.Item>
    );
};

export default CommentForm;
