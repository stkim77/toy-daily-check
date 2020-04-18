import React, { Component, useState } from 'react';
import { Layout, Menu } from 'antd';
import { GetStaticProps, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { CalendarOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Header, MenuPath, MonthlyDisplay, WeeklyDisplay } from '../components';
import { data } from '../config/tempData';
import { calendarType } from '../config/constant';
import moment from 'moment';
import { ParsedUrlQuery } from 'querystring';

moment.updateLocale("en", { week: {
  dow: 1, // First day of week is Monday
  doy: 4  // First week of year must contain 4 January (7 + 1 - 4)
}});

const { Content, Sider } = Layout;

enum SIDE_MENU {
  MONTH = "MONTH",
  WEEK = "WEEK"
};

interface queryType {
  menu : string
}

const getMenu = (query : ParsedUrlQuery) : string => {
  if (!R.isNil(query.menu)) {
    if (Array.isArray(query.menu)) {
      if (query.menu.length > 0) {
        return query.menu[0];
      }
    } else {
      return query.menu;
    }
  }
  return SIDE_MENU.MONTH;
}

function Calender ({data} : calendarType) {
  const { query } = useRouter();
  const menu = getMenu(query);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedMenu, selectMenu] = useState<string>(menu);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Layout style={{ marginTop: 64 }}>
        <Sider theme="light" collapsible collapsed={collapsed} onCollapse={(collapsed: boolean) => {setCollapsed(collapsed)}}>
          <Menu 
            theme="light"
            mode="inline"
            defaultSelectedKeys={[SIDE_MENU.MONTH]}
            selectedKeys={[menu]}
            onClick={({ item, key })=>{
              selectMenu(key);
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
          <MenuPath selectedMenu={selectedMenu} />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: 'white'
            }}
          >
            {selectedMenu===SIDE_MENU.MONTH ? <MonthlyDisplay data={[]}/> : <WeeklyDisplay/>}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<calendarType> = async context => {
  return { props : {data}};
}

export default Calender;