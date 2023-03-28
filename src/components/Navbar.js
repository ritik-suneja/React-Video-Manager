import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

function Navbar() {
  const location = useLocation();

  let selectedKey;
  if (location.pathname === '/') {
    selectedKey = 'buckets';
  } else if (location.pathname.startsWith('/bucket')) {
    selectedKey = 'bucket';
  } else if (location.pathname === '/history') {
    selectedKey = 'history';
  }

  return (
    <Menu mode="horizontal" selectedKeys={[selectedKey]} theme="dark">
      <Menu.Item key="buckets">
        <Link to="/">Buckets</Link>
      </Menu.Item>
      <Menu.Item key="history">
        <Link to="/history">History</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
