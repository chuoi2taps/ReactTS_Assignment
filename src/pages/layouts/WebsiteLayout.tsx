import React from 'react'
import "./Layout.css"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DatabaseOutlined, LoginOutlined, HomeOutlined
} from '@ant-design/icons';
import type { MenuProps, Row } from 'antd';
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link to={"/"}>Home</Link>, "home", <HomeOutlined />),
  getItem(<Link to={"/products"}>Products</Link>, "products", <FileOutlined />),
  getItem("Tài khoản", "account", <TeamOutlined />, [
    getItem(localStorage.getItem('userInfo') ? (<Link to="/logout">Đăng xuất</Link>) : (<Link to="/auth/login">Đăng nhập</Link>), "login", <UserOutlined/>),
    getItem(<Link to={"/auth/register"}>Đăng ký</Link>, "register", <UserOutlined />),
    getItem(<Link to={"/admin"}>Admin</Link>, "admin", <DatabaseOutlined />),
  ]),
  
];

const WebsiteLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ display: 'flex', justifyContent: 'center' }}
        />
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{ margin: '16px 0' }}>

        </div>
        <div className="site-layout-content" style={{ background: colorBgContainer }}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};

export default WebsiteLayout;
