import React from 'react';
import * as R from 'ramda';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Layout, Row, Col, Menu } from 'antd';
import { HEADER_MENU } from '../config/constant';

const { Header } = Layout;

const makeMenu = ( menuName : string) => (
  <Menu.Item key={menuName}>
    <Link href={`/${menuName}`}>
      <a>{R.toUpper(menuName)}</a>
    </Link>
  </Menu.Item>
);

const headLayout = () => {
  const { route } = useRouter();
  const selectedKey = R.slice(1, Infinity, route);

  return (
    <React.Fragment>
      <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0', backgroundColor: 'white' }}>
        <Row>
          <Col flex="200px" style={{ padding: '0 25px'}}>
            <div className="logoTitle">Make Habits</div>
          </Col>
          <Col flex="auto" style={{ padding: '0 25px'}}>
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']} selectedKeys={[selectedKey]}>
              {
                !R.isEmpty(selectedKey) &&
                R.map(makeMenu, HEADER_MENU)
              }
            </Menu>
          </Col>
        </Row>
      </Header>
      <style jsx>{`
        .logoTitle {
          font-size : 20px;
          color: blue;
        }
      `}</style>
    </React.Fragment>
  );
};

export default headLayout;