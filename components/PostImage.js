import { Image } from 'antd';

const PostImage = ({ post }) => {
    if (!post.image_url) return null;

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 'auto',
            marginBottom: '20px'
        }}>
            <Image
                src={post.image_url}
                alt="post"
                style={{
                    objectFit: 'cover',
                    height: 'auto',
                    maxWidth: '100%',
                    cursor: 'pointer'
                }}
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};

export default PostImage;