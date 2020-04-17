import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { GetStaticProps, GetServerSideProps } from 'next';
import { CalendarOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Header, MenuPath, MonthlyDisplay, WeeklyDisplay } from '../components';

const { Content, Sider } = Layout;

enum SIDE_MENU {
  MONTH = "MONTH",
  WEEK = "WEEK"
};

type Props = {
  testData?: string[]
};

class Calender extends Component<Props> {
  state = {
    collapsed: false,
    selectedMenu: SIDE_MENU.MONTH
  };

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  selectMenu = (menuName : string) => {
    this.setState({selectedMenu: menuName});
  }

  render() {
    console.log(this.props);
    const { selectedMenu } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header />
        <Layout style={{ marginTop: 64 }}>
          <Sider theme="light" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <Menu 
              theme="light"
              mode="inline"
              defaultSelectedKeys={[SIDE_MENU.MONTH]}
              selectedKeys={[this.state.selectedMenu]}
              onClick={({ item, key })=>{
                this.selectMenu(key);
              }}
            >
              <Menu.Item key={SIDE_MENU.MONTH}>
                <CalendarOutlined />
                <span>{SIDE_MENU.MONTH}</span>
              </Menu.Item>
              <Menu.Item key={SIDE_MENU.WEEK}>
                <ScheduleOutlined />
                <span>{SIDE_MENU.WEEK}</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 25px 25px' }}>
            <MenuPath selectedMenu={this.state.selectedMenu} />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: 'white'
              }}
            >
              {selectedMenu===SIDE_MENU.MONTH ? <MonthlyDisplay/> : <WeeklyDisplay/>}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

// export const getServerSideProps: GetServerSideProps = async context => {
//   console.log('Call getServerSideProps');
//   return { props : {testData:['a', 'b']}};
// };

export const getStaticProps: GetStaticProps = async context => {
  console.log('Call GetStaticProps');
  return { props : {testData:['a', 'b']}};
}

export default Calender;