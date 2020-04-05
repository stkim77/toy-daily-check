import React, { Component } from 'react';
import { Layout, Menu, Button, Breadcrumb } from 'antd';
import { PieChartOutlined, BarChartOutlined } from '@ant-design/icons';
import { Header, MenuPath} from '../components';

const { Content, Sider } = Layout;

enum SIDE_MENU {
  MONTH_STATUS = "MONTH_STATUS",
  YEAR_STATUS = "YEAR_STATUS"
};

class Statistics extends Component {
  state = {
    collapsed: false,
    selectedMenu: SIDE_MENU.MONTH_STATUS
  };

  onCollapse = (collapsed: boolean) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  selectMenu = (menuName : string) => {
    this.setState({selectedMenu: menuName});
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
              defaultSelectedKeys={[SIDE_MENU.MONTH_STATUS]}
              selectedKeys={[this.state.selectedMenu]}
              onClick={({ item, key })=>{
                this.selectMenu(key);
              }}
            >
              <Menu.Item key={SIDE_MENU.MONTH_STATUS}>
                <PieChartOutlined />
                <span>{SIDE_MENU.MONTH_STATUS}</span>
              </Menu.Item>
              <Menu.Item key={SIDE_MENU.YEAR_STATUS}>
                <BarChartOutlined />
                <span>{SIDE_MENU.YEAR_STATUS}</span>
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
              Content
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default Statistics;