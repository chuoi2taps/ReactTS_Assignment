import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

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
    getItem(<Link to={"/admin"}>Dashboard</Link>,"dashboard",<PieChartOutlined />),
    getItem("Management", "manage", <TeamOutlined />, [
      getItem(<Link to={"/admin/products"}>Product</Link>,"products",<FileOutlined />),
      getItem(<Link to={"/admin/categories"}>Category</Link>,"categories",<FileOutlined />),
      getItem(<Link to={"/admin/users"}>User</Link>,"users",<FileOutlined />),
    ]),
    
];
const items_nav:MenuItem[]=[
  getItem(<Link to={"/"}>Go to Home</Link>, "Home", <HomeOutlined />),
  getItem(<Link to={"/products"}>Go to Products</Link>, "products", <TeamOutlined />),
  getItem("Tài khoản", "account", <TeamOutlined />, [
    getItem(localStorage.getItem('userInfo') ? (<Link to="/logout">Đăng xuất</Link>) : (<Link to="/auth/login">Đăng nhập</Link>), "login", <UserOutlined/>),
  ]),
]

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            textAlign: "center",
            color: "white",
            padding: "5px 0",
          }}
        >
          ADMIN
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, margin:"0 10px",background:"rgb(0,21,41)" }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items_nav}
          style={{display:'flex', justifyContent:'center'}}
          />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ margin: '16px 0', }}>
          </div>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;