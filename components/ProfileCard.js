import { Avatar, Typography, Card } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProfileCard = ({ userData, currentUserId, onEditClick }) => {
    return (
        <Card 
            cover={
                <div style={{ textAlign: 'center', padding: '15px' }}>
                    <Avatar size={300} src={userData.profile_image_url}/>
                </div>
            }
            bordered={false}
            style={{ marginBottom: '10px', position: 'relative' }}
        >
            <Title levet={2} style={{ textAlign: 'center' }}>
                {userData.username}
                {currentUserId == userData.id && (
                    <EditOutlined 
                        style={{ fontSize: '24px', marginLeft: '20px', cursor: 'pointer' }}
                        onClick={onEditClick}
                    />
                )}
            </Title>
            <Card style={{ backgroundColor: '#f0f0f0', marginTop: '20px' }}>
                <Title level={3}>ABOUT:</Title>
                <Text strong>Company: </Text><Text>{userData.company}</Text>
                <br />
                <Text strong>Position: </Text><Text>{userData.position}</Text>
                <br />
                <Text strong>Job Description: </Text><Text>{userData.job_description}</Text>
                <br />
            </Card>
        </Card>
    )
}

export default ProfileCard;