import { Input, Button, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const PostContent = ({ post, setPosts, editingPostId, setEditingPostId, editedDescription, setEditedDescription }) => {
    const queryClient = useQueryClient();

    const saveEditMutation = useMutation({
        mutationFn: async (postId) => {
            const res = await fetch('/api/posts', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: postId,
                    description: editedDescription,
                }),
            });

            if(!res.ok) {
                throw new Error('Gönderi düzenleme başarısız oldu!');
            }

            return res.json();
        },
        onSuccess: (data, postId) => {
            setPosts((prevPosts) => 
                prevPosts.map((post) => 
                    post.id === postId ? { ...post, description: editedDescription } : post
                )
            );
            setEditingPostId(null);
            message.success('Gönderi düzenlendi.');
            queryClient.invalidateQueries(['timelinePosts'])
        },
        onError: () => {
            message.error('Gönderi düzenlenirken bir hata oluştu.');
        },
    });

    const saveEdit = (postId) => {
        saveEditMutation.mutate(postId);
    }

    const cancelEdit = () => {
        setEditingPostId(null);
    };

    return (
        <div>
            {editingPostId === post.id ? (
                <div onClick={(e) => e.stopPropagation()}>
                    <Input.TextArea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        autoSize={{ minRows: 1, maxRows: 3 }}
                    />
                    <div style={{ marginTop: '10px' }}>
                        <Button type="primary" onClick={() => saveEdit(post.id)}>
                            Kaydet
                        </Button>
                        <Button style={{ marginLeft: '10px' }} onClick={cancelEdit}>
                            İptal
                        </Button>
                    </div>
                </div>
            ) : (
                <div style={{ maxWidth: '550px', width: '100%', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'pre-wrap', marginLeft: '40px' }}>
                    {post.description && post.description.length > 100 ? (
                        <>
                            {post.description.slice(0, 100)}...
                            <a href="#" onClick={(e) => {
                                e.preventDefault();
                            }}>
                                Devamını oku
                            </a>
                        </>
                    ) : post.description}
                </div>
            )}
        </div>
    );
};

export default PostContent;



