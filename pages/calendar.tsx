import React, { Component } from 'react';
import * as R from 'ramda';
// import * as moment from 'moment';
import { Layout, Menu, Calendar, Badge } from 'antd';
import { CalendarOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Header, MenuPath } from '../components';
import moment from 'moment';

const { Content, Sider } = Layout;

enum SIDE_MENU {
  MONTH = "MONTH",
  WEEK = "WEEK"
};

enum statusType {
  success = 'success',
  processing = 'processing',
  default = 'default',
  error = 'error',
  warning = 'warning'
}

type listType = {
  type: statusType,
  content: string,
};

class Calender extends Component {
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

  getListData = (value : moment.Moment) : listType[] => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: statusType.warning, content: 'This is warning event.' },
          { type: statusType.success, content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: statusType.warning, content: 'This is warning event.' },
          { type: statusType.success, content: 'This is usual event.' },
          { type: statusType.error, content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: statusType.warning, content: 'This is warning event' },
          { type: statusType.success, content: 'This is very long usual event。。....' },
          { type: statusType.error, content: 'This is error event 1.' },
          { type: statusType.error, content: 'This is error event 2.' },
          { type: statusType.error, content: 'This is error event 3.' },
          { type: statusType.error, content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  dateCellRender = (value : moment.Moment) : React.ReactNode => {
    const listData = this.getListData(value);
    return (
      <ul style={{padding: 0}}>
        {listData.map(item => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  }
  
  getMonthData = (value : moment.Moment) => {
    if (value.month() === 8) {
      return 1394;
    }
  }
  
  monthCellRender = (value : moment.Moment) : React.ReactNode => {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }
  
  render() {
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
              <Calendar dateCellRender={this.dateCellRender} monthCellRender={this.monthCellRender} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Calender;