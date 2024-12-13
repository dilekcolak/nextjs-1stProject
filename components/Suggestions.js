"use client";

import Users from "./Users";
import { Typography } from "antd";

const Suggestions = ({newUserEvent, isAuthenticated}) => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    

    return (
        <div style={{ width: '100%' }}>
            <Typography.Title //Başlıkları daha kolay düzenlemek için kullanılır 
                level={4} 
                className="text-center"
                style={{ marginLeft: '85px' }}
            >
                Suggestions
            </Typography.Title>

            <div>
                <Users excludeUserId={userId} newUserEvent={newUserEvent} isAuthenticated={isAuthenticated} />
            </div>
        </div>
    )
}

export default Suggestions;





