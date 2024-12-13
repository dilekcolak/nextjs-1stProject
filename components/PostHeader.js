import { Avatar, Dropdown, Menu, message } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const PostHeader = ({ post, isOwner, setPosts, setEditingPostId, setEditedDescription }) => {
    const queryClient = useQueryClient();
    
    const handleEdit = (post) => {
        setEditingPostId(post.id);
        setEditedDescription(post.description);
    };

    const deletePost = async (postId) => {
        const res = await fetch('/api/posts', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ postId }),
        });

        if(!res.ok) {
            throw new Error('Post silme başarısız!');
        }

        return postId;
    };

    const mutation = useMutation({
        mutationFn: deletePost,
        onSuccess: (postId) => {
            setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
            message.success('Gönderi silindi.');
            queryClient.invalidateQueries(['posts']);
        },
        onError: () => {
            message.error('Gönderi silinirken bir hata oluştu.');
        },
    });

    const handleDelete = (postId) => {
        if (confirm("Bu postu silmek istediğinizden emin misiniz?")) {
            mutation.mutate(postId);
        }
    };

    const menuItems = [
        {
            key: '1',
            label: 'Düzenle',
            onClick: () => handleEdit(post),
        },
        {
            key: '2',
            label: 'Sil',
            onClick: () => handleDelete(post.id),
        }
    ];
    return (
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar src={post.profile_image_url} style={{ marginRight: '10px' }} />
            <div style={{ flex: 1 }}>
                <a
                    href={`/profile/${post.user_id}`}
                    style={{ fontWeight: 'bold', color: 'black' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {post.username}
                </a>
                {isOwner && (
                    <div onClick={(e) => e.stopPropagation()} style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 10 }}>

                        <Dropdown overlay={<Menu items={menuItems} />} trigger={['click']}>
                                <MenuOutlined style={{ fontSize: '16px', color: '#000', cursor: 'pointer' }} />
                        </Dropdown>
                        
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostHeader;




