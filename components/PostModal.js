import { Modal, Avatar } from 'antd';
import Comments from './Comments';
import PostImage from './PostImage';


const PostModal = ({ selectedPost, onCancel }) => {
    if (!selectedPost) return null;

    return (
        <Modal
            title={null}
            open={true}
            onCancel={onCancel}
            footer={null}
            width={600}
            style={{
                backgroundColor: '#e6e0ff',
                padding: '20px',
                borderRadius: '10px'
            }}
            centered={true}
        >
            <div>
                <PostImage post={selectedPost} />

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginTop: '20px'
                }}>
                    <Avatar src={selectedPost.profile_image_url} size={50} style={{ flexShrink: 0 }} />
                    <div>
                        <a href={`/profile/${selectedPost.userId}`} style={{ fontWeight: 'bold', fontSize: '18px', display: 'block', color: '#000' }}>
                            {selectedPost.username}
                        </a>
                        <div style={{ maxWidth: '620px', width: '100%', wordBreak: 'break-word', overFlowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                            {selectedPost.description}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Comments postId={selectedPost.id} />
            </div>
        </Modal>
    );
};

export default PostModal;