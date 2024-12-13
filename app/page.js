"use client"
import Navbar from "@/components/Navbar";
import Login from "@/components/Login";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Col, Row } from 'antd';
import Suggestions from "@/components/Suggestions";

export default function LoginPage() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [newUserEvent, setNewUserEvent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
        router.push('/home'); 
    }
  }, [isAuthenticated, router]);

   const handleNewUserRegister = () => {
     setNewUserEvent(true);
     setTimeout(() => setNewUserEvent(false), 1000); 
   };

  return (
    <Row style={{ minHeight: '100vh'}}>
      <Col 
        span={1}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          display: 'block',
          width: '60px'
        }}
      >
        <Navbar isAuthenticated={false} /> 
      </Col>

      <Col 
        span={10}
        style={{
          margin: '0 auto',
          marginTop: '180px',
          paddingLeft: '160px',
          paddingRight: '0px',
          overflow: 'hidden'
        }}
      >
        <Login setAuthenticated={setAuthenticated} onNewUserRegister={handleNewUserRegister} /> 
      </Col>

      <Col 
          span={5}
          offset={3}
          style={{
            marginTop: '96px',
            paddingLeft: '0px',
            paddingRight: '64px',
            overflow: 'hidden'
          }}
        >
          <Suggestions newUserEvent={newUserEvent} isAuthenticated={false} />  
        </Col>
    </Row>
  );
}
