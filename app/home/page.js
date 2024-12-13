"use client"
import Navbar from "../../components/Navbar";
import Timeline from "../../components/Timeline";
import UserProfile from "../../components/UserProfile";
import Search from "../../components/Search";
import Suggestions from "../../components/Suggestions";
import { Col, Row } from "antd";

export default function Home() {

  const currentUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;

  return (
    <Row style={{ minHeight: '100vh'}}>
      <Col 
        span={1}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100%',
          display: 'block',
          width: '80px'
        }}
      >
        <Navbar isAuthenticated={true} />
      </Col>

      <Col 
        span={12}
        style={{
          margin: '0 auto',
          marginTop: '64px',
          paddingLeft: '10px',
          paddingRight: '16px',
          overflow: 'hidden'
        }}
      >
        <Timeline currentUserId={currentUserId}/>
      </Col>

      <Col 
        span={15}
        style={{
          position: 'fixed',
          zIndex: 1000,
          top: 0,
          right: 0,
          paddingTop: '80px',
          paddingRight: '40px',
          width: '350px',
          display: 'block'
        }}
      >
        <div style={{ marginBottom: '16px', marginTop: '0px', paddingLeft: '75px', display: 'flex', justifyContent: 'flex-start'}}>
          <UserProfile />
        </div>

        <div style={{ marginBottom: '16px', marginTop: '25px', display: 'flex', paddingRight: '16px', justifyContent: 'flex-end'}}>
          <Search />
        </div>
        <div style= {{ marginTop: '30px', paddingRight: '25px', display:'flex', justifyContent: 'flex-end', marginTop: '0px'}}>
          <Suggestions isAuthenticated={true}/>
        </div>
      </Col>
    </Row>
  );
}



