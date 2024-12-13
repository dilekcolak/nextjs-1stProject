"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Row, Col, Spin } from 'antd';
import Navbar from '@/components/Navbar';
import Search from '@/components/Search';
import Suggestions from '@/components/Suggestions';
import UserProfile from '@/components/UserProfile';
import Profile from '@/components/Profile';

const ProfilePage = () => {
  const params = useParams();
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(params.id);
  }, [params.id]);

  return (
  <Row style={{ display: 'flex', alignItems: 'flex-start' }}>
    <Col
      span={4}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '200px',
        display: 'block',
      }}
    >
      <Navbar isAuthenticated={true}/>
    </Col>

    <Col
      span={12} 
      style={{
        margin: '0 auto',
        paddingLeft: '50px',
        paddingRight: '50px',
        maxWidth: '800px', 
        overflow: 'hidden',
        flexGrow: 1,
      }}
    >
      {id ? <Profile userId={id} /> : <Spin tip="Loading..." />}
    </Col>

    <Col
      span={6}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        paddingTop: '80px',
        paddingRight: '60px',
        width: '350px',
        display: 'block',
      }}
    >
      <div style={{ marginBottom: '16px', marginTop: '0px', paddingLeft: '75px', display: 'flex', justifyContent: 'flex-start'}}>
          <UserProfile />
        </div>

      <div style={{ marginBottom: '16px', marginTop: '25px', display: 'flex', justifyContent: 'flex-end', paddingRight: '16px' }}>
        <Search />
      </div>
      <div style={{ marginTop: '45px', paddingRight: '16px', display: 'flex', justifyContent: 'flex-end', marginTop: '0px' }}>
        <Suggestions isAuthenticated={true}/>
      </div>
    </Col>
  </Row>
  );
}

export default ProfilePage;








