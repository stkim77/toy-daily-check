import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { GetStaticProps, GetServerSideProps } from 'next';
import { withRouter } from 'next/router';
import { CalendarOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Header, MenuPath, MonthlyDisplay, WeeklyDisplay } from '../components';
import { data } from '../config/tempData';
import { calendarType } from '../config/constant';
import moment from 'moment';

moment.updateLocale("en", { week: {
  dow: 1, // First day of week is Monday
  doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
}});

const { Content, Sider } = Layout;

enum SIDE_MENU {
  MONTH = "MONTH",
  WEEK = "WEEK"
};

class Calender extends Component<calendarType> {
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
              {selectedMenu===SIDE_MENU.MONTH ? <MonthlyDisplay {...this.props}/> : <WeeklyDisplay/>}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export const getServerSideProps: GetServerSideProps<calendarType> = async context => {
  return { props : {data}};
}

export default Calender;