import React from 'react';
import { Menu } from 'antd';

type SideMenuProps = {
  name : string,
  icon : React.Component
}

function SideMenu ( { name, icon } : SideMenuProps ) {
  return (
    <Menu.Item key={name}>
      {icon}
      <span>{name}</span>
    </Menu.Item>
  )
}

export default SideMenu;