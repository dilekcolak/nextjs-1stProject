
const PostFooter = ({ post }) => {
    
    const createdAt = new Date(post.created_at);
    const formattedDate = createdAt.toLocaleDateString();
    const formattedTime = createdAt.toLocaleTimeString();

    return (
        <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            fontSize: '12px',
            color: '#888',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        }}>
            <span>{formattedDate} {formattedTime}</span>
            {post.updated_at && (
                <span>Düzenlendi</span>
            )}
        </div>
    );
};

export default PostFooter;