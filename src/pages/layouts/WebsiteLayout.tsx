import React, { useEffect, useState } from 'react'
import "./Layout.css"
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DatabaseOutlined, LoginOutlined, HomeOutlined
} from '@ant-design/icons';
import { Button, MenuProps, Row } from 'antd';
import { Outlet } from 'react-router-dom'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

interface User{
  name:String
}

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



const WebsiteLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [userInfo, setUserInfo] = useState<User|null>()
  const logout = ()=>{
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    setUserInfo(null)
  }
  useEffect(() => {
    if(localStorage.getItem('userInfo')){
      setUserInfo(JSON.parse(localStorage.getItem('userInfo') as string))
    }
  },[])


  const items: MenuItem[] = [
    getItem(<Link to={"/"}>Home</Link>, "home", <HomeOutlined />),
    getItem(<Link to={"/products"}>Products</Link>, "products", <FileOutlined />),
    getItem(<a style={{color:'yellow'}}>{userInfo?userInfo?.name:("Tài khoản")}</a>, "account", <TeamOutlined />, [
      getItem(localStorage.getItem('userInfo') ? (<Link to="/" onClick={logout}>Đăng xuất</Link>) : (<Link to="/auth/login">Đăng nhập</Link>), "login", <UserOutlined/>),
      getItem(<Link to={"/auth/register"}>Đăng ký</Link>, "register", <UserOutlined />),
      getItem(<Link to={"/admin"}>Admin</Link>, "admin", <DatabaseOutlined />),
    ]),
    
  ];
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
